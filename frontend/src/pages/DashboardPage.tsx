import React, { useEffect, useState } from "react";

import DashboardService from "../services/dashboard";

import AICommandCenter from "../components/dashboard/AICommandCenter";
import AIOperationsCenter from "../components/dashboard/AIOperationsCenter";
import AIScenarioSimulator from "../components/dashboard/AIScenarioSimulator";
import NotificationPanel from "../components/dashboard/NotificationPanel";
import MatchCenter from "../components/dashboard/MatchCenter";
import CrowdAnalyticsChart from "../components/dashboard/CrowdAnalyticsChart";
import AIInsights from "../components/dashboard/AIInsights";
import StadiumHeatmap from "../components/dashboard/StadiumHeatmap";

interface DashboardState {
  stadium_health: number;
  crowd_level: number;
  recommended_gate: string;
  navigation_users: number;
  available_parking: number;
  total_parking: number;
  volunteers: number;
  weather: string;
  event: string;
  alerts: string;
  system_status: string;
  timestamp: string;
}

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardState | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    try {
      const data = await DashboardService.getDashboard();
      setDashboard(data as unknown as DashboardState);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();

    const timer = setInterval(loadDashboard, 5000);

    return () => clearInterval(timer);
  }, []);

  if (loading || !dashboard) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-2xl">
        Loading Stadium Dashboard...
      </div>
    );
  }

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
              {dashboard.event}
            </p>

            <p className="text-sm text-cyan-400 mt-1">
              Weather: {dashboard.weather}
            </p>

          </div>

          <div className="text-right">

            <p className="text-slate-400">
              Stadium Health
            </p>

            <h2 className="text-green-400 text-3xl font-bold">
              {dashboard.stadium_health}%
            </h2>

          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto p-8 space-y-8">

        <AICommandCenter />

        <AIOperationsCenter />

        <AIScenarioSimulator />

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

            <h3 className="text-slate-400">
              👥 Crowd Level
            </h3>

            <h1 className="text-5xl font-bold text-cyan-400 mt-4">
              {dashboard.crowd_level}%
            </h1>

          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

            <h3 className="text-slate-400">
              🚪 Recommended Gate
            </h3>

            <h1 className="text-3xl font-bold text-green-400 mt-4">
              {dashboard.recommended_gate}
            </h1>

          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

            <h3 className="text-slate-400">
              🗺 Navigation Users
            </h3>

            <h1 className="text-5xl font-bold text-blue-400 mt-4">
              {dashboard.navigation_users}
            </h1>

          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

            <h3 className="text-slate-400">
              🚗 Parking
            </h3>

            <h1 className="text-3xl font-bold text-yellow-400 mt-4">
              {dashboard.available_parking}/{dashboard.total_parking}
            </h1>

          </div>

        </div>

        <div className="rounded-2xl bg-gradient-to-r from-cyan-900/30 to-blue-900/20 border border-cyan-500 p-8">

          <h2 className="text-3xl font-bold text-cyan-400">
            🤖 AI Decision Engine
          </h2>

          <div className="mt-6 space-y-3">

            <p>
              👥 Crowd Level:
              <span className="text-cyan-400 font-bold">
                {" "}
                {dashboard.crowd_level}%
              </span>
            </p>

            <p>
              🚪 Recommended Entry:
              <span className="text-green-400 font-bold">
                {" "}
                {dashboard.recommended_gate}
              </span>
            </p>

            <p>
              👥 Active Navigation Users:
              <span className="text-blue-400 font-bold">
                {" "}
                {dashboard.navigation_users}
              </span>
            </p>

            <p>
              🚨 Alerts:
              <span className="text-red-400 font-bold">
                {" "}
                {dashboard.alerts}
              </span>
            </p>

            <p>
              ❤️ System:
              <span className="text-emerald-400 font-bold">
                {" "}
                {dashboard.system_status}
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