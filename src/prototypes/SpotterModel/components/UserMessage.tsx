import React from 'react';
import { colors, font } from '../styles';

interface UserMessageProps {
  text: string;
  animate?: boolean;
}

export const UserMessage: React.FC<UserMessageProps> = ({ text, animate }) => (
  <div style={{ ...styles.container, ...(animate ? styles.animate : {}) }}>
    <div style={styles.avatar}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill={colors.bgSubtle} />
        <circle cx="12" cy="9" r="3" fill={colors.textSecondary} />
        <path d="M6 19c0-3.3 2.7-6 6-6s6 2.7 6 6" fill={colors.textSecondary} />
      </svg>
    </div>
    <div style={styles.textBlock}>{text}</div>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    gap: 12,
    padding: '12px 0',
    alignItems: 'flex-start',
  },
  animate: {
    animation: 'spotterFadeIn 0.25s ease-out forwards',
  },
  avatar: {
    flexShrink: 0,
    width: 24,
    height: 24,
  },
  textBlock: {
    fontFamily: font.family,
    fontSize: font.size.sm,
    fontWeight: font.weight.regular,
    lineHeight: `${font.line.md}px`,
    color: colors.textPrimary,
  },
};
