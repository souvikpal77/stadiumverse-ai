import React from "react";

export default function LanguageSelector() {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <h3 className="text-lg font-semibold text-white mb-4">
        🌍 Language Selector
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <select className="rounded-lg bg-slate-800 border border-slate-700 p-3 text-white">
          <option>English</option>
          <option>Hindi</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
          <option>Japanese</option>
        </select>

        <select className="rounded-lg bg-slate-800 border border-slate-700 p-3 text-white">
          <option>Spanish</option>
          <option>English</option>
          <option>Hindi</option>
          <option>French</option>
          <option>German</option>
          <option>Japanese</option>
        </select>
      </div>
    </div>
  );
}