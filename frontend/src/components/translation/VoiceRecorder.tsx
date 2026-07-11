import React from "react";

export default function VoiceRecorder() {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">

      <h3 className="text-lg font-semibold text-white mb-4">
        🎤 Voice Translation
      </h3>

      <div className="flex gap-4">

        <button className="flex-1 rounded-lg bg-red-500 py-3 font-semibold hover:bg-red-400 transition">
          🎙 Start Recording
        </button>

        <button className="flex-1 rounded-lg bg-green-500 py-3 font-semibold hover:bg-green-400 transition">
          🔊 Speak Result
        </button>

      </div>

      <p className="mt-4 text-slate-400 text-sm">
        Voice recognition and AI speech will be connected in the next phase.
      </p>

    </div>
  );
}