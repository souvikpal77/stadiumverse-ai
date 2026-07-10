import { useEffect, useState } from "react";

const insights = [
  {
    title: "🚨 Crowd Alert",
    description:
      "Gate C crowd density exceeded 90%. Redirect spectators to Gate B.",
    color: "border-red-500",
  },
  {
    title: "🚑 Emergency Prediction",
    description:
      "Medical response teams should move closer to Section D due to increased activity.",
    color: "border-yellow-500",
  },
  {
    title: "🅿 Parking Analysis",
    description:
      "Parking Zone A has 64 spaces available. Recommend directing new arrivals there.",
    color: "border-green-500",
  },
  {
    title: "🌦 Weather Intelligence",
    description:
      "Light rain is expected in approximately 30 minutes. Prepare covered entry points.",
    color: "border-cyan-500",
  },
  {
    title: "🎯 AI Optimization",
    description:
      "Opening Gate E can reduce average entry time by approximately 18%.",
    color: "border-purple-500",
  },
];

export default function AIInsights() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % insights.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const item = insights[index];

  return (
    <div
      className={`rounded-2xl border ${item.color} bg-slate-900 p-6 transition-all duration-500`}
    >
      <h2 className="text-2xl font-bold text-cyan-400 mb-5">
        🤖 AI Executive Insight
      </h2>

      <h3 className="text-xl font-semibold mb-3">
        {item.title}
      </h3>

      <p className="text-slate-300 leading-7">
        {item.description}
      </p>

      <div className="mt-6">

        <div className="flex justify-between text-sm text-slate-400">

          <span>AI Confidence</span>

          <span>98%</span>

        </div>

        <div className="mt-2 h-3 rounded-full bg-slate-700">

          <div className="h-3 w-[98%] rounded-full bg-cyan-500"></div>

        </div>

      </div>

    </div>
  );
}