import React from 'react';
import { Button } from '../../../components';
import { colors, font } from '../styles';
import type { ImpactItem } from '../data/mockData';

interface ImpactAnalysisProps {
  tableName: string;
  impacts: ImpactItem[];
  onCancel: () => void;
  onProceed: () => void;
}

export const ImpactAnalysis: React.FC<ImpactAnalysisProps> = ({ tableName, impacts, onCancel, onProceed }) => (
  <div style={styles.container}>
    <div style={styles.versionBadge}>
      <span style={styles.versionText}>delete this table</span>
      <div style={styles.versionTag}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3.5 6L5.5 8L8.5 4" stroke={colors.textSecondary} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={styles.versionNum}>Version 56</span>
      </div>
    </div>

    <div style={styles.header}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke={colors.textSecondary} strokeWidth="1.2" />
        <path d="M8 5v3M8 9.5v.5" stroke={colors.textSecondary} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <span style={styles.reasoningLabel}>Reasoning</span>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M3 4.5L6 7.5L9 4.5" stroke={colors.textSecondary} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>

    <div style={styles.impactTitle}>
      Review the impact of removing {tableName}
    </div>

    {impacts.map((impact, i) => (
      <div
        key={i}
        style={{
          ...styles.impactCard,
          backgroundColor: impact.type === 'warning' ? colors.bgWarning : colors.bgInfo,
        }}
      >
        <span style={styles.impactLabel}>{impact.title}</span>
        {impact.details.map((detail, j) => (
          <span key={j} style={styles.impactDetail}>{detail}</span>
        ))}
      </div>
    ))}

    <div style={styles.actions}>
      <Button variant="secondary" size="basic" onClick={onCancel} fullWidth>Cancel</Button>
      <Button variant="primary" size="basic" onClick={onProceed} fullWidth>Proceed</Button>
    </div>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    padding: '4px 0',
  },
  versionBadge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    backgroundColor: colors.bgSunken,
    borderRadius: 8,
    border: `1px solid ${colors.borderDivider}`,
  },
  versionText: {
    fontFamily: font.family,
    fontSize: font.size.sm,
    fontWeight: font.weight.regular,
    color: colors.textPrimary,
  },
  versionTag: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  versionNum: {
    fontFamily: font.family,
    fontSize: font.size.xs,
    fontWeight: font.weight.regular,
    color: colors.textSecondary,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    cursor: 'pointer',
  },
  reasoningLabel: {
    fontFamily: font.family,
    fontSize: font.size.sm,
    fontWeight: font.weight.medium,
    color: colors.textSecondary,
  },
  impactTitle: {
    fontFamily: font.family,
    fontSize: font.size.sm,
    fontWeight: font.weight.regular,
    color: colors.textPrimary,
    lineHeight: `${font.line.md}px`,
  },
  impactCard: {
    borderRadius: 8,
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  impactLabel: {
    fontFamily: font.family,
    fontSize: font.size.sm,
    fontWeight: font.weight.semibold,
    color: colors.textPrimary,
  },
  impactDetail: {
    fontFamily: font.family,
    fontSize: font.size.sm,
    fontWeight: font.weight.regular,
    color: colors.textPrimary,
  },
  actions: {
    display: 'flex',
    gap: 12,
    marginTop: 4,
  },
};
