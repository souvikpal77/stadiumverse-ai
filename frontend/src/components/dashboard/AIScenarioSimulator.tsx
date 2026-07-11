import { useAI, Scenario } from "../../context/AIContext";

const scenarios: {
  icon: string;
  title: Scenario;
  description: string;
  recommendation: string;
}[] = [
  {
    icon: "🟢",
    title: "Normal",
    description: "Stadium operations are running normally.",
    recommendation: "Continue monitoring all systems.",
  },
  {
    icon: "🚨",
    title: "High Crowd",
    description: "Crowd density has exceeded the safe threshold.",
    recommendation:
      "Redirect visitors to Gate B and open Gate C.",
  },
  {
    icon: "🌧",
    title: "Heavy Rain",
    description: "Heavy rain detected around the stadium.",
    recommendation:
      "Use covered entrances and notify visitors.",
  },
  {
    icon: "🚑",
    title: "Medical Emergency",
    description:
      "Medical assistance required inside the stadium.",
    recommendation:
      "Dispatch the nearest medical response team.",
  },
  {
    icon: "⚽",
    title: "Goal Celebration",
    description:
      "Large crowd movement detected after a goal.",
    recommendation:
      "Increase monitoring near exits and stands.",
  },
  {
    icon: "🔥",
    title: "Fire Alarm",
    description:
      "Fire alarm activated near the Food Court.",
    recommendation:
      "Begin evacuation and dispatch fire response.",
  },
];

export default function AIScenarioSimulator() {
  const { state, setScenario } = useAI();

  return (
    <div className="rounded-2xl border border-violet-500/30 bg-slate-900 p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-violet-400">
          🎮 AI Scenario Simulator
        </h2>

        <span className="text-cyan-400 font-semibold">
          Current: {state.scenario}
        </span>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">

        {scenarios.map((scenario) => (

          <button
            key={scenario.title}
            onClick={() => setScenario(scenario.title)}
            className={`rounded-xl border p-4 transition-all duration-300 ${
              state.scenario === scenario.title
                ? "border-violet-500 bg-violet-500/20 scale-105"
                : "border-slate-700 bg-slate-800 hover:border-violet-400"
            }`}
          >
            <div className="text-3xl">
              {scenario.icon}
            </div>

            <div className="mt-2 font-semibold text-sm">
              {scenario.title}
            </div>

          </button>

        ))}

      </div>

      <div className="mt-8 rounded-xl border border-cyan-500/20 bg-slate-800 p-6">

        <h3 className="text-2xl font-bold text-cyan-400">
          {
            scenarios.find(
              s => s.title === state.scenario
            )?.icon
          }{" "}
          {state.scenario}
        </h3>

        <p className="mt-4 text-slate-300">
          {
            scenarios.find(
              s => s.title === state.scenario
            )?.description
          }
        </p>

        <div className="mt-6 rounded-lg bg-slate-900 border border-cyan-500/30 p-5">

          <h4 className="font-bold text-green-400 mb-2">
            🤖 AI Recommendation
          </h4>

          <p className="text-slate-300">
            {
              scenarios.find(
                s => s.title === state.scenario
              )?.recommendation
            }
          </p>

        </div>

      </div>

    </div>
  );
}