import { RouteInfo } from "../../../types/navigation";

interface RouteCardProps {
  route: RouteInfo | null;
}

export default function RouteCard({ route }: RouteCardProps) {
  if (!route) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-slate-400">
        Search for a destination to see navigation instructions.
      </div>
    );
  }

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-cyan-400">
          {route.destination.title}
        </h2>

        <p className="text-slate-300">
          📍 {route.destination.location}
        </p>

        <p className="text-slate-400">
          🚶 {route.destination.walkingTime} • 📏 {route.destination.distance}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">
          Route Instructions
        </h3>

        <ol className="space-y-2 list-decimal list-inside">
          {route.steps.map((step, index) => (
            <li key={index} className="text-slate-300">
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}