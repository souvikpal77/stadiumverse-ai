// ──────────────────────────────────────────────────────────────
// Fan Assistant Service Layer
// StadiumVerse AI
// ──────────────────────────────────────────────────────────────

import AIService, {
  type ChatRequestPayload,
  type ChatResponsePayload,
} from "./ai";

import type {
  FanAssistantConfig,
  AgentType,
} from "../types/chat";

// ──────────────────────────────────────────────────────────────
// Mock Responses
// ──────────────────────────────────────────────────────────────

const MOCK_RESPONSES: Record<string, string> = {
  seat:
    "🪑 **Your seat is in Section A4, Row 12, Seat 7.**\n\nTo reach it from Gate 3:\n1. Enter through the main concourse\n2. Take the escalator to Level 2\n3. Follow signs for Sections A1–A6\n\nEstimated walk time: ~3 minutes.",

  food:
    "🍔 **Food Courts Near You**\n\n| Concourse | Speciality | Wait Time |\n|-----------|------------|----------|\n| North C2 | Burgers & Wraps | ~5 min |\n| South B1 | Pizza & Pasta | ~8 min |\n| East E3 | Local Cuisine | ~2 min |",

  park:
    "🚗 **Parking Status**\n\n- P1 — Full 🔴\n- P2 — 23% Available 🟡\n- P3 — 61% Available 🟢",

  emergency:
    "🚨 Emergency detected.\n\nSecurity and medical staff have been notified.\n\nPlease move calmly toward the nearest exit.",

  schedule:
    "📅 Today's Match Schedule\n\n15:00 USA vs Mexico\n18:00 Brazil vs Argentina\n21:00 France vs Germany",

  default:
    "👋 Hello! I'm StadiumVerse AI.\n\nAsk me about seating, navigation, food, parking, schedules, emergencies, or stadium services.",
};

function getMockResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("seat") || lower.includes("section"))
    return MOCK_RESPONSES.seat;

  if (
    lower.includes("food") ||
    lower.includes("eat") ||
    lower.includes("drink")
  )
    return MOCK_RESPONSES.food;

  if (lower.includes("park"))
    return MOCK_RESPONSES.park;

  if (
    lower.includes("emergency") ||
    lower.includes("danger") ||
    lower.includes("help")
  )
    return MOCK_RESPONSES.emergency;

  if (
    lower.includes("schedule") ||
    lower.includes("match") ||
    lower.includes("game")
  )
    return MOCK_RESPONSES.schedule;

  return MOCK_RESPONSES.default;
}

// ──────────────────────────────────────────────────────────────
// IMPORTANT
// Mock mode is ONLY enabled when explicitly requested.
// Development mode now uses the REAL FastAPI backend.
// ──────────────────────────────────────────────────────────────

const USE_MOCK =
  import.meta.env.VITE_USE_MOCK_AI === "true";

// ──────────────────────────────────────────────────────────────
// Service
// ──────────────────────────────────────────────────────────────

export const FanAssistantService = {
  async sendMessage(
    message: string,
    config: FanAssistantConfig,
  ): Promise<{
    response: string;
    agentResolved: AgentType;
    actionsTriggered: string[];
  }> {

    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 800));

      return {
        response: getMockResponse(message),
        agentResolved: "fan",
        actionsTriggered: [],
      };
    }

    const payload: ChatRequestPayload = {
      session_id: config.sessionId,
      message,
      context: {
        role: config.userRole,
        current_location: config.currentLocation,
      },
    };

    const data: ChatResponsePayload =
      await AIService.chat(payload);

    return {
      response: data.response,
      agentResolved: data.agent_resolved as AgentType,
      actionsTriggered: data.actions_triggered ?? [],
    };
  },

  async reportEmergency(
    message: string,
    config: FanAssistantConfig,
  ): Promise<{
    response: string;
    agentResolved: AgentType;
    actionsTriggered: string[];
  }> {

    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 500));

      return {
        response: MOCK_RESPONSES.emergency,
        agentResolved: "emergency",
        actionsTriggered: [
          "ALERT_SECURITY",
          "ALERT_MEDICAL",
          "LOG_INCIDENT",
        ],
      };
    }

    const payload: ChatRequestPayload = {
      session_id: config.sessionId,
      message,
      context: {
        role: config.userRole,
        current_location: config.currentLocation,
      },
    };

    const data: ChatResponsePayload =
      await AIService.reportEmergency(payload);

    return {
      response: data.response,
      agentResolved: data.agent_resolved as AgentType,
      actionsTriggered: data.actions_triggered ?? [],
    };
  },
};

export default FanAssistantService;