import React from "react";

const stats = [
  {
    title: "Tasks Completed",
    value: "18",
    icon: "✅",
    color: "text-green-400",
  },
  {
    title: "Active Time",
    value: "5h 20m",
    icon: "⏱",
    color: "text-cyan-400",
  },
  {
    title: "Performance",
    value: "96%",
    icon: "⭐",
    color: "text-yellow-400",
  },
  {
    title: "AI Efficiency",
    value: "Excellent",
    icon: "🤖",
    color: "text-violet-400",
  },
];

export default function VolunteerPerformance() {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

      <h2 className="text-2xl font-bold text-green-400 mb-6">
        📈 Volunteer Performance
      </h2>

      <div className="grid grid-cols-2 gap-5">

        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-slate-700 bg-slate-800 p-5 text-center"
          >
            <div className="text-4xl">
              {item.icon}
            </div>

            <div className={`mt-3 text-3xl font-bold ${item.color}`}>
              {item.value}
            </div>

            <p className="mt-2 text-slate-400">
              {item.title}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}