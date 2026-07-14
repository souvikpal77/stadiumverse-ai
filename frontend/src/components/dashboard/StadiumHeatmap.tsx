import React, { useEffect, useState } from "react";
import DashboardService from "../../services/dashboard";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

export default function StadiumHeatmap() {
  const [data, setData] = useState<any[]>([]);

  async function loadData() {
    try {
      const crowd = await DashboardService.getCrowdStatus();

      const gates = crowd.gates || {};

      const chartData = Object.entries(gates).map(
        ([gate, value]: any) => ({
          gate,
          occupancy: parseInt(value.occupancy.replace("%", "")),
        })
      );

      setData(chartData);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadData();

    const timer = setInterval(loadData, 5000);

    return () => clearInterval(timer);
  }, []);

  function getColor(value: number) {
    if (value < 35) return "#22c55e";
    if (value < 70) return "#facc15";
    return "#ef4444";
  }

  return (
    <div className="rounded-2xl bg-slate-900 border border-cyan-500 p-6 mt-8">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        🔥 Stadium Crowd Heatmap
      </h2>

      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer>

          <BarChart data={data}>

            <XAxis dataKey="gate" />

            <YAxis domain={[0, 100]} />

            <Tooltip />

            <Bar dataKey="occupancy">

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={getColor(entry.occupancy)}
                />

              ))}

            </Bar>

          </BarChart>

        </ResponsiveContainer>
      </div>

    </div>
  );
}