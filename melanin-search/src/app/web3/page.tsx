"use client";

import Link from "next/link";

const creators = [
  {
    name: "Isaiah Jackson",
    role: "Author, Bitcoin & Black America",
    twitter: "IsaiahJackson",
  },
  {
    name: "Tavonia Evans",
    role: "Founder, Guapcoin",
    twitter: "TavoniaEvans",
  },
  {
    name: "Cleve Mesidor",
    role: "Exec Director, Blockchain Foundation",
    twitter: "CleveMesidor",
  },
  {
    name: "Lamar Wilson",
    role: "Educator & Content Creator",
    twitter: "LamarWilson",
  },
];

const projects = [
  {
    name: "Guapcoin",
    description: "Cryptocurrency for Black economic circulation",
    website: "guapcoin.org",
  },
  {
    name: "Afropolitan",
    description: "Digital nation for the African diaspora",
    website: "afropolitan.io",
  },
  {
    name: "Black NFT Art",
    description: "Collective for Black NFT artists",
    website: "blacknftart.com",
  },
];

export default function Web3Page() {
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
            <Link href="/search?category=web3" className="text-zinc-600 hover:text-zinc-900">Search Web3</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-medium text-zinc-900 mb-2">Web3</h1>
        <p className="text-zinc-600 mb-10">
          Black creators and projects in crypto, NFTs, and decentralized tech.
        </p>

        {/* Creators */}
        <section className="mb-12">
          <h2 className="text-lg font-medium text-zinc-900 mb-4">Creators</h2>
          <div className="grid gap-4">
            {creators.map((creator) => (
              <div key={creator.name} className="flex items-center justify-between py-3 border-b border-zinc-100">
                <div>
                  <p className="font-medium text-zinc-900">{creator.name}</p>
                  <p className="text-sm text-zinc-500">{creator.role}</p>
                </div>
                <a
                  href={`https://twitter.com/${creator.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-700 hover:underline"
                >
                  @{creator.twitter}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-12">
          <h2 className="text-lg font-medium text-zinc-900 mb-4">Black-led projects</h2>
          <div className="grid gap-4">
            {projects.map((project) => (
              <a
                key={project.name}
                href={`https://${project.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border border-zinc-200 rounded-lg hover:border-zinc-300 transition-colors"
              >
                <p className="font-medium text-zinc-900">{project.name}</p>
                <p className="text-sm text-zinc-500 mt-1">{project.description}</p>
                <p className="text-xs text-blue-700 mt-2">{project.website}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section>
          <h2 className="text-lg font-medium text-zinc-900 mb-4">Resources</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="https://bitcoinandblackamerica.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                Bitcoin & Black America
              </a>
              <span className="text-zinc-500"> — Book on crypto and economic empowerment</span>
            </li>
            <li>
              <a href="https://blackbitcoinbillionaire.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                Black Bitcoin Billionaires
              </a>
              <span className="text-zinc-500"> — Community and education platform</span>
            </li>
            <li>
              <a href="https://blockchainfoundation.co" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                Blockchain Foundation
              </a>
              <span className="text-zinc-500"> — Policy advocacy for inclusion</span>
            </li>
          </ul>
        </section>

        {/* Submit */}
        <div className="mt-12 pt-8 border-t border-zinc-200">
          <p className="text-zinc-600">
            Know a Black Web3 creator or project?{" "}
            <Link href="/creators" className="text-blue-700 hover:underline">
              Submit it
            </Link>
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
