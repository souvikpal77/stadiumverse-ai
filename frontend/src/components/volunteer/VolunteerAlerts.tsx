import React from "react";

const alerts = [
  {
    id: 1,
    type: "🚨 Emergency",
    message: "Medical assistance required near Gate C.",
    color: "border-red-500 text-red-400",
  },
  {
    id: 2,
    type: "⚠ Crowd Alert",
    message: "Crowd density increasing at Food Court.",
    color: "border-yellow-500 text-yellow-400",
  },
  {
    id: 3,
    type: "ℹ Information",
    message: "VIP guests arriving in 10 minutes.",
    color: "border-cyan-500 text-cyan-400",
  },
];

export default function VolunteerAlerts() {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

      <h2 className="text-2xl font-bold text-red-400 mb-6">
        🚨 Live AI Alerts
      </h2>

      <div className="space-y-4">

        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`rounded-xl border p-4 ${alert.color}`}
          >
            <h3 className="font-semibold">
              {alert.type}
            </h3>

            <p className="mt-2 text-slate-300">
              {alert.message}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}