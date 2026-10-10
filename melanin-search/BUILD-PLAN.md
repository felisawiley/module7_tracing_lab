# Building Melanin Search From Scratch

## Overview

This document outlines how to build a fully functional search engine that prioritizes Black creators and content. There are multiple approaches depending on resources and timeline.

---

## Approach 1: Curated Directory (MVP - 2-4 weeks)

**Best for:** Solo developer or small team, limited budget, quick launch

### What You Build
A searchable database of curated content, not a web crawler.

### Tech Stack
- **Frontend:** Next.js (already built)
- **Database:** Supabase (free tier) or PlanetScale
- **Auth:** Supabase Auth or NextAuth
- **Hosting:** Vercel (free tier)

### Data Model

```sql
-- Sources (Black publications, websites)
CREATE TABLE sources (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  is_black_owned BOOLEAN DEFAULT false,
  verification_level TEXT, -- 'editorial', 'community', 'self_declared'
  category TEXT,
  quality_score INT DEFAULT 50,
  community_score INT DEFAULT 50,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Content (articles, videos, etc)
CREATE TABLE content (
  id UUID PRIMARY KEY,
  source_id UUID REFERENCES sources(id),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT UNIQUE NOT NULL,
  category TEXT,
  tags TEXT[],
  creator_name TEXT,
  published_at TIMESTAMP,
  community_upvotes INT DEFAULT 0,
  community_saves INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Submissions (community submissions)
CREATE TABLE submissions (
  id UUID PRIMARY KEY,
  content_url TEXT NOT NULL,
  submitter_email TEXT,
  category TEXT,
  description TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  reviewed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### How Content Gets Added

1. **Manual curation** - You add content from known Black publications
2. **Community submissions** - Users submit via /creators page
3. **RSS feeds** - Auto-import from verified publications (see below)

### Launch Checklist
- [ ] Set up Supabase project
- [ ] Create database schema
- [ ] Build admin panel for reviewing submissions
- [ ] Seed with 100-200 pieces of quality content
- [ ] Add RSS feed imports from 5-10 publications
- [ ] Launch and gather feedback

---

## Approach 2: RSS Aggregator (4-8 weeks)

**Best for:** Small team, some engineering resources

### Additional Tech
- **Cron jobs:** Vercel Cron or GitHub Actions
- **RSS parser:** `rss-parser` npm package

### Verified RSS Feeds to Index

| Publication | RSS Feed | Category |
|-------------|----------|----------|
| The Root | theroot.com/rss | Culture |
| Essence | essence.com/feed | Culture/Beauty |
| Black Enterprise | blackenterprise.com/feed | Business |
| AfroTech | afrotech.com/feed | Business/Tech |
| Blavity | blavity.com/feed | Culture |
| NaturallyCurly | naturallycurly.com/feed | Hair |
| Fashion Bomb Daily | fashionbombdaily.com/feed | Fashion |
| Black Girl Long Hair | blackgirllonghair.com/feed | Hair |

### Cron Job Setup

```typescript
// app/api/cron/index-feeds/route.ts
import Parser from 'rss-parser';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const parser = new Parser();
  
  const feeds = [
    { url: 'https://www.theroot.com/rss', sourceId: 'theroot' },
    { url: 'https://www.essence.com/feed/', sourceId: 'essence' },
    // ... more feeds
  ];

  for (const feed of feeds) {
    try {
      const parsed = await parser.parseURL(feed.url);
      
      for (const item of parsed.items) {
        await db.content.upsert({
          where: { url: item.link },
          create: {
            sourceId: feed.sourceId,
            title: item.title,
            description: item.contentSnippet,
            url: item.link,
            publishedAt: new Date(item.pubDate),
          },
          update: {
            title: item.title,
            description: item.contentSnippet,
          },
        });
      }
    } catch (error) {
      console.error(`Error fetching ${feed.sourceId}:`, error);
    }
  }

  return Response.json({ success: true });
}
```

### vercel.json for Cron

```json
{
  "crons": [
    {
      "path": "/api/cron/index-feeds",
      "schedule": "0 * * * *"
    }
  ]
}
```

---

## Approach 3: Platform API Integration (8-12 weeks)

**Best for:** Funded startup, engineering team

### YouTube Integration

1. **Maintain curated creator list** - Verified Black YouTubers
2. **Use YouTube Data API** - Fetch their latest videos
3. **Index video metadata** - Title, description, tags

```typescript
// Fetch videos from verified creators
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

