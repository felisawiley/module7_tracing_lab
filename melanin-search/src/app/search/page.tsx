"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  creator?: string;
  category: string;
  tags: string[];
  isBlackOwned: boolean;
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

const allResults: SearchResult[] = [
  {
    id: "1",
    title: "The Ultimate Guide to Protective Styles for Natural Hair",
    description: "From box braids to faux locs, discover protective styles that promote hair growth while keeping your crown looking gorgeous.",
    category: "hair",
    source: "CurlPattern",
    creator: "Maya Johnson",
    url: "https://curlpattern.com/protective-styles",
    tags: ["protective styles", "natural hair", "box braids", "hair care"],
    isBlackOwned: true,
  },
  {
    id: "2",
    title: "LOC Method for Moisturized Type 4 Hair",
    description: "Learn the Liquid-Oil-Cream method for maximum moisture retention. Perfect for 4A, 4B, and 4C hair textures.",
    category: "hair",
    source: "CurlPattern",
    creator: "Destiny Williams",
    url: "https://curlpattern.com/loc-method",
    tags: ["LOC method", "4c hair", "moisture", "hair care"],
    isBlackOwned: true,
  },
  {
    id: "3",
    title: "Wash Day Routine for Low Porosity Hair",
    description: "Low porosity hair needs special attention. Learn how to open up those cuticles for maximum moisture absorption.",
    category: "hair",
    source: "CurlPattern",
    url: "https://curlpattern.com/low-porosity",
    tags: ["low porosity", "wash day", "hair care", "natural hair"],
    isBlackOwned: true,
  },
  {
    id: "4",
    title: "Best Edge Control Products That Actually Hold",
    description: "Comprehensive review of edge control products that hold without flaking. Tested on various hair textures.",
    category: "hair",
    source: "MelaninHairCare",
    url: "https://melaninhaircare.com/edge-control",
    tags: ["edges", "edge control", "hair care", "product review"],
    isBlackOwned: true,
  },
  {
    id: "5",
    title: "Foundation Matching for Deep Skin Tones",
    description: "Find your perfect foundation match. Guide to undertones and the best brands for melanin-rich skin.",
    category: "beauty",
    source: "Cocoa Swatches",
    creator: "Nia Davis",
    url: "https://cocoaswatches.com/foundation",
    tags: ["foundation", "dark skin", "makeup", "beauty"],
    isBlackOwned: true,
  },
  {
    id: "6",
    title: "Skincare for Hyperpigmentation",
    description: "Dermatologist-approved ingredients for fading dark spots on melanin-rich skin.",
    category: "beauty",
    source: "MelaninGlow",
    url: "https://melaninglow.com/hyperpigmentation",
    tags: ["skincare", "dark spots", "hyperpigmentation", "beauty"],
    isBlackOwned: true,
  },
  {
    id: "7",
    title: "Sunscreen Without White Cast",
    description: "The best sunscreens for dark skin that actually protect without leaving a white cast.",
    category: "beauty",
    source: "MelaninGlow",
    url: "https://melaninglow.com/sunscreen",
    tags: ["sunscreen", "SPF", "dark skin", "beauty"],
    isBlackOwned: true,
  },
  {
    id: "8",
    title: "Black-Owned Fashion Brands to Know",
    description: "From Telfar to emerging streetwear labels. Black-owned fashion brands making waves.",
    category: "fashion",
    source: "StyleNoir",
    url: "https://stylenoir.com/brands",
    tags: ["fashion", "Black-owned", "Telfar", "streetwear"],
    isBlackOwned: true,
  },
  {
    id: "9",
    title: "How to Style Ankara",
    description: "Modern ways to wear African print in your everyday wardrobe.",
    category: "fashion",
    source: "AfroChic",
    creator: "Amara Okonkwo",
    url: "https://afrochic.com/ankara",
    tags: ["Ankara", "African print", "fashion", "style"],
    isBlackOwned: true,
  },
  {
    id: "10",
    title: "Bitcoin and Black America",
    description: "How cryptocurrency can address systemic financial exclusion in Black communities.",
    category: "web3",
    source: "Bitcoin & Black America",
    creator: "Isaiah Jackson",
    url: "https://bitcoinandblackamerica.com",
    tags: ["bitcoin", "crypto", "finance", "web3"],
    isBlackOwned: true,
  },
  {
    id: "11",
    title: "Getting Started with Crypto",
    description: "A beginner's guide to cryptocurrency. No jargon, just practical steps.",
    category: "web3",
    source: "Black Bitcoin Billionaires",
    url: "https://blackbitcoinbillionaire.com/start",
    tags: ["crypto", "beginner", "bitcoin", "web3"],
    isBlackOwned: true,
  },
  {
    id: "12",
    title: "Mental Health Resources for the Black Community",
    description: "Culturally competent therapists and mental health support groups.",
    category: "wellness",
    source: "Therapy for Us",
    url: "https://therapyforus.com",
    tags: ["mental health", "therapy", "wellness", "support"],
    isBlackOwned: true,
  },
  {
    id: "13",
    title: "The History of Juneteenth",
    description: "Understanding the significance of Juneteenth and how communities celebrate.",
    category: "culture",
    source: "BlackHistory365",
    url: "https://blackhistory365.com/juneteenth",
    tags: ["Juneteenth", "history", "culture", "freedom"],
    isBlackOwned: true,
  },
  {
    id: "14",
    title: "Resources for Black Entrepreneurs",
    description: "Grants, accelerators, and funding opportunities for Black-owned businesses.",
    category: "business",
    source: "BlackEntrepreneur",
    url: "https://blackentrepreneur.com/resources",
    tags: ["business", "entrepreneur", "grants", "funding"],
    isBlackOwned: true,
  },
];

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "all";
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    setSearchQuery(query);
    setSelectedCategory(category);
  }, [query, category]);

  useEffect(() => {
    let filtered = allResults;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(r => r.category === selectedCategory);
    }
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    
    setResults(filtered);
  }, [searchQuery, selectedCategory]);

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
          {results.length} results
          {searchQuery && <span> for <strong className="text-zinc-700">{searchQuery}</strong></span>}
        </p>

        {results.length > 0 ? (
          <div className="space-y-6">
            {results.map((result) => (
              <article key={result.id}>
                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-1">
                  <span>{result.source}</span>
                  {result.isBlackOwned && (
                    <span className="px-1.5 py-0.5 bg-zinc-100 text-zinc-600 rounded text-xs">
                      Black-owned
                    </span>
                  )}
                </div>
                <a href={result.url} className="block hover:underline">
                  <h2 className="text-lg text-blue-700 mb-1">{result.title}</h2>
                </a>
                <p className="text-sm text-zinc-600">{result.description}</p>
                {result.creator && (
                  <p className="text-xs text-zinc-400 mt-2">By {result.creator}</p>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-500">No results found</p>
          </div>
        )}
      </main>
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
