import React from 'react';
import { systemColors } from '../../../tokens/colors';
import { spacing } from '../../../tokens/spacing';
import { fontFamily, fontWeight, fontSize, lineHeight } from '../../../tokens/typography';

interface UserMessageProps {
  text: string;
  timestamp: string;
  animate?: boolean;
}

const USER_AVATAR = (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#D4A574" />
    <circle cx="16" cy="13" r="5" fill="#FFFFFF" />
    <ellipse cx="16" cy="26" rx="8" ry="6" fill="#FFFFFF" />
  </svg>
);

export const UserMessage: React.FC<UserMessageProps> = ({ text, timestamp, animate }) => {
  return (
    <div
      style={{
        ...styles.container,
        ...(animate ? styles.containerAnimate : {}),
      }}
    >
      <div style={styles.avatar}>{USER_AVATAR}</div>
      <div style={styles.content}>
        <span style={styles.text}>{text}</span>
      </div>
      <span style={styles.timestamp}>{timestamp}</span>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: `${spacing.C}px`,
    padding: `${spacing.D}px ${spacing.F}px`,
  },
  containerAnimate: {
    animation: 'museChatFadeIn 300ms ease-out forwards',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
  },
  content: {
    flex: 1,
    paddingTop: `${spacing.A}px`,
  },
  text: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.light,
    lineHeight: `${lineHeight.lg}px`,
    color: systemColors.light['content-primary'],
  },
  timestamp: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.regular,
    lineHeight: `${lineHeight.sm}px`,
    color: systemColors.light['content-secondary'],
    flexShrink: 0,
    paddingTop: `${spacing.A}px`,
  },
};

export default UserMessage;
