import React from "react";

const history = [
  {
    original: "Where is Gate A?",
    translated: "¿Dónde está la Puerta A?"
  },
  {
    original: "Medical Help",
    translated: "Ayuda Médica"
  },
  {
    original: "Food Court",
    translated: "Patio de Comidas"
  }
];

export default function TranslateHistory() {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">

      <h3 className="text-lg font-semibold text-white mb-4">
        📜 Translation History
      </h3>

      <div className="space-y-4">

        {history.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-slate-700 bg-slate-800 p-4"
          >
            <p className="text-white">
              {item.original}
            </p>

            <p className="text-cyan-400 mt-2">
              {item.translated}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}