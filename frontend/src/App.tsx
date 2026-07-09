// ──────────────────────────────────────────────────────────────
//  App.tsx – Root application with simple client-side routing
//  Uses a state-based router so it works even without an
//  external router package. Can be upgraded to react-router-dom
//  by replacing this file once the package is installed.
// ──────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import FanAssistantPage from './pages/FanAssistantPage';

export type AppRoute = 'home' | 'fan-assistant';

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => {
    // Read initial route from hash for simple deep-link support
    if (window.location.hash === '#/fan-assistant') return 'fan-assistant';
    return 'home';
  });

  const navigate = (to: AppRoute) => {
    setRoute(to);
    window.location.hash = to === 'home' ? '' : `#/${to}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  switch (route) {
    case 'fan-assistant':
      return <FanAssistantPage onBack={() => navigate('home')} />;
    default:
      return <LandingPage onNavigate={navigate} />;
  }
}