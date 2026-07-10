import NavigationLayout from "../components/common/navigation/NavigationLayout";
import SearchPanel from "../components/common/navigation/SearchPanel";
import RouteCard from "../components/common/navigation/RouteCard";
import StadiumMap from "../components/common/navigation/StadiumMap";
import { useNavigation } from "../hooks/useNavigation";

export default function SmartNavigationPage() {
  const { state, findRoute } = useNavigation();

  return (
    <NavigationLayout>
      <div className="space-y-8">

        {/* Page Heading */}
        <div>
          <h1 className="text-5xl font-bold text-white">
            🗺️ Smart Stadium Navigation
          </h1>

          <p className="text-slate-400 mt-3 max-w-2xl">
            Search any gate, seat, food court, parking area, or washroom.
            AI will instantly guide you with the fastest walking route.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Left Side */}
          <div className="space-y-6">

            <SearchPanel onSearch={findRoute} />

            {state.loading && (
              <div className="bg-slate-900 border border-blue-500/20 rounded-xl p-6 text-blue-400">
                🔍 Searching best route...
              </div>
            )}

            <RouteCard route={state.route} />

          </div>

          {/* Right Side */}
          <div>
            <StadiumMap route={state.route} />
          </div>

        </div>

      </div>
    </NavigationLayout>
  );
}