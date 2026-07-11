import React from "react";

export default function VolunteerHeader() {
  return (
    <div className="rounded-2xl border border-blue-500/30 bg-slate-900 p-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-white">
            🙋 Volunteer Assistant
          </h1>

          <p className="mt-2 text-slate-400">
            AI-powered volunteer management for FIFA World Cup 2026.
          </p>
        </div>

        <div className="rounded-xl bg-green-500/20 px-4 py-2">
          <span className="font-semibold text-green-400">
            🟢 On Duty
          </span>
        </div>

      </div>

    </div>
  );
}