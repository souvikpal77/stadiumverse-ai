import React from 'react';
import type { AppRoute } from '../../App';

interface HeroProps {
  onNavigate?: (route: AppRoute) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 text-center">
      <p className="text-blue-400 font-semibold mb-4">
        FIFA World Cup 2026 • AI Powered Stadium Platform
      </p>

      <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
        Welcome to
        <span className="block text-blue-500">
          StadiumVerse AI
        </span>
      </h1>

      <p className="mt-6 text-lg text-gray-400 max-w-3xl mx-auto">
        A next-generation AI platform that helps fans, volunteers,
        organizers, and security teams manage stadium operations using
        Generative AI, real-time insights, and intelligent assistants.
      </p>

      <div className="mt-10 flex justify-center gap-4">
        <button
          id="hero-explore-btn"
          onClick={() => onNavigate?.('fan-assistant')}
          className="bg-gradient-to-r from-blue-600 to-violet-700 hover:from-blue-500 hover:to-violet-600 px-6 py-3 rounded-xl font-semibold text-white transition-all shadow-lg shadow-blue-600/25"
        >
          Try Fan Assistant
        </button>

        <button className="border border-gray-600 hover:border-blue-500 px-6 py-3 rounded-xl transition-colors">
          View Architecture
        </button>
      </div>
    </section>
  );
}