"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-zinc-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-medium text-zinc-900">
            Melanin Search
          </Link>
          <nav className="flex gap-6 text-sm">
            <Link href="/" className="text-zinc-600 hover:text-zinc-900">Home</Link>
            <Link href="/how-it-works" className="text-zinc-600 hover:text-zinc-900">How it works</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-medium text-zinc-900 mb-8">About</h1>

        <div className="space-y-6 text-zinc-600 leading-relaxed">
          <p>
            Melanin Search is a search engine that prioritizes content from Black creators 
            and Black-owned sources.
          </p>

          <p>
            When you search for "hair tutorial" or "foundation for dark skin" on most search 
            engines, the top results often don&apos;t reflect Black perspectives. The content exists, 
            but it gets buried.
          </p>

          <p>
            We built this to change that. Our ranking algorithm gives more weight to content 
            from verified Black creators and Black-owned publications. The algorithm is 
            transparent—you can see exactly how results are ranked.
          </p>

          <h2 className="text-xl font-medium text-zinc-900 pt-6">How we rank content</h2>
          
          <ul className="list-disc list-inside space-y-2 text-zinc-600">
            <li><strong>Source credibility (40%)</strong> — Is the source Black-owned? Is the creator Black?</li>
            <li><strong>Content quality (25%)</strong> — Quality assessment and freshness</li>
            <li><strong>Community signals (25%)</strong> — Upvotes and saves from users</li>
            <li><strong>Relevance (10%)</strong> — How well it matches your search</li>
          </ul>

          <h2 className="text-xl font-medium text-zinc-900 pt-6">Verification</h2>
          
          <p>
            Sources are verified through editorial review, community vouching, or partnerships 
            with directories like Official Black Wall Street. Creators can also self-declare, 
            though this carries less weight until verified.
          </p>

          <h2 className="text-xl font-medium text-zinc-900 pt-6">Submit content</h2>
          
          <p>
            Know a great resource we&apos;re missing? <Link href="/creators" className="text-blue-700 hover:underline">Submit it here</Link>.
          </p>
        </div>
      </main>

      <footer className="border-t border-zinc-200 mt-12">
        <div className="max-w-3xl mx-auto px-6 py-4 text-sm text-zinc-500">
          Melanin Search
        </div>
      </footer>
    </div>
  );
}
