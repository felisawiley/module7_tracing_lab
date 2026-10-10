"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { searchContent } from "@/lib/data";
import { rankContent, SearchableContent, RankingFactors } from "@/lib/ranking";

interface RankedContent extends SearchableContent {
  rankingScore: number;
  rankingFactors: RankingFactors;
}

const categories = [
  { id: "all", name: "All" },
  { id: "hair", name: "Hair" },
  { id: "beauty", name: "Beauty" },
  { id: "fashion", name: "Fashion" },
  { id: "culture", name: "Culture" },
  { id: "business", name: "Business" },
  { id: "web3", name: "Web3" },
  { id: "wellness", name: "Wellness" },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "all";

  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [results, setResults] = useState<RankedContent[]>([]);

  useEffect(() => {
    const baseResults = searchContent(query, selectedCategory === "all" ? undefined : selectedCategory);
    const rankedResults = rankContent(baseResults, query, selectedCategory === "all" ? undefined : selectedCategory);
    setResults(rankedResults);
  }, [query, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    router.push(`/search?${params.toString()}`);
  };

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (catId !== "all") params.set("category", catId);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-zinc-200 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-medium text-zinc-900 shrink-0">
              Melanin Search
            </Link>

            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="w-full px-4 py-2 pr-10 text-sm border border-zinc-300 rounded-full focus:outline-none focus:border-zinc-400"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Category tabs */}
          <div className="flex gap-1 mt-3 -mb-px overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 text-sm border-b-2 transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "border-zinc-900 text-zinc-900"
                    : "border-transparent text-zinc-500 hover:text-zinc-700"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Results */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        <p className="text-sm text-zinc-500 mb-6">
          {results.length} results
          {query && <span> for <strong className="text-zinc-700">{query}</strong></span>}
        </p>

        {results.length > 0 ? (
          <div className="space-y-6">
            {results.map((result) => (
              <article key={result.id} className="group">
                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-1">
                  <span>{result.source.name}</span>
                  {result.source.isBlackOwned && (
                    <span className="px-1.5 py-0.5 bg-zinc-100 text-zinc-600 rounded text-xs">
                      Black-owned
                    </span>
                  )}
                </div>
                <a
                  href={result.url}
                  className="block group-hover:underline"
                >
                  <h2 className="text-lg text-blue-700 mb-1">
                    {result.title}
                  </h2>
                </a>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {result.description.length > 200 
                    ? result.description.slice(0, 200) + "..." 
                    : result.description}
                </p>
                {result.creator && (
                  <p className="text-xs text-zinc-400 mt-2">
                    By {result.creator.name}
                  </p>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-500">No results found</p>
            <p className="text-sm text-zinc-400 mt-1">Try a different search or category</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-zinc-400">Loading...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
