"use client";

import Link from "next/link";

export default function HowItWorksPage() {
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
            <Link href="/about" className="text-zinc-600 hover:text-zinc-900">About</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-medium text-zinc-900 mb-8">How ranking works</h1>

        <div className="space-y-8 text-zinc-600 leading-relaxed">
          <p>
            Our ranking algorithm is designed to surface content from Black creators. 
            Here&apos;s exactly how it works.
          </p>

          {/* Ranking Factors */}
          <section>
            <h2 className="text-lg font-medium text-zinc-900 mb-4">Ranking factors</h2>
            
            <div className="space-y-4">
              <div className="border border-zinc-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-zinc-900">Source credibility</h3>
                  <span className="text-sm text-zinc-500">40%</span>
                </div>
                <ul className="text-sm space-y-1">
                  <li>Is the source Black-owned? (+15%)</li>
                  <li>Is the creator Black? (+15%)</li>
                  <li>Verification level (+10%)</li>
                </ul>
              </div>

              <div className="border border-zinc-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-zinc-900">Content quality</h3>
                  <span className="text-sm text-zinc-500">25%</span>
                </div>
                <ul className="text-sm space-y-1">
                  <li>Quality score from editorial review</li>
                  <li>Freshness (newer content ranks higher)</li>
                  <li>Content depth</li>
                </ul>
              </div>

              <div className="border border-zinc-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-zinc-900">Community signals</h3>
                  <span className="text-sm text-zinc-500">25%</span>
                </div>
                <ul className="text-sm space-y-1">
                  <li>Upvotes (logarithmic scaling)</li>
                  <li>Saves</li>
                  <li>Source reputation</li>
                </ul>
              </div>

              <div className="border border-zinc-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-zinc-900">Query relevance</h3>
                  <span className="text-sm text-zinc-500">10%</span>
                </div>
                <ul className="text-sm space-y-1">
                  <li>Title match</li>
                  <li>Tag and category match</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Verification */}
          <section>
            <h2 className="text-lg font-medium text-zinc-900 mb-4">Verification levels</h2>
            
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200">
                  <th className="text-left py-2 font-medium text-zinc-900">Level</th>
                  <th className="text-left py-2 font-medium text-zinc-900">How it works</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr>
                  <td className="py-2 text-zinc-900">Partner verified</td>
                  <td className="py-2">Verified by partner directories (OBWS, etc.)</td>
                </tr>
                <tr>
                  <td className="py-2 text-zinc-900">Editorial verified</td>
                  <td className="py-2">Manually verified by our team</td>
                </tr>
                <tr>
                  <td className="py-2 text-zinc-900">Community verified</td>
                  <td className="py-2">Vouched for by 10+ community members</td>
                </tr>
                <tr>
                  <td className="py-2 text-zinc-900">Self-declared</td>
                  <td className="py-2">Creator self-identified (lower weight)</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Anti-gaming */}
          <section>
            <h2 className="text-lg font-medium text-zinc-900 mb-4">Preventing manipulation</h2>
            
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Upvotes use logarithmic scaling (1000 upvotes isn&apos;t 10x better than 100)</li>
              <li>Flagged content is reviewed and can be removed</li>
              <li>No single source can dominate results</li>
              <li>Regular audits of top-ranking content</li>
            </ul>
          </section>
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
