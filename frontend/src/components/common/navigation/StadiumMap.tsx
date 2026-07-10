import { RouteInfo } from "../../../types/navigation";

interface StadiumMapProps {
  route: RouteInfo | null;
}

export default function StadiumMap({ route }: StadiumMapProps) {
  const destination = route?.destination;

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-white mb-6">
        🗺️ Stadium Map
      </h2>

      <div className="relative h-96 rounded-xl border-2 border-dashed border-cyan-500/40 bg-slate-950 overflow-hidden">

        {/* Stadium Boundary */}
        <div className="absolute inset-6 rounded-full border-4 border-slate-700 bg-slate-900">

          {/* Football Field */}
          <div className="absolute inset-16 rounded-xl border-2 border-green-500 bg-green-900/20">

            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-green-500 -translate-x-1/2"></div>

            <div className="absolute left-1/2 top-1/2 h-20 w-20 rounded-full border-2 border-green-500 -translate-x-1/2 -translate-y-1/2"></div>

          </div>

          {/* User */}
          <div className="absolute left-12 bottom-16 bg-blue-600 px-3 py-1 rounded-lg text-white text-sm font-semibold shadow-lg">
            📍 You
          </div>

          {/* Gate */}
          <div
  className={`absolute top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-sm font-bold ${
    destination?.type === "gate"
      ? "bg-emerald-500 text-black"
      : "bg-slate-700 text-white"
  }`}
>
  🚪 Gate A
</div>

          {/* Food */}
          <div
  className={`absolute right-10 top-24 px-3 py-1 rounded-lg text-sm font-bold ${
    destination?.type === "food"
      ? "bg-orange-500 text-black"
      : "bg-slate-700 text-white"
  }`}
>
  🍔 Food
</div>

          {/* Washroom */}
          <div
  className={`absolute left-10 top-24 px-3 py-1 rounded-lg text-sm font-bold ${
    destination?.type === "washroom"
      ? "bg-cyan-500 text-black"
      : "bg-slate-700 text-white"
  }`}
>
  🚻 Washroom
</div>

          {/* Parking */}
          <div
  className={`absolute right-12 bottom-20 px-3 py-1 rounded-lg text-sm font-bold ${
    destination?.type === "parking"
      ? "bg-yellow-400 text-black"
      : "bg-slate-700 text-white"
  }`}
>
  🅿 Parking
</div>

          {/* Route */}
          {destination && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line
                x1="85"
                y1="255"
                x2="200"
                y2="70"
                stroke="#22d3ee"
                strokeWidth="4"
                strokeDasharray="8 6"
              />
            </svg>
          )}

        </div>
{destination && (
  <div className="absolute bottom-4 left-4 right-4 bg-slate-800/90 border border-cyan-500 rounded-xl p-4 shadow-lg">
    <h3 className="text-cyan-400 font-bold text-lg">
      📍 {destination.title}
    </h3>

    <div className="grid grid-cols-2 gap-3 mt-3 text-sm">

      <div>
        <p className="text-slate-400">Location</p>
        <p className="text-white">{destination.location}</p>
      </div>

      <div>
        <p className="text-slate-400">Walking Time</p>
        <p className="text-white">{destination.walkingTime}</p>
      </div>

      <div>
        <p className="text-slate-400">Distance</p>
        <p className="text-white">{destination.distance}</p>
      </div>

      <div>
        <p className="text-slate-400">Accessible</p>
        <p className="text-white">
          {destination.accessible ? "✅ Yes" : "❌ No"}
        </p>
      </div>

    </div>
  </div>
)}
      </div>
    </div>
  );
}