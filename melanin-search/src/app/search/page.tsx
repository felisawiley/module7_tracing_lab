"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { searchContent, contentDatabase } from "@/lib/data";
import { rankContent, SearchableContent, RankingFactors } from "@/lib/ranking";

interface RankedContent extends SearchableContent {
  rankingScore: number;
  rankingFactors: RankingFactors;
}

const categories = [
  { id: "all", name: "All", icon: "🔍" },
  { id: "hair", name: "Hair", icon: "✨" },
  { id: "beauty", name: "Beauty", icon: "💫" },
  { id: "fashion", name: "Fashion", icon: "👑" },
  { id: "culture", name: "Culture", icon: "🌍" },
  { id: "business", name: "Business", icon: "💼" },
  { id: "web3", name: "Web3", icon: "⛓️" },
  { id: "wellness", name: "Wellness", icon: "🧘🏾" },
];

function RankingBadge({ factors }: { factors: RankingFactors }) {
  return (
    <div className="flex flex-wrap gap-1">
      {factors.bonuses.map((bonus, idx) => (
        <span
          key={idx}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium"
        >
          <span>✦</span> {bonus}
        </span>
      ))}
    </div>
  );
}

function RankingDetails({ score, factors }: { score: number; factors: RankingFactors }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs text-zinc-500 hover:text-zinc-400 flex items-center gap-1"
      >
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        Why this ranked #{Math.round(score)}
      </button>
      
      {isOpen && (
        <div className="mt-3 p-4 bg-zinc-800/50 rounded-xl text-xs space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-zinc-400 mb-1">Source Credibility</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${factors.sourceCredibility}%` }}
                  />
                </div>
                <span className="text-zinc-300">{factors.sourceCredibility}%</span>
              </div>
            </div>
            <div>
              <div className="text-zinc-400 mb-1">Content Quality</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-500 rounded-full"
                    style={{ width: `${factors.contentQuality}%` }}
                  />
                </div>
                <span className="text-zinc-300">{factors.contentQuality}%</span>
              </div>
            </div>
            <div>
              <div className="text-zinc-400 mb-1">Community Signals</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${factors.communitySignals}%` }}
                  />
                </div>
                <span className="text-zinc-300">{factors.communitySignals}%</span>
              </div>
            </div>
            <div>
              <div className="text-zinc-400 mb-1">Query Relevance</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${factors.relevance}%` }}
                  />
                </div>
                <span className="text-zinc-300">{Math.round(factors.relevance)}%</span>
              </div>
            </div>
          </div>
          <div className="text-zinc-400 pt-2 border-t border-zinc-700">
            <strong className="text-zinc-300">How ranking works:</strong> Content from Black-owned sources 
            and verified Black creators gets prioritized. We also factor in content quality, 
            community engagement (upvotes, saves), and how relevant the content is to your search.
          </div>
        </div>
      )}
    </div>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "all";
  const showRanking = searchParams.get("showRanking") === "true";

  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [results, setResults] = useState<RankedContent[]>([]);
  const [showRankingDetails, setShowRankingDetails] = useState(showRanking);

  useEffect(() => {
    // Get base results
    const baseResults = searchContent(query, selectedCategory === "all" ? undefined : selectedCategory);
    
    // Rank them using our algorithm
    const rankedResults = rankContent(baseResults, query, selectedCategory === "all" ? undefined : selectedCategory);
    
    setResults(rankedResults);
  }, [query, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (showRankingDetails) params.set("showRanking", "true");
    router.push(`/search?${params.toString()}`);
  };

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (catId !== "all") params.set("category", catId);
    if (showRankingDetails) params.set("showRanking", "true");
    router.push(`/search?${params.toString()}`);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] bg-pattern">
      {/* Navigation */}
      <nav className="w-full px-6 py-4 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <span className="text-sm">✦</span>
            </div>
            <span className="text-lg font-semibold text-white font-[var(--font-playfair)]">
              Melanin<span className="text-amber-400">Search</span>
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <div className="flex items-center bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                <div className="pl-4">
                  <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 bg-transparent text-white placeholder-zinc-500 text-sm py-3 px-3 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-amber-500 text-black font-medium px-4 py-2 m-1 rounded-lg text-sm hover:bg-amber-400 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          <Link
            href="/how-it-works"
            className="text-zinc-400 hover:text-white text-sm whitespace-nowrap"
          >
            How Ranking Works
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-amber-500 text-black font-medium"
                  : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50 hover:text-white"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-zinc-400 text-sm">
            {results.length} results
            {query && <span> for &quot;{query}&quot;</span>}
            {selectedCategory !== "all" && (
              <span> in {categories.find((c) => c.id === selectedCategory)?.name}</span>
            )}
          </p>
          <button
            onClick={() => setShowRankingDetails(!showRankingDetails)}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
              showRankingDetails
                ? "bg-amber-500/20 text-amber-400"
                : "bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            {showRankingDetails ? "Hide" : "Show"} Ranking Details
          </button>
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((result, index) => (
              <article
                key={result.id}
                className="card-hover group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700"
              >
                <div className="flex items-start gap-4">
                  {/* Rank Number */}
                  <div className="shrink-0 w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 text-sm font-medium">
                    {index + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs text-zinc-500">{result.source.name}</span>
                      <RankingBadge factors={result.rankingFactors} />
                    </div>
                    
                    <a
                      href={result.url}
                      className="block group-hover:text-amber-400 transition-colors"
                    >
                      <h2 className="text-lg font-semibold text-white mb-2">
                        {result.title}
                      </h2>
                    </a>
                    
                    <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                      {result.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      {result.creator && (
                        <span className="flex items-center gap-1">
                          {result.creator.isVerified && (
                            <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                          By {result.creator.name}
                        </span>
                      )}
                      <span>•</span>
                      <span>{formatNumber(result.communityUpvotes)} upvotes</span>
                      <span>•</span>
                      <span>{formatNumber(result.saveCount)} saves</span>
                    </div>

                    {showRankingDetails && (
                      <RankingDetails score={result.rankingScore} factors={result.rankingFactors} />
                    )}
                  </div>

                  <div className="shrink-0">
                    <a
                      href={result.url}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 text-zinc-400 hover:bg-amber-500 hover:text-black transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
            <p className="text-zinc-400">
              Try adjusting your search or browse a different category
            </p>
          </div>
        )}

        {/* Contribute CTA */}
        <div className="mt-12 bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">
            Know a great resource we&apos;re missing?
          </h3>
          <p className="text-zinc-400 mb-4">
            Help us grow this directory by submitting Black creators and content.
          </p>
          <Link
            href="/creators"
            className="inline-flex items-center gap-2 bg-amber-500 text-black font-medium px-6 py-3 rounded-xl hover:bg-amber-400 transition-colors"
          >
            Submit Content
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500"></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
