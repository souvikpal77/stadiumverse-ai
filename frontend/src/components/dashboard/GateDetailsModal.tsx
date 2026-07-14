import React, { useEffect, useState } from "react";
import NavigationPanel from "./NavigationPanel";
import DashboardService from "../../services/dashboard";

interface Props {
  gate: any;
  system: any;
  onClose: () => void;
}

export default function GateDetailsModal({
  gate,
  system,
  onClose,
}: Props) {

  const [showNavigation, setShowNavigation] = useState(false);
  const [predictions, setPredictions] = useState<any>({});

  useEffect(() => {
    async function loadPrediction() {
      try {
        const data = await DashboardService.getPredictions();
        setPredictions(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadPrediction();
  }, []);

  if (!gate) return null;

  const prediction = predictions[gate.name];

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

        <div className="w-[720px] rounded-3xl bg-slate-900 border border-cyan-500 p-8 shadow-2xl">

          <div className="flex justify-between items-center">

            <h2 className="text-3xl font-bold text-cyan-400">
              📍 {gate.name}
            </h2>

            <button
              onClick={onClose}
              className="text-red-400 text-2xl"
            >
              ✖
            </button>

          </div>

          <div className="grid grid-cols-2 gap-8 mt-8">

            <div>

              <h3 className="text-xl font-bold text-cyan-400 mb-4">
                📊 Current Status
              </h3>

              <div className="space-y-3">

                <p>👥 Crowd : <span className="text-cyan-400">{gate.crowd_level}</span></p>

                <p>⏳ Wait : <span className="text-yellow-400">{gate.wait_time}</span></p>

                <p>📈 Occupancy : <span className="text-green-400">{gate.occupancy}</span></p>

                <p>⭐ Recommendation : <span className="text-purple-400">{gate.recommendation}</span></p>

              </div>

            </div>

            <div>

              <h3 className="text-xl font-bold text-cyan-400 mb-4">
                🤖 AI Crowd Prediction
              </h3>

              {prediction ? (

                <div className="space-y-3">

                  <p>
                    Prediction :
                    <span className="text-green-400 ml-2">
                      {prediction.prediction}
                    </span>
                  </p>

                  <p>
                    Future Wait :
                    <span className="text-yellow-400 ml-2">
                      {prediction.future_wait}
                    </span>
                  </p>

                  <p>
                    Confidence :
                    <span className="text-cyan-400 ml-2">
                      {prediction.confidence}%
                    </span>
                  </p>

                </div>

              ) : (

                <p>Loading AI Prediction...</p>

              )}

              <div className="grid grid-cols-2 gap-3 mt-8">

                <button
                  onClick={() => setShowNavigation(true)}
                  className="rounded-xl bg-cyan-500 py-3 font-bold"
                >
                  🗺 Navigate
                </button>

                <button className="rounded-xl bg-red-500 py-3 font-bold">
                  🚔 Security
                </button>

                <button className="rounded-xl bg-orange-500 py-3 font-bold">
                  🍔 Food
                </button>

                <button className="rounded-xl bg-blue-500 py-3 font-bold">
                  🚻 Restroom
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

      {showNavigation && (
        <NavigationPanel
          gate={gate.name}
          onClose={() => setShowNavigation(false)}
        />
      )}

    </>
  );
}