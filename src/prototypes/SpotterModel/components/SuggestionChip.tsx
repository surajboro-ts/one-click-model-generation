import React from 'react';
import { colors, font } from '../styles';

interface SuggestionChipProps {
  label: string;
  onClick: () => void;
}

export const SuggestionChip: React.FC<SuggestionChipProps> = ({ label, onClick }) => (
  <button style={styles.chip} onClick={onClick}>
    {label}
  </button>
);

const styles: Record<string, React.CSSProperties> = {
  chip: {
    fontFamily: font.family,
    fontSize: font.size.xs,
    fontWeight: font.weight.medium,
    color: colors.textPrimary,
    backgroundColor: colors.bg,
    border: `1px solid ${colors.borderDefault}`,
    borderRadius: 18,
    padding: '6px 14px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'background-color 0.15s, border-color 0.15s',
  },
};
