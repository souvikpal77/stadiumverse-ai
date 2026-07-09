import React from 'react';
import type { AppRoute } from '../../App';

interface NavbarProps {
  onNavigate?: (route: AppRoute) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  return (
    <nav className="w-full max-w-7xl mx-auto flex items-center justify-between py-6 px-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-700 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/30">
          SV
        </div>

        <div>
          <h1 className="text-xl font-bold text-white">
            StadiumVerse AI
          </h1>
          <p className="text-xs text-gray-400">
            FIFA World Cup 2026
          </p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8 text-gray-300">
        <a href="#" className="hover:text-blue-400 transition-colors">Home</a>
        <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
        <a href="#ai-modules" className="hover:text-blue-400 transition-colors">AI Agents</a>
        <button
          id="nav-fan-assistant-link"
          onClick={() => onNavigate?.('fan-assistant')}
          className="hover:text-blue-400 transition-colors text-gray-300 font-medium"
        >
          Fan Assistant
        </button>
      </div>

      <button
        id="nav-get-started-btn"
        onClick={() => onNavigate?.('fan-assistant')}
        className="bg-gradient-to-r from-blue-600 to-violet-700 hover:from-blue-500 hover:to-violet-600 px-5 py-2 rounded-lg font-semibold text-white transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
      >
        Try Fan Assistant
      </button>
    </nav>
  );
}