"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const categories = [
  { id: "hair", name: "Hair" },
  { id: "beauty", name: "Beauty" },
  { id: "fashion", name: "Fashion" },
  { id: "culture", name: "Culture" },
  { id: "business", name: "Business" },
  { id: "web3", name: "Web3" },
  { id: "wellness", name: "Wellness" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-end gap-6 text-sm">
        <Link href="/about" className="text-zinc-600 hover:text-zinc-900">
          About
        </Link>
        <Link href="/creators" className="text-zinc-600 hover:text-zinc-900">
          Submit
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-20">
        {/* Logo */}
        <h1 className="text-4xl md:text-5xl font-medium text-zinc-900 mb-8 tracking-tight">
          Melanin Search
        </h1>

        {/* Search */}
        <form onSubmit={handleSearch} className="w-full max-w-xl">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full px-5 py-3 pr-12 text-base border border-zinc-300 rounded-full focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 shadow-sm hover:shadow transition-shadow"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-zinc-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/search?category=${cat.id}`}
                className="px-4 py-2 text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </form>

        {/* Tagline */}
        <p className="mt-12 text-sm text-zinc-500 max-w-md text-center">
          Search content from Black creators and Black-owned sources.
        </p>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-4 border-t border-zinc-100">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-zinc-500">
          <span>Melanin Search</span>
          <div className="flex gap-6">
            <Link href="/how-it-works" className="hover:text-zinc-700">How it works</Link>
            <Link href="/web3" className="hover:text-zinc-700">Web3</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
