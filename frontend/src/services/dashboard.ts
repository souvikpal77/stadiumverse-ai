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
};

export default DashboardService;