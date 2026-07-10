import { useState } from "react";
import { NavigationState } from "../types/navigation";
import { searchDestination } from "../services/navigation";

export function useNavigation() {
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

    const route = await searchDestination(query);

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