async function fetchCreatorVideos(channelId: string) {
  const url = `https://www.googleapis.com/youtube/v3/search?` +
    `key=${YOUTUBE_API_KEY}&channelId=${channelId}&` +
    `part=snippet&order=date&maxResults=10&type=video`;
  
  const response = await fetch(url);
  return response.json();
}
```

### Partnership Opportunities

| Partner | What They Provide | Integration |
|---------|-------------------|-------------|
| Official Black Wall Street | Verified Black-owned businesses | API or data share |
| Yelp | Black-owned business badge | Yelp Fusion API |
| Google | Black-owned attribute | Google Places API |
| Buy From A Black Woman | Women-owned businesses | Partnership |

---

## Approach 4: Full Search Engine (6+ months)

**Best for:** Well-funded company, large engineering team

### Components
1. **Web crawler** - Crawl verified domains
2. **Content extraction** - Clean HTML to text
3. **Search index** - Elasticsearch, Typesense, or Meilisearch
4. **ML classification** - Detect content about Black topics

### Tech Stack
- **Crawler:** Scrapy (Python) or Crawlee (Node.js)
- **Search:** Meilisearch (easiest) or Elasticsearch
- **ML:** OpenAI embeddings for semantic search
- **Infrastructure:** AWS, GCP, or Vercel + Railway

This is complex but doable. Companies like The Plug, Blavity, and others have built similar infrastructure.

---

## The Verification Challenge

The hardest part isn't technical—it's **verification**. How do you know a source is actually Black-owned?

### Verification Methods

1. **Editorial verification (highest trust)**
   - Check official directories (NMSDC, WBENC)
   - Review public records
   - Direct outreach to business owners

2. **Partnership verification**
   - Partner with existing directories
   - They've already done the verification

3. **Community verification**
   - Multiple community members vouch
   - Periodic review

4. **Self-declaration (lowest trust)**
   - Creators/businesses self-identify
   - Gets lower ranking weight until verified

### Existing Verification Sources
- National Minority Supplier Development Council (NMSDC)
- Official Black Wall Street directory
- Yelp Black-owned badge (businesses self-declare + verify)
- Google Black-owned attribute
- State/local minority business registries

---

## Recommended Path

### Phase 1: MVP (Month 1)
- [ ] Set up database (Supabase)
- [ ] Build admin panel
- [ ] Seed 200 pieces of content manually
- [ ] Launch with community submissions

### Phase 2: Automation (Month 2)
- [ ] Add RSS feed indexing (10 publications)
- [ ] Cron job for hourly updates
- [ ] Basic search improvements

### Phase 3: Scale (Month 3-4)
- [ ] YouTube creator integration
- [ ] Partnership with 1-2 directories
- [ ] Community voting/flagging

### Phase 4: Grow (Month 5+)
- [ ] More platform integrations
- [ ] Mobile app
- [ ] Browser extension
- [ ] Semantic search

---

## Cost Estimate (MVP)

| Service | Cost |
|---------|------|
| Vercel (hosting) | Free |
| Supabase (database) | Free tier |
| Domain | ~$12/year |
| YouTube API | Free (10,000 requests/day) |
| **Total** | **~$12/year** |

You can literally build and launch this for the cost of a domain name.

---

## Resources

### Black Business Directories
- Official Black Wall Street: https://officialblackwallstreet.com
- Buy From A Black Woman: https://www.buyfromablackwomandirectory.org
- Support Black Owned: https://www.supportblackowned.com
- WeBuyBlack: https://webuyblack.com

### Black Publications (for RSS)
- The Root, Essence, Blavity, AfroTech, Black Enterprise
- For Her, HelloBeautiful, MadameNoire
- The Grio, NewsOne, Cassius

### APIs
- YouTube Data API: https://developers.google.com/youtube
- Yelp Fusion API: https://www.yelp.com/developers
- Google Places API: https://developers.google.com/maps/documentation/places

---

## Conclusion

**Yes, this can absolutely be built from scratch.**

Start with the curated directory approach. You can launch an MVP in weeks with just:
- The frontend (already built)
- A Supabase database
- Manual content curation
- Community submissions

Then grow from there based on what users need.
