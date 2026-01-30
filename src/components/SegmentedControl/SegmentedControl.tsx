import React, { useCallback, ReactNode } from 'react';
import styles from './SegmentedControl.module.css';

export interface SegmentOption {
  /**
   * Unique identifier for the segment
   */
  id: string;
  /**
   * Label text (for text variant)
   */
  label?: string;
  /**
   * Icon element (for icon variant)
   */
  icon?: ReactNode;
  /**
   * Whether this option is disabled
   */
  disabled?: boolean;
  /**
   * Aria label for the option (useful for icon-only variants)
   */
  ariaLabel?: string;
}

export interface SegmentedControlProps {
  /**
   * Array of segment options
   */
  options: SegmentOption[];
  /**
   * Currently selected segment ID
   */
  value: string;
  /**
   * Change handler
   */
  onChange: (value: string) => void;
  /**
   * Size variant
   * @default 'default'
   */
  size?: 'small' | 'default' | 'large';
  /**
   * Whether the entire control is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Fill available width
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Accessible label for the control
   */
  'aria-label'?: string;
}

/**
 * SegmentedControl Component
 * 
 * A group of mutually exclusive options displayed as connected segments.
 * Supports both text and icon variants.
 * 
 * @example
 * ```tsx
 * // Text variant
 * <SegmentedControl
 *   options={[
 *     { id: 'day', label: 'Day' },
 *     { id: 'week', label: 'Week' },
 *     { id: 'month', label: 'Month' },
 *   ]}
 *   value={view}
 *   onChange={setView}
 * />
 * 
 * // Icon variant
 * <SegmentedControl
 *   options={[
 *     { id: 'grid', icon: <GridIcon />, ariaLabel: 'Grid view' },
 *     { id: 'list', icon: <ListIcon />, ariaLabel: 'List view' },
 *   ]}
 *   value={viewMode}
 *   onChange={setViewMode}
 * />
 * 
 * // Full width
 * <SegmentedControl
 *   options={options}
 *   value={selected}
 *   onChange={setSelected}
 *   fullWidth
 * />
 * ```
 */
export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
  size = 'default',
  disabled = false,
  fullWidth = false,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const handleSelect = useCallback((id: string, optionDisabled?: boolean) => {
    if (!disabled && !optionDisabled) {
      onChange(id);
    }
  }, [disabled, onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    const enabledOptions = options.filter(opt => !opt.disabled);
    const currentEnabledIndex = enabledOptions.findIndex(opt => opt.id === options[index].id);
    
    let nextIndex: number | null = null;
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentEnabledIndex + 1) % enabledOptions.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = currentEnabledIndex === 0 ? enabledOptions.length - 1 : currentEnabledIndex - 1;
    }
    
    if (nextIndex !== null) {
      const nextOption = enabledOptions[nextIndex];
      if (nextOption) {
        onChange(nextOption.id);
        // Focus the button
        const button = document.querySelector(`[data-segment-id="${nextOption.id}"]`) as HTMLButtonElement;
        button?.focus();
      }
    }
  }, [options, onChange]);

  const containerClasses = [
    styles.container,
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    className,
  ].filter(Boolean).join(' ');

  const isIconOnly = options.every(opt => opt.icon && !opt.label);

  return (
    <div
      className={containerClasses}
      role="radiogroup"
      aria-label={ariaLabel}
    >
      {options.map((option, index) => {
        const isSelected = option.id === value;
        const isOptionDisabled = disabled || option.disabled;

        const segmentClasses = [
          styles.segment,
          isSelected && styles.selected,
          isOptionDisabled && styles.segmentDisabled,
          isIconOnly && styles.iconOnly,
        ].filter(Boolean).join(' ');

        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={option.ariaLabel}
            data-segment-id={option.id}
            className={segmentClasses}
            onClick={() => handleSelect(option.id, option.disabled)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            disabled={isOptionDisabled}
            tabIndex={isSelected ? 0 : -1}
          >
            {option.icon && <span className={styles.icon}>{option.icon}</span>}
            {option.label && <span className={styles.label}>{option.label}</span>}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControl;
