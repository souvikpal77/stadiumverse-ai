// ──────────────────────────────────────────────────────────────
//  useFanAssistant – Custom hook for chat state management
// ──────────────────────────────────────────────────────────────

import { useState, useCallback, useRef, useEffect } from 'react';
import type { ChatMessage, FanAssistantConfig, QuickAction } from '../types/chat';
import FanAssistantService from '../services/fanAssistant';

// ── Quick-action chips definition ─────────────────────────────
export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'find-seat',
    label: 'Find My Seat',
    icon: '🪑',
    prompt: 'Help me find my seat – Section A4, Row 12, Seat 7.',
    variant: 'info',
  },
  {
    id: 'food-court',
    label: 'Food Court',
    icon: '🍔',
    prompt: 'Where is the nearest food court and what are the wait times?',
    variant: 'success',
  },
  {
    id: 'parking',
    label: 'Parking',
    icon: '🚗',
    prompt: 'What is the current parking availability near the stadium?',
    variant: 'default',
  },
  {
    id: 'emergency',
    label: 'Emergency',
    icon: '🚨',
    prompt: 'I need emergency assistance immediately!',
    variant: 'emergency',
  },
  {
    id: 'schedule',
    label: 'Match Schedule',
    icon: '📅',
    prompt: 'Show me today\'s match schedule and kick-off times.',
    variant: 'info',
  },
];

// ── Greeting message ──────────────────────────────────────────
function createGreeting(): ChatMessage {
  return {
    id: 'greeting-001',
    role: 'assistant',
    content:
      "👋 **Welcome to StadiumVerse AI!**\n\nI'm your personal stadium assistant powered by Google Gemini. I can help you with seat locations, food courts, parking, match schedules, and emergency guidance.\n\nUse the quick-action buttons below or type your question to get started! ⚽",
    timestamp: new Date(),
    agentResolved: 'fan',
    actionsTriggered: [],
  };
}

function generateId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// ── Hook ──────────────────────────────────────────────────────
export function useFanAssistant(config: FanAssistantConfig) {
  const [messages, setMessages] = useState<ChatMessage[]>([createGreeting()]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const appendMessage = useCallback((msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      setError(null);
      setInputValue('');

      // Append user message
      const userMsg: ChatMessage = {
        id: generateId(),
        role: 'user',
        content: trimmed,
        timestamp: new Date(),
      };
      appendMessage(userMsg);

      // Append streaming placeholder
      const streamingId = generateId();
      const streamingMsg: ChatMessage = {
        id: streamingId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      };
      appendMessage(streamingMsg);
      setIsLoading(true);

      try {
        const isEmergency =
          /emergency|help|danger|fire|attack|medic|ambulance/i.test(trimmed);

        const result = isEmergency
          ? await FanAssistantService.reportEmergency(trimmed, config)
          : await FanAssistantService.sendMessage(trimmed, config);

        // Replace streaming placeholder with real response
        setMessages((prev) =>
          prev.map((m) =>
            m.id === streamingId
              ? {
                  ...m,
                  content: result.response,
                  agentResolved: result.agentResolved,
                  actionsTriggered: result.actionsTriggered,
                  isStreaming: false,
                }
              : m,
          ),
        );
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred.';
        setError(errorMsg);
        // Replace streaming placeholder with error message
        setMessages((prev) =>
          prev.map((m) =>
            m.id === streamingId
              ? {
                  ...m,
                  content: `❌ **Error:** ${errorMsg}\n\nPlease try again or contact stadium staff.`,
                  isStreaming: false,
                  agentResolved: 'fan',
                }
              : m,
          ),
        );
      } finally {
        setIsLoading(false);
        inputRef.current?.focus();
      }
    },
    [isLoading, config, appendMessage],
  );

  const handleQuickAction = useCallback(
    (action: QuickAction) => {
      sendMessage(action.prompt);
    },
    [sendMessage],
  );

  const clearChat = useCallback(() => {
    setMessages([createGreeting()]);
    setError(null);
    setInputValue('');
  }, []);

  return {
    messages,
    isLoading,
    error,
    inputValue,
    setInputValue,
    sendMessage,
    handleQuickAction,
    clearChat,
    bottomRef,
    inputRef,
  };
}
