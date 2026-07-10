import { useState } from "react";

interface SearchPanelProps {
  onSearch: (query: string) => void;
}

export default function SearchPanel({
  onSearch,
}: SearchPanelProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">
        Smart Navigation
      </h2>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search Gate A, Food Court, Parking..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-xl bg-slate-800 px-4 py-3 text-white outline-none border border-slate-700 focus:border-cyan-500"
        />

        <button
          onClick={() => onSearch(query)}
          className="px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}