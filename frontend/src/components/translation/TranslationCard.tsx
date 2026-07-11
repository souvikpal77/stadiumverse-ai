import React from "react";

export default function TranslationCard() {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">

      <h3 className="text-lg font-semibold text-white mb-4">
        💬 Translation
      </h3>

      <textarea
        placeholder="Type text to translate..."
        className="w-full h-32 rounded-lg bg-slate-800 border border-slate-700 p-4 text-white resize-none"
      />

      <button
        className="mt-4 w-full rounded-lg bg-cyan-500 py-3 font-semibold hover:bg-cyan-400 transition"
      >
        Translate
      </button>

      <div className="mt-6 rounded-lg bg-slate-800 border border-slate-700 p-4">

        <h4 className="text-cyan-400 font-semibold mb-2">
          Result
        </h4>

        <p className="text-slate-300">
          Your translated text will appear here...
        </p>

      </div>

    </div>
  );
}