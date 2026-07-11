import React from "react";
import { useAI } from "../context/AIContext";

import AICommandCenter from "../components/dashboard/AICommandCenter";
import AIOperationsCenter from "../components/dashboard/AIOperationsCenter";
import AIScenarioSimulator from "../components/dashboard/AIScenarioSimulator";
import NotificationPanel from "../components/dashboard/NotificationPanel";
import MatchCenter from "../components/dashboard/MatchCenter";
import CrowdAnalyticsChart from "../components/dashboard/CrowdAnalyticsChart";
import AIInsights from "../components/dashboard/AIInsights";
import StadiumHeatmap from "../components/dashboard/StadiumHeatmap";

export default function DashboardPage() {
  const { state } = useAI();

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}

      <div className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">

        <div className="max-w-7xl mx-auto flex justify-between items-center p-6">

          <div>

            <h1 className="text-5xl font-bold">
              🏟 StadiumVerse AI
            </h1>

            <p className="text-slate-400 mt-2">
              FIFA World Cup 2026 AI Command Center
            </p>

          </div>

          <div className="text-right">

            <p className="text-slate-400">
              Stadium Health
            </p>

            <h2 className="text-green-400 text-3xl font-bold">
              {state.stadiumHealth}%
            </h2>

          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto p-8 space-y-8">

        <AICommandCenter />
        <AIOperationsCenter />
        <AIScenarioSimulator />

        {/* Live Cards */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

            <h3 className="text-slate-400">
              👥 Crowd Level
            </h3>

            <h1 className="text-5xl font-bold text-cyan-400 mt-4">
              {state.crowdLevel}%
            </h1>

          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

            <h3 className="text-slate-400">
              🚪 Recommended Gate
            </h3>

            <h1 className="text-3xl font-bold text-green-400 mt-4">
              {state.activeGate}
            </h1>

          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

            <h3 className="text-slate-400">
              🗺 Navigation Users
            </h3>

            <h1 className="text-5xl font-bold text-blue-400 mt-4">
              {state.navigationUsers}
            </h1>

          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

            <h3 className="text-slate-400">
              🚨 Emergency
            </h3>

            <h1
              className={`text-3xl font-bold mt-4 ${
                state.emergency
                  ? "text-red-400"
                  : "text-green-400"
              }`}
            >
              {state.emergency ? "ACTIVE" : "NONE"}
            </h1>

          </div>

        </div>

        {/* AI Decision */}

        <div className="rounded-2xl bg-gradient-to-r from-cyan-900/30 to-blue-900/20 border border-cyan-500 p-8">

          <h2 className="text-3xl font-bold text-cyan-400">
            🤖 AI Decision Engine
          </h2>

          <div className="mt-6 space-y-3">

            <p>
              👥 Crowd Level:
              <span className="text-cyan-400 font-bold">
                {" "}
                {state.crowdLevel}%
              </span>
            </p>

            <p>
              🚪 Recommended Entry:
              <span className="text-green-400 font-bold">
                {" "}
                {state.activeGate}
              </span>
            </p>

            <p>
              👥 Active Navigation Users:
              <span className="text-blue-400 font-bold">
                {" "}
                {state.navigationUsers}
              </span>
            </p>

            <p>
              🚨 Emergency Status:
              <span
                className={`font-bold ${
                  state.emergency
                    ? "text-red-400"
                    : "text-green-400"
                }`}
              >
                {" "}
                {state.emergency ? "Emergency Detected" : "Normal"}
              </span>
            </p>

          </div>

        </div>

        <NotificationPanel />

        <MatchCenter />

        <CrowdAnalyticsChart />

        <AIInsights />

        <StadiumHeatmap />

      </div>

    </div>
  );
}