const API =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export interface DashboardData {
  stadium_health: number;
  crowd_level: number;
  recommended_gate: string;
  navigation_users: number;
  available_parking: number;
  total_parking: number;
  volunteers: number;
  weather: string;
  event: string;
  alerts: string[];
  system_status: string;
  timestamp: string;
}

export interface SystemData {
  stadiumHealth: number;
  crowdLevel: number;
  activeGate: string;
  navigationUsers: number;
  emergency: boolean;
  scenario: string;
  event: string;
  weather: string;
  alerts: string[];
}

export interface CrowdData {
  [key: string]: {
    status: string;
    crowd_level: string;
    wait_time: string;
    occupancy: string;
    recommendation: string;
  };
}

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  return res.json();
}

export const DashboardService = {
  getDashboardStatus() {
    return fetchJSON<DashboardData>(`${API}/dashboard/status`);
  },

  getCrowdStatus() {
    return fetchJSON<CrowdData>(`${API}/crowd`);
  },

  getParkingStatus() {
    return fetchJSON(`${API}/parking`);
  },

  getSystemStatus() {
  return fetchJSON<SystemData>(`${API}/system`);
},

  getPredictions() {
  return fetchJSON(`${API}/predictions`);
},

  getRoutes() {
  return fetchJSON(`${API}/routes`);
},

 getEmergencyStatus() {
  return fetchJSON(`${API}/emergency/status`);
},

async triggerEmergency(payload: any) {
  const response = await fetch(`${API}/emergency/trigger`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to trigger emergency");
  }

  return response.json();
},
};

export default DashboardService;