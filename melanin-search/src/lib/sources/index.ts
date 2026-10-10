/**
 * CONTENT SOURCE INTEGRATIONS
 * 
 * These are the real data sources we can pull from to build the index.
 * Each source has different integration methods and verification approaches.
 */

export interface ContentSourceConfig {
  id: string;
  name: string;
  type: "rss" | "api" | "scraper" | "manual" | "partnership";
  verificationMethod: string;
  updateFrequency: string;
  estimatedContent: string;
}

/**
 * TIER 1: RSS FEEDS FROM BLACK PUBLICATIONS
 * These are the easiest to integrate - just parse RSS feeds
 */
export const rssSources: ContentSourceConfig[] = [
  {
    id: "essence",
    name: "Essence",
    type: "rss",
    verificationMethod: "Known Black publication - auto-verified",
    updateFrequency: "Every hour",
    estimatedContent: "50+ articles/week",
  },
  {
    id: "theroot",
    name: "The Root",
    type: "rss",
    verificationMethod: "Known Black publication - auto-verified",
    updateFrequency: "Every hour",
    estimatedContent: "100+ articles/week",
  },
  {
    id: "blavity",
    name: "Blavity",
    type: "rss",
    verificationMethod: "Known Black publication - auto-verified",
    updateFrequency: "Every hour",
    estimatedContent: "30+ articles/week",
  },
  {
    id: "afrotech",
    name: "AfroTech",
    type: "rss",
    verificationMethod: "Known Black publication - auto-verified",
    updateFrequency: "Every hour",
    estimatedContent: "20+ articles/week",
  },
  {
    id: "blackenterprise",
    name: "Black Enterprise",
    type: "rss",
    verificationMethod: "Known Black publication - auto-verified",
    updateFrequency: "Every hour",
    estimatedContent: "40+ articles/week",
  },
  {
    id: "naturallycurly",
    name: "NaturallyCurly",
    type: "rss",
    verificationMethod: "Known publication with Black contributors",
    updateFrequency: "Every 2 hours",
    estimatedContent: "15+ articles/week",
  },
  {
    id: "curls",
    name: "CURLS",
    type: "rss",
    verificationMethod: "Black-owned hair brand blog",
    updateFrequency: "Daily",
    estimatedContent: "5+ articles/week",
  },
];

/**
 * TIER 2: PLATFORM APIs
 * More complex but access to huge creator bases
 */
export const apiSources: ContentSourceConfig[] = [
  {
    id: "youtube",
    name: "YouTube",
    type: "api",
    verificationMethod: "Curated channel list + community submissions",
    updateFrequency: "Every 6 hours",
    estimatedContent: "Thousands of videos from verified creators",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    type: "api",
    verificationMethod: "Curated board/creator list",
    updateFrequency: "Daily",
    estimatedContent: "Visual inspiration content",
  },
  {
    id: "spotify",
    name: "Spotify (Podcasts)",
    type: "api",
    verificationMethod: "Curated podcast list",
    updateFrequency: "Daily",
    estimatedContent: "Black podcasters and shows",
  },
];

/**
 * TIER 3: DIRECTORY PARTNERSHIPS
 * Partner with existing verified directories
 */
export const partnershipSources: ContentSourceConfig[] = [
  {
    id: "obws",
    name: "Official Black Wall Street",
    type: "partnership",
    verificationMethod: "They verify Black-owned businesses",
    updateFrequency: "Weekly sync",
    estimatedContent: "10,000+ Black-owned businesses",
  },
  {
    id: "yelp_black_owned",
    name: "Yelp Black-Owned Badge",
    type: "api",
    verificationMethod: "Yelp verification process",
    updateFrequency: "Daily",
    estimatedContent: "Restaurants, salons, services",
  },
  {
    id: "google_black_owned",
    name: "Google Black-Owned Attribute",
    type: "api",
    verificationMethod: "Google verification",
    updateFrequency: "Daily",
    estimatedContent: "Local businesses",
  },
  {
    id: "buy_from_black_woman",
    name: "Buy From A Black Woman",
    type: "partnership",
    verificationMethod: "Their verification process",
    updateFrequency: "Weekly sync",
    estimatedContent: "Black women-owned businesses",
  },
];

/**
 * TIER 4: COMMUNITY SUBMISSIONS
 * The community helps us find content we'd miss
 */
export const communitySource: ContentSourceConfig = {
  id: "community",
  name: "Community Submissions",
  type: "manual",
  verificationMethod: "Editorial review + community voting",
  updateFrequency: "Continuous",
  estimatedContent: "Unlimited - scales with community",
};
