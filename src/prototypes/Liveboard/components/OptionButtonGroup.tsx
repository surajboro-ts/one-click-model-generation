import React, { useState } from 'react';
import { Icon } from '../../../components/icons';
import { colors, typography, borderRadius } from '../styles';

interface OptionButton {
  id: string;
  icon?: string;
  label?: string;
  customIcon?: React.ReactNode;
}

interface OptionButtonGroupProps {
  options: OptionButton[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

/**
 * OptionButtonGroup Component
 * 
 * A group of selectable icon buttons for settings like Density, Corner radius, Spacing.
 * Only one option can be selected at a time.
 */
export const OptionButtonGroup: React.FC<OptionButtonGroupProps> = ({
  options,
  value,
  onChange,
  disabled = false,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div style={styles.container}>
      {options.map((option) => {
        const isSelected = value === option.id;
        const isHovered = hoveredId === option.id;

        return (
          <button
            key={option.id}
            style={{
              ...styles.button,
              ...(isSelected ? styles.buttonSelected : {}),
              ...(isHovered && !isSelected ? styles.buttonHovered : {}),
              ...(disabled ? styles.buttonDisabled : {}),
            }}
            onClick={() => !disabled && onChange(option.id)}
            onMouseEnter={() => setHoveredId(option.id)}
            onMouseLeave={() => setHoveredId(null)}
            disabled={disabled}
            type="button"
            aria-pressed={isSelected}
          >
            {option.customIcon ? (
              option.customIcon
            ) : option.icon ? (
              <Icon
                name={option.icon as any}
                size="s"
                color={isSelected ? colors.accent : colors.textSecondary}
              />
            ) : option.label ? (
              <span
                style={{
                  ...styles.label,
                  color: isSelected ? colors.accent : colors.textSecondary,
                }}
              >
                {option.label}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    gap: 4,
    fontFamily: typography.fontFamily,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    padding: 0,
    backgroundColor: colors.cardBg,
    border: `1px solid ${colors.border}`,
    borderRadius: borderRadius.sm,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  buttonSelected: {
    backgroundColor: colors.accent + '15',
    borderColor: colors.accent,
  },
  buttonHovered: {
    backgroundColor: colors.pageBg,
    borderColor: colors.textMuted,
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  label: {
    fontSize: 11,
    fontWeight: 500,
  },
};

export default OptionButtonGroup;
