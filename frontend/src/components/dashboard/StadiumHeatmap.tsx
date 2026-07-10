import { useEffect, useState } from "react";

interface Zone {
  id: string;
  label: string;
  x: string;
  y: string;
  level: "low" | "medium" | "high";
}

export default function StadiumHeatmap() {
  const [zones, setZones] = useState<Zone[]>([
    { id: "A", label: "A", x: "20%", y: "20%", level: "low" },
    { id: "B", label: "B", x: "70%", y: "20%", level: "medium" },
    { id: "C", label: "C", x: "20%", y: "70%", level: "high" },
    { id: "D", label: "D", x: "70%", y: "70%", level: "low" },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setZones((prev) =>
        prev.map((zone) => {
          const levels: Zone["level"][] = ["low", "medium", "high"];
          return {
            ...zone,
            level: levels[Math.floor(Math.random() * levels.length)],
          };
        })
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const colorClass = (level: Zone["level"]) => {
    switch (level) {
      case "low":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-400";
      case "high":
        return "bg-red-500";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold mb-6">
        🏟 Interactive Stadium Heatmap
      </h2>

      <div className="relative mx-auto h-[400px] max-w-xl rounded-full border-8 border-slate-700 bg-slate-950">

        {/* Football Field */}
        <div className="absolute inset-[70px] rounded-lg border-2 border-green-500 bg-green-900/20">
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-green-500"></div>
          <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-green-500"></div>
        </div>

        {zones.map((zone) => (
          <div
            key={zone.id}
            className={`absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-bold text-black shadow-lg transition-all duration-500 ${colorClass(
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

      <div className="mt-6 flex flex-wrap gap-6 text-sm">

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-green-500"></div>
          Low Crowd
        </div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-yellow-400"></div>
          Medium Crowd
        </div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-red-500"></div>
          High Crowd
        </div>

      </div>
    </div>
  );
}