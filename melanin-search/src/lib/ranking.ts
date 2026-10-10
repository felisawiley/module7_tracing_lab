/**
 * Melanin Search Ranking Algorithm
 * 
 * This determines how content is scored and ranked in search results.
 * The goal: Ensure Black creators' content gets the visibility it deserves.
 */

export interface ContentSource {
  id: string;
  name: string;
  url: string;
  verificationLevel: VerificationLevel;
  isBlackOwned: boolean;
  isBlackCreated: boolean;
  communityScore: number; // 0-100, based on community engagement
  qualityScore: number; // 0-100, based on content quality signals
  establishedDate?: Date;
}

export interface SearchableContent {
  id: string;
  title: string;
  description: string;
  url: string;
  source: ContentSource;
  creator?: Creator;
  category: string;
  tags: string[];
  publishedAt: Date;
  communityUpvotes: number;
  communityFlags: number;
  viewCount: number;
  saveCount: number;
  submittedBy: "community" | "verified_creator" | "editorial" | "automated";
}

export interface Creator {
  id: string;
  name: string;
  isVerified: boolean;
  verificationLevel: VerificationLevel;
  followerCount?: number;
  contentCount: number;
  communityRating: number; // 0-5
}

export type VerificationLevel = 
  | "editorial"      // Manually verified by editorial team
  | "community"      // Verified by community votes
  | "self_declared"  // Creator self-declared
  | "automated"      // Detected via automated signals
  | "unverified";    // Not yet verified

/**
 * RANKING FACTORS
 * Each factor contributes to the final score with specific weights.
 */
export const RANKING_WEIGHTS = {
  // Source Credibility (40% of score)
  SOURCE_BLACK_OWNED: 15,           // Is the source Black-owned?
  SOURCE_BLACK_CREATED: 15,         // Is the content created by Black creators?
  SOURCE_VERIFICATION: 10,          // How verified is the source?
  
  // Content Quality (25% of score)
  CONTENT_QUALITY: 10,              // Editorial quality assessment
  CONTENT_FRESHNESS: 8,             // How recent is the content?
  CONTENT_DEPTH: 7,                 // Comprehensive vs. shallow
  
  // Community Signals (25% of score)
  COMMUNITY_UPVOTES: 10,            // Community appreciation
  COMMUNITY_SAVES: 8,               // Users saving for later
  COMMUNITY_ENGAGEMENT: 7,          // Comments, shares, etc.
  
  // Relevance (10% of score)
  QUERY_RELEVANCE: 10,              // How well it matches the search query
};

/**
 * Calculate the ranking score for a piece of content
 */
export function calculateRankingScore(
  content: SearchableContent,
  query: string,
  category?: string
): number {
  let score = 0;

  // ============================================
  // SOURCE CREDIBILITY (40%)
  // This is weighted heavily because our core mission
  // is amplifying Black voices
  // ============================================
  
  // Black-owned source bonus
  if (content.source.isBlackOwned) {
    score += RANKING_WEIGHTS.SOURCE_BLACK_OWNED;
  }
  
  // Black-created content bonus
  if (content.source.isBlackCreated) {
    score += RANKING_WEIGHTS.SOURCE_BLACK_CREATED;
  }
  
  // Verification level scoring
  score += getVerificationScore(content.source.verificationLevel) * 
           (RANKING_WEIGHTS.SOURCE_VERIFICATION / 100);

  // ============================================
  // CONTENT QUALITY (25%)
  // ============================================
  
  // Quality score from editorial/automated assessment
  score += (content.source.qualityScore / 100) * RANKING_WEIGHTS.CONTENT_QUALITY;
  
  // Freshness bonus (decay over time)
  score += getFreshnessScore(content.publishedAt) * 
           (RANKING_WEIGHTS.CONTENT_FRESHNESS / 100);
  
  // Content depth (approximated by description length for now)
  const depthScore = Math.min(content.description.length / 200, 1);
  score += depthScore * RANKING_WEIGHTS.CONTENT_DEPTH;

  // ============================================
  // COMMUNITY SIGNALS (25%)
  // The community helps surface the best content
  // ============================================
  
  // Upvotes (logarithmic to prevent gaming)
  const upvoteScore = Math.min(Math.log10(content.communityUpvotes + 1) / 3, 1);
  score += upvoteScore * RANKING_WEIGHTS.COMMUNITY_UPVOTES;
  
  // Saves indicate high-value content
  const saveScore = Math.min(Math.log10(content.saveCount + 1) / 2, 1);
  score += saveScore * RANKING_WEIGHTS.COMMUNITY_SAVES;
  
  // Overall community score from source
  score += (content.source.communityScore / 100) * RANKING_WEIGHTS.COMMUNITY_ENGAGEMENT;
  
  // Penalty for flagged content
  if (content.communityFlags > 0) {
    score -= Math.min(content.communityFlags * 2, 10);
  }

  // ============================================
  // RELEVANCE (10%)
  // ============================================
  
  const relevanceScore = calculateRelevance(content, query, category);
  score += relevanceScore * RANKING_WEIGHTS.QUERY_RELEVANCE;

  // ============================================
  // BONUS MODIFIERS
  // ============================================
  
  // Verified creator bonus
  if (content.creator?.isVerified) {
    score += 5;
  }
  
  // Editorial pick bonus (curated by team)
  if (content.submittedBy === "editorial") {
    score += 3;
  }

  return Math.round(score * 100) / 100;
}

