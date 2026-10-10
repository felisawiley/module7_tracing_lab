"use client";

import { useState } from "react";
import Link from "next/link";

export default function CreatorsPage() {
  const [formData, setFormData] = useState({
    contentUrl: "",
    creatorName: "",
    category: "",
    description: "",
    submitterEmail: "",
    isBlackOwned: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] bg-pattern flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✨</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4 font-[var(--font-playfair)]">
            Thank You!
          </h1>
          <p className="text-zinc-400 mb-8">
            Your submission has been received. Our team will review it and add it to 
            our directory if it meets our guidelines. Together, we&apos;re building something amazing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 text-black font-medium px-6 py-3 rounded-xl hover:bg-amber-400 transition-colors"
            >
              Back to Search
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  contentUrl: "",
                  creatorName: "",
                  category: "",
                  description: "",
                  submitterEmail: "",
                  isBlackOwned: false,
                });
              }}
              className="inline-flex items-center justify-center gap-2 bg-zinc-800 text-white font-medium px-6 py-3 rounded-xl hover:bg-zinc-700 transition-colors border border-zinc-700"
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

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

      <main className="max-w-2xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 font-[var(--font-playfair)]">
            Submit Content
          </h1>
          <p className="text-lg text-zinc-400">
            Know an amazing Black creator or resource? Help us grow our directory 
            by sharing content that deserves visibility.
          </p>
        </div>

        {/* Guidelines */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-3">Submission Guidelines</h2>
          <ul className="space-y-2 text-zinc-400 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Content should be created by Black creators or feature Black perspectives</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Links should be to high-quality, helpful, and relevant content</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>No spam, affiliate-heavy content, or low-quality resources</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Self-submissions are welcome! Share your own work.</span>
            </li>
          </ul>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="contentUrl" className="block text-sm font-medium text-white mb-2">
              Content URL <span className="text-amber-500">*</span>
            </label>
            <input
              type="url"
              id="contentUrl"
              name="contentUrl"
              required
              value={formData.contentUrl}
              onChange={handleChange}
              placeholder="https://example.com/amazing-content"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="creatorName" className="block text-sm font-medium text-white mb-2">
              Creator/Author Name
            </label>
            <input
              type="text"
              id="creatorName"
              name="creatorName"
              value={formData.creatorName}
              onChange={handleChange}
              placeholder="e.g., Maya Johnson"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-white mb-2">
              Category <span className="text-amber-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
            >
              <option value="">Select a category</option>
              <option value="hair">Hair</option>
              <option value="beauty">Beauty</option>
              <option value="fashion">Fashion</option>
              <option value="culture">Culture</option>
              <option value="business">Business</option>
              <option value="wellness">Wellness</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
              Why should this be included? <span className="text-amber-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us what makes this content valuable and why it deserves visibility..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors resize-none"
            />
          </div>

          <div>
            <label htmlFor="submitterEmail" className="block text-sm font-medium text-white mb-2">
              Your Email (optional)
            </label>
            <input
              type="email"
              id="submitterEmail"
              name="submitterEmail"
              value={formData.submitterEmail}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            <p className="text-xs text-zinc-500 mt-1">
              We&apos;ll only use this to notify you if your submission is added
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isBlackOwned"
              name="isBlackOwned"
              checked={formData.isBlackOwned}
              onChange={handleChange}
              className="w-5 h-5 rounded bg-zinc-900 border-zinc-700 text-amber-500 focus:ring-amber-500 focus:ring-offset-0"
            />
            <label htmlFor="isBlackOwned" className="text-sm text-zinc-300">
              This is from a Black-owned business or publication
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold px-6 py-4 rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all duration-300"
          >
            Submit Content
          </button>
        </form>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-zinc-500 text-sm">
            Have multiple submissions or want to partner with us?{" "}
            <a href="mailto:hello@melaninsearch.com" className="text-amber-400 hover:text-amber-300">
              Get in touch
            </a>
          </p>
        </div>
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
