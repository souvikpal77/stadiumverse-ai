import { useAI } from "../../context/AIContext";

export default function AICommandCenter() {
  const { state } = useAI();

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-lg shadow-cyan-500/10">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-cyan-400">
          🤖 AI Command Center
        </h2>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-green-400 text-sm font-semibold">
            LIVE
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">

        <div className="rounded-xl bg-slate-800/60 p-4">
          <p className="text-slate-400">👥 Crowd Level</p>
          <h3 className="text-3xl font-bold text-cyan-400">
            {state.crowdLevel}%
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800/60 p-4">
          <p className="text-slate-400">🚪 Recommended Gate</p>
          <h3 className="text-3xl font-bold text-green-400">
            {state.activeGate}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800/60 p-4">
          <p className="text-slate-400">📍 Navigation Users</p>
          <h3 className="text-3xl font-bold text-blue-400">
            {state.navigationUsers}
          </h3>
        </div>

        <div className="rounded-xl bg-slate-800/60 p-4">
          <p className="text-slate-400">❤️ Stadium Health</p>
          <h3 className="text-3xl font-bold text-emerald-400">
            {state.stadiumHealth}%
          </h3>
        </div>

      </div>

      <div className="mt-6 rounded-xl bg-slate-800/60 p-4">
        <p className="text-slate-400 mb-2">🚨 Emergency Status</p>

        <h3
          className={`text-2xl font-bold ${
            state.emergency
              ? "text-red-400"
              : "text-green-400"
          }`}
        >
          {state.emergency
            ? "Emergency Detected"
            : "Normal"}
        </h3>
      </div>

    </div>
  );
}