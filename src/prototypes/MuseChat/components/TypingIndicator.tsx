import React from 'react';
import { systemColors } from '../../../tokens/colors';
import { spacing } from '../../../tokens/spacing';

const SPOTTER_AVATAR = (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill={systemColors.light['background-sunken']} />
    <path
      d="M16 8C11.6 8 8 11.6 8 16s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14.4c-3.5 0-6.4-2.9-6.4-6.4S12.5 9.6 16 9.6s6.4 2.9 6.4 6.4-2.9 6.4-6.4 6.4z"
      fill={systemColors.light['content-primary']}
    />
    <circle cx="13" cy="15" r="1.5" fill={systemColors.light['content-primary']} />
    <circle cx="19" cy="15" r="1.5" fill={systemColors.light['content-primary']} />
    <path
      d="M16 20c-1.7 0-3.1-.9-3.9-2.2h7.8c-.8 1.3-2.2 2.2-3.9 2.2z"
      fill={systemColors.light['content-primary']}
    />
  </svg>
);

export const TypingIndicator: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.avatar}>{SPOTTER_AVATAR}</div>
      <div style={styles.dots}>
        <span style={{ ...styles.dot, animationDelay: '0ms' }} />
        <span style={{ ...styles.dot, animationDelay: '160ms' }} />
        <span style={{ ...styles.dot, animationDelay: '320ms' }} />
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: `${spacing.C}px`,
    padding: `${spacing.F}px`,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
  },
  dots: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.A}px`,
    paddingTop: `${spacing.B}px`,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: systemColors.light['content-tertiary'],
    animation: 'museChatBounce 1.4s ease-in-out infinite',
  },
};

export default TypingIndicator;
