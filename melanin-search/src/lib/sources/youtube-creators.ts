/**
 * YOUTUBE BLACK CREATOR INDEX
 * 
 * Strategy: Maintain a curated list of verified Black YouTubers,
 * then use the YouTube Data API to fetch their latest content.
 * 
 * This is MORE reliable than trying to auto-detect because:
 * 1. Creators self-identify when they join our list
 * 2. Community can submit creators
 * 3. We verify before adding to the index
 */

export interface YouTubeCreator {
  channelId: string;
  channelName: string;
  category: string[];
  verificationStatus: "verified" | "pending" | "community";
  subscriberTier: "micro" | "mid" | "macro" | "mega"; // Helps with discovery
  tags: string[];
}

/**
 * SEED LIST: Popular Black YouTubers by Category
 * This is a starting point - grows via community submissions
 */
export const seedCreators: YouTubeCreator[] = [
  // HAIR & BEAUTY
  {
    channelId: "UC placeholder", // Real channel IDs would go here
    channelName: "Naptural85",
    category: ["hair"],
    verificationStatus: "verified",
    subscriberTier: "mega",
    tags: ["natural hair", "4c hair", "hair tutorials", "product reviews"],
  },
  {
    channelId: "UC placeholder",
    channelName: "Green Beauty",
    category: ["hair", "beauty"],
    verificationStatus: "verified",
    subscriberTier: "macro",
    tags: ["natural hair", "skincare", "lifestyle"],
  },
  {
    channelId: "UC placeholder",
    channelName: "Whitney White (Naptural85)",
    category: ["hair"],
    verificationStatus: "verified",
    subscriberTier: "mega",
    tags: ["natural hair", "hair growth", "protective styles"],
  },
  {
    channelId: "UC placeholder",
    channelName: "Chizi Duru",
    category: ["hair", "beauty"],
    verificationStatus: "verified",
    subscriberTier: "macro",
    tags: ["natural hair", "4c hair", "wash day"],
  },
  {
    channelId: "UC placeholder",
    channelName: "Ambrosia Malbrough",
    category: ["beauty"],
    verificationStatus: "verified",
    subscriberTier: "macro",
    tags: ["makeup", "dark skin", "beauty"],
  },
  {
    channelId: "UC placeholder",
    channelName: "Jackie Aina",
    category: ["beauty"],
    verificationStatus: "verified",
    subscriberTier: "mega",
    tags: ["makeup", "beauty", "lifestyle", "dark skin beauty"],
  },
  {
    channelId: "UC placeholder",
    channelName: "Nyma Tang",
    category: ["beauty"],
    verificationStatus: "verified",
    subscriberTier: "mega",
    tags: ["dark skin", "foundation", "swatches", "the darkest shade"],
  },
  
  // FASHION
  {
    channelId: "UC placeholder",
    channelName: "Lydia Okello",
    category: ["fashion"],
    verificationStatus: "verified",
    subscriberTier: "mid",
    tags: ["plus size fashion", "style", "thrift"],
  },
  {
    channelId: "UC placeholder",
    channelName: "Patricia Bright",
    category: ["fashion", "business"],
    verificationStatus: "verified",
    subscriberTier: "mega",
    tags: ["fashion", "lifestyle", "finance"],
  },
  
  // WELLNESS & LIFESTYLE
  {
    channelId: "UC placeholder",
    channelName: "Therapy for Black Girls (Podcast)",
    category: ["wellness"],
    verificationStatus: "verified",
    subscriberTier: "macro",
    tags: ["mental health", "therapy", "wellness"],
  },
  
  // BUSINESS & TECH
  {
    channelId: "UC placeholder",
    channelName: "Tiffany Aliche (The Budgetnista)",
    category: ["business"],
    verificationStatus: "verified",
    subscriberTier: "macro",
    tags: ["finance", "budgeting", "wealth building"],
  },
];

/**
 * Fetch latest videos from a creator
 * Uses YouTube Data API v3
 */
export async function fetchCreatorVideos(
  channelId: string,
  apiKey: string,
  maxResults: number = 10
): Promise<YouTubeVideo[]> {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=${maxResults}&type=video`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  return data.items.map((item: YouTubeAPIResponse) => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnailUrl: item.snippet.thumbnails.high.url,
    publishedAt: new Date(item.snippet.publishedAt),
    channelId: item.snippet.channelId,
    channelTitle: item.snippet.channelTitle,
  }));
}

interface YouTubeVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: Date;
  channelId: string;
  channelTitle: string;
}

interface YouTubeAPIResponse {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: { high: { url: string } };
    publishedAt: string;
    channelId: string;
    channelTitle: string;
  };
}

/**
 * GROWTH STRATEGY: How the creator list grows
 * 
 * 1. Seed with known creators (what we have above)
 * 2. Community submissions via /creators page
 * 3. Creators can self-register
 * 4. "Suggested creators" from existing verified creators
 * 5. Collaborations mentioned in videos
 * 
 * Verification process:
 * - Self-declaration (lowest tier)
 * - Community vouching (medium tier)  
 * - Editorial verification (highest tier)
 */
