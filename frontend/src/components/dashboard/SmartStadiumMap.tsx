import React, { useEffect, useState } from "react";
import DashboardService from "../../services/dashboard";

export default function SmartStadiumMap() {
 const [crowd, setCrowd] = useState<any>({});
 const [parking, setParking] = useState<any>({});
 const [system, setSystem] = useState<any>({});

  async function loadCrowd() {
    try {
      const data = await DashboardService.getCrowdStatus();
      setCrowd(data);
    } catch (err) {
      console.error(err);
    }
  }
  
  async function loadParking() {
  try {
    const data = await DashboardService.getParkingStatus();
    setParking(data);
  } catch (err) {
    console.error(err);
  }
}

async function loadSystem() {
  try {
    const data = await DashboardService.getSystemStatus();
    setSystem(data);
  } catch (err) {
    console.error(err);
  }
}

  useEffect(() => {
    loadCrowd();
    loadParking();
    loadSystem();

    const timer = setInterval(() => {
  loadCrowd();
  loadParking();
  loadSystem();
}, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8">

      <h2 className="text-3xl font-bold text-cyan-400 mb-8">
        🗺 Smart Stadium Map
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {["Gate A", "Gate B", "Gate C", "Gate D"].map((gate) => {

          const item = crowd[gate];

          if (!item) return null;

          let bgClass = "bg-green-500/20 border-green-500 text-green-400";

          if (item.status === "🟡") {
            bgClass = "bg-yellow-500/20 border-yellow-500 text-yellow-400";
          }

          if (item.status === "🔴") {
            bgClass = "bg-red-500/20 border-red-500 text-red-400";
          }

          // determine color for text utility (fallback to green)
          return (
            <div
              key={gate}
              className={`rounded-xl ${bgClass} p-6 text-center hover:scale-105 transition`}
            >
              <div className="text-5xl">{item.status}</div>

              <h3 className="mt-3 font-bold">
                {gate}
              </h3>

              <p className="font-semibold">
                {item.crowd_level}
              </p>

              <p className="text-sm text-slate-400 mt-2">
                Wait: {item.wait_time}
              </p>

              <p className="text-xs text-slate-500">
                {item.occupancy}
              </p>

            </div>
          );

        })}

      </div>

      <div className="grid grid-cols-3 gap-6 mt-8">

        <div className="rounded-xl bg-blue-500/20 border border-blue-500 p-6">

  <div className="text-4xl text-center">🚗</div>

  <h3 className="font-bold text-center mt-2">
    Parking
  </h3>

  <div className="mt-4 space-y-2 text-sm">

    {Object.entries(parking).map(([name, value]: any) => (

      <div
        key={name}
        className="flex justify-between"
      >
        <span>{name}</span>

        <span className="text-cyan-400">
          {value.available}/{value.capacity}
        </span>

      </div>

    ))}

  </div>

</div>

        <div className="rounded-xl bg-orange-500/20 border border-orange-500 p-6">

  <div className="text-4xl text-center">📢</div>

  <h3 className="font-bold text-center mt-2">
    Stadium Status
  </h3>

  <div className="mt-4 space-y-2 text-sm">

    <div className="flex justify-between">
      <span>Event</span>
      <span className="text-cyan-400">
        {system.event}
      </span>
    </div>

    <div className="flex justify-between">
      <span>Weather</span>
      <span className="text-green-400">
        {system.weather}
      </span>
    </div>

    <div className="flex justify-between">
      <span>Crowd</span>
      <span className="text-yellow-400">
        {system.crowdLevel}%
      </span>
    </div>

    <div className="flex justify-between">
      <span>Recommended Gate</span>
      <span className="text-cyan-400">
        {system.activeGate}
      </span>
    </div>

  </div>

</div>
        <div className="rounded-xl bg-cyan-500/20 border border-cyan-500 p-6">

  <div className="text-4xl text-center">🧠</div>

  <h3 className="font-bold text-center mt-2">
    AI Status
  </h3>

  <div className="mt-4 space-y-2 text-sm">

    <div className="flex justify-between">
      <span>Health</span>
      <span className="text-green-400">
        {system.stadiumHealth}%
      </span>
    </div>

    <div className="flex justify-between">
      <span>Navigation</span>
      <span className="text-blue-400">
        {system.navigationUsers}
      </span>
    </div>

    <div className="flex justify-between">
      <span>Emergency</span>
      <span className={system.emergency ? "text-red-400" : "text-green-400"}>
        {system.emergency ? "YES" : "NO"}
      </span>
    </div>

    <div className="flex justify-between">
      <span>Scenario</span>
      <span className="text-cyan-400">
        {system.scenario}
      </span>
    </div>

  </div>

</div>

{/* Stadium Live Status */}

</div>

<div className="mt-8 rounded-xl bg-slate-800 border border-cyan-500 p-6">

  <h3 className="text-2xl font-bold text-cyan-400 mb-4">
    🖥 Stadium Live Status
  </h3>

  <div className="grid md:grid-cols-2 gap-4">

    <p>
      🏟 Stadium Health:
      <span className="text-green-400 font-bold">
        {" "}
        {system.stadiumHealth}%
      </span>
    </p>

    <p>
      🌤 Weather:
      <span className="text-cyan-400 font-bold">
        {" "}
        {system.weather}
      </span>
    </p>

    <p>
      👥 Crowd Level:
      <span className="text-yellow-400 font-bold">
        {" "}
        {system.crowdLevel}%
      </span>
    </p>

    <p>
      🚪 Active Gate:
      <span className="text-green-400 font-bold">
        {" "}
        {system.activeGate}
      </span>
    </p>

    <p>
      🧭 Navigation Users:
      <span className="text-blue-400 font-bold">
        {" "}
        {system.navigationUsers}
      </span>
    </p>

    <p>
      ⚙ Scenario:
      <span className="text-purple-400 font-bold">
        {" "}
        {system.scenario}
      </span>
    </p>

  </div>

</div>

</div>

);
}