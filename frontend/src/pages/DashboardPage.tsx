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
import SmartStadiumMap from "../components/dashboard/SmartStadiumMap";


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
  const [emergency, setEmergency] = useState<any>(null);

  async function loadDashboard() {
    try {
      const data = await DashboardService.getDashboardStatus();
      setDashboard(data as unknown as DashboardState);

      const emergencyData = await DashboardService.getEmergencyStatus();
      setEmergency(emergencyData);

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

            <p className="text-sm text-slate-500 mt-1">
              Last Updated:{" "}
              {new Date(dashboard.timestamp).toLocaleTimeString()}
            </p>

          </div>

          <div className="text-right">

            <p className="text-slate-400">
              Stadium Health
            </p>

            <h2
           className={`text-3xl font-bold ${
           dashboard.stadium_health > 95
            ? "text-green-400"
            : "text-yellow-400"
          }`}
        >
              {dashboard.stadium_health}%
            </h2>

          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto p-8 space-y-8">

        {emergency?.active && (

          <div className="rounded-2xl bg-red-600 animate-pulse p-6 border-2 border-red-300">

            <h2 className="text-3xl font-bold">
              🚨 EMERGENCY ALERT
            </h2>

      <p className="mt-3 text-lg">
        {emergency.type}
      </p>

      <p>
        📍 Location:
        <strong> {emergency.location}</strong>
      </p>

      <p>
        {emergency.message}
      </p>

      <p className="mt-3 text-yellow-200">
        Recommended Gate:
        <strong> {emergency.recommended_gate}</strong>
      </p>

    </div>

  )}

        <AICommandCenter />

        <AIOperationsCenter />

        <AIScenarioSimulator />

        <div className="rounded-2xl border border-cyan-500 bg-gradient-to-r from-cyan-900/40 to-blue-900/20 p-6 shadow-lg">

  <div className="flex justify-between items-center">

    <div>
      <h2 className="text-2xl font-bold text-cyan-300">
        🤖 StadiumVerse AI Live Monitor
      </h2>

      <p className="text-slate-300 mt-2">
        AI is continuously monitoring crowd density, parking availability,
        stadium health, weather conditions, and navigation routes.
      </p>
    </div>

    <div className="text-right">
      <button
  className="mt-6 rounded-xl bg-red-600 hover:bg-red-700 px-6 py-3 font-bold transition"
  onClick={async () => {
  try {

    await DashboardService.triggerEmergency({
      active: true,
      type: "Fire Emergency",
      location: "Gate C",
      message: "Fire detected near Gate C. Visitors are being rerouted.",
      recommended_gate: "Gate D",
    });

    const emergencyData =
      await DashboardService.getEmergencyStatus();

    setEmergency(emergencyData);

  } catch (err) {
    console.error(err);
  }
}}
>
  🚨 Simulate Emergency
</button>
      <p className="text-sm text-slate-400">
        AI Status
      </p>

      <h2 className="text-3xl font-bold text-green-400 animate-pulse">
        ● ACTIVE
      </h2>
    </div>

  </div>

</div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

            <h3 className="text-slate-400">
              👥 Crowd Level
            </h3>

            <h1
  className={`text-5xl font-bold mt-4 ${
    dashboard.crowd_level > 80
      ? "text-red-500"
      : dashboard.crowd_level > 60
      ? "text-yellow-400"
      : "text-green-400"
  }`}
>
  {dashboard.crowd_level}%
</h1>

          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

            <h3 className="text-slate-400">
              🚪 Recommended Gate
            </h3>

            <h1
  className={`text-3xl font-bold mt-4 ${
    dashboard.recommended_gate === "Gate A"
      ? "text-green-400"
      : "text-yellow-400"
  }`}
>
              {dashboard.recommended_gate}
            </h1>

          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

            <h3 className="text-slate-400">
              🗺 Navigation Users
            </h3>

            <h1
  className={`text-5xl font-bold mt-4 ${
    dashboard.navigation_users > 100
      ? "text-blue-400"
      : "text-cyan-400"
  }`}
>
              {dashboard.navigation_users}
            </h1>

          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

            <h3 className="text-slate-400">
              🚗 Parking
            </h3>

            <h1
  className={`text-3xl font-bold mt-4 ${
    dashboard.available_parking < 30
      ? "text-red-500"
      : "text-green-400"
  }`}
>
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
              <span className={`font-bold ${
                dashboard.recommended_gate === "Gate A"
                  ? "text-green-400"
                  : "text-yellow-400"
              }`}>
                {" "}
                {dashboard.recommended_gate}
              </span>
            </p>

            <p>
              👥 Active Navigation Users:
              <span className={`font-bold ${
                dashboard.navigation_users > 100
                  ? "text-blue-400"
                  : "text-cyan-400"
              }`}>
                {" "}
                {dashboard.navigation_users}
              </span>
            </p>

            <p>
              🚨 Alerts:
              <span className="text-red-400 font-bold">
                {" "}
                {Array.isArray(dashboard.alerts)
  ? dashboard.alerts.length === 0
    ? "No Alerts"
    : dashboard.alerts.join(", ")
  : dashboard.alerts}
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

        <div className="rounded-2xl bg-slate-900 border border-cyan-500 p-8">

  <h2 className="text-3xl font-bold text-cyan-400">
    🧠 AI Recommendation Engine
  </h2>

  <div className="mt-6 space-y-4">

    {dashboard.crowd_level > 80 ? (

      <div className="rounded-xl bg-red-500/20 border border-red-500 p-4">
        <h3 className="text-red-400 font-bold text-xl">
          🚨 Critical Crowd Detected
        </h3>

        <p className="text-slate-300 mt-2">
          Redirect visitors to {dashboard.recommended_gate}.
          Deploy additional volunteers and security personnel.
        </p>
      </div>

    ) : dashboard.crowd_level > 60 ? (

      <div className="rounded-xl bg-yellow-500/20 border border-yellow-500 p-4">
        <h3 className="text-yellow-300 font-bold text-xl">
          ⚠ Moderate Congestion
        </h3>

        <p className="text-slate-300 mt-2">
          Crowd is increasing. AI recommends opening additional entry lanes.
        </p>
      </div>

    ) : (

      <div className="rounded-xl bg-green-500/20 border border-green-500 p-4">
        <h3 className="text-green-400 font-bold text-xl">
          ✅ Stadium Operating Normally
        </h3>

        <p className="text-slate-300 mt-2">
          Crowd flow is stable. Continue monitoring in real time.
        </p>
      </div>

    )}

  </div>

</div>

        <NotificationPanel />

        <MatchCenter />

        <CrowdAnalyticsChart />

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

  <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 text-center">
    <div className="text-5xl">👥</div>
    <h3 className="text-slate-400 mt-3">Visitors</h3>
    <p className="text-4xl font-bold text-cyan-400 mt-2">
      {dashboard.navigation_users}
    </p>
  </div>

  <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 text-center">
    <div className="text-5xl">🚗</div>
    <h3 className="text-slate-400 mt-3">Parking Free</h3>
    <p className="text-4xl font-bold text-green-400 mt-2">
      {dashboard.available_parking}
    </p>
  </div>

  <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 text-center">
    <div className="text-5xl">🙋</div>
    <h3 className="text-slate-400 mt-3">Volunteers</h3>
    <p className="text-4xl font-bold text-yellow-400 mt-2">
      {dashboard.volunteers}
    </p>
  </div>

  <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 text-center">
    <div className="text-5xl">❤️</div>
    <h3 className="text-slate-400 mt-3">System Health</h3>
    <p className="text-4xl font-bold text-emerald-400 mt-2">
      {dashboard.stadium_health}%
    </p>
  </div>

</div>

        <AIInsights />

        <SmartStadiumMap />

        <StadiumHeatmap />

      </div>

    </div>
  );
}