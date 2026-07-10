import { useEffect, useState } from "react";

export default function MatchCenter() {
  const [minute, setMinute] = useState(45);
  const [attendance, setAttendance] = useState(68540);

  useEffect(() => {
    const timer = setInterval(() => {
      setMinute((prev) => (prev >= 90 ? 90 : prev + 1));

      setAttendance((prev) => {
        const change = Math.floor(Math.random() * 15);
        return prev + change;
      });

    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-2xl font-bold mb-6">
        ⚽ Live Match Center
      </h2>

      <div className="space-y-6">

        <div className="flex justify-between">

          <span className="text-lg">
            🇦🇷 Argentina
          </span>

          <span className="text-3xl font-bold">
            2 - 1
          </span>

          <span className="text-lg">
            🇧🇷 Brazil
          </span>

        </div>

        <div className="flex justify-between">

          <span>
            Match Time
          </span>

          <span className="text-green-400 font-bold">
            {minute}'
          </span>

        </div>

        <div className="flex justify-between">

          <span>
            Stadium Attendance
          </span>

          <span className="text-cyan-400 font-bold">
            {attendance.toLocaleString()}
          </span>

        </div>

        <div className="flex justify-between">

          <span>
            Weather
          </span>

          <span className="text-yellow-400">
            ☀️ 29°C
          </span>

        </div>

        <div className="flex justify-between">

          <span>
            Stadium Status
          </span>

          <span className="text-green-400 font-bold">
            Operational
          </span>

        </div>

      </div>

    </div>
  );
}