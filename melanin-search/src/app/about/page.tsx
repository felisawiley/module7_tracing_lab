"use client";

import Link from "next/link";

export default function AboutPage() {
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
            <Link href="/creators" className="text-zinc-400 hover:text-white transition-colors text-sm">
              Submit Content
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-[var(--font-playfair)]">
            About <span className="text-gradient">Melanin Search</span>
          </h1>
          <p className="text-xl text-zinc-400">
            A search experience built for us, by us.
          </p>
        </div>

        {/* The Problem */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-4 font-[var(--font-playfair)]">
            The Problem We&apos;re Solving
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              When you search for &quot;hair inspiration&quot; on most search engines, whose hair do you see? 
              When you look for beauty tips, whose faces appear? The answer, too often, doesn&apos;t reflect 
              the beautiful diversity of our community.
            </p>
            <p>
              Black creators pour their hearts into amazing content — tutorials, guides, inspiration, 
              and resources — but this work gets buried under algorithms that weren&apos;t designed 
              with us in mind. Our voices exist, but they&apos;re not being amplified.
            </p>
            <p>
              This isn&apos;t about exclusivity. It&apos;s about <span className="text-white font-medium">visibility</span>. 
              It&apos;s about creating a space where our work can shine.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-4 font-[var(--font-playfair)]">
            Our Mission
          </h2>
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-8">
            <p className="text-lg text-zinc-300 italic leading-relaxed">
              &quot;To create a search experience that centers Black creators, culture, and content — 
              ensuring that when someone searches for inspiration, they find voices and perspectives 
              that truly represent and celebrate our community.&quot;
            </p>
          </div>
        </section>

        {/* What We Believe */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6 font-[var(--font-playfair)]">
            What We Believe
          </h2>
          <div className="grid gap-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                <span className="text-xl">✨</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Representation Matters</h3>
                <p className="text-zinc-400">
                  When you search for hair care, you should see hair that looks like yours. 
                  When you search for makeup tutorials, the advice should work for your skin tone.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center shrink-0">
                <span className="text-xl">🌟</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Our Work Deserves Visibility</h3>
                <p className="text-zinc-400">
                  Black creators produce incredible content daily. This platform ensures 
                  that work gets the spotlight it deserves.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                <span className="text-xl">🤝</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Community Is Everything</h3>
                <p className="text-zinc-400">
                  This platform grows through community contribution. Every submission 
                  helps someone else discover amazing content.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                <span className="text-xl">💪🏾</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Visibility, Not Exclusivity</h3>
                <p className="text-zinc-400">
                  We&apos;re not here to exclude anyone. We&apos;re here to ensure that our 
                  perspectives have a dedicated space to be discovered and celebrated.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6 font-[var(--font-playfair)]">
            How It Works
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Melanin Search curates and indexes content from Black creators, Black-owned 
              publications, and community-recommended resources. When you search here, 
              you&apos;re searching a carefully cultivated database designed with our community in mind.
            </p>
            <p>
              <strong className="text-white">Categories we focus on:</strong> Hair care and styling, 
              beauty and skincare, fashion and style, culture and history, Black-owned businesses, 
              and wellness.
            </p>
            <p>
              <strong className="text-white">Community-powered:</strong> Anyone can submit content 
              and creators to be included. Our team reviews submissions to maintain quality 
              and relevance.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-4 font-[var(--font-playfair)]">
            Join Us
          </h2>
          <p className="text-zinc-400 mb-6">
            Help us build the most comprehensive resource for Black content and creators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 text-black font-medium px-6 py-3 rounded-xl hover:bg-amber-400 transition-colors"
            >
              Start Searching
            </Link>
            <Link
              href="/creators"
              className="inline-flex items-center justify-center gap-2 bg-zinc-800 text-white font-medium px-6 py-3 rounded-xl hover:bg-zinc-700 transition-colors border border-zinc-700"
            >
              Submit Content
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
