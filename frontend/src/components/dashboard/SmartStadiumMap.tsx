import React, { useEffect, useState } from "react";
import DashboardService from "../../services/dashboard";
import GateDetailsModal from "./GateDetailsModal";

interface GateInfo {
  status: string;
  crowd_level: string;
  wait_time: string;
  occupancy: string;
  recommendation: string;
}

interface SystemInfo {
  stadiumHealth: number;
  crowdLevel: number;
  activeGate: string;
  navigationUsers: number;
  emergency: boolean;
  scenario: string;
  event: string;
  weather: string;
}

export default function SmartStadiumMap() {

  const [crowd, setCrowd] = useState<any>({});
  const [parking, setParking] = useState<any>({});

  const [system, setSystem] = useState<SystemInfo>({
    stadiumHealth: 0,
    crowdLevel: 0,
    activeGate: "",
    navigationUsers: 0,
    emergency: false,
    scenario: "",
    event: "",
    weather: "",
  });

  const [selectedGate, setSelectedGate] =
    useState<(GateInfo & { name: string }) | null>(null);

  const [emergency, setEmergency] = useState<any>({
  active: false,
});

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
      const data = await DashboardService.getDashboardStatus();

      setSystem({
        stadiumHealth: data.stadium_health,
        crowdLevel: data.crowd_level,
        activeGate: data.recommended_gate,
        navigationUsers: data.navigation_users,
        emergency: data.alerts.length > 0,
        scenario: data.system_status,
        event: data.event,
        weather: data.weather,
      });

    } catch (err) {
      console.error(err);
    }
  }

  async function loadEmergency() {
  try {
    const data = await DashboardService.getEmergencyStatus();
    setEmergency(data);
  } catch (err) {
    console.error(err);
  }
}

  useEffect(() => {

    loadCrowd();
    loadParking();
    loadSystem();
    loadEmergency();

    const timer = setInterval(() => {

      loadCrowd();
      loadParking();
      loadSystem();
      loadEmergency();

    }, 5000);

    return () => clearInterval(timer);

  }, []);
  return (
  <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8">

    <h2 className="text-3xl font-bold text-cyan-400 mb-8">
      🗺 Smart Stadium Map
    </h2>

  {emergency.active && (

  <div className="mb-6 rounded-xl bg-red-900 border border-red-500 p-5">

    <h3 className="text-2xl font-bold text-red-300">
      🚨 {emergency.type}
    </h3>

    <p className="mt-2">
      📍 {emergency.location}
    </p>

    <p className="mt-2">
      {emergency.message}
    </p>

    <p className="mt-3 text-yellow-300 font-bold">
      👉 AI recommends using
      {" "}
      {emergency.recommended_gate}
    </p>

  </div>

)}

    {/* Gates */}

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

      {["Gate A", "Gate B", "Gate C", "Gate D"].map((gate) => {

        const item = crowd.gates?.[gate];

        if (!item) return null;

        let bgClass =
          "bg-green-500/20 border border-green-500 text-green-400";

        if (
  emergency.active &&
  emergency.recommended_gate === gate
) {
  bgClass =
    "bg-cyan-500/30 border-4 border-cyan-400 text-cyan-300 animate-pulse";
}

        if (item.status === "🟡") {
          bgClass =
            "bg-yellow-500/20 border border-yellow-500 text-yellow-400";
        }

        if (item.status === "🔴") {
          bgClass =
            "bg-red-500/20 border border-red-500 text-red-400";
        }

        return (

          <div
            key={gate}
            onClick={() =>
              setSelectedGate({
                name: gate,
                ...item,
              })
            }
            className={`${bgClass} rounded-xl p-6 text-center cursor-pointer hover:scale-105 transition-all duration-300`}
          >

            <div className="text-5xl">
              {item.status}
            </div>

            <h3 className="mt-3 font-bold">
              {gate}
            </h3>

            <p className="font-semibold">
              {item.crowd_level}
            </p>

            <p className="text-sm text-slate-300 mt-2">
              Wait : {item.wait_time}
            </p>

            <p className="text-xs text-slate-400">
              Occupancy : {item.occupancy}
            </p>

          </div>

        );

      })}

    </div>

    {/* Information Cards */}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

      {/* Parking */}

      <div className="rounded-xl bg-blue-500/20 border border-blue-500 p-6">

        <h3 className="text-xl font-bold mb-4">
          🚗 Parking
        </h3>

        {Object.entries(parking).map(([name, value]: any) => (

          <div
            key={name}
            className="flex justify-between py-1"
          >

            <span>{name}</span>

            <span className="text-cyan-400">

              {value.available}/{value.capacity}

            </span>

          </div>

        ))}

      </div>

      {/* Stadium Status */}

      <div className="rounded-xl bg-orange-500/20 border border-orange-500 p-6">

        <h3 className="text-xl font-bold mb-4">

          📢 Stadium Status

        </h3>

        <div className="space-y-3">

          <p>
            🏆 {system.event}
          </p>

          <p>
            🌤 {system.weather}
          </p>

          <p>
            👥 Crowd : {system.crowdLevel}%
          </p>

          <p>
            🚪 Recommended Gate : {system.activeGate}
          </p>

        </div>

      </div>

      {/* AI */}

      <div className="rounded-xl bg-cyan-500/20 border border-cyan-500 p-6">

        <h3 className="text-xl font-bold mb-4">

          🤖 AI Status

        </h3>

        <div className="space-y-3">

          <p>
            ❤️ Health : {system.stadiumHealth}%
          </p>

          <p>
            🧭 Navigation : {system.navigationUsers}
          </p>

          <p>
            🚨 Emergency : {system.emergency ? "YES" : "NO"}
          </p>

          <p>
            ⚙ Scenario : {system.scenario}
          </p>

        </div>

      </div>

    </div>

    {/* Live Status */}

    <div className="mt-8 rounded-xl bg-slate-800 border border-cyan-500 p-6">

      <h3 className="text-2xl font-bold text-cyan-400 mb-4">

        🖥 Stadium Live Status

      </h3>

      <div className="grid md:grid-cols-2 gap-4">

        <p>🏟 Stadium Health :
          <span className="text-green-400 font-bold ml-2">
            {system.stadiumHealth}%
          </span>
        </p>

        <p>🌤 Weather :
          <span className="text-cyan-400 font-bold ml-2">
            {system.weather}
          </span>
        </p>

        <p>👥 Crowd :
          <span className="text-yellow-400 font-bold ml-2">
            {system.crowdLevel}%
          </span>
        </p>

        <p>🚪 Active Gate :
          <span className="text-green-400 font-bold ml-2">
            {system.activeGate}
          </span>
        </p>

        <p>🧭 Navigation :
          <span className="text-blue-400 font-bold ml-2">
            {system.navigationUsers}
          </span>
        </p>

        <p>⚙ Scenario :
          <span className="text-purple-400 font-bold ml-2">
            {system.scenario}
          </span>
        </p>

      </div>

    </div>
        {/* Gate Details Modal */}

    <GateDetailsModal
      gate={selectedGate}
      system={system}
      onClose={() => setSelectedGate(null)}
    />

  </div>
);
}