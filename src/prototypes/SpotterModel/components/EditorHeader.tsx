import React from 'react';
import { Tabs } from '../../../components';
import { colors, font, HEADER_HEIGHT } from '../styles';

interface EditorHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TAB_ITEMS = [
  { id: 'Tables', label: 'Tables' },
  { id: 'Columns', label: 'Columns' },
  { id: 'Formulas', label: 'Formulas' },
  { id: 'Filters', label: 'Filters' },
  { id: 'Parameters', label: 'Parameters' },
  { id: 'Settings', label: 'Settings' },
];

export const EditorHeader: React.FC<EditorHeaderProps> = ({ activeTab, onTabChange }) => (
  <div style={styles.container}>
    <span style={styles.title}>Data model editor</span>
    <Tabs tabs={TAB_ITEMS} activeTab={activeTab} onTabChange={onTabChange} />
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  container: {
    height: HEADER_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    gap: 32,
    padding: '0 24px',
    borderBottom: `1px solid ${colors.borderDivider}`,
    backgroundColor: colors.bg,
    flexShrink: 0,
  },
  title: {
    fontFamily: font.family,
    fontSize: font.size.md,
    fontWeight: font.weight.semibold,
    lineHeight: `${font.line.lg}px`,
    color: colors.textPrimary,
    whiteSpace: 'nowrap',
  },
};
