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
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-medium text-zinc-900 mb-4">Submitted</h1>
          <p className="text-zinc-600 mb-6">
            We&apos;ll review your submission and add it if it meets our guidelines.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="px-4 py-2 text-sm bg-zinc-900 text-white rounded hover:bg-zinc-800"
            >
              Back to search
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
              className="px-4 py-2 text-sm border border-zinc-300 rounded hover:bg-zinc-50"
            >
              Submit another
            </button>
          </div>
        </div>
      </div>
    );
  }

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

      <main className="max-w-lg mx-auto px-6 py-12">
        <h1 className="text-2xl font-medium text-zinc-900 mb-2">Submit content</h1>
        <p className="text-zinc-600 mb-8">
          Know a resource from a Black creator or Black-owned source? Submit it here.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="contentUrl" className="block text-sm font-medium text-zinc-700 mb-1">
              URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="contentUrl"
              name="contentUrl"
              required
              value={formData.contentUrl}
              onChange={handleChange}
              placeholder="https://"
              className="w-full px-3 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-1 focus:ring-zinc-400"
            />
          </div>

          <div>
            <label htmlFor="creatorName" className="block text-sm font-medium text-zinc-700 mb-1">
              Creator name
            </label>
            <input
              type="text"
              id="creatorName"
              name="creatorName"
              value={formData.creatorName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-1 focus:ring-zinc-400"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-zinc-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-1 focus:ring-zinc-400"
            >
              <option value="">Select</option>
              <option value="hair">Hair</option>
              <option value="beauty">Beauty</option>
              <option value="fashion">Fashion</option>
              <option value="culture">Culture</option>
              <option value="business">Business</option>
              <option value="web3">Web3</option>
              <option value="wellness">Wellness</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-zinc-700 mb-1">
              Why should we include this? <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-1 focus:ring-zinc-400 resize-none"
            />
          </div>

          <div>
            <label htmlFor="submitterEmail" className="block text-sm font-medium text-zinc-700 mb-1">
              Your email (optional)
            </label>
            <input
              type="email"
              id="submitterEmail"
              name="submitterEmail"
              value={formData.submitterEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-1 focus:ring-zinc-400"
            />
            <p className="text-xs text-zinc-500 mt-1">
              We&apos;ll only use this to notify you if your submission is added.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isBlackOwned"
              name="isBlackOwned"
              checked={formData.isBlackOwned}
              onChange={handleChange}
              className="w-4 h-4 rounded border-zinc-300"
            />
            <label htmlFor="isBlackOwned" className="text-sm text-zinc-700">
              This is from a Black-owned source
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-zinc-900 text-white rounded hover:bg-zinc-800 transition-colors"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}
