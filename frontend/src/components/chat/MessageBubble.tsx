// ──────────────────────────────────────────────────────────────
//  MessageBubble – Renders a single chat turn
// ──────────────────────────────────────────────────────────────
import React from 'react';
import type { ChatMessage, AgentType } from '../../types/chat';
import TypingIndicator from './TypingIndicator';

// ── Agent badge colour map ─────────────────────────────────────
const AGENT_COLOURS: Record<AgentType, string> = {
  fan: 'fan-badge--fan',
  navigation: 'fan-badge--navigation',
  crowd: 'fan-badge--crowd',
  emergency: 'fan-badge--emergency',
  volunteer: 'fan-badge--volunteer',
  translation: 'fan-badge--translation',
  operations: 'fan-badge--operations',
};

const AGENT_LABELS: Record<AgentType, string> = {
  fan: '🤖 Fan Assistant',
  navigation: '🗺️ Navigation',
  crowd: '👮 Crowd Intel',
  emergency: '🚨 Emergency',
  volunteer: '🙋 Volunteer',
  translation: '🌍 Translation',
  operations: '⚙️ Operations',
};

// ── Simple markdown renderer ─────────────────────────────────
function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let tableBuffer: string[] = [];
  let listBuffer: string[] = [];
  let key = 0;

  function flushList() {
    if (listBuffer.length === 0) return;
    elements.push(
      <ul key={key++} className="fan-md-list">
        {listBuffer.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>
    );
    listBuffer = [];
  }

  function flushTable() {
    if (tableBuffer.length < 2) {
      tableBuffer.forEach((l) => elements.push(<p key={key++}>{renderInline(l)}</p>));
      tableBuffer = [];
      return;
    }
    const header = tableBuffer[0].split('|').filter((c) => c.trim()).map((c) => c.trim());
    const rows = tableBuffer
      .slice(2)
      .map((row) => row.split('|').filter((c) => c.trim()).map((c) => c.trim()));
    elements.push(
      <div key={key++} className="fan-md-table-wrap">
        <table className="fan-md-table">
          <thead>
            <tr>{header.map((h, i) => <th key={i}>{renderInline(h)}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{renderInline(cell)}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableBuffer = [];
  }

  lines.forEach((line) => {
    // Table row
    if (line.trim().startsWith('|')) {
      flushList();
      tableBuffer.push(line);
      return;
    }
    flushTable();

    // Headings
    const h3 = line.match(/^### (.+)/);
    const h2 = line.match(/^## (.+)/);
    if (h3) { flushList(); elements.push(<h3 key={key++} className="fan-md-h3">{renderInline(h3[1])}</h3>); return; }
    if (h2) { flushList(); elements.push(<h2 key={key++} className="fan-md-h2">{renderInline(h2[1])}</h2>); return; }

    // Unordered list
    const li = line.match(/^[-*] (.+)/);
    if (li) { listBuffer.push(li[1]); return; }
    flushList();

    // Numbered list
    const oli = line.match(/^\d+\. (.+)/);
    if (oli) { listBuffer.push(oli[1]); return; }

    // Blank line
    if (!line.trim()) { elements.push(<br key={key++} />); return; }

    // Paragraph
    elements.push(<p key={key++} className="fan-md-p">{renderInline(line)}</p>);
  });

  flushList();
  flushTable();
  return <>{elements}</>;
}

function renderInline(text: string): React.ReactNode {
  // Bold (**text**)
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    // Inline code
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="fan-md-code">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

// ── Component ────────────────────────────────────────────────
interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const agentType = message.agentResolved as AgentType | undefined;
  const isEmergency = agentType === 'emergency';

  // Streaming state → show typing indicator
  if (message.isStreaming) {
    return <TypingIndicator />;
  }

  return (
    <div
      className={`flex items-end gap-3 ${isUser ? 'flex-row-reverse' : ''} max-w-[85%] md:max-w-[72%] ${isUser ? 'self-end' : 'self-start'}`}
    >
      {/* Avatar */}
      {!isUser && (
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg ${
            isEmergency
              ? 'bg-gradient-to-br from-red-500 to-rose-700 shadow-red-500/30'
              : 'bg-gradient-to-br from-blue-500 to-violet-600 shadow-blue-500/25'
          }`}
        >
          AI
        </div>
      )}

      <div className="flex flex-col gap-1">
        {/* Agent badge (assistant only) */}
        {!isUser && agentType && (
          <span className={`fan-badge ${AGENT_COLOURS[agentType]}`}>
            {AGENT_LABELS[agentType] ?? agentType}
          </span>
        )}

        {/* Message bubble */}
        <div
          className={`fan-chat-bubble ${isUser ? 'fan-chat-bubble--user' : isEmergency ? 'fan-chat-bubble--emergency' : 'fan-chat-bubble--assistant'}`}
        >
          {isUser ? (
            <p className="fan-md-p">{message.content}</p>
          ) : (
            renderMarkdown(message.content)
          )}
        </div>

        {/* Actions triggered (assistant only) */}
        {!isUser && message.actionsTriggered && message.actionsTriggered.length > 0 && (
          <div className="fan-actions-triggered">
            {message.actionsTriggered.map((action) => (
              <span key={action} className="fan-action-tag">
                ⚡ {action.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <time
          className={`text-[11px] text-slate-500 ${isUser ? 'text-right' : 'text-left'}`}
          dateTime={message.timestamp.toISOString()}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </time>
      </div>
    </div>
  );
}
