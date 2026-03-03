import React, { useState } from 'react';
import { colors, font } from '../styles';
import { ContextToken } from './ContextToken';
import type { FlowStep } from '../data/mockData';

interface PromptBarProps {
  onSend: (text: string) => void;
  contextTokens: Array<{ type: 'Table' | 'Join' | 'Column'; label?: string }>;
  quickActions?: Array<{ label: string; action: string }>;
  onQuickAction?: (action: string) => void;
  step: FlowStep;
}

export const PromptBar: React.FC<PromptBarProps> = ({
  onSend, contextTokens, quickActions, onQuickAction, step: _step,
}) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue('');
  };

  return (
    <div style={styles.wrapper}>
      {quickActions && quickActions.length > 0 && (
        <div style={styles.quickActions}>
          {quickActions.map((qa) => (
            <button
              key={qa.action}
              style={styles.quickActionBtn}
              onClick={() => onQuickAction?.(qa.action)}
            >
              {qa.label}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M4 10L10 4M10 4H5M10 4v5" stroke={colors.textSecondary} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      )}

      <div style={styles.container}>
        <div style={styles.inputRow}>
          <input
            style={styles.input}
            placeholder="Ask, add or edit"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>
        <div style={styles.bottomRow}>
          <div style={styles.tokens}>
            {contextTokens.map((ct, i) => (
              <ContextToken key={i} type={ct.type} label={ct.label} />
            ))}
            {contextTokens.length === 0 && (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity: 0.5 }}>
                <rect x="2" y="2" width="16" height="16" rx="3" stroke={colors.textTertiary} strokeWidth="1.2" />
                <path d="M7 10h6M10 7v6" stroke={colors.textTertiary} strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            )}
          </div>
          <button
            style={{ ...styles.sendBtn, opacity: value.trim() ? 1 : 0.4 }}
            onClick={handleSubmit}
            disabled={!value.trim()}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 13V3M8 3L4 7M8 3l4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <span style={styles.disclaimer}>
        SpotterModel responses should be reviewed. <span style={styles.link}>Learn more</span>
      </span>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    padding: '0 24px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  quickActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  quickActionBtn: {
    fontFamily: font.family,
    fontSize: font.size.sm,
    fontWeight: font.weight.regular,
    color: colors.textPrimary,
    background: 'none',
    border: 'none',
    padding: '8px 0',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'left' as const,
    borderBottom: `1px solid ${colors.borderDivider}`,
  },
  container: {
    border: `1px solid ${colors.borderDefault}`,
    borderRadius: 12,
    backgroundColor: colors.bg,
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    fontFamily: font.family,
    fontSize: font.size.sm,
    fontWeight: font.weight.regular,
    color: colors.textPrimary,
    border: 'none',
    outline: 'none',
    background: 'none',
    width: '100%',
  },
  bottomRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tokens: {
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  sendBtn: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor: colors.bgBrand,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'opacity 0.15s',
  },
  disclaimer: {
    fontFamily: font.family,
    fontSize: 11,
    color: colors.textTertiary,
    textAlign: 'center' as const,
  },
  link: {
    color: colors.textBrand,
    cursor: 'pointer',
  },
};
