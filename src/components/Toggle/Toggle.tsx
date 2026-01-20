import React, { useCallback, useId } from 'react';
import { brandColors } from '../../tokens/colors/brand';
import styles from './Toggle.module.css';

export type LabelPosition = 'left' | 'right';

export interface ToggleProps {
  /** Whether the toggle is on */
  checked?: boolean;
  /** Label text */
  label?: string;
  /** Whether to show the label */
  showLabel?: boolean;
  /** Position of the label relative to the toggle */
  labelPosition?: LabelPosition;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Name attribute for form submission */
  name?: string;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Additional CSS class name */
  className?: string;
}

/**
 * Toggle Component
 * 
 * A switch control for boolean on/off states.
 * 
 * @example
 * ```tsx
 * <Toggle label="Dark mode" checked={darkMode} onChange={setDarkMode} />
 * <Toggle label="Notifications" labelPosition="right" checked={notifications} onChange={setNotifications} />
 * <Toggle label="Disabled" disabled />
 * ```
 */
export const Toggle: React.FC<ToggleProps> = ({
  checked = false,
  label,
  showLabel = true,
  labelPosition = 'left',
  disabled = false,
  name,
  onChange,
  className,
}) => {
  const id = useId();

  const handleChange = useCallback(() => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  }, [disabled, onChange, checked]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleChange();
    }
  }, [handleChange]);

  const containerClasses = [
    styles.toggle,
    styles[labelPosition],
    disabled && styles.disabled,
    className,
  ].filter(Boolean).join(' ');

  const trackClasses = [
    styles.track,
    checked && styles.checked,
  ].filter(Boolean).join(' ');

  return (
    <label 
      className={containerClasses}
      htmlFor={id}
    >
      <input
        type="checkbox"
        role="switch"
        id={id}
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={styles.input}
        aria-checked={checked}
      />
      {showLabel && label && labelPosition === 'left' && (
        <span className={styles.label}>{label}</span>
      )}
      <span className={trackClasses}>
        <span 
          className={styles.thumb}
          style={{
            transform: checked ? 'translateX(12px)' : 'translateX(0)',
          }}
        />
      </span>
      {showLabel && label && labelPosition === 'right' && (
        <span className={styles.label}>{label}</span>
      )}
    </label>
  );
};

export default Toggle;

