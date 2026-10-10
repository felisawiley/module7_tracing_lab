"use client";

import Link from "next/link";
import { blackOwnedSources, ContentSource } from "@/lib/sources";

const categoryLabels: Record<string, string> = {
  hair: "Hair",
  beauty: "Beauty",
  fashion: "Fashion",
  culture: "Culture",
  business: "Business",
  web3: "Web3",
  wellness: "Wellness",
  health: "Health",
  news: "News",
  music: "Music",
  finance: "Finance",
};

const typeLabels: Record<string, string> = {
  publication: "Publication",
  newsletter: "Newsletter",
  blog: "Blog",
  youtube: "YouTube",
  podcast: "Podcast",
  directory: "Directory",
  tiktok: "TikTok",
  instagram: "Instagram",
};

function SourceCard({ source }: { source: ContentSource }) {
  return (
    <div className="border border-zinc-200 rounded-lg p-4 hover:border-zinc-400 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <a 
              href={source.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline font-medium"
            >
              {source.name}
            </a>
            {source.isBlackOwned && (
              <span className="px-1.5 py-0.5 bg-zinc-900 text-white rounded text-xs">
                Black-owned
              </span>
            )}
            {source.rssUrl && (
              <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded text-xs">
                RSS
              </span>
            )}
          </div>
          <p className="text-sm text-zinc-600 mb-2">{source.description}</p>
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded text-xs">
              {typeLabels[source.type]}
            </span>
            {source.categories.map(cat => (
              <span key={cat} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
                {categoryLabels[cat] || cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SourcesPage() {
  const blackOwned = blackOwnedSources.filter(s => s.isBlackOwned);
  const withRSS = blackOwnedSources.filter(s => s.rssUrl);

  const byType = blackOwnedSources.reduce((acc, source) => {
    if (!acc[source.type]) acc[source.type] = [];
    acc[source.type].push(source);
    return acc;
  }, {} as Record<string, ContentSource[]>);

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-medium text-zinc-900">
              Melanin Search
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-600">Sources</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-medium text-zinc-900 mb-2">Content Sources</h1>
        <p className="text-zinc-600 mb-6">
          We aggregate and prioritize content from Black-owned publications, newsletters, blogs, and creators.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="border border-zinc-200 rounded-lg p-4 text-center">
            <p className="text-3xl font-medium text-zinc-900">{blackOwnedSources.length}</p>
            <p className="text-sm text-zinc-500">Total Sources</p>
          </div>
          <div className="border border-zinc-200 rounded-lg p-4 text-center">
            <p className="text-3xl font-medium text-zinc-900">{blackOwned.length}</p>
            <p className="text-sm text-zinc-500">Black-Owned</p>
          </div>
          <div className="border border-zinc-200 rounded-lg p-4 text-center">
            <p className="text-3xl font-medium text-zinc-900">{withRSS.length}</p>
            <p className="text-sm text-zinc-500">With RSS Feeds</p>
          </div>
        </div>

        {Object.entries(byType).map(([type, sources]) => (
          <section key={type} className="mb-8">
            <h2 className="text-lg font-medium text-zinc-900 mb-4 capitalize">
              {typeLabels[type] || type}s ({sources.length})
            </h2>
            <div className="grid gap-3">
              {sources.map(source => (
                <SourceCard key={source.id} source={source} />
              ))}
            </div>
          </section>
        ))}

        <section className="mt-12 border-t border-zinc-200 pt-8">
          <h2 className="text-lg font-medium text-zinc-900 mb-4">Submit a Source</h2>
          <p className="text-zinc-600 mb-4">
            Know a Black-owned publication, newsletter, or content creator we should include?
          </p>
          <a 
            href="mailto:sources@melaninsearch.com?subject=Source Submission"
            className="inline-block px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors text-sm"
          >
            Submit a Source
          </a>
        </section>
      </main>
    </div>
  );
}
