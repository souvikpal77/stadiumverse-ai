import { Destination, RouteInfo } from "../types/navigation";

const destinations: Destination[] = [
  {
    id: "gate-a",
    title: "Gate A",
    type: "gate",
    location: "North Entrance",
    walkingTime: "2 min",
    distance: "120 m",
    accessible: true,
  },
  {
    id: "gate-b",
    title: "Gate B",
    type: "gate",
    location: "East Entrance",
    walkingTime: "4 min",
    distance: "250 m",
    accessible: true,
  },
  {
    id: "food-1",
    title: "Food Court",
    type: "food",
    location: "Level 1",
    walkingTime: "3 min",
    distance: "180 m",
    accessible: true,
  },
  {
    id: "parking-a",
    title: "Parking Zone A",
    type: "parking",
    location: "Outside West Gate",
    walkingTime: "5 min",
    distance: "350 m",
    accessible: true,
  },
  {
    id: "washroom-1",
    title: "Washroom",
    type: "washroom",
    location: "Section B",
    walkingTime: "1 min",
    distance: "60 m",
    accessible: true,
  },
  {
    id: "seat-a12",
    title: "Seat A12",
    type: "seat",
    location: "Block A",
    walkingTime: "2 min",
    distance: "140 m",
    accessible: false,
  },
];

export async function searchDestination(
  query: string,
  scenario: string = "Normal"
): Promise<RouteInfo | null> {

  await new Promise((resolve) => setTimeout(resolve, 700));

  const lower = query.toLowerCase();

  /* ==========================
     AI SMART ROUTING
  ===========================*/

  if (scenario === "High Crowd" && lower.includes("gate a")) {
    const gateB = destinations.find((d) => d.id === "gate-b")!;

    return {
      destination: gateB,
      steps: [
        "⚠ Gate A is heavily crowded.",
        "AI recommends using Gate B.",
        "Walk 80 meters to the east.",
        "Follow the blue smart navigation signs.",
        "Estimated time saved: 3 minutes.",
        "You have reached Gate B.",
      ],
    };
  }

  if (scenario === "Fire Alarm") {
    const exit = destinations.find((d) => d.id === "gate-a")!;

    return {
      destination: exit,
      steps: [
        "🔥 Fire alarm detected.",
        "Emergency evacuation activated.",
        "Proceed calmly to Exit A.",
        "Follow emergency lights.",
        "Security staff will assist you.",
      ],
    };
  }

  if (scenario === "Medical Emergency") {
    const medical = destinations.find((d) => d.id === "washroom-1")!;

    return {
      destination: medical,
      steps: [
        "🚑 Medical assistance requested.",
        "Proceed to the Medical Help Point.",
        "Follow the green emergency signs.",
      ],
    };
  }

  if (scenario === "Heavy Rain") {
    const covered = destinations.find((d) => d.id === "gate-b")!;

    return {
      destination: covered,
      steps: [
        "🌧 Heavy rain detected.",
        "AI selected the nearest covered entrance.",
        "Use Gate B.",
      ],
    };
  }

  /* ==========================
      NORMAL SEARCH
  ===========================*/

  const result = destinations.find((item) =>
    item.title.toLowerCase().includes(lower)
  );

  if (!result) return null;

  return {
    destination: result,
    steps: [
      "Proceed straight.",
      "Turn left at the information desk.",
      "Follow the blue navigation signs.",
      `You have reached ${result.title}.`,
    ],
  };
}