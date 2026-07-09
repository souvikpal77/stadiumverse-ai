// ──────────────────────────────────────────────────────────────
//  QuickActionChips – Row of suggestion buttons
// ──────────────────────────────────────────────────────────────
import React from 'react';
import type { QuickAction } from '../../types/chat';

interface QuickActionChipsProps {
  actions: QuickAction[];
  onSelect: (action: QuickAction) => void;
  disabled?: boolean;
}

export default function QuickActionChips({ actions, onSelect, disabled }: QuickActionChipsProps) {
  return (
    <div
      className="fan-quick-actions"
      role="list"
      aria-label="Quick action suggestions"
    >
      {actions.map((action) => (
        <button
          key={action.id}
          id={`quick-action-${action.id}`}
          role="listitem"
          onClick={() => onSelect(action)}
          disabled={disabled}
          aria-label={`Quick action: ${action.label}`}
          className={`fan-quick-chip fan-quick-chip--${action.variant}`}
        >
          <span className="fan-quick-chip__icon" aria-hidden="true">
            {action.icon}
          </span>
          <span className="fan-quick-chip__label">{action.label}</span>
        </button>
      ))}
    </div>
  );
}
