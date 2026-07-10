import React from 'react';
import type { AppRoute } from '../../App';

interface AIModulesProps {
  onNavigate?: (route: AppRoute) => void;
}

export default function AIModules({ onNavigate }: AIModulesProps) {
  const modules = [
    {
      title: "🤖 Fan Assistant",
      description: "Answer fan questions instantly using Gemini AI.",
      route: 'fan-assistant' as AppRoute,
      highlight: true,
    },
    {
  title: "🗺️ Smart Navigation",
  description: "Guide visitors to seats, gates and facilities.",
  route: 'smart-navigation' as AppRoute,
    },
    {
  title: "👥 Crowd Intelligence",
  description: "Monitor crowd density and receive AI-powered routing suggestions.",
  route: "crowd-intelligence" as AppRoute,
  highlight: true,
},
    {
  title: "🚨 Emergency Assistant",
  description:
    "AI detects emergencies and recommends the fastest evacuation routes.",
  route: "emergency-assistant" as AppRoute,
  highlight: true,
},
    {
      title: "🌍 Live Translation",
      description: "Support multiple languages for international visitors.",
      route: undefined,
    },
    {
      title: "🙋 Volunteer Assistant",
      description: "Help volunteers receive tasks and updates in real time.",
      route: undefined,
    }
  ];

  return (
    <section id="ai-modules" className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center mb-4">
        AI Modules
      </h2>

      <p className="text-center text-slate-400 mb-12">
        Intelligent AI agents powering every part of the stadium experience.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div
            key={module.title}
            onClick={() => module.route && onNavigate?.(module.route)}
            className={`rounded-2xl border p-6 transition-all ${
              module.route
  ? "border-blue-500/60 bg-gradient-to-br from-blue-950/60 to-violet-950/40 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/15 cursor-pointer"
  : "border-slate-700 bg-slate-900/60 hover:border-slate-500"
            } ${module.route ? 'cursor-pointer' : ''}`}
          >
            <h3 className="text-xl font-semibold mb-3">
              {module.title}
            </h3>

            <p className="text-slate-400">
              {module.description}
            </p>

            {module.highlight && (
              <p className="mt-4 text-sm text-blue-400 font-medium flex items-center gap-1">
                <span>Try it now</span>
                <span aria-hidden="true">→</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}