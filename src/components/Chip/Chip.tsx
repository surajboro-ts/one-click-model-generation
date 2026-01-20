import React, { useState, useCallback } from 'react';
import { ChevronRightIcon, CloseIcon } from '../icons';
import { componentColors, textColors } from '../../tokens/colors';
import styles from './Chip.module.css';

export type ChipType = 'attribute' | 'measure' | 'filter' | 'skeleton';
export type ChipState = 'default' | 'hover' | 'pressed' | 'disabled';

export interface ChipProps {
  /** The type/variant of chip */
  type?: ChipType;
  /** The label text to display */
  label: string;
  /** For filter type: the filter value */
  filterValue?: string;
  /** Whether to show the trailing chevron icon */
  showChevron?: boolean;
  /** Whether to show delete button on hover */
  deletable?: boolean;
  /** Whether the chip is disabled */
  disabled?: boolean;
  /** Click handler for the chip */
  onClick?: () => void;
  /** Handler when delete button is clicked */
  onDelete?: () => void;
  /** Additional CSS class name */
  className?: string;
  /** Maximum width of the chip */
  maxWidth?: number;
}

/** Color configuration for each chip type - using semantic tokens */
const chipColors = {
  attribute: componentColors.chip.attribute,
  measure: componentColors.chip.measure,
  filter: componentColors.chip.filter,
  skeleton: {
    default: 'transparent',
    hover: 'transparent',
    pressed: 'transparent',
  },
} as const;

/**
 * Chip Component
 * 
 * A pill-shaped component used for displaying attributes, measures, filters,
 * or placeholder skeleton states. Commonly used in data visualization contexts.
 * 
 * @example
 * ```tsx
 * <Chip type="attribute" label="Country" />
 * <Chip type="measure" label="Revenue" showChevron />
 * <Chip type="filter" label="Status" filterValue="Active" deletable />
 * <Chip type="skeleton" label="Drag a column" />
 * ```
 */
export const Chip: React.FC<ChipProps> = ({
  type = 'attribute',
  label,
  filterValue,
  showChevron = true,
  deletable = false,
  disabled = false,
  onClick,
  onDelete,
  className,
  maxWidth = 320,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (!disabled) setIsHovered(true);
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsPressed(false);
  }, []);

  const handleMouseDown = useCallback(() => {
    if (!disabled) setIsPressed(true);
  }, [disabled]);

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
  }, []);

  const handleClick = useCallback(() => {
    if (!disabled && onClick) {
      onClick();
    }
  }, [disabled, onClick]);

  const handleDeleteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onDelete) {
      onDelete();
    }
  }, [disabled, onDelete]);

  // Determine the current visual state
  const getBackgroundColor = () => {
    if (type === 'skeleton') return 'transparent';
    const colors = chipColors[type];
    if (isPressed) return colors.pressed;
    if (isHovered) return colors.hover;
    return colors.default;
  };

  const isSkeleton = type === 'skeleton';
  const showDeleteButton = deletable && isHovered && !disabled && !isSkeleton;

  // Build class names
  const chipClasses = [
    styles.chip,
    styles[type],
    disabled && styles.disabled,
    isSkeleton && styles.skeleton,
    className,
  ].filter(Boolean).join(' ');

  const bodyClasses = [
    styles.body,
    onClick && styles.clickable,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={chipClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={bodyClasses}
        style={{
          backgroundColor: getBackgroundColor(),
          maxWidth,
          cursor: onClick && !disabled ? 'pointer' : 'default',
        }}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick && !disabled ? 0 : undefined}
        aria-disabled={disabled}
      >
        {type === 'filter' && filterValue ? (
          <div className={styles.filterContent}>
            <span className={styles.filterLabel}>{label}</span>
            <span className={styles.filterValue}>{filterValue}</span>
          </div>
        ) : (
          <span className={styles.label}>{label}</span>
        )}
        
        {showChevron && !isSkeleton && (
          <ChevronRightIcon 
            size={14} 
            color={textColors.default}
            className={styles.chevron}
          />
        )}
      </div>

      {showDeleteButton && (
        <button
          className={styles.deleteButton}
          onClick={handleDeleteClick}
          aria-label={`Remove ${label}`}
          type="button"
        >
          <CloseIcon size={16} />
        </button>
      )}
    </div>
  );
};

export default Chip;

