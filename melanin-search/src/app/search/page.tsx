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
  publishedAt: string;
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

const RESULTS_PER_PAGE = 10;

const allResults: SearchResult[] = [
  // HAIR
  {
    id: "1",
    title: "The Ultimate Guide to Protective Styles for Natural Hair",
    description: "From box braids to faux locs, discover protective styles that promote hair growth while keeping your crown looking gorgeous. Expert tips from licensed stylists.",
    category: "hair",
    source: "CurlPattern",
    creator: "Maya Johnson",
    url: "https://curlpattern.com/protective-styles",
    tags: ["protective styles", "natural hair", "box braids", "hair care", "3a", "3b", "3c", "4a", "4b", "4c"],
    isBlackOwned: true,
    publishedAt: "2024-10-01",
  },
  {
    id: "2",
    title: "LOC Method for Moisturized Type 4 Hair",
    description: "Learn the Liquid-Oil-Cream method for maximum moisture retention. Perfect for 4A, 4B, and 4C hair textures.",
    category: "hair",
    source: "CurlPattern",
    creator: "Destiny Williams",
    url: "https://curlpattern.com/loc-method",
    tags: ["LOC method", "4c hair", "4b hair", "4a hair", "moisture", "hair care", "type 4"],
    isBlackOwned: true,
    publishedAt: "2024-09-28",
  },
  {
    id: "3",
    title: "Wash Day Routine for Low Porosity Hair",
    description: "Low porosity hair needs special attention. Learn how to open up those cuticles for maximum moisture absorption.",
    category: "hair",
    source: "CurlPattern",
    url: "https://curlpattern.com/low-porosity",
    tags: ["low porosity", "wash day", "hair care", "natural hair", "3b", "3c", "4a", "4b", "4c"],
    isBlackOwned: true,
    publishedAt: "2024-09-25",
  },
  {
    id: "4",
    title: "Best Edge Control Products That Actually Hold",
    description: "Comprehensive review of edge control products that hold without flaking. Tested on various hair textures with humidity ratings.",
    category: "hair",
    source: "MelaninHairCare",
    url: "https://melaninhaircare.com/edge-control",
    tags: ["edges", "edge control", "hair care", "product review", "baby hairs"],
    isBlackOwned: true,
    publishedAt: "2024-09-20",
  },
  {
    id: "5",
    title: "3B Hair Care Guide: Curls That Pop",
    description: "Everything you need to know about 3B hair. Product recommendations, styling tips, and how to define those springy curls.",
    category: "hair",
    source: "CurlPattern",
    creator: "Jasmine Cole",
    url: "https://curlpattern.com/3b-hair-guide",
    tags: ["3b hair", "3b", "curly hair", "curl definition", "type 3", "curls"],
    isBlackOwned: true,
    publishedAt: "2024-10-05",
  },
  {
    id: "6",
    title: "Type 3 Hair: Understanding 3A, 3B, and 3C Curls",
    description: "The complete guide to Type 3 hair. Learn the differences between 3A, 3B, and 3C and how to care for each.",
    category: "hair",
    source: "NaturallyCurly",
    url: "https://naturallycurly.com/type-3-guide",
    tags: ["3a hair", "3b hair", "3c hair", "3a", "3b", "3c", "type 3", "curly hair", "curl pattern"],
    isBlackOwned: false,
    publishedAt: "2024-08-15",
  },
  {
    id: "7",
    title: "Best Products for 3B/3C Hair",
    description: "Tried and tested products for that 3B/3C curl pattern. Gels, creams, and leave-ins that actually work.",
    category: "hair",
    source: "MelaninHairCare",
    creator: "Tasha Roberts",
    url: "https://melaninhaircare.com/3b-3c-products",
    tags: ["3b", "3c", "3b hair", "3c hair", "product review", "curly hair", "curl cream"],
    isBlackOwned: true,
    publishedAt: "2024-09-10",
  },
  {
    id: "8",
    title: "How to Define Curls: 3A to 4C",
    description: "Curl definition techniques for every hair type. From loose waves to tight coils, get the definition you want.",
    category: "hair",
    source: "CurlPattern",
    url: "https://curlpattern.com/curl-definition",
    tags: ["curl definition", "3a", "3b", "3c", "4a", "4b", "4c", "styling", "curly hair"],
    isBlackOwned: true,
    publishedAt: "2024-09-05",
  },
  {
    id: "9",
    title: "Transitioning to Natural Hair: What to Expect",
    description: "Going natural? Here's what to expect at every stage of your transition, from big chop to fully natural.",
    category: "hair",
    source: "BlackGirlLongHair",
    url: "https://blackgirllonghair.com/transitioning",
    tags: ["transitioning", "natural hair", "big chop", "3b", "3c", "4a", "4b", "4c", "hair journey"],
    isBlackOwned: true,
    publishedAt: "2024-08-20",
  },
  {
    id: "10",
    title: "Silk Press at Home: Step by Step Guide",
    description: "Get that salon-quality silk press at home. Tools, products, and technique for sleek straight hair without damage.",
    category: "hair",
    source: "BlackHairStyle",
    creator: "Keisha Brown",
    url: "https://blackhairstyle.com/silk-press",
    tags: ["silk press", "straightening", "heat styling", "natural hair"],
    isBlackOwned: true,
    publishedAt: "2024-09-30",
  },
  {
    id: "11",
    title: "Loc Styles for Every Occasion",
    description: "From professional to party, loc styling ideas that work for any event. Updos, accessories, and more.",
    category: "hair",
    source: "LocLove Magazine",
    url: "https://loclovemag.com/loc-styles",
    tags: ["locs", "dreadlocks", "loc styles", "styling", "updos"],
    isBlackOwned: true,
    publishedAt: "2024-10-02",
  },
  {
    id: "12",
    title: "Scalp Care for Natural Hair",
    description: "Healthy hair starts with a healthy scalp. Treatments, oils, and routines for optimal scalp health.",
    category: "hair",
    source: "CurlPattern",
    url: "https://curlpattern.com/scalp-care",
    tags: ["scalp care", "natural hair", "hair growth", "oils", "treatment"],
    isBlackOwned: true,
    publishedAt: "2024-09-15",
  },
  // BEAUTY
  {
    id: "13",
    title: "Foundation Matching for Deep Skin Tones",
    description: "Find your perfect foundation match. Guide to undertones and the best brands for melanin-rich skin.",
    category: "beauty",
    source: "Cocoa Swatches",
    creator: "Nia Davis",
    url: "https://cocoaswatches.com/foundation",
    tags: ["foundation", "dark skin", "makeup", "beauty", "undertones"],
    isBlackOwned: true,
    publishedAt: "2024-09-22",
  },
  {
    id: "14",
    title: "Skincare for Hyperpigmentation",
    description: "Dermatologist-approved ingredients for fading dark spots on melanin-rich skin. What works and what to avoid.",
    category: "beauty",
    source: "MelaninGlow",
    url: "https://melaninglow.com/hyperpigmentation",
    tags: ["skincare", "dark spots", "hyperpigmentation", "beauty", "melanin"],
    isBlackOwned: true,
    publishedAt: "2024-09-18",
  },
  {
    id: "15",
    title: "Sunscreen Without White Cast",
    description: "The best sunscreens for dark skin that actually protect without leaving a white or purple cast.",
    category: "beauty",
    source: "MelaninGlow",
    url: "https://melaninglow.com/sunscreen",
    tags: ["sunscreen", "SPF", "dark skin", "beauty", "no white cast"],
    isBlackOwned: true,
    publishedAt: "2024-08-10",
  },
  {
    id: "16",
    title: "Bold Lip Colors for Dark Skin",
    description: "From deep berries to bright oranges, lip colors that pop on melanin-rich skin. Swatches included.",
    category: "beauty",
    source: "Cocoa Swatches",
    creator: "Nia Davis",
    url: "https://cocoaswatches.com/bold-lips",
    tags: ["lipstick", "dark skin", "makeup", "beauty", "bold lips"],
    isBlackOwned: true,
    publishedAt: "2024-10-03",
  },
  {
    id: "17",
    title: "Concealer for Dark Circles on Deep Skin",
    description: "Color correcting and concealing techniques for under-eye darkness. Product recommendations included.",
    category: "beauty",
    source: "Cocoa Swatches",
    url: "https://cocoaswatches.com/concealer",
    tags: ["concealer", "dark circles", "color correcting", "dark skin", "makeup"],
    isBlackOwned: true,
    publishedAt: "2024-09-12",
  },
  // FASHION
  {
    id: "18",
    title: "Black-Owned Fashion Brands to Know",
    description: "From Telfar to emerging streetwear labels. Black-owned fashion brands making waves in the industry.",
    category: "fashion",
    source: "StyleNoir",
    url: "https://stylenoir.com/brands",
    tags: ["fashion", "Black-owned", "Telfar", "streetwear", "designers"],
    isBlackOwned: true,
    publishedAt: "2024-10-01",
  },
  {
    id: "19",
    title: "How to Style Ankara",
    description: "Modern ways to wear African print in your everyday wardrobe. Office to weekend looks.",
    category: "fashion",
    source: "AfroChic",
    creator: "Amara Okonkwo",
    url: "https://afrochic.com/ankara",
    tags: ["Ankara", "African print", "fashion", "style", "African fashion"],
    isBlackOwned: true,
    publishedAt: "2024-09-25",
  },
  {
    id: "20",
    title: "Modest Fashion for Black Women",
    description: "Stylish modest fashion inspiration. Hijabi fashion, long skirts, and covered looks.",
    category: "fashion",
    source: "StyleNoir",
    url: "https://stylenoir.com/modest-fashion",
    tags: ["modest fashion", "hijab", "fashion", "style"],
    isBlackOwned: true,
    publishedAt: "2024-08-30",
  },
  // WEB3
  {
    id: "21",
    title: "Bitcoin and Black America",
    description: "How cryptocurrency can address systemic financial exclusion in Black communities. The case for crypto.",
    category: "web3",
    source: "Bitcoin & Black America",
    creator: "Isaiah Jackson",
    url: "https://bitcoinandblackamerica.com",
    tags: ["bitcoin", "crypto", "finance", "web3", "economic empowerment"],
    isBlackOwned: true,
    publishedAt: "2024-09-15",
  },
  {
    id: "22",
    title: "Getting Started with Crypto",
    description: "A beginner's guide to cryptocurrency. No jargon, just practical steps to buy your first Bitcoin.",
    category: "web3",
    source: "Black Bitcoin Billionaires",
    url: "https://blackbitcoinbillionaire.com/start",
    tags: ["crypto", "beginner", "bitcoin", "web3", "how to"],
    isBlackOwned: true,
    publishedAt: "2024-10-05",
  },
  {
    id: "23",
    title: "Black NFT Artists to Follow",
    description: "Digital artists creating amazing NFT work. Afrofuturism, portraits, abstract, and more.",
    category: "web3",
    source: "Black NFT Art",
    url: "https://blacknftart.com/artists",
    tags: ["NFT", "digital art", "artists", "web3", "Afrofuturism"],
    isBlackOwned: true,
    publishedAt: "2024-09-20",
  },
  // WELLNESS
  {
    id: "24",
    title: "Mental Health Resources for the Black Community",
    description: "Culturally competent therapists and mental health support groups. Directory and resources.",
    category: "wellness",
    source: "Therapy for Us",
    url: "https://therapyforus.com",
    tags: ["mental health", "therapy", "wellness", "support", "Black therapists"],
    isBlackOwned: true,
    publishedAt: "2024-09-28",
  },
  {
    id: "25",
    title: "Black Fitness Influencers to Follow",
    description: "Trainers and fitness creators making space for Black bodies. Workouts, motivation, and community.",
    category: "wellness",
    source: "FitMelanin",
    url: "https://fitmelanin.com/influencers",
    tags: ["fitness", "workout", "wellness", "influencers", "health"],
    isBlackOwned: true,
    publishedAt: "2024-10-02",
  },
  // CULTURE
  {
    id: "26",
    title: "The History of Juneteenth",
    description: "Understanding the significance of Juneteenth and how communities celebrate freedom today.",
    category: "culture",
    source: "BlackHistory365",
    url: "https://blackhistory365.com/juneteenth",
    tags: ["Juneteenth", "history", "culture", "freedom", "celebration"],
    isBlackOwned: true,
    publishedAt: "2024-06-19",
  },
  {
    id: "27",
    title: "Black Art Museums and Galleries",
    description: "Museums and galleries dedicated to Black art across the country. Plan your visit.",
    category: "culture",
    source: "BlackHistory365",
    url: "https://blackhistory365.com/museums",
    tags: ["art", "museums", "culture", "galleries", "Black art"],
    isBlackOwned: true,
    publishedAt: "2024-09-10",
  },
  // BUSINESS
  {
    id: "28",
    title: "Resources for Black Entrepreneurs",
    description: "Grants, accelerators, and funding opportunities specifically for Black-owned businesses.",
    category: "business",
    source: "BlackEntrepreneur",
    url: "https://blackentrepreneur.com/resources",
    tags: ["business", "entrepreneur", "grants", "funding", "Black-owned"],
    isBlackOwned: true,
    publishedAt: "2024-09-30",
  },
  {
    id: "29",
    title: "Black-Owned Banks and Credit Unions",
    description: "Financial institutions owned by and serving the Black community. Where to bank Black.",
    category: "business",
    source: "SupportBlackOwned",
    url: "https://supportblackowned.com/banks",
    tags: ["banking", "finance", "Black-owned", "credit unions"],
    isBlackOwned: true,
    publishedAt: "2024-08-25",
  },
  {
    id: "30",
    title: "How to Support Black-Owned Businesses",
    description: "Beyond buying: ways to support Black entrepreneurs through reviews, referrals, and more.",
    category: "business",
    source: "SupportBlackOwned",
    url: "https://supportblackowned.com/how-to-support",
    tags: ["support", "Black-owned", "business", "community"],
    isBlackOwned: true,
    publishedAt: "2024-09-05",
  },
];

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
    
    // Sort by date (newest first)
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
        {/* Results count */}
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
                    {result.isBlackOwned && (
                      <span className="px-1.5 py-0.5 bg-zinc-100 text-zinc-600 rounded text-xs">
                        Black-owned
                      </span>
                    )}
                    <span className="text-zinc-400">·</span>
                    <span className="text-zinc-400">{formatDate(result.publishedAt)}</span>
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

            {/* Pagination */}
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

      {/* Footer */}
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
