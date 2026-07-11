// ──────────────────────────────────────────────────────────────
// App.tsx
// ──────────────────────────────────────────────────────────────

import React, { useState } from "react";

import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import FanAssistantPage from "./pages/FanAssistantPage";
import SmartNavigationPage from "./pages/SmartNavigationPage";
import CrowdIntelligencePage from "./pages/CrowdIntelligencePage";
import EmergencyAssistantPage from "./pages/EmergencyAssistantPage";

export type AppRoute =
  | "home"
  | "dashboard"
  | "fan-assistant"
  | "smart-navigation"
  | "crowd-intelligence"
  | "emergency-assistant";

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => {
    switch (window.location.hash) {
      case "#/dashboard":
        return "dashboard";

      case "#/fan-assistant":
        return "fan-assistant";

      case "#/smart-navigation":
        return "smart-navigation";

      case "#/crowd-intelligence":
        return "crowd-intelligence";

      case "#/emergency-assistant":
        return "emergency-assistant";

      default:
        return "home";
    }
  });

  const navigate = (to: AppRoute) => {
    setRoute(to);

    window.location.hash =
      to === "home" ? "" : `#/${to}`;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  switch (route) {
    case "dashboard":
      return <DashboardPage />;

    case "fan-assistant":
      return (
        <FanAssistantPage
          onBack={() => navigate("home")}
        />
      );

    case "smart-navigation":
      return <SmartNavigationPage />;

    case "crowd-intelligence":
      return <CrowdIntelligencePage />;

    case "emergency-assistant":
      return <EmergencyAssistantPage />;

    default:
      return (
        <LandingPage
          onNavigate={navigate}
        />
      );
  }
}