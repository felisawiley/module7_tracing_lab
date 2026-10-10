"use client";

import { useState } from "react";
import Link from "next/link";

const web3Categories = [
  {
    id: "nft-art",
    name: "NFT Art",
    description: "Black NFT artists and digital art collections",
    icon: "🎨",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: "defi",
    name: "DeFi & Crypto",
    description: "Cryptocurrency, DeFi protocols, and financial tools",
    icon: "💰",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "education",
    name: "Web3 Education",
    description: "Learn about blockchain, crypto, and Web3",
    icon: "📚",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    id: "projects",
    name: "Black-Led Projects",
    description: "Web3 projects founded by Black entrepreneurs",
    icon: "🚀",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    id: "community",
    name: "DAOs & Communities",
    description: "Decentralized communities and organizations",
    icon: "🤝",
    gradient: "from-emerald-500 to-teal-500",
  },
];

const featuredCreators = [
  {
    id: "1",
    name: "Isaiah Jackson",
    role: "Author & Educator",
    bio: "Author of 'Bitcoin & Black America', educating on crypto for economic empowerment",
    avatar: "IJ",
    walletAddress: "0x1234...5678",
    twitter: "IsaiahJackson",
    tags: ["Bitcoin", "Education", "Author"],
  },
  {
    id: "2",
    name: "Tavonia Evans",
    role: "Founder, Guapcoin",
    bio: "Building cryptocurrency infrastructure for Black economic circulation",
    avatar: "TE",
    walletAddress: "0x8765...4321",
    twitter: "TavoniaEvans",
    tags: ["DeFi", "Founder", "Community"],
  },
  {
    id: "3",
    name: "Cleve Mesidor",
    role: "Policy Advocate",
    bio: "Executive Director of Blockchain Foundation, shaping inclusive crypto policy",
    avatar: "CM",
    walletAddress: null,
    twitter: "CleveMesidor",
    tags: ["Policy", "Advocacy", "Leadership"],
  },
  {
    id: "4",
    name: "Lamar Wilson",
    role: "Educator & Content Creator",
    bio: "Making Web3 accessible through education and content",
    avatar: "LW",
    walletAddress: "0x2468...1357",
    twitter: "LamarWilson",
    tags: ["Education", "YouTube", "DeFi"],
  },
];

const featuredProjects = [
  {
    name: "Guapcoin",
    description: "Cryptocurrency designed to circulate within Black communities",
    type: "Cryptocurrency",
    website: "guapcoin.org",
    chain: "Multi-chain",
  },
  {
    name: "Afropolitan",
    description: "Building a digital nation for the African diaspora",
    type: "DAO",
    website: "afropolitan.io",
    chain: "Ethereum",
  },
  {
    name: "Black NFT Art",
    description: "Collective celebrating Black NFT artists globally",
    type: "NFT Collective",
    website: "blacknftart.com",
    chain: "Ethereum",
  },
];

export default function Web3Page() {
  const [copiedWallet, setCopiedWallet] = useState<string | null>(null);

  const copyWallet = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedWallet(address);
    setTimeout(() => setCopiedWallet(null), 2000);
  };

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
            <Link href="/search?category=web3" className="text-zinc-400 hover:text-white transition-colors text-sm">
              Search Web3
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 rounded-full text-violet-400 text-sm font-medium mb-6">
            <span>⛓️</span> Web3 & Crypto
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-[var(--font-playfair)]">
            Black Voices in <span className="text-gradient">Web3</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Discover Black creators, projects, and resources shaping the future of 
            cryptocurrency, NFTs, and decentralized technology.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
          {web3Categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/search?category=web3&q=${cat.id}`}
              className="group bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-all"
            >
              <span className="text-2xl mb-2 block">{cat.icon}</span>
              <h3 className="text-sm font-medium text-white group-hover:text-amber-400 transition-colors">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>

        {/* Featured Creators */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-playfair)]">
              Featured Creators
            </h2>
            <Link
              href="/search?category=web3"
              className="text-amber-400 hover:text-amber-300 text-sm"
            >
              View all →
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {featuredCreators.map((creator) => (
              <div
                key={creator.id}
                className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg shrink-0">
                    {creator.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-white">{creator.name}</h3>
                      <svg className="w-4 h-4 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-violet-400 text-sm mb-2">{creator.role}</p>
                    <p className="text-zinc-400 text-sm mb-3">{creator.bio}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {creator.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={`https://twitter.com/${creator.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-white transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                      
                      {creator.walletAddress && (
                        <button
                          onClick={() => copyWallet(creator.walletAddress!)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-500/10 text-violet-400 rounded-full text-xs hover:bg-violet-500/20 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {copiedWallet === creator.walletAddress ? "Copied!" : "Tip Creator"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-white font-[var(--font-playfair)]">
              Black-Led Projects
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <a
                key={project.name}
                href={`https://${project.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-violet-500/50 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-violet-500/10 text-violet-400 rounded-full text-xs">
                    {project.type}
                  </span>
                  <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded-full text-xs">
                    {project.chain}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-violet-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-zinc-400 text-sm mb-4">{project.description}</p>
                <div className="flex items-center gap-1 text-zinc-500 text-sm">
                  <span>{project.website}</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Why Web3 Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-violet-900/20 to-purple-900/20 border border-violet-500/20 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 font-[var(--font-playfair)]">
              Why Web3 Matters for Our Community
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center mb-4">
                  <span className="text-xl">🏦</span>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Financial Inclusion</h3>
                <p className="text-zinc-400 text-sm">
                  Crypto provides access to financial services without traditional banking barriers 
                  that have historically excluded Black communities.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center mb-4">
                  <span className="text-xl">🎨</span>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Creator Ownership</h3>
                <p className="text-zinc-400 text-sm">
                  NFTs let artists own their work and earn directly—no gatekeepers, 
                  no middlemen taking most of the cut.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center mb-4">
                  <span className="text-xl">🌍</span>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Community Building</h3>
                <p className="text-zinc-400 text-sm">
                  DAOs and token communities let us build economic systems designed for us, 
                  by us—keeping wealth circulating within our communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4 font-[var(--font-playfair)]">
              Know a Black Web3 Creator or Project?
            </h2>
            <p className="text-zinc-400 mb-6">
              Help us build the most comprehensive directory of Black voices in crypto and Web3.
            </p>
            <Link
              href="/creators"
              className="inline-flex items-center gap-2 bg-violet-500 text-white font-medium px-6 py-3 rounded-xl hover:bg-violet-400 transition-colors"
            >
              Submit to Directory
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
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
            <Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link>
            <Link href="/creators" className="hover:text-white transition-colors">For Creators</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
