import { useEffect, useState } from "react";
import DashboardService from "../../services/dashboard";

type Emergency = {
  active: boolean;
  type?: string;
  location?: string;
  message?: string;
  recommended_gate?: string;
};

const normalEvents = [
  "AI analyzed crowd movement across all gates.",
  "Navigation routes optimized for faster entry.",
  "Parking availability updated successfully.",
  "Multilingual announcements synchronized.",
  "Volunteer assignments refreshed.",
  "Crowd prediction model completed successfully.",
];

const emergencyEvents = [
  "🚨 High crowd detected at Gate A.",
  "🚓 Security team dispatched.",
  "🚑 Emergency response activated.",
  "🚪 AI recommends opening Gate C.",
  "🏥 Medical assistance notified.",
];

export default function AIOperationsCenter() {
  const [logs, setLogs] = useState<string[]>([]);

  const [emergency, setEmergency] = useState<Emergency>({
    active: false,
  });

  async function loadEmergency() {
    try {
      const data = (await DashboardService.getEmergencyStatus()) as Emergency;
      setEmergency(data || { active: false });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadEmergency();

    const timer = setInterval(async () => {
      const data = (await DashboardService.getEmergencyStatus()) as Emergency | undefined | null;
      setEmergency((data as Emergency) || { active: false });

      const message = (data && data.active) || false
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
  }, []);

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

      {emergency.active && (

        <div className="mb-5 rounded-xl bg-red-900 border border-red-500 p-4">

          <h3 className="text-xl font-bold text-red-300">
            🚨 {emergency.type}
          </h3>

          <p className="mt-2">
            📍 {emergency.location}
          </p>

          <p className="mt-2">
            {emergency.message}
          </p>

          <p className="mt-3 font-bold text-yellow-300">
            Recommended Gate: {emergency.recommended_gate}
          </p>

        </div>

      )}

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