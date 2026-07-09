// ──────────────────────────────────────────────────────────────
//  TypingIndicator – Animated "AI is thinking" bubble
// ──────────────────────────────────────────────────────────────
import React from 'react';

export default function TypingIndicator() {
  return (
    <div
      className="flex items-end gap-3 max-w-[85%] md:max-w-[70%]"
      aria-label="AI is thinking"
      role="status"
    >
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-500/25">
        AI
      </div>

      {/* Bubble */}
      <div className="fan-chat-bubble fan-chat-bubble--assistant">
        <div className="fan-typing-dots">
          <span style={{ animationDelay: '0ms' }} />
          <span style={{ animationDelay: '160ms' }} />
          <span style={{ animationDelay: '320ms' }} />
        </div>
      </div>
    </div>
  );
}
