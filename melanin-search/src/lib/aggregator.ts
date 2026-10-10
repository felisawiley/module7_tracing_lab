/**
 * Content Aggregator
 * 
 * Scrapes and aggregates content from Black-owned sources, newsletters, and publications.
 * Uses RSS feeds where available, with fallback to API integrations.
 */

import { blackOwnedSources, ContentSource } from "./sources";

export interface AggregatedContent {
  id: string;
  title: string;
  description: string;
  url: string;
  sourceId: string;
  sourceName: string;
  sourceUrl: string;
  author?: string;
  publishedAt: string;
  categories: string[];
  tags: string[];
  imageUrl?: string;
  isBlackOwned: boolean;
}

interface RSSItem {
  title?: string;
  link?: string;
  description?: string;
  pubDate?: string;
  author?: string;
  creator?: string;
  content?: string;
  enclosure?: { url?: string };
}

/**
 * Parse RSS feed and extract content items
 */
async function parseRSSFeed(source: ContentSource): Promise<AggregatedContent[]> {
  if (!source.rssUrl) return [];

  try {
    const response = await fetch(source.rssUrl, {
      headers: {
        "User-Agent": "MelaninSearch/1.0 (Content Aggregator)",
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch RSS from ${source.name}: ${response.status}`);
      return [];
    }

    const xml = await response.text();
    const items = extractRSSItems(xml);

    return items.map((item, index) => ({
      id: `${source.id}-${Date.now()}-${index}`,
      title: item.title || "Untitled",
      description: stripHtml(item.description || item.content || ""),
      url: item.link || source.url,
      sourceId: source.id,
      sourceName: source.name,
      sourceUrl: source.url,
      author: item.author || item.creator,
      publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
      categories: source.categories,
      tags: extractTags(item.title || "", item.description || ""),
      imageUrl: item.enclosure?.url,
      isBlackOwned: source.isBlackOwned,
    }));
  } catch (error) {
    console.error(`Error parsing RSS from ${source.name}:`, error);
    return [];
  }
}

/**
 * Extract items from RSS XML (simplified parser)
 */
function extractRSSItems(xml: string): RSSItem[] {
  const items: RSSItem[] = [];
  const itemMatches = xml.match(/<item[^>]*>[\s\S]*?<\/item>/gi) || [];

  for (const itemXml of itemMatches) {
    const item: RSSItem = {};

    const titleMatch = itemXml.match(/<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
    if (titleMatch) item.title = titleMatch[1].trim();

    const linkMatch = itemXml.match(/<link[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i);
    if (linkMatch) item.link = linkMatch[1].trim();

    const descMatch = itemXml.match(/<description[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i);
    if (descMatch) item.description = descMatch[1].trim();

    const dateMatch = itemXml.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i);
    if (dateMatch) item.pubDate = dateMatch[1].trim();

    const authorMatch = itemXml.match(/<(?:author|dc:creator)[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/(?:author|dc:creator)>/i);
    if (authorMatch) item.author = authorMatch[1].trim();

    const enclosureMatch = itemXml.match(/<enclosure[^>]*url=["']([^"']+)["'][^>]*>/i);
    if (enclosureMatch) item.enclosure = { url: enclosureMatch[1] };

    items.push(item);
  }

  return items;
}

/**
 * Strip HTML tags from text
 */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 300);
}

/**
 * Extract relevant tags from title and description
 */
function extractTags(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const tags: string[] = [];

  const hairTerms = ["natural hair", "4c", "4b", "4a", "3c", "3b", "3a", "locs", "braids", "twist", "protective style", "wash day", "curl", "coil", "kinky", "afro"];
  const beautyTerms = ["makeup", "skincare", "foundation", "melanin", "dark skin", "glow", "sunscreen"];
  const fashionTerms = ["style", "fashion", "outfit", "ankara", "designer", "streetwear"];
  const cultureTerms = ["black", "african", "diaspora", "juneteenth", "history"];
  const web3Terms = ["crypto", "bitcoin", "nft", "blockchain", "web3", "defi"];
  const wellnessTerms = ["mental health", "therapy", "wellness", "fitness", "health"];
  const businessTerms = ["entrepreneur", "business", "startup", "investment", "funding"];

  const allTerms = [...hairTerms, ...beautyTerms, ...fashionTerms, ...cultureTerms, ...web3Terms, ...wellnessTerms, ...businessTerms];

  for (const term of allTerms) {
    if (text.includes(term)) {
      tags.push(term);
    }
  }

  return [...new Set(tags)].slice(0, 10);
}

/**
 * Aggregate content from all sources with RSS feeds
 */
export async function aggregateFromRSS(): Promise<AggregatedContent[]> {
  const sourcesWithRSS = blackOwnedSources.filter(s => s.rssUrl);
  const allContent: AggregatedContent[] = [];

  const results = await Promise.allSettled(
    sourcesWithRSS.map(source => parseRSSFeed(source))
  );

  for (const result of results) {
    if (result.status === "fulfilled") {
      allContent.push(...result.value);
    }
  }

  // Sort by date, newest first
  allContent.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return allContent;
}

/**
 * Aggregate content from a specific source
 */
export async function aggregateFromSource(sourceId: string): Promise<AggregatedContent[]> {
  const source = blackOwnedSources.find(s => s.id === sourceId);
  if (!source || !source.rssUrl) return [];
  return parseRSSFeed(source);
}

/**
 * Get list of sources that can be aggregated
 */
export function getAggregatableSources(): ContentSource[] {
  return blackOwnedSources.filter(s => s.rssUrl);
}
