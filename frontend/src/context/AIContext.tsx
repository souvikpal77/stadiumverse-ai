import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import DashboardService from "../services/dashboard";

export type Scenario =
  | "Normal"
  | "High Crowd"
  | "Heavy Rain"
  | "Medical Emergency"
  | "Goal Celebration"
  | "Fire Alarm";

interface AIState {
  crowdLevel: number;
  emergency: boolean;
  activeGate: string;
  navigationUsers: number;
  stadiumHealth: number;
  scenario: Scenario;
}

interface AIContextType {
  state: AIState;
  setScenario: (scenario: Scenario) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<AIState>({
    crowdLevel: 0,
    emergency: false,
    activeGate: "-",
    navigationUsers: 0,
    stadiumHealth: 0,
    scenario: "Normal",
  });

  function setScenario(scenario: Scenario) {
    setState((prev) => ({
      ...prev,
      scenario,
    }));
  }

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data =
          await DashboardService.getDashboardStatus();

        setState((prev) => ({
          ...prev,
          crowdLevel: data.crowd_level,
          activeGate: data.recommended_gate,
          navigationUsers: data.navigation_users,
          stadiumHealth: data.stadium_health,
          emergency: data.alerts !== "None",
        }));
      } catch (err) {
        console.error("Dashboard API Error", err);
      }
    }

    loadDashboard();

    const timer = setInterval(loadDashboard, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <AIContext.Provider
      value={{
        state,
        setScenario,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);

  if (!context) {
    throw new Error(
      "useAI must be used inside AIProvider"
    );
  }

  return context;
}