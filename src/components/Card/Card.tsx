import React, { forwardRef, KeyboardEvent } from 'react';
import styles from './Card.module.css';

export interface CardProps {
  /**
   * Card content
   */
  children: React.ReactNode;
  /**
   * Whether the card is clickable
   * @default false
   */
  interactive?: boolean;
  /**
   * Whether the card is selected
   * @default false
   */
  isSelected?: boolean;
  /**
   * Whether the card is disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Remove border from card
   * @default false
   */
  noBorder?: boolean;
  /**
   * Data identifier passed to onClick
   */
  data?: string;
  /**
   * Click handler
   */
  onClick?: (data: string) => void;
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

export interface CardHeaderProps {
  /**
   * Header title
   */
  title: string;
  /**
   * Optional subtitle
   */
  subtitle?: string;
  /**
   * Action buttons/elements for the header
   */
  actions?: React.ReactNode;
  /**
   * Additional class name
   */
  className?: string;
}

export interface CardBodyProps {
  /**
   * Body content
   */
  children: React.ReactNode;
  /**
   * Remove default padding
   * @default false
   */
  noPadding?: boolean;
  /**
   * Additional class name
   */
  className?: string;
}

export type FooterAlign = 'left' | 'center' | 'right' | 'space-between';

export interface CardFooterProps {
  /**
   * Footer content (typically buttons)
   */
  children: React.ReactNode;
  /**
   * Alignment of footer content
   * @default 'right'
   */
  align?: FooterAlign;
  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Card Header Component
 */
const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  actions,
  className = '',
}) => {
  return (
    <div className={`${styles.header} ${className}`}>
      <div>
        <h3 className={styles.headerTitle}>{title}</h3>
        {subtitle && <p className={styles.headerSubtitle}>{subtitle}</p>}
      </div>
      {actions && <div className={styles.headerActions}>{actions}</div>}
    </div>
  );
};

/**
 * Card Body Component
 */
const CardBody: React.FC<CardBodyProps> = ({
  children,
  noPadding = false,
  className = '',
}) => {
  const classes = [
    styles.body,
    noPadding && styles.bodyNoPadding,
    className,
  ].filter(Boolean).join(' ');

  return <div className={classes}>{children}</div>;
};

/**
 * Card Footer Component
 */
const CardFooter: React.FC<CardFooterProps> = ({
  children,
  align = 'right',
  className = '',
}) => {
  const alignClass = {
    left: styles.footerLeft,
    center: styles.footerCenter,
    right: '',
    'space-between': styles.footerSpaceBetween,
  };

  const classes = [
    styles.footer,
    alignClass[align],
    className,
  ].filter(Boolean).join(' ');

  return <div className={classes}>{children}</div>;
};

type CardComponent = React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
};

/**
 * Card Component
 * 
 * A flexible container component for grouping related content.
 * 
 * **Compound Components:**
 * - `Card.Header` - Title area with optional actions
 * - `Card.Body` - Main content area
 * - `Card.Footer` - Action buttons area
 * 
 * @example
 * ```tsx
 * // Basic card
 * <Card>
 *   <Card.Header title="Settings" subtitle="Manage your preferences" />
 *   <Card.Body>
 *     <p>Card content goes here</p>
 *   </Card.Body>
 *   <Card.Footer>
 *     <Button variant="tertiary">Cancel</Button>
 *     <Button variant="primary">Save</Button>
 *   </Card.Footer>
 * </Card>
 * 
 * // Interactive card
 * <Card interactive onClick={(id) => console.log(id)} data="card-1">
 *   <Card.Body>Click me</Card.Body>
 * </Card>
 * ```
 */
const CardBase = forwardRef<HTMLDivElement, CardProps>(({
  children,
  interactive = false,
  isSelected = false,
  isDisabled = false,
  noBorder = false,
  data = '',
  onClick,
  className = '',
  style,
  ...props
}, ref) => {
  const handleClick = () => {
    if (!isDisabled && onClick) {
      onClick(data);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const classes = [
    styles.card,
    interactive && styles.interactive,
    isSelected && styles.selected,
    isDisabled && styles.disabled,
    noBorder && styles.noBorder,
    className,
  ].filter(Boolean).join(' ');

  const isClickable = interactive && !isDisabled;

  return (
    <div
      ref={ref}
      className={classes}
      style={style}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? 'button' : undefined}
      onClick={isClickable ? handleClick : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      {...props}
    >
      {children}
    </div>
  );
});

CardBase.displayName = 'Card';

// Create compound component
export const Card = CardBase as CardComponent;
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
