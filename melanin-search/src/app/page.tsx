"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const categories = [
  {
    id: "hair",
    name: "Hair",
    description: "Natural hair, locs, braids, protective styles & more",
    icon: "✨",
    gradient: "from-amber-600 to-orange-500",
  },
  {
    id: "beauty",
    name: "Beauty",
    description: "Makeup, skincare, and beauty tips for melanin-rich skin",
    icon: "💫",
    gradient: "from-rose-600 to-pink-500",
  },
  {
    id: "fashion",
    name: "Fashion",
    description: "Style inspiration from Black designers & creators",
    icon: "👑",
    gradient: "from-purple-600 to-violet-500",
  },
  {
    id: "culture",
    name: "Culture",
    description: "Art, music, history, and cultural moments",
    icon: "🌍",
    gradient: "from-emerald-600 to-teal-500",
  },
  {
    id: "business",
    name: "Business",
    description: "Black-owned businesses, entrepreneurs & resources",
    icon: "💼",
    gradient: "from-blue-600 to-indigo-500",
  },
  {
    id: "web3",
    name: "Web3 & Crypto",
    description: "NFT artists, DeFi, DAOs & Black-led crypto projects",
    icon: "⛓️",
    gradient: "from-violet-600 to-purple-500",
  },
  {
    id: "wellness",
    name: "Wellness",
    description: "Health, fitness, and mental wellness perspectives",
    icon: "🧘🏾",
    gradient: "from-cyan-600 to-sky-500",
  },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const params = new URLSearchParams({ q: query.trim() });
      if (selectedCategory) {
        params.set("category", selectedCategory);
      }
      router.push(`/search?${params.toString()}`);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/search?category=${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] bg-pattern">
      {/* Navigation */}
      <nav className="w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <span className="text-xl">✦</span>
            </div>
            <span className="text-xl font-semibold text-white font-[var(--font-playfair)]">
              Melanin<span className="text-amber-400">Search</span>
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-zinc-400 hover:text-white transition-colors text-sm">
              About
            </Link>
            <Link href="/creators" className="text-zinc-400 hover:text-white transition-colors text-sm">
              Submit Content
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center px-6 pt-16 pb-24">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-[var(--font-playfair)] leading-tight">
            <span className="text-white">Where </span>
            <span className="text-gradient">Our Voices</span>
            <span className="text-white"> Shine</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            A search experience that centers Black creators, culture, and content. 
            Because representation matters, and your work deserves to be seen.
          </p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl mb-16">
          <div className="relative search-glow rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-zinc-900/90 backdrop-blur-sm rounded-2xl border border-zinc-800 p-2">
              <div className="flex items-center gap-3">
                <div className="pl-4">
                  <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for hair inspiration, beauty tips, Black-owned businesses..."
                  className="flex-1 bg-transparent text-white placeholder-zinc-500 text-lg py-3 px-2 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold px-6 py-3 rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all duration-300"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? "bg-amber-500 text-black font-medium"
                    : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50 hover:text-white"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </form>

        {/* Categories Grid */}
        <div className="w-full max-w-6xl">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center font-[var(--font-playfair)]">
            Explore Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="card-hover group relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 text-left"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <span className="text-4xl mb-4 block">{category.icon}</span>
                  <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                  <p className="text-zinc-400 text-sm">{category.description}</p>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Why Section */}
        <section className="w-full max-w-4xl mt-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-6 font-[var(--font-playfair)]">
            Why Melanin Search?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="p-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Visibility First</h3>
              <p className="text-zinc-400 text-sm">
                Content from Black creators takes center stage, not buried under algorithms that weren&apos;t designed with us in mind.
              </p>
            </div>
            <div className="p-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Authentic Results</h3>
              <p className="text-zinc-400 text-sm">
                When you search for hair inspo, you get results that actually look like you and speak to your experience.
              </p>
            </div>
            <div className="p-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Community Powered</h3>
              <p className="text-zinc-400 text-sm">
                Built with and for the community. Submit your favorite creators and help us grow this resource together.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <span className="text-sm">✦</span>
            </div>
            <span className="text-zinc-400 text-sm">
              © 2024 Melanin Search. Made with love.
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/creators" className="hover:text-white transition-colors">For Creators</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
