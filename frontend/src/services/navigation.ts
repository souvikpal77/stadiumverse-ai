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
  query: string
): Promise<RouteInfo | null> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  const result = destinations.find((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
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