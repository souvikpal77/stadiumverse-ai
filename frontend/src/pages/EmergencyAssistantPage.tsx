import React from "react";

export default function EmergencyAssistantPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold mb-3">
        🚨 Emergency AI Assistant
      </h1>

      <p className="text-slate-400 mb-10">
        AI-powered emergency response system for safer stadium operations.
      </p>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Emergency Status */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-red-500/30 p-8">

          <h2 className="text-2xl font-bold mb-8">
            Live Emergency Dashboard
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between border-b border-slate-700 pb-3">
              <span>🚑 Medical Team</span>
              <span className="text-green-400">Available</span>
            </div>

            <div className="flex justify-between border-b border-slate-700 pb-3">
              <span>🚒 Fire Unit</span>
              <span className="text-green-400">Ready</span>
            </div>

            <div className="flex justify-between border-b border-slate-700 pb-3">
              <span>👮 Security Team</span>
              <span className="text-yellow-400">Monitoring</span>
            </div>

            <div className="flex justify-between border-b border-slate-700 pb-3">
              <span>🚪 Emergency Exits</span>
              <span className="text-green-400">8 Open</span>
            </div>

            <div className="flex justify-between">
              <span>📍 Current Alert</span>
              <span className="text-red-400">
                Medical Emergency - Block C
              </span>
            </div>

          </div>

        </div>

        {/* AI Response */}
        <div className="bg-gradient-to-br from-red-900/40 to-slate-900 rounded-2xl border border-red-500 p-8">

          <h2 className="text-2xl font-bold text-red-400 mb-6">
            🤖 AI Response
          </h2>

          <div className="space-y-5 text-slate-300">

            <p>
              🚨 Medical emergency detected near Block C.
            </p>

            <p>
              🚑 Dispatching nearest medical team...
            </p>

            <p>
              📍 Estimated arrival:
              <span className="text-green-400 font-bold">
                {" "}2 minutes
              </span>
            </p>

            <p>
              🚪 Visitors nearby are advised to use Exit 4.
            </p>

            <p>
              🤖 AI Confidence:
              <span className="text-cyan-400 font-bold">
                {" "}98%
              </span>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}