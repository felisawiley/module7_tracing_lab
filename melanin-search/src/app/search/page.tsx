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
  category: string;
  imageUrl?: string;
  creator?: string;
  isBlackOwned?: boolean;
}

const mockResults: Record<string, SearchResult[]> = {
  hair: [
    {
      id: "1",
      title: "The Ultimate Guide to Protective Styles for Natural Hair",
      description: "From box braids to faux locs, discover protective styles that promote hair growth while keeping your crown looking gorgeous. Expert tips from licensed stylists.",
      url: "https://example.com/protective-styles",
      source: "NaturallyCurly",
      category: "hair",
      creator: "Maya Johnson",
      isBlackOwned: true,
    },
    {
      id: "2",
      title: "LOC Method: The Secret to Moisturized Type 4 Hair",
      description: "Learn how to properly layer your products using the Liquid-Oil-Cream method for maximum moisture retention. Perfect for 4A, 4B, and 4C hair textures.",
      url: "https://example.com/loc-method",
      source: "CurlPattern",
      category: "hair",
      creator: "Destiny Williams",
      isBlackOwned: true,
    },
    {
      id: "3",
      title: "Loc Maintenance 101: From Starter Locs to Mature",
      description: "Everything you need to know about starting and maintaining locs at every stage. Washing, retwisting, and styling tips from loc journey veterans.",
      url: "https://example.com/loc-maintenance",
      source: "LocLove Magazine",
      category: "hair",
      creator: "Marcus Thompson",
      isBlackOwned: true,
    },
    {
      id: "4",
      title: "Best Edges Products for Sleek Laid Baby Hairs",
      description: "Comprehensive review of edge control products that hold without flaking. Tested on various hair textures with humidity resistance ratings.",
      url: "https://example.com/edge-control",
      source: "MelaninHairCare",
      category: "hair",
      isBlackOwned: true,
    },
    {
      id: "5",
      title: "Silk Press vs. Keratin Treatment: What's Better for Your Hair?",
      description: "A detailed comparison of temporary and semi-permanent straightening methods, with heat protection tips and recovery routines.",
      url: "https://example.com/silk-press-guide",
      source: "BlackHairStyle",
      category: "hair",
      creator: "Keisha Brown",
      isBlackOwned: true,
    },
  ],
  beauty: [
    {
      id: "6",
      title: "Foundation Matching for Deep Skin Tones: A Complete Guide",
      description: "Find your perfect foundation match with our comprehensive guide to undertones, formulas, and the best brands for melanin-rich skin.",
      url: "https://example.com/foundation-matching",
      source: "Cocoa Swatches",
      category: "beauty",
      creator: "Nia Davis",
      isBlackOwned: true,
    },
    {
      id: "7",
      title: "Skincare Routine for Hyperpigmentation and Dark Spots",
      description: "Dermatologist-approved ingredients and routines specifically formulated for melanin-rich skin. Learn about Vitamin C, niacinamide, and more.",
      url: "https://example.com/hyperpigmentation",
      source: "MelaninGlow",
      category: "beauty",
      isBlackOwned: true,
    },
    {
      id: "8",
      title: "Bold Lip Colors That Pop on Dark Skin",
      description: "From berry tones to classic reds, discover lipstick shades that complement and enhance darker complexions beautifully.",
      url: "https://example.com/bold-lips",
      source: "Beauty by Ebony",
      category: "beauty",
      creator: "Jasmine Carter",
      isBlackOwned: true,
    },
  ],
  fashion: [
    {
      id: "9",
      title: "Black-Owned Fashion Brands You Need to Know in 2024",
      description: "From luxury designers to streetwear labels, discover Black-owned fashion brands making waves in the industry.",
      url: "https://example.com/black-fashion-brands",
      source: "StyleNoir",
      category: "fashion",
      isBlackOwned: true,
    },
    {
      id: "10",
      title: "African Print Fashion: Modern Ways to Style Ankara",
      description: "Contemporary styling tips for incorporating traditional African prints into your everyday wardrobe. From office to weekend looks.",
      url: "https://example.com/ankara-style",
      source: "AfroChic",
      category: "fashion",
      creator: "Amara Okonkwo",
      isBlackOwned: true,
    },
  ],
  culture: [
    {
      id: "11",
      title: "The History and Significance of Juneteenth",
      description: "Understanding the true meaning of Juneteenth, its historical significance, and how communities celebrate freedom today.",
      url: "https://example.com/juneteenth-history",
      source: "BlackHistory365",
      category: "culture",
      isBlackOwned: true,
    },
    {
      id: "12",
      title: "Emerging Black Artists Reshaping Contemporary Art",
      description: "Meet the artists creating groundbreaking work in painting, sculpture, digital art, and mixed media across the globe.",
      url: "https://example.com/black-artists",
      source: "ArtNoire",
      category: "culture",
      creator: "Gallery Collective",
      isBlackOwned: true,
    },
  ],
  business: [
    {
      id: "13",
      title: "Starting a Business: Resources for Black Entrepreneurs",
      description: "Grants, accelerators, and networking opportunities specifically designed to support Black-owned businesses.",
      url: "https://example.com/black-business-resources",
      source: "BlackEntrepreneur",
      category: "business",
      isBlackOwned: true,
    },
    {
      id: "14",
      title: "Black-Owned Restaurants to Support in Every Major City",
      description: "A comprehensive directory of Black-owned restaurants, cafes, and eateries across the United States.",
      url: "https://example.com/black-restaurants",
      source: "SupportBlackOwned",
      category: "business",
      isBlackOwned: true,
    },
  ],
  wellness: [
    {
      id: "15",
      title: "Mental Health Resources for the Black Community",
      description: "Culturally competent therapists, support groups, and mental health resources that understand our unique experiences.",
      url: "https://example.com/mental-health",
      source: "Therapy for Us",
      category: "wellness",
      isBlackOwned: true,
    },
    {
      id: "16",
      title: "Fitness Influencers Creating Space for Black Bodies",
      description: "Follow these trainers and fitness creators who celebrate all body types and create inclusive workout content.",
      url: "https://example.com/fitness-influencers",
      source: "FitMelanin",
      category: "wellness",
      creator: "Various",
      isBlackOwned: true,
    },
  ],
};

const categories = [
  { id: "all", name: "All", icon: "🔍" },
  { id: "hair", name: "Hair", icon: "✨" },
  { id: "beauty", name: "Beauty", icon: "💫" },
  { id: "fashion", name: "Fashion", icon: "👑" },
  { id: "culture", name: "Culture", icon: "🌍" },
  { id: "business", name: "Business", icon: "💼" },
  { id: "wellness", name: "Wellness", icon: "🧘🏾" },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "all";

  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    let filteredResults: SearchResult[] = [];

    if (selectedCategory === "all") {
      filteredResults = Object.values(mockResults).flat();
    } else {
      filteredResults = mockResults[selectedCategory] || [];
    }

    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredResults = filteredResults.filter(
        (r) =>
          r.title.toLowerCase().includes(lowerQuery) ||
          r.description.toLowerCase().includes(lowerQuery) ||
          r.category.toLowerCase().includes(lowerQuery)
      );
    }

    setResults(filteredResults);
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
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
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
        <div className="mb-6">
          <p className="text-zinc-400 text-sm">
            {results.length} results
            {query && <span> for &quot;{query}&quot;</span>}
            {selectedCategory !== "all" && (
              <span> in {categories.find((c) => c.id === selectedCategory)?.name}</span>
            )}
          </p>
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((result) => (
              <article
                key={result.id}
                className="card-hover group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-zinc-500">{result.source}</span>
                      {result.isBlackOwned && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium">
                          <span>✦</span> Black-Owned
                        </span>
                      )}
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
                    <div className="flex items-center gap-4">
                      {result.creator && (
                        <span className="text-xs text-zinc-500">
                          By {result.creator}
                        </span>
                      )}
                      <span className="text-xs text-zinc-600 capitalize">
                        {result.category}
                      </span>
                    </div>
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
