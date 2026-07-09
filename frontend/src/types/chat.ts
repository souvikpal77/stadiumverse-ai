// ──────────────────────────────────────────────────────────────
//  Fan Assistant – Chat Types
// ──────────────────────────────────────────────────────────────

export type MessageRole = 'user' | 'assistant' | 'system';

export type AgentType =
  | 'fan'
  | 'navigation'
  | 'crowd'
  | 'emergency'
  | 'volunteer'
  | 'translation'
  | 'operations';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  /** Which agent ultimately handled this turn (set on assistant messages) */
  agentResolved?: AgentType;
  /** Optional triggered actions metadata */
  actionsTriggered?: string[];
  /** Whether this message is currently being generated (typing indicator) */
  isStreaming?: boolean;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  prompt: string;
  /** Colour variant for the chip */
  variant: 'default' | 'emergency' | 'info' | 'success';
}

export interface ChatSession {
  sessionId: string;
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

export interface FanAssistantConfig {
  sessionId: string;
  userRole: 'fan' | 'volunteer' | 'operator';
  currentLocation?: string;
}
