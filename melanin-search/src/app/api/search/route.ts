import { NextRequest, NextResponse } from 'next/server';

const MEILISEARCH_HOST = process.env.MEILISEARCH_HOST || 'http://localhost:7700';
const MEILISEARCH_KEY = process.env.MEILISEARCH_KEY || 'melanin123';

// Fallback data when Meilisearch isn't available
const fallbackData = [
  {
    id: '1',
    title: 'The Ultimate Guide to Protective Styles for Natural Hair',
    description: 'From box braids to faux locs, discover protective styles that promote hair growth while keeping your crown looking gorgeous.',
    category: 'hair',
    source: 'CurlPattern',
    creator: 'Maya Johnson',
    url: 'https://curlpattern.com/protective-styles-guide',
    tags: ['protective styles', 'box braids', 'natural hair'],
    isBlackOwned: true,
  },
  {
    id: '2',
    title: 'LOC Method: The Secret to Moisturized Type 4 Hair',
    description: 'Learn how to properly layer your products using the Liquid-Oil-Cream method for maximum moisture retention.',
    category: 'hair',
    source: 'CurlPattern',
    creator: 'Destiny Williams',
    url: 'https://curlpattern.com/loc-method',
    tags: ['LOC method', 'moisture', '4c hair'],
    isBlackOwned: true,
  },
  {
    id: '3',
    title: 'Foundation Matching for Deep Skin Tones',
    description: 'Find your perfect foundation match. Guide to undertones and the best brands for melanin-rich skin.',
    category: 'beauty',
    source: 'Cocoa Swatches',
    creator: 'Nia Davis',
    url: 'https://cocoaswatches.com/foundation-guide',
    tags: ['foundation', 'deep skin', 'makeup'],
    isBlackOwned: true,
  },
  {
    id: '4',
    title: 'Skincare for Hyperpigmentation and Dark Spots',
    description: 'Dermatologist-approved ingredients and routines for melanin-rich skin.',
    category: 'beauty',
    source: 'MelaninGlow',
    url: 'https://melaninglow.com/hyperpigmentation',
    tags: ['hyperpigmentation', 'skincare', 'dark spots'],
    isBlackOwned: true,
  },
  {
    id: '5',
    title: 'Black-Owned Fashion Brands to Know',
    description: 'From luxury designers like Telfar to emerging streetwear labels.',
    category: 'fashion',
    source: 'StyleNoir',
    url: 'https://stylenoir.com/black-owned-fashion',
    tags: ['fashion', 'Black-owned', 'Telfar'],
    isBlackOwned: true,
  },
  {
    id: '6',
    title: 'Bitcoin and Black America: Why Crypto Matters',
    description: 'How cryptocurrency can address systemic financial exclusion.',
    category: 'web3',
    source: 'Bitcoin & Black America',
    creator: 'Isaiah Jackson',
    url: 'https://bitcoinandblackamerica.com',
    tags: ['bitcoin', 'crypto', 'finance'],
    isBlackOwned: true,
  },
  {
    id: '7',
    title: 'Mental Health Resources for the Black Community',
    description: 'Culturally competent therapists and mental health resources.',
    category: 'wellness',
    source: 'Therapy for Us',
    url: 'https://therapyforus.com',
    tags: ['mental health', 'therapy', 'wellness'],
    isBlackOwned: true,
  },
  {
    id: '8',
    title: 'Hair Products for 4C Hair: What Actually Works',
    description: 'Honest reviews of products for 4C hair texture. No sponsored content.',
    category: 'hair',
    source: 'CurlPattern',
    url: 'https://curlpattern.com/4c-products',
    tags: ['4c hair', 'product reviews', 'natural hair'],
    isBlackOwned: true,
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category');

  // Try Meilisearch first
  try {
    const body: Record<string, unknown> = {
      q,
      limit: 20,
    };

    if (category && category !== 'all') {
      body.filter = `category = "${category}"`;
    }

    const response = await fetch(`${MEILISEARCH_HOST}/indexes/content/search`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MEILISEARCH_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(3000), // 3 second timeout
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({
        results: data.hits,
        query: q,
        totalHits: data.estimatedTotalHits,
        processingTimeMs: data.processingTimeMs,
        source: 'meilisearch',
      });
    }
  } catch {
    // Meilisearch not available, use fallback
  }

  // Fallback: filter in-memory
  let results = fallbackData;

  if (category && category !== 'all') {
    results = results.filter(item => item.category === category);
  }

  if (q) {
    const query = q.toLowerCase();
    results = results.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  return NextResponse.json({
    results,
    query: q,
    totalHits: results.length,
    processingTimeMs: 1,
    source: 'fallback',
  });
}
