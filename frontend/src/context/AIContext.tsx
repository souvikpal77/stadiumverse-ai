import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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
    crowdLevel: 62,
    emergency: false,
    activeGate: "Gate A",
    navigationUsers: 165,
    stadiumHealth: 98,
    scenario: "Normal",
  });

  function setScenario(scenario: Scenario) {
    switch (scenario) {
      case "High Crowd":
        setState({
          crowdLevel: 95,
          emergency: false,
          activeGate: "Gate B",
          navigationUsers: 380,
          stadiumHealth: 95,
          scenario,
        });
        break;

      case "Heavy Rain":
        setState({
          crowdLevel: 55,
          emergency: false,
          activeGate: "Covered Entry",
          navigationUsers: 180,
          stadiumHealth: 97,
          scenario,
        });
        break;

      case "Medical Emergency":
        setState({
          crowdLevel: 70,
          emergency: true,
          activeGate: "Emergency Route",
          navigationUsers: 150,
          stadiumHealth: 93,
          scenario,
        });
        break;

      case "Goal Celebration":
        setState({
          crowdLevel: 88,
          emergency: false,
          activeGate: "Gate C",
          navigationUsers: 420,
          stadiumHealth: 96,
          scenario,
        });
        break;

      case "Fire Alarm":
        setState({
          crowdLevel: 25,
          emergency: true,
          activeGate: "Exit A",
          navigationUsers: 510,
          stadiumHealth: 82,
          scenario,
        });
        break;

      default:
        setState({
          crowdLevel: 62,
          emergency: false,
          activeGate: "Gate A",
          navigationUsers: 165,
          stadiumHealth: 98,
          scenario: "Normal",
        });
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (state.scenario !== "Normal") return;

      setState((prev) => ({
        ...prev,
        crowdLevel: Math.floor(Math.random() * 40) + 50,
        navigationUsers: Math.floor(Math.random() * 100) + 120,
      }));
    }, 5000);

    return () => clearInterval(timer);
  }, [state.scenario]);

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
    throw new Error("useAI must be used inside AIProvider");
  }

  return context;
}