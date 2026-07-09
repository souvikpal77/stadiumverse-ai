// ──────────────────────────────────────────────────────────────
//  Fan Assistant Service Layer
//  Wraps the base AIService with Fan-Assistant-specific defaults,
//  mock-mode for offline development, and typed helpers.
// ──────────────────────────────────────────────────────────────

import AIService, {
  type ChatRequestPayload,
  type ChatResponsePayload,
} from './ai';
import type { FanAssistantConfig, AgentType } from '../types/chat';

// ── Mock responses for offline / pre-backend development ───────
const MOCK_RESPONSES: Record<string, string> = {
  seat:
    '🪑 **Your seat is in Section A4, Row 12, Seat 7.**\n\nTo reach it from Gate 3:\n1. Enter through the main concourse\n2. Take the escalator to Level 2\n3. Follow signs for Sections A1–A6\n\nEstimated walk time: ~3 minutes. Need help with anything else?',
  food:
    '🍔 **Food Courts Near You**\n\n| Concourse | Speciality | Wait Time |\n|-----------|------------|----------|\n| North C2  | Burgers & Wraps | ~5 min |\n| South B1  | Pizza & Pasta | ~8 min |\n| East E3   | Local Cuisine | ~2 min |\n\nAll courts accept card and contactless payments. Enjoy the match! ⚽',
  park:
    '🚗 **Parking Status**\n\n- **P1 (North)** — Full 🔴\n- **P2 (East)** — 23% available 🟡\n- **P3 (South)** — 61% available 🟢\n- **P4 (West, VIP)** — Restricted\n\nNearest available: **P2 East** — 8-minute walk from Gate 5. Need directions?',
  emergency:
    '🚨 **Emergency Detected**\n\nI am immediately notifying stadium security and medical staff.\n\n**Your nearest exits:**\n- Exit 4A — 30 metres north\n- Exit 2B — 50 metres south\n\nPlease remain calm, follow staff instructions, and do not run. **Help is on its way.**\n\n📞 Emergency line: **+1-800-STADIUM**',
  schedule:
    '📅 **Today\'s Match Schedule**\n\n| Time  | Match | Venue |\n|-------|-------|-------|\n| 15:00 | USA 🆚 Mexico | Stadium A |\n| 18:00 | Brazil 🆚 Argentina | Stadium A |\n| 21:00 | France 🆚 Germany | Stadium B |\n\n*All times are local. Doors open 2 hours before kick-off.*',
  default:
    "👋 **Hi! I'm your StadiumVerse AI assistant.**\n\nI can help you with:\n- 🪑 Finding your seat\n- 🍔 Food & beverage options\n- 🚗 Parking information\n- 🚨 Emergency assistance\n- 📅 Match schedules\n- 🗺️ Stadium navigation\n\nWhat can I help you with today?",
};

function getMockResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('seat') || lower.includes('section')) return MOCK_RESPONSES.seat;
  if (lower.includes('food') || lower.includes('eat') || lower.includes('drink') || lower.includes('restaurant'))
    return MOCK_RESPONSES.food;
  if (lower.includes('park') || lower.includes('car')) return MOCK_RESPONSES.park;
  if (lower.includes('emergency') || lower.includes('help') || lower.includes('medic') || lower.includes('danger'))
    return MOCK_RESPONSES.emergency;
  if (lower.includes('schedule') || lower.includes('match') || lower.includes('game') || lower.includes('kick'))
    return MOCK_RESPONSES.schedule;
  return MOCK_RESPONSES.default;
}

// ── Service ───────────────────────────────────────────────────

/**
 * Whether to use mock responses instead of hitting the real backend.
 * Set VITE_USE_MOCK_AI=true in .env.local to enable.
 */
const USE_MOCK = import.meta.env.VITE_USE_MOCK_AI === 'true' || import.meta.env.DEV;

export const FanAssistantService = {
  /**
   * Send a fan query to the backend AI agent router.
   * Falls back to mock responses during development.
   */
  async sendMessage(
    message: string,
    config: FanAssistantConfig,
  ): Promise<{ response: string; agentResolved: AgentType; actionsTriggered: string[] }> {
    if (USE_MOCK) {
      // Simulate network latency in mock mode
      await new Promise((res) => setTimeout(res, 900 + Math.random() * 600));
      return {
        response: getMockResponse(message),
        agentResolved: 'fan',
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

    const data: ChatResponsePayload = await AIService.chat(payload);

    return {
      response: data.response,
      agentResolved: data.agent_resolved as AgentType,
      actionsTriggered: data.actions_triggered,
    };
  },

  /**
   * Escalate an emergency message — bypasses conversation rules.
   */
  async reportEmergency(
    message: string,
    config: FanAssistantConfig,
  ): Promise<{ response: string; agentResolved: AgentType; actionsTriggered: string[] }> {
    if (USE_MOCK) {
      await new Promise((res) => setTimeout(res, 400));
      return {
        response: MOCK_RESPONSES.emergency,
        agentResolved: 'emergency',
        actionsTriggered: ['ALERT_SECURITY', 'ALERT_MEDICAL', 'LOG_INCIDENT'],
      };
    }

    const payload: ChatRequestPayload = {
      session_id: config.sessionId,
      message,
      context: { role: config.userRole },
    };

    const data: ChatResponsePayload = await AIService.reportEmergency(payload);

    return {
      response: data.response,
      agentResolved: data.agent_resolved as AgentType,
      actionsTriggered: data.actions_triggered,
    };
  },
};

export default FanAssistantService;
