import React from "react";
import type { AppRoute } from "../../App";

interface NavbarProps {
  onNavigate?: (route: AppRoute) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  return (
    <nav className="w-full max-w-7xl mx-auto flex items-center justify-between py-6 px-6">

      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-700 flex items-center justify-center font-bold text-white">
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

        <button
          onClick={() => onNavigate?.("home")}
          className="hover:text-blue-400 transition"
        >
          Home
        </button>

        <a href="#features" className="hover:text-blue-400">
          Features
        </a>

        <button
          onClick={() => onNavigate?.("dashboard")}
          className="hover:text-cyan-400 transition"
        >
          Dashboard
        </button>

        <button
          onClick={() => onNavigate?.("smart-navigation")}
          className="hover:text-blue-400 transition"
        >
          Smart Navigation
        </button>

        <button
          onClick={() => onNavigate?.("fan-assistant")}
          className="hover:text-blue-400 transition"
        >
          Fan Assistant
        </button>

      </div>

      <button
        onClick={() => onNavigate?.("fan-assistant")}
        className="bg-gradient-to-r from-blue-600 to-violet-700 px-5 py-2 rounded-lg font-semibold text-white"
      >
        Try Fan Assistant
      </button>

    </nav>
  );
}