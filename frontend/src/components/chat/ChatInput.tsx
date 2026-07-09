// ──────────────────────────────────────────────────────────────
//  ChatInput – Textarea + Send button with keyboard shortcuts
// ──────────────────────────────────────────────────────────────
import React, { type KeyboardEvent, type ChangeEvent } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (text: string) => void;
  isLoading: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

export default function ChatInput({ value, onChange, onSend, isLoading, inputRef }: ChatInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) onSend(value);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    // Auto-resize
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  const canSend = value.trim().length > 0 && !isLoading;

  return (
    <div className="fan-chat-input-wrap">
      <div className="fan-chat-input-row">
        <textarea
          id="fan-assistant-input"
          ref={inputRef}
          rows={1}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Ask anything — seat location, food, parking, schedule…"
          aria-label="Chat message input"
          className="fan-chat-textarea"
        />

        <button
          id="fan-assistant-send-btn"
          onClick={() => canSend && onSend(value)}
          disabled={!canSend}
          aria-label="Send message"
          className="fan-send-btn"
        >
          {isLoading ? (
            <svg
              className="fan-send-btn__spinner"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
        </button>
      </div>

      <p className="fan-chat-input-hint">
        Press <kbd>Enter</kbd> to send · <kbd>Shift+Enter</kbd> for new line
      </p>
    </div>
  );
}
