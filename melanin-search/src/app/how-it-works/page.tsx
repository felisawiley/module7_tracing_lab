"use client";

import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] bg-pattern">
      {/* Navigation */}
      <nav className="w-full px-6 py-4 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <span className="text-sm">✦</span>
            </div>
            <span className="text-lg font-semibold text-white font-[var(--font-playfair)]">
              Melanin<span className="text-amber-400">Search</span>
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors text-sm">
              Home
            </Link>
            <Link href="/about" className="text-zinc-400 hover:text-white transition-colors text-sm">
              About
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-[var(--font-playfair)]">
            How Our <span className="text-gradient">Ranking</span> Works
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Transparency matters. Here&apos;s exactly how we decide what content shows first.
          </p>
        </div>

        {/* The Problem */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-4 font-[var(--font-playfair)]">
            Why We Need a Different Approach
          </h2>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <p className="text-zinc-400 leading-relaxed">
              Mainstream search engines optimize for engagement and ad revenue. Their algorithms 
              weren&apos;t designed with representation in mind. When you search for &quot;hair tutorial&quot; 
              or &quot;foundation for my skin tone,&quot; the results often don&apos;t reflect the diversity 
              of who&apos;s actually searching.
            </p>
            <p className="text-zinc-400 leading-relaxed mt-4">
              <strong className="text-white">Our approach is different.</strong> We explicitly prioritize 
              content from Black creators and Black-owned sources. This isn&apos;t a bug—it&apos;s the 
              entire point.
            </p>
          </div>
        </section>

        {/* Ranking Factors */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6 font-[var(--font-playfair)]">
            Ranking Factors
          </h2>
          
          <div className="space-y-6">
            {/* Source Credibility */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <span className="text-2xl">✦</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Source Credibility</h3>
                  <span className="text-amber-400 text-sm font-medium">40% of ranking score</span>
                </div>
              </div>
              <p className="text-zinc-400 mb-4">
                This is our most heavily weighted factor because it&apos;s core to our mission.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-amber-500 text-xs">15%</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Black-Owned Source</span>
                    <p className="text-zinc-500 text-sm">Is the publication or website Black-owned?</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-amber-500 text-xs">15%</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Black Creator</span>
                    <p className="text-zinc-500 text-sm">Is the content created by a Black creator?</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-amber-500 text-xs">10%</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Verification Level</span>
                    <p className="text-zinc-500 text-sm">How has the source been verified? (Editorial, Community, Self-declared)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Quality */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center">
                  <span className="text-2xl">💎</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Content Quality</h3>
                  <span className="text-rose-400 text-sm font-medium">25% of ranking score</span>
                </div>
              </div>
              <p className="text-zinc-400 mb-4">
                We want to surface the best content, not just any content.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-rose-500 text-xs">10%</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Quality Assessment</span>
                    <p className="text-zinc-500 text-sm">Editorial and automated quality signals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-rose-500 text-xs">8%</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Freshness</span>
                    <p className="text-zinc-500 text-sm">Recent content gets a boost, but evergreen content stays relevant</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-rose-500 text-xs">7%</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Content Depth</span>
                    <p className="text-zinc-500 text-sm">Comprehensive guides rank higher than shallow listicles</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Signals */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Community Signals</h3>
                  <span className="text-purple-400 text-sm font-medium">25% of ranking score</span>
                </div>
              </div>
              <p className="text-zinc-400 mb-4">
                The community helps surface the best content through engagement.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-purple-500 text-xs">10%</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Upvotes</span>
                    <p className="text-zinc-500 text-sm">Community appreciation (logarithmic to prevent gaming)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-purple-500 text-xs">8%</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Saves</span>
                    <p className="text-zinc-500 text-sm">When users save content for later, it signals high value</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-purple-500 text-xs">7%</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Source Reputation</span>
                    <p className="text-zinc-500 text-sm">How the community rates this source overall</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Relevance */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Query Relevance</h3>
                  <span className="text-emerald-400 text-sm font-medium">10% of ranking score</span>
                </div>
              </div>
              <p className="text-zinc-400 mb-4">
                How well does the content match what you&apos;re searching for?
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-emerald-500 text-xs">✓</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Title Match</span>
                    <p className="text-zinc-500 text-sm">Content with your search terms in the title ranks higher</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-emerald-500 text-xs">✓</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Tag & Category Match</span>
                    <p className="text-zinc-500 text-sm">Content tagged with relevant topics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Verification Process */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6 font-[var(--font-playfair)]">
            How Sources Get Verified
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full">
                  Highest Trust
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Editorial Verification</h3>
              <p className="text-zinc-400 text-sm">
                Our team manually verifies Black-owned businesses and creators using official 
                directories, public records, and direct outreach.
              </p>
            </div>
            
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs font-medium rounded-full">
                  High Trust
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Community Verification</h3>
              <p className="text-zinc-400 text-sm">
                Multiple community members vouch for a source. Subject to periodic review 
                and can be escalated to editorial verification.
              </p>
            </div>
            
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full">
                  Medium Trust
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Self-Declaration</h3>
              <p className="text-zinc-400 text-sm">
                Creators and businesses can self-identify. They&apos;re included but with lower 
                weight until community or editorial verification.
              </p>
            </div>
            
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-zinc-500/20 text-zinc-400 text-xs font-medium rounded-full">
                  Discovery
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Automated Detection</h3>
              <p className="text-zinc-400 text-sm">
                We analyze content signals and check known databases. This is used for 
                discovery and gets lowest weight until verified.
              </p>
            </div>
          </div>
        </section>

        {/* Anti-Gaming */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6 font-[var(--font-playfair)]">
            Preventing Gaming & Abuse
          </h2>
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-1">•</span>
                <div>
                  <span className="text-white font-medium">Logarithmic Scaling</span>
                  <p className="text-zinc-400 text-sm">
                    Engagement metrics use logarithmic scaling. Going from 100 to 1000 upvotes 
                    helps more than going from 10,000 to 100,000.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-1">•</span>
                <div>
                  <span className="text-white font-medium">Community Flagging</span>
                  <p className="text-zinc-400 text-sm">
                    Users can flag inappropriate or misrepresented content. Multiple flags 
                    trigger manual review.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-1">•</span>
                <div>
                  <span className="text-white font-medium">Source Reputation Tracking</span>
                  <p className="text-zinc-400 text-sm">
                    Sources that consistently produce low-quality content see their trust 
                    scores decrease over time.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-1">•</span>
                <div>
                  <span className="text-white font-medium">Diversity in Results</span>
                  <p className="text-zinc-400 text-sm">
                    We prevent any single source from dominating results to ensure variety.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 mt-1">•</span>
                <div>
                  <span className="text-white font-medium">Editorial Oversight</span>
                  <p className="text-zinc-400 text-sm">
                    Regular audits of top-ranking content and manual review of flagged items.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4 font-[var(--font-playfair)]">
              See It In Action
            </h2>
            <p className="text-zinc-400 mb-6">
              Search for something and click &quot;Show Ranking Details&quot; to see how results are scored.
            </p>
            <Link
              href="/search?category=hair&showRanking=true"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 text-black font-medium px-6 py-3 rounded-xl hover:bg-amber-400 transition-colors"
            >
              Try a Search
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-6 mt-16">
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
            <Link href="/creators" className="hover:text-white transition-colors">For Creators</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
