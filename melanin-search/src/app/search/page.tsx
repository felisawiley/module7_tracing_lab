"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { searchContent, SearchResult } from "@/lib/content-data";

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

const RESULTS_PER_PAGE = 10;

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "all";
  const pageParam = searchParams.get("page") || "1";
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [currentPage, setCurrentPage] = useState(parseInt(pageParam));
  const [searchTime, setSearchTime] = useState(0);

  useEffect(() => {
    setSearchQuery(query);
    setSelectedCategory(category);
    setCurrentPage(parseInt(pageParam));
  }, [query, category, pageParam]);

  useEffect(() => {
    const startTime = performance.now();
    
    let filtered = searchContent;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(r => r.category === selectedCategory);
    }
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q)) ||
        r.source.toLowerCase().includes(q) ||
        (r.creator && r.creator.toLowerCase().includes(q))
      );
    }
    
    filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    setResults(filtered);
    setSearchTime(Math.round((performance.now() - startTime) * 100) / 100);
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(results.length / RESULTS_PER_PAGE);
  const paginatedResults = results.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    router.push(`/search?${params.toString()}`);
  };

  const handleCategoryChange = (catId: string) => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (catId !== "all") params.set("category", catId);
    router.push(`/search?${params.toString()}`);
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (page > 1) params.set("page", page.toString());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white">
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

      <main className="max-w-3xl mx-auto px-4 py-6">
        <p className="text-sm text-zinc-500 mb-6">
          About {results.length} results
          {searchQuery && <span> for <strong className="text-zinc-700">{searchQuery}</strong></span>}
          <span className="text-zinc-400"> ({searchTime} ms)</span>
        </p>

        {paginatedResults.length > 0 ? (
          <>
            <div className="space-y-6">
              {paginatedResults.map((result) => (
                <article key={result.id}>
                  <div className="flex items-center gap-2 text-sm text-zinc-500 mb-1">
                    <span>{result.source}</span>
                    {result.creator && (
                      <>
                        <span className="text-zinc-300">·</span>
                        <span>{result.creator}</span>
                      </>
                    )}
                    {result.isBlackOwned && (
                      <span className="px-1.5 py-0.5 bg-zinc-100 text-zinc-600 rounded text-xs">
                        Black-owned
                      </span>
                    )}
                    <span className="text-zinc-300">·</span>
                    <span className="text-zinc-400">{formatDate(result.publishedAt)}</span>
                  </div>
                  <a href={result.url} className="block hover:underline">
                    <h2 className="text-lg text-blue-700 mb-1">{result.title}</h2>
                  </a>
                  <p className="text-sm text-zinc-600">{result.description}</p>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="flex items-center justify-center gap-2 mt-10 pt-6 border-t border-zinc-100">
                {currentPage > 1 && (
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    className="px-4 py-2 text-sm text-blue-700 hover:underline"
                  >
                    Previous
                  </button>
                )}
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-10 h-10 text-sm rounded-full ${
                        page === currentPage
                          ? "bg-blue-700 text-white"
                          : "text-blue-700 hover:bg-zinc-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {currentPage < totalPages && (
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    className="px-4 py-2 text-sm text-blue-700 hover:underline"
                  >
                    Next
                  </button>
                )}
              </nav>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-500">No results found</p>
            <p className="text-sm text-zinc-400 mt-1">Try different keywords or browse a category</p>
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-100 mt-8">
        <div className="max-w-3xl mx-auto px-4 py-4 text-center text-sm text-zinc-400">
          Melanin Search
        </div>
      </footer>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white p-6">Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}
