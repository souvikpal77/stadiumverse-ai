import SearchPanel from "../components/common/navigation/SearchPanel";
import RouteCard from "../components/common/navigation/RouteCard";
import { useNavigation } from "../hooks/useNavigation";

export default function SmartNavigationPage() {
  const { state, findRoute } = useNavigation();

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        <h1 className="text-4xl font-bold">
          Smart Stadium Navigation
        </h1>

        <p className="text-slate-400">
          Search any gate, food court, parking area or seat.
        </p>

        <SearchPanel onSearch={findRoute} />

        {state.loading && (
          <div className="text-cyan-400">
            Searching...
          </div>
        )}

        <RouteCard route={state.route} />

      </div>
    </div>
  );
}