import React from 'react';
import styles from './DirectionControl.module.css';

export type TextDirection = 'ltr' | 'rtl' | 'auto';

export interface DirectionControlProps {
  value: TextDirection;
  onChange?: (v: TextDirection) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

// Inline SVG icons for each direction
const LtrIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* "A" glyph + right arrow */}
    <text x="1" y="12" fontFamily="serif" fontSize="10" fill="currentColor">A</text>
    <path
      d="M9 8h5M11.5 5.5L14 8l-2.5 2.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AutoIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Bidirectional arrows */}
    <path
      d="M2 8h12M4.5 5.5L2 8l2.5 2.5M11.5 5.5L14 8l-2.5 2.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RtlIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Left arrow + "A" glyph */}
    <path
      d="M7 8H2M4.5 5.5L2 8l2.5 2.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <text x="9" y="12" fontFamily="serif" fontSize="10" fill="currentColor">A</text>
  </svg>
);

const BUTTONS: { value: TextDirection; label: string; Icon: React.FC }[] = [
  { value: 'ltr', label: 'LTR', Icon: LtrIcon },
  { value: 'auto', label: 'Auto', Icon: AutoIcon },
  { value: 'rtl', label: 'RTL', Icon: RtlIcon },
];

export const DirectionControl: React.FC<DirectionControlProps> = ({
  value,
  onChange,
  label,
  disabled = false,
  className,
}) => {
  const containerClasses = [styles.container, disabled && styles.disabled, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.group} role="group" aria-label="Text direction">
        {BUTTONS.map(({ value: btnValue, label: btnLabel, Icon }, idx) => {
          const isSelected = value === btnValue;
          const btnClasses = [
            styles.button,
            isSelected && styles.selected,
            idx === 0 && styles.first,
            idx === BUTTONS.length - 1 && styles.last,
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={btnValue}
              type="button"
              className={btnClasses}
              onClick={() => !disabled && onChange?.(btnValue)}
              aria-pressed={isSelected}
              aria-label={btnLabel}
              disabled={disabled}
            >
              <Icon />
              <span className={styles.btnLabel}>{btnLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

DirectionControl.displayName = 'DirectionControl';

export default DirectionControl;
