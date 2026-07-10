// ──────────────────────────────────────────────────────────────
//  App.tsx – Root application with simple client-side routing
//  Uses a state-based router so it works even without an
//  external router package. Can be upgraded to react-router-dom
//  by replacing this file once the package is installed.
// ──────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import FanAssistantPage from './pages/FanAssistantPage';
import SmartNavigationPage from './pages/SmartNavigationPage';

export type AppRoute =
  | 'home'
  | 'fan-assistant'
  | 'smart-navigation';

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => {
  switch (window.location.hash) {
    case '#/fan-assistant':
      return 'fan-assistant';

    case '#/smart-navigation':
      return 'smart-navigation';

    default:
      return 'home';
  }
});

  const navigate = (to: AppRoute) => {
    setRoute(to);
    window.location.hash = to === 'home' ? '' : `#/${to}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  switch (route) {
  case 'fan-assistant':
    return <FanAssistantPage onBack={() => navigate('home')} />;

  case 'smart-navigation':
    return <SmartNavigationPage />;

  default:
    return <LandingPage onNavigate={navigate} />;
}
}