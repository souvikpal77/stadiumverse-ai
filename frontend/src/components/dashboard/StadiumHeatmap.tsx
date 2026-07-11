import { useEffect, useState } from "react";
import { useAI } from "../../context/AIContext";

interface Zone {
  id: string;
  label: string;
  x: string;
  y: string;
  level: "low" | "medium" | "high";
}

export default function StadiumHeatmap() {
  const { state } = useAI();

  const [zones, setZones] = useState<Zone[]>([
    { id: "A", label: "Gate A", x: "20%", y: "20%", level: "low" },
    { id: "B", label: "Gate B", x: "70%", y: "20%", level: "low" },
    { id: "C", label: "Food", x: "20%", y: "70%", level: "low" },
    { id: "D", label: "Medical", x: "70%", y: "70%", level: "low" },
  ]);

  useEffect(() => {
    switch (state.scenario) {
      case "High Crowd":
        setZones([
          { id: "A", label: "Gate A", x: "20%", y: "20%", level: "high" },
          { id: "B", label: "Gate B", x: "70%", y: "20%", level: "medium" },
          { id: "C", label: "Food", x: "20%", y: "70%", level: "low" },
          { id: "D", label: "Medical", x: "70%", y: "70%", level: "low" },
        ]);
        break;

      case "Fire Alarm":
        setZones([
          { id: "A", label: "Gate A", x: "20%", y: "20%", level: "low" },
          { id: "B", label: "Gate B", x: "70%", y: "20%", level: "low" },
          { id: "C", label: "Food", x: "20%", y: "70%", level: "high" },
          { id: "D", label: "Medical", x: "70%", y: "70%", level: "medium" },
        ]);
        break;

      case "Medical Emergency":
        setZones([
          { id: "A", label: "Gate A", x: "20%", y: "20%", level: "low" },
          { id: "B", label: "Gate B", x: "70%", y: "20%", level: "low" },
          { id: "C", label: "Food", x: "20%", y: "70%", level: "low" },
          { id: "D", label: "Medical", x: "70%", y: "70%", level: "high" },
        ]);
        break;

      case "Heavy Rain":
        setZones([
          { id: "A", label: "Gate A", x: "20%", y: "20%", level: "medium" },
          { id: "B", label: "Covered", x: "70%", y: "20%", level: "high" },
          { id: "C", label: "Food", x: "20%", y: "70%", level: "low" },
          { id: "D", label: "Medical", x: "70%", y: "70%", level: "low" },
        ]);
        break;

      case "Goal Celebration":
        setZones([
          { id: "A", label: "Gate A", x: "20%", y: "20%", level: "medium" },
          { id: "B", label: "Gate B", x: "70%", y: "20%", level: "medium" },
          { id: "C", label: "Field", x: "20%", y: "70%", level: "high" },
          { id: "D", label: "Medical", x: "70%", y: "70%", level: "medium" },
        ]);
        break;

      default:
        setZones([
          { id: "A", label: "Gate A", x: "20%", y: "20%", level: "low" },
          { id: "B", label: "Gate B", x: "70%", y: "20%", level: "low" },
          { id: "C", label: "Food", x: "20%", y: "70%", level: "low" },
          { id: "D", label: "Medical", x: "70%", y: "70%", level: "low" },
        ]);
    }
  }, [state.scenario]);

  const colorClass = (level: Zone["level"]) => {
    switch (level) {
      case "low":
        return "bg-green-500";

      case "medium":
        return "bg-yellow-400 animate-pulse";

      case "high":
        return "bg-red-500 animate-ping";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          🏟 Interactive Stadium Heatmap
        </h2>

        <span className="text-cyan-400 font-semibold">
          Scenario: {state.scenario}
        </span>
      </div>

      <div className="relative mx-auto h-[400px] max-w-xl rounded-full border-8 border-slate-700 bg-slate-950">

        <div className="absolute inset-[70px] rounded-lg border-2 border-green-500 bg-green-900/20">

          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-green-500"></div>

          <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-green-500"></div>

        </div>

        {zones.map((zone) => (

          <div
            key={zone.id}
            className={`absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-center text-xs font-bold text-black shadow-lg transition-all duration-700 ${colorClass(
              zone.level
            )}`}
            style={{
              left: zone.x,
              top: zone.y,
            }}
          >
            {zone.label}
          </div>

        ))}

      </div>

      <div className="mt-6 flex justify-between text-sm text-slate-400">

        <span>🟢 Low</span>

        <span>🟡 Medium</span>

        <span>🔴 High</span>

      </div>

    </div>
  );
}