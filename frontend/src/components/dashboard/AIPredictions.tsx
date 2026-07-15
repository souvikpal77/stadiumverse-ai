import React, { useEffect, useState } from "react";
import DashboardService from "../../services/dashboard";

export default function AIPredictions() {
  const [predictions, setPredictions] = useState<any>({});

  async function loadPredictions() {
    try {
      const data = await DashboardService.getPredictions();
      setPredictions(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadPredictions();

    const timer = setInterval(loadPredictions, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 mt-8">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">
        🧠 AI Crowd Predictions
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {Object.entries(predictions).map(([gate, value]: any) => {
          let riskColor = "text-green-400";

          if (value.risk === "MEDIUM") riskColor = "text-yellow-400";
          if (value.risk === "HIGH") riskColor = "text-red-400";

          return (
            <div
              key={gate}
              className="rounded-xl bg-slate-800 border border-slate-700 p-5"
            >
              <h3 className="text-xl font-bold text-cyan-400">
                {gate}
              </h3>

              <div className="mt-4 space-y-2 text-sm">

                <p>
                  Prediction:
                  <span className="text-white font-semibold">
                    {" "}
                    {value.prediction}
                  </span>
                </p>

                <p>
                  Future Wait:
                  <span className="text-yellow-400 font-semibold">
                    {" "}
                    {value.future_wait}
                  </span>
                </p>

                <p>
                  Confidence:
                  <span className="text-green-400 font-semibold">
                    {" "}
                    {value.confidence}%
                  </span>
                </p>

                <p>
                  Risk:
                  <span className={`${riskColor} font-bold`}>
                    {" "}
                    {value.risk}
                  </span>
                </p>

                <p className="pt-2 text-cyan-300">
                  🤖 {value.recommendation}
                </p>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}