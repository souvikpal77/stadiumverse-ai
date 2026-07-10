import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function CrowdAnalyticsChart() {
  const [data, setData] = useState([
    { time: "10:00", crowd: 35 },
    { time: "10:05", crowd: 42 },
    { time: "10:10", crowd: 48 },
    { time: "10:15", crowd: 56 },
    { time: "10:20", crowd: 62 },
    { time: "10:25", crowd: 71 },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setData((prev) => {
        const next = [...prev];

        next.shift();

        const last = prev[prev.length - 1];

        const newValue = Math.min(
          100,
          Math.max(20, last.crowd + Math.floor(Math.random() * 15 - 7))
        );

        const minute = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        next.push({
          time: minute,
          crowd: newValue,
        });

        return next;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-2xl font-bold mb-6">
        📈 Crowd Analytics
      </h2>

      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer>

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

            <XAxis dataKey="time" stroke="#94a3b8" />

            <YAxis stroke="#94a3b8" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="crowd"
              stroke="#06b6d4"
              strokeWidth={4}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />

          </LineChart>

        </ResponsiveContainer>
      </div>

    </div>
  );
}