import React from 'react';
import { colors, font } from '../styles';

interface ContextTokenProps {
  type: 'Table' | 'Join' | 'Column';
  label?: string;
  onRemove?: () => void;
}

const TOKEN_COLORS: Record<string, { bg: string; border: string; icon: string }> = {
  Table: { bg: colors.bgInfo, border: colors.borderBrand, icon: colors.textBrand },
  Join: { bg: '#F0EAFF', border: '#8B5CF6', icon: '#8B5CF6' },
  Column: { bg: colors.bgInfo, border: colors.borderBrand, icon: colors.textBrand },
};

const TableIcon = ({ color }: { color: string }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <rect x="1" y="1" width="10" height="10" rx="1.5" stroke={color} strokeWidth="1" />
    <line x1="1" y1="4" x2="11" y2="4" stroke={color} strokeWidth="1" />
    <line x1="5" y1="4" x2="5" y2="11" stroke={color} strokeWidth="1" />
  </svg>
);

const JoinIcon = ({ color }: { color: string }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="4.5" cy="6" r="3" stroke={color} strokeWidth="1" fill="none" />
    <circle cx="7.5" cy="6" r="3" stroke={color} strokeWidth="1" fill="none" />
  </svg>
);

const ColumnIcon = ({ color }: { color: string }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <rect x="2" y="1" width="8" height="10" rx="1.5" stroke={color} strokeWidth="1" />
    <line x1="2" y1="4" x2="10" y2="4" stroke={color} strokeWidth="1" />
  </svg>
);

export const ContextToken: React.FC<ContextTokenProps> = ({ type, label, onRemove }) => {
  const tc = TOKEN_COLORS[type];
  const IconComp = type === 'Table' ? TableIcon : type === 'Join' ? JoinIcon : ColumnIcon;

  return (
    <div style={{ ...styles.token, backgroundColor: tc.bg, borderColor: tc.border }}>
      <IconComp color={tc.icon} />
      <span style={{ ...styles.label, color: tc.icon }}>{label || type}</span>
      {onRemove && (
        <button style={styles.removeBtn} onClick={onRemove}>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1 1L7 7M7 1L1 7" stroke={tc.icon} strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  token: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '2px 8px',
    borderRadius: 4,
    border: '1px solid',
    height: 24,
  },
  label: {
    fontFamily: font.family,
    fontSize: font.size.xs,
    fontWeight: font.weight.medium,
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    marginLeft: 2,
  },
};
