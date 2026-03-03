import React, { useState } from 'react';
import { systemColors } from '../../../tokens/colors';
import { spacing } from '../../../tokens/spacing';
import { fontFamily, fontWeight, fontSize, lineHeight } from '../../../tokens/typography';
import { Icon } from '../../../components';
import { ChartCard } from './ChartCard';
import { IconButton } from './IconButton';
import type { ChartType } from '../data/mockData';

interface AIResponseProps {
  text: string;
  chart?: {
    type: ChartType;
    title: string;
    filterChips: string[];
  };
  animate?: boolean;
}

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

export const AIResponse: React.FC<AIResponseProps> = ({ text, chart, animate }) => {
  const [showWork, setShowWork] = useState(false);

  const paragraphs = text.split('\n\n');

  return (
    <div style={{ ...styles.container, ...(animate ? styles.containerAnimate : {}) }}>
      <div style={styles.inner}>
        <div style={styles.avatar}>{SPOTTER_AVATAR}</div>
        <div style={styles.content}>
          {/* Raw button: compound disclosure trigger (icon + text + chevron) with no Radiant equivalent */}
          <button
            style={styles.showWorkBtn}
            onClick={() => setShowWork(!showWork)}
          >
            <Icon name="spotter" size="s" />
            <span style={styles.showWorkText}>Show work</span>
            <Icon name={showWork ? 'chevron-up' : 'chevron-down'} size="xs" />
          </button>

          <div style={styles.textContent}>
            {paragraphs.map((p, i) => (
              <p key={i} style={styles.paragraph}>{p}</p>
            ))}
          </div>

          {chart && (
            <ChartCard
              type={chart.type}
              title={chart.title}
              filterChips={chart.filterChips}
              animate={animate}
            />
          )}

          <div style={styles.feedbackRow}>
            <IconButton icon="thumb-up" aria-label="Thumbs up" />
            <IconButton icon="thumb-down" aria-label="Thumbs down" />
            <IconButton icon="copy" aria-label="Copy" />
            <IconButton icon="share" aria-label="Share" />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: `${spacing.F}px`,
  },
  containerAnimate: {
    animation: 'museChatFadeIn 300ms ease-out forwards',
  },
  inner: {
    display: 'flex',
    gap: `${spacing.C}px`,
    alignItems: 'flex-start',
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
    minWidth: 0,
  },
  showWorkBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: `${spacing.A}px`,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    padding: `${spacing.A}px 0`,
    color: systemColors.light['content-secondary'],
    marginBottom: `${spacing.B}px`,
  },
  showWorkText: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: `${lineHeight.md}px`,
    color: systemColors.light['content-secondary'],
  },
  textContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.C}px`,
  },
  paragraph: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.light,
    lineHeight: `${lineHeight.md}px`,
    color: systemColors.light['content-primary'],
    margin: 0,
  },
  feedbackRow: {
    display: 'flex',
    gap: `${spacing.B}px`,
    marginTop: `${spacing.D}px`,
  },
};

export default AIResponse;
