import React from 'react';
import styles from './Divider.module.css';

export type DividerSpacing = 'none' | 's' | 'm' | 'l';

export interface DividerProps {
  /**
   * Whether the divider is vertical
   * @default false
   */
  vertical?: boolean;
  /**
   * Whether to include section-level spacing
   * @default false
   */
  section?: boolean;
  /**
   * Spacing around the divider
   * @default 'none'
   */
  spacing?: DividerSpacing;
  /**
   * Whether this divider is on a dark background
   * @default false
   */
  onDarkBg?: boolean;
  /**
   * Additional class name
   */
  className?: string;
}

const spacingClassMap: Record<DividerSpacing, string> = {
  'none': styles.spacingNone,
  's': styles.spacingS,
  'm': styles.spacingM,
  'l': styles.spacingL,
};

/**
 * Divider Component
 * 
 * A simple line separator for dividing content sections.
 * 
 * **Orientation:**
 * - Horizontal (default) - Full width, 1px height
 * - Vertical - Full height, 1px width
 * 
 * **Spacing:**
 * - `none` - No margin
 * - `s` - 8px margin
 * - `m` - 16px margin
 * - `l` - 24px margin
 * 
 * @example
 * ```tsx
 * // Horizontal divider
 * <Divider />
 * 
 * // With spacing
 * <Divider spacing="m" />
 * 
 * // Vertical divider in flex container
 * <div style={{ display: 'flex', height: 32 }}>
 *   <span>Item 1</span>
 *   <Divider vertical spacing="m" />
 *   <span>Item 2</span>
 * </div>
 * 
 * // On dark background
 * <div style={{ background: '#1D232F' }}>
 *   <Divider onDarkBg />
 * </div>
 * ```
 */
export const Divider: React.FC<DividerProps> = ({
  vertical = false,
  section = false,
  spacing = 'none',
  onDarkBg = false,
  className = '',
}) => {
  const classes = [
    styles.divider,
    vertical ? styles.vertical : styles.horizontal,
    section && styles.section,
    spacingClassMap[spacing],
    onDarkBg && styles.onDarkBg,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={classes} 
      role="separator" 
      aria-orientation={vertical ? 'vertical' : 'horizontal'}
    />
  );
};

export default Divider;
