import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const crowdData = [
  {
    name: "🚪 Gate A",
    percentage: 28,
    status: "Low",
    color: "bg-green-500",
    text: "text-green-400",
  },
  {
    name: "🚪 Gate B",
    percentage: 57,
    status: "Medium",
    color: "bg-yellow-500",
    text: "text-yellow-400",
  },
  {
    name: "🚪 Gate C",
    percentage: 92,
    status: "High",
    color: "bg-red-500",
    text: "text-red-400",
  },
  {
    name: "🍔 Food Court",
    percentage: 71,
    status: "Busy",
    color: "bg-orange-500",
    text: "text-orange-400",
  },
  {
    name: "🅿 Parking A",
    percentage: 18,
    status: "Available",
    color: "bg-green-500",
    text: "text-green-400",
  },
];

const predictionData = [
  { time: "Now", crowd: 72 },
  { time: "+5m", crowd: 76 },
  { time: "+10m", crowd: 81 },
  { time: "+15m", crowd: 88 },
  { time: "+20m", crowd: 84 },
];

const alerts = [
  {
    icon: "🚨",
    title: "Gate C Congestion",
    color: "border-red-500",
  },
  {
    icon: "⚽",
    title: "Goal Celebration",
    color: "border-yellow-500",
  },
  {
    icon: "🌧",
    title: "Rain Expected",
    color: "border-cyan-500",
  },
  {
    icon: "🚑",
    title: "Medical Team Ready",
    color: "border-green-500",
  },
];

export default function CrowdIntelligencePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold">
        👥 Crowd Intelligence
      </h1>

      <p className="text-slate-400 mt-3 mb-10">
        AI-powered real-time crowd monitoring,
        prediction and intelligent decision support.
      </p>

      {/* Summary */}

      <div className="grid lg:grid-cols-4 gap-6 mb-10">

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-cyan-500 transition">

          <p className="text-slate-400">
            Current Crowd
          </p>

          <h2 className="text-5xl font-bold text-cyan-400 mt-3">
            72%
          </h2>

        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-yellow-400 transition">

          <p className="text-slate-400">
            AI Prediction
          </p>

          <h2 className="text-5xl font-bold text-yellow-400 mt-3">
            88%
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Next 15 Minutes
          </p>

        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-green-500 transition">

          <p className="text-slate-400">
            AI Confidence
          </p>

          <h2 className="text-5xl font-bold text-green-400 mt-3">
            96%
          </h2>

        </div>

        <div className="rounded-2xl bg-slate-900 border border-red-500 p-6">

          <p className="text-slate-400">
            Risk Level
          </p>

          <h2 className="text-5xl font-bold text-red-400 mt-3">
            HIGH
          </h2>

        </div>

      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-8">

          <h2 className="text-2xl font-bold mb-8">
            📈 Live Crowd Density
          </h2>

          <div className="space-y-8">

            {crowdData.map((item) => (

              <div key={item.name}>

                <div className="flex justify-between mb-2">

                  <span>{item.name}</span>

                  <span className={item.text}>
                    {item.status} ({item.percentage}%)
                  </span>

                </div>

                <div className="h-4 rounded-full bg-slate-700 overflow-hidden">

                  <div
                    className={`${item.color} h-full rounded-full transition-all duration-1000`}
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>
                {/* AI Recommendation */}

        <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/20 rounded-2xl border border-cyan-500 p-8">

          <h2 className="text-2xl font-bold text-cyan-400 mb-6">
            🤖 AI Recommendation
          </h2>

          <div className="space-y-5 text-slate-300">

            <div className="rounded-xl bg-slate-900/60 p-4 border border-slate-700">
              🚨 Gate C congestion detected
            </div>

            <div className="rounded-xl bg-slate-900/60 p-4 border border-slate-700">
              ✅ Redirect spectators to Gate B
            </div>

            <div className="rounded-xl bg-slate-900/60 p-4 border border-slate-700">
              🚪 Open Gate D for faster entry
            </div>

            <div className="rounded-xl bg-slate-900/60 p-4 border border-slate-700">
              👮 Deploy two additional security teams
            </div>

            <div className="rounded-xl bg-slate-900/60 p-4 border border-slate-700">
              ⏱ Estimated waiting time reduced by
              <span className="text-cyan-400 font-bold">
                {" "}8 minutes
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* AI Prediction Graph */}

      <div className="mt-10 rounded-2xl bg-slate-900 border border-slate-800 p-8">

        <h2 className="text-2xl font-bold mb-6">
          📊 AI Crowd Prediction Trend
        </h2>

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={predictionData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis
                dataKey="time"
                stroke="#94a3b8"
              />

              <YAxis stroke="#94a3b8" />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="crowd"
                stroke="#06b6d4"
                strokeWidth={4}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* AI Alert Center */}

      <div className="mt-10 rounded-2xl bg-slate-900 border border-slate-800 p-8">

        <h2 className="text-2xl font-bold mb-6 text-red-400">
          🚨 Live AI Alerts
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {alerts.map((alert) => (

            <div
              key={alert.title}
              className={`rounded-xl border ${alert.color} bg-slate-800 p-5 hover:scale-105 transition-all duration-300`}
            >

              <div className="text-4xl">
                {alert.icon}
              </div>

              <h3 className="mt-4 font-bold text-lg">
                {alert.title}
              </h3>

              <p className="mt-2 text-slate-400 text-sm">
                AI monitoring has detected this event and
                generated an operational recommendation.
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}