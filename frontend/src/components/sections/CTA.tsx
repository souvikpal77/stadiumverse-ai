import React from 'react';
import type { AppRoute } from '../../App';

interface CTAProps {
  onNavigate?: (route: AppRoute) => void;
}

export default function CTA({ onNavigate }: CTAProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-10 text-center">
        <h2 className="text-4xl font-bold text-white">
          Ready to Experience StadiumVerse AI?
        </h2>

        <p className="mt-4 text-blue-100 text-lg">
          Smart Navigation • AI Assistant • Crowd Intelligence • Real-time Stadium Operations
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            id="cta-try-demo-btn"
            onClick={() => onNavigate?.('fan-assistant')}
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Try Live Demo
          </button>

          <button className="border border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-white hover:text-blue-600 transition-all">
            View Documentation
          </button>
        </div>
      </div>
    </section>
  );
}