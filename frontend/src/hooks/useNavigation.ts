import { useState } from "react";
import { NavigationState } from "../types/navigation";
import { searchDestination } from "../services/navigation";
import { useAI } from "../context/AIContext";

export function useNavigation() {
  const { state: aiState } = useAI();

  const [state, setState] = useState<NavigationState>({
    search: "",
    loading: false,
    route: null,
  });

  async function findRoute(query: string) {
    if (!query.trim()) return;

    setState((prev) => ({
      ...prev,
      loading: true,
      search: query,
    }));

    // Pass the current AI scenario
    const route = await searchDestination(
      query,
      aiState.scenario
    );

    console.log(route);

    setState((prev) => ({
      ...prev,
      loading: false,
      route,
    }));
  }

  return {
    state,
    findRoute,
  };
}