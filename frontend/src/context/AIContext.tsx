import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AIState {
  crowdLevel: number;
  emergency: boolean;
  activeGate: string;
  navigationUsers: number;
  stadiumHealth: number;
}

interface AIContextType {
  state: AIState;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function AIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<AIState>({
    crowdLevel: 65,
    emergency: false,
    activeGate: "Gate A",
    navigationUsers: 140,
    stadiumHealth: 96,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const crowd = random(30, 98);

      setState({
        crowdLevel: crowd,
        emergency: crowd > 90,
        activeGate:
          crowd > 80
            ? "Gate B"
            : crowd > 60
            ? "Gate A"
            : "Gate D",
        navigationUsers: random(120, 240),
        stadiumHealth: random(92, 99),
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <AIContext.Provider value={{ state }}>
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