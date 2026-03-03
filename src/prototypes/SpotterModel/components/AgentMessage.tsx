import React from 'react';
import { colors, font } from '../styles';

interface AgentMessageProps {
  text: string;
  animate?: boolean;
  children?: React.ReactNode;
}

const AGENT_AVATAR = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill={colors.bgSubtle} />
    <path
      d="M12 6C9.2 6 7 8.2 7 11s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z"
      fill={colors.textBrand}
    />
    <circle cx="10.2" cy="10.5" r="0.8" fill="white" />
    <circle cx="13.8" cy="10.5" r="0.8" fill="white" />
    <path d="M12 14c-1 0-1.8-.5-2.3-1.3h4.6c-.5.8-1.3 1.3-2.3 1.3z" fill="white" />
  </svg>
);

export const AgentMessage: React.FC<AgentMessageProps> = ({ text, animate, children }) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <div style={{ ...styles.container, ...(animate ? styles.animate : {}) }}>
      <div style={styles.avatarCol}>{AGENT_AVATAR}</div>
      <div style={styles.content}>
        <div style={styles.textBlock}>
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i} style={styles.bold}>{part.slice(2, -2)}</strong>;
            }
            return part.split('\n').map((line, j) => (
              <React.Fragment key={`${i}-${j}`}>
                {j > 0 && <br />}
                {line}
              </React.Fragment>
            ));
          })}
        </div>
        {children}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    gap: 12,
    padding: '12px 0',
    alignItems: 'flex-start',
  },
  animate: {
    animation: 'spotterFadeIn 0.35s ease-out forwards',
  },
  avatarCol: {
    flexShrink: 0,
    width: 24,
    height: 24,
  },
  content: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  textBlock: {
    fontFamily: font.family,
    fontSize: font.size.sm,
    fontWeight: font.weight.light,
    lineHeight: `${font.line.md}px`,
    color: colors.textPrimary,
  },
  bold: {
    fontWeight: font.weight.semibold,
  },
};
