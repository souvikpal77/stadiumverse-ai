import React, { useEffect, useState } from "react";
import DashboardService from "../../services/dashboard";

export default function EmergencySimulation() {
  const [emergency, setEmergency] = useState<any>({});

  async function loadEmergency() {
    try {
      const data = await DashboardService.getEmergencyStatus();
      setEmergency(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadEmergency();

    const timer = setInterval(loadEmergency, 3000);

    return () => clearInterval(timer);
  }, []);

  async function triggerFire() {
    await DashboardService.triggerEmergency({
      active: true,
      type: "Fire Emergency",
      location: "Gate C",
      message: "Fire detected near Gate C. Visitors are being rerouted.",
      recommended_gate: "Gate D",
    });

    loadEmergency();
  }

  async function clearEmergency() {
    await DashboardService.triggerEmergency({
      active: false,
      type: "",
      location: "",
      message: "",
      recommended_gate: "",
    });

    loadEmergency();
  }

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 mt-8">

      <div className="flex justify-between items-center">

        <h2 className="text-3xl font-bold text-red-400">
          🚨 Emergency Simulation
        </h2>

        <div className="space-x-3">

          <button
            onClick={triggerFire}
            className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700"
          >
            Simulate Fire
          </button>

          <button
            onClick={clearEmergency}
            className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700"
          >
            Clear
          </button>

        </div>

      </div>

      {emergency.active ? (

        <div className="mt-8 rounded-xl bg-red-900 border border-red-500 p-6">

          <h3 className="text-2xl font-bold text-red-300">
            🚨 {emergency.type}
          </h3>

          <p className="mt-3">
            📍 {emergency.location}
          </p>

          <p className="mt-2">
            {emergency.message}
          </p>

          <p className="mt-4 text-yellow-300 font-bold">
            Recommended Gate:
            {" "}
            {emergency.recommended_gate}
          </p>

        </div>

      ) : (

        <div className="mt-8 rounded-xl bg-green-900 border border-green-600 p-6">

          <h3 className="text-2xl text-green-300 font-bold">
            ✅ No Active Emergency
          </h3>

          <p className="mt-2">
            Stadium is operating normally.
          </p>

        </div>

      )}

    </div>
  );
}