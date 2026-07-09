// ──────────────────────────────────────────────────────────────
//  FanAssistantPage – Full page layout for the chat module
// ──────────────────────────────────────────────────────────────
import React, { useMemo } from 'react';
import ChatHeader from '../components/chat/ChatHeader';
import MessageBubble from '../components/chat/MessageBubble';
import QuickActionChips from '../components/chat/QuickActionChips';
import ChatInput from '../components/chat/ChatInput';
import { useFanAssistant, QUICK_ACTIONS } from '../hooks/useFanAssistant';
import type { FanAssistantConfig } from '../types/chat';
import '../styles/fanAssistant.css';

// ── Session helpers ───────────────────────────────────────────
function getOrCreateSessionId(): string {
  const key = 'sv_fan_session_id';
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = `session-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(key, id);
  }
  return id;
}

// ── Page ─────────────────────────────────────────────────────
interface FanAssistantPageProps {
  /** Optional callback to navigate back to home (used when no router is present) */
  onBack?: () => void;
}

export default function FanAssistantPage({ onBack }: FanAssistantPageProps) {
  const config = useMemo<FanAssistantConfig>(
    () => ({
      sessionId: getOrCreateSessionId(),
      userRole: 'fan',
      currentLocation: 'Gate 3 – Main Concourse',
    }),
    [],
  );

  const {
    messages,
    isLoading,
    inputValue,
    setInputValue,
    sendMessage,
    handleQuickAction,
    clearChat,
    bottomRef,
    inputRef,
  } = useFanAssistant(config);

  return (
    <div className="fan-assistant-page">
      {/* ── Top Navigation ── */}
      <nav className="w-full max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-3">
          <button
            id="fan-back-btn"
            onClick={onBack}
            aria-label="Go back to home"
            className="fan-icon-btn mr-1"
            title="Back to Home"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-violet-700 flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-blue-600/30">
            SV
          </div>

          <div>
            <p className="text-base font-bold text-white leading-tight">StadiumVerse AI</p>
            <p className="text-[11px] text-slate-400 leading-tight">FIFA World Cup 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AI Online
          </span>
        </div>
      </nav>

      {/* ── Main body ── */}
      <main className="fan-assistant-body" id="fan-assistant-main">
        {/* Hero Banner */}
        <section className="fan-hero" aria-label="Fan Assistant module header">
          <div className="fan-hero__icon" aria-hidden="true">🤖</div>

          <div className="fan-hero__content">
            <h2>Fan Assistant</h2>
            <p>
              Instant answers for everything inside the stadium — powered by Google&nbsp;Gemini.
              Ask about your seat, food, parking, schedules, and more.
            </p>
          </div>

          <div className="fan-hero__badge" aria-hidden="true">
            <span className="fan-hero__badge-chip fan-hero__badge-chip--gemini">
              ✨ Gemini AI
            </span>
            <span className="fan-hero__badge-chip fan-hero__badge-chip--live">
              <span className="fan-live-dot" />
              Live
            </span>
          </div>
        </section>

        {/* Chat Panel */}
        <section
          className="fan-chat-panel"
          aria-label="Chat with Fan Assistant"
          style={{ height: 'calc(100dvh - 320px)', minHeight: '400px' }}
        >
          {/* Header */}
          <ChatHeader onClear={clearChat} isLoading={isLoading} />

          {/* Messages */}
          <div
            className="fan-messages"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            aria-label="Chat messages"
          >
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={bottomRef} aria-hidden="true" />
          </div>

          {/* Quick actions */}
          <QuickActionChips
            actions={QUICK_ACTIONS}
            onSelect={handleQuickAction}
            disabled={isLoading}
          />

          {/* Input */}
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={sendMessage}
            isLoading={isLoading}
            inputRef={inputRef}
          />
        </section>
      </main>

      {/* Footer strip */}
      <footer className="py-4 text-center text-[11px] text-slate-600">
        © 2026 StadiumVerse AI · FIFA World Cup 2026 · Powered by Google Gemini
      </footer>
    </div>
  );
}
