import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Crowd", value: 42 },
  { name: "Medical", value: 8 },
  { name: "Security", value: 12 },
  { name: "Parking", value: 18 },
];

export default function AIIncidentAnalytics() {
  return (
    <div className="rounded-2xl bg-slate-900 border border-cyan-500 p-6">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        📈 AI Incident Analytics
      </h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#06b6d4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}