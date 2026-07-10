import React from "react";

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

export default function CrowdIntelligencePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold mb-3">
        👥 Crowd Intelligence
      </h1>

      <p className="text-slate-400 mb-10">
        AI-powered real-time crowd monitoring using computer vision and analytics.
      </p>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Crowd Status */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-8 border border-slate-800">

          <h2 className="text-2xl font-bold mb-8">
            Live Crowd Density
          </h2>

          <div className="space-y-8">

            {crowdData.map((item) => (
              <div key={item.name}>

                <div className="flex justify-between mb-2">

                  <span className="font-medium">
                    {item.name}
                  </span>

                  <span className={item.text}>
                    {item.status} ({item.percentage}%)
                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-slate-700 overflow-hidden">

                  <div
                    className={`${item.color} h-full rounded-full transition-all duration-700`}
                    style={{ width: `${item.percentage}%` }}
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

          <div className="space-y-5 text-slate-300 leading-7">

            <p>
              🚨 Gate C is experiencing unusually high congestion.
            </p>

            <p>
              ✅ Redirect spectators to Gate B to reduce waiting time.
            </p>

            <p>
              🚶 Estimated walking time saved:
              <span className="text-cyan-400 font-bold">
                {" "}8 minutes
              </span>
            </p>

            <p>
              📈 Crowd prediction for next 20 minutes:
              <span className="text-yellow-400">
                {" "}Increasing
              </span>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}