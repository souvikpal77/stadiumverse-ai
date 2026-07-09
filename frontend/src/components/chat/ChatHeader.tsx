// ──────────────────────────────────────────────────────────────
//  ChatHeader – Top bar of the fan assistant panel
// ──────────────────────────────────────────────────────────────
import React from 'react';

interface ChatHeaderProps {
  onClear: () => void;
  isLoading: boolean;
}

export default function ChatHeader({ onClear, isLoading }: ChatHeaderProps) {
  return (
    <header className="fan-chat-header">
      {/* Left: branding */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Animated AI orb */}
        <div className="fan-chat-header__orb" aria-hidden="true">
          <div className="fan-chat-header__orb-inner" />
        </div>

        <div className="min-w-0">
          <h1 className="fan-chat-header__title">Fan Assistant</h1>
          <p className="fan-chat-header__subtitle">
            {isLoading ? (
              <span className="fan-chat-header__thinking">
                <span className="fan-chat-header__thinking-dot" />
                Thinking…
              </span>
            ) : (
              <>
                <span className="fan-online-dot" aria-hidden="true" />
                Powered by Google Gemini · FIFA World Cup 2026
              </>
            )}
          </p>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          id="clear-chat-btn"
          onClick={onClear}
          disabled={isLoading}
          aria-label="Clear conversation"
          title="Clear conversation"
          className="fan-icon-btn"
        >
          {/* Trash / broom icon via SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
        </button>
      </div>
    </header>
  );
}
