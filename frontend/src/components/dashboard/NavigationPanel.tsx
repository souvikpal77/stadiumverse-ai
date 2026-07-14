import React, { useEffect, useState } from "react";
import DashboardService from "../../services/dashboard";

interface Props {
  gate: string;
  onClose: () => void;
}

export default function NavigationPanel({
  gate,
  onClose,
}: Props) {

  const [route, setRoute] = useState<any>(null);

  useEffect(() => {

    async function loadRoute() {
      try {
        const data: any = await DashboardService.getRoutes();
        setRoute(data[gate]);
      } catch (err) {
        console.error(err);
      }
    }

    loadRoute();

  }, [gate]);

  if (!route) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-slate-900 rounded-2xl p-8 text-cyan-400">
          Loading Route...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="w-[650px] rounded-3xl bg-slate-900 border border-cyan-500 p-8">

        <div className="flex justify-between items-center">

          <h2 className="text-3xl font-bold text-cyan-400">
            🗺 AI Navigation
          </h2>

          <button
            onClick={onClose}
            className="text-red-400 text-2xl"
          >
            ✖
          </button>

        </div>

        <div className="mt-8 space-y-5">

          {route.path.map((step: string, index: number) => (

            <div key={index}>

              <div className="rounded-xl bg-slate-800 border border-cyan-500 p-4 text-center font-semibold text-cyan-300">

                {step}

              </div>

              {index !== route.path.length - 1 && (

                <div className="text-center text-3xl text-cyan-400 my-2">

                  ⬇

                </div>

              )}

            </div>

          ))}

        </div>

        <div className="grid grid-cols-2 gap-6 mt-8">

          <div className="rounded-xl bg-slate-800 p-4 text-center">

            🚶 Walking Time

            <div className="text-green-400 text-xl font-bold mt-2">

              {route.walking_time}

            </div>

          </div>

          <div className="rounded-xl bg-slate-800 p-4 text-center">

            📍 Distance

            <div className="text-cyan-400 text-xl font-bold mt-2">

              {route.distance}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}