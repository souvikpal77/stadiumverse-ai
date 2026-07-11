import { useEffect, useState } from "react";
import { useAI } from "../../context/AIContext";

const normalEvents = [
  "AI analyzed crowd movement across all gates.",
  "Navigation routes optimized for faster entry.",
  "Parking availability updated successfully.",
  "Multilingual announcements synchronized.",
  "Volunteer assignments refreshed.",
  "Crowd prediction model completed successfully.",
];

const emergencyEvents = [
  "High crowd detected at Gate A.",
  "Security team dispatched.",
  "Emergency route activated.",
  "AI recommends opening Gate C.",
  "Medical assistance notified.",
];

export default function AIOperationsCenter() {
  const { state } = useAI();

  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      const message = state.emergency
        ? emergencyEvents[
            Math.floor(Math.random() * emergencyEvents.length)
          ]
        : normalEvents[
            Math.floor(Math.random() * normalEvents.length)
          ];

      const time = new Date().toLocaleTimeString();

      setLogs((prev) => [
        `[${time}] ${message}`,
        ...prev,
      ].slice(0, 8));
    }, 4000);

    return () => clearInterval(timer);
  }, [state.emergency]);

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-slate-900 p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-cyan-400">
          🤖 AI Operations Center
        </h2>

        <span className="text-green-400 animate-pulse font-semibold">
          ● LIVE
        </span>

      </div>

      <div className="space-y-3">

        {logs.length === 0 && (
          <p className="text-slate-400">
            Waiting for AI events...
          </p>
        )}

        {logs.map((log, index) => (

          <div
            key={index}
            className="rounded-lg bg-slate-800 p-3 border border-slate-700"
          >
            {log}
          </div>

        ))}

      </div>

    </div>
  );
}