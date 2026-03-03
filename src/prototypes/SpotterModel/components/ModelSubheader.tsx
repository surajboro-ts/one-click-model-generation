import React from 'react';
import { Button } from '../../../components';
import { colors, font, SUBHEADER_HEIGHT } from '../styles';

export const ModelSubheader: React.FC = () => (
  <div style={styles.container}>
    <div style={styles.left}>
      <div style={styles.titleRow}>
        <span style={styles.name}>Retail 360</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1.5l2.12 4.3 4.74.69-3.43 3.34.81 4.72L8 12.27l-4.24 2.28.81-4.72L1.14 6.49l4.74-.69L8 1.5z"
            fill={colors.textWarning} stroke={colors.textWarning} strokeWidth="0.5" />
        </svg>
      </div>
      <span style={styles.description}>Model for analysis of global retail performance.</span>
    </div>
    <div style={styles.actions}>
      <Button variant="secondary" size="small">Find</Button>
      <Button variant="secondary" size="small" icon="chevron-down" iconPosition="trailing">
        Join options
      </Button>
      <Button variant="secondary" size="small" icon="chevron-down" iconPosition="trailing">
        100%
      </Button>
    </div>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  container: {
    height: SUBHEADER_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    borderBottom: `1px solid ${colors.borderDivider}`,
    backgroundColor: colors.bg,
    flexShrink: 0,
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontFamily: font.family,
    fontSize: font.size.md,
    fontWeight: font.weight.semibold,
    lineHeight: `${font.line.lg}px`,
    color: colors.textPrimary,
  },
  description: {
    fontFamily: font.family,
    fontSize: font.size.xs,
    fontWeight: font.weight.regular,
    lineHeight: `${font.line.sm}px`,
    color: colors.textSecondary,
  },
  actions: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
};