/**
 * Get score based on verification level
 */
function getVerificationScore(level: VerificationLevel): number {
  const scores: Record<VerificationLevel, number> = {
    editorial: 100,
    community: 80,
    self_declared: 50,
    automated: 40,
    unverified: 10,
  };
  return scores[level];
}

/**
 * Calculate freshness score (content decays over time but doesn't disappear)
 */
function getFreshnessScore(publishedAt: Date): number {
  const now = new Date();
  const ageInDays = (now.getTime() - publishedAt.getTime()) / (1000 * 60 * 60 * 24);
  
  // Content less than 7 days old gets full freshness score
  if (ageInDays < 7) return 100;
  
  // Decay over 90 days, but never below 20%
  const decayedScore = 100 - (ageInDays - 7) * 0.5;
  return Math.max(decayedScore, 20);
}

/**
 * Calculate relevance to search query
 */
function calculateRelevance(
  content: SearchableContent,
  query: string,
  category?: string
): number {
  if (!query && !category) return 0.5; // Base relevance for browsing
  
  let relevance = 0;
  const lowerQuery = query.toLowerCase();
  const lowerTitle = content.title.toLowerCase();
  const lowerDesc = content.description.toLowerCase();
  
  // Title match (highest weight)
  if (lowerTitle.includes(lowerQuery)) {
    relevance += 0.5;
    // Exact match bonus
    if (lowerTitle === lowerQuery) {
      relevance += 0.2;
    }
  }
  
  // Description match
  if (lowerDesc.includes(lowerQuery)) {
    relevance += 0.2;
  }
  
  // Tag match
  const queryWords = lowerQuery.split(" ");
  const matchingTags = content.tags.filter(tag => 
    queryWords.some(word => tag.toLowerCase().includes(word))
  );
  relevance += Math.min(matchingTags.length * 0.1, 0.2);
  
  // Category match
  if (category && content.category === category) {
    relevance += 0.1;
  }
  
  return Math.min(relevance, 1);
}

/**
 * Sort content by ranking score
 */
export function rankContent(
  content: SearchableContent[],
  query: string,
  category?: string
): Array<SearchableContent & { rankingScore: number; rankingFactors: RankingFactors }> {
  return content
    .map(item => ({
      ...item,
      rankingScore: calculateRankingScore(item, query, category),
      rankingFactors: getRankingFactors(item, query, category),
    }))
    .sort((a, b) => b.rankingScore - a.rankingScore);
}

export interface RankingFactors {
  sourceCredibility: number;
  contentQuality: number;
  communitySignals: number;
  relevance: number;
  bonuses: string[];
}

/**
 * Get breakdown of ranking factors (for transparency)
 */
function getRankingFactors(
  content: SearchableContent,
  query: string,
  category?: string
): RankingFactors {
  const bonuses: string[] = [];
  
  if (content.source.isBlackOwned) bonuses.push("Black-Owned Source");
  if (content.source.isBlackCreated) bonuses.push("Black Creator");
  if (content.creator?.isVerified) bonuses.push("Verified Creator");
  if (content.submittedBy === "editorial") bonuses.push("Editorial Pick");
  
  return {
    sourceCredibility: content.source.isBlackOwned || content.source.isBlackCreated ? 85 : 40,
    contentQuality: content.source.qualityScore,
    communitySignals: content.source.communityScore,
    relevance: calculateRelevance(content, query, category) * 100,
    bonuses,
  };
}

/**
 * HOW SOURCES GET VERIFIED
 * 
 * 1. Editorial Verification (Highest Trust)
 *    - Our team manually verifies Black-owned businesses
 *    - Checks official directories (Official Black Wall Street, etc.)
 *    - Verifies creator identity and background
 * 
 * 2. Community Verification
 *    - Community members vouch for sources
 *    - Requires multiple independent verifications
 *    - Subject to periodic review
 * 
 * 3. Self-Declaration
 *    - Creators/businesses can self-identify
 *    - Lower trust until community/editorial verification
 *    - Still gets included, just with less weight
 * 
 * 4. Automated Detection
 *    - Analyze content signals
 *    - Check known Black publication databases
 *    - Machine learning on visual/textual signals
 *    - Lowest weight, used for discovery
 */

/**
 * ANTI-GAMING MEASURES
 * 
 * 1. Logarithmic scaling for engagement metrics
 *    - Prevents artificial inflation of upvotes/saves
 * 
 * 2. Community flagging system
 *    - Users can flag inappropriate/misrepresented content
 *    - Multiple flags trigger review
 * 
 * 3. Source reputation tracking
 *    - Sources that consistently produce low-quality content
 *      get lower trust scores over time
 * 
 * 4. Diversity in results
 *    - Don't let any single source dominate results
 *    - Ensure variety of creators appear
 * 
 * 5. Editorial oversight
 *    - Regular audits of top-ranking content
 *    - Manual review of flagged items
 */
