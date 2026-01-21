import React, { useState, useCallback } from 'react';
import { Icon } from '../icons';
import type { IconName } from '../icons';
import { statusColors, backgroundColors, textColors } from '../../tokens/colors';
import styles from './Alert.module.css';

export type AlertStatus = 'info' | 'success' | 'warning' | 'failure' | 'muted';
export type AlertVariant = 'page' | 'section' | 'section-multiline';

export interface AlertProps {
  /** The status/type of alert */
  status?: AlertStatus;
  /** The variant/layout of the alert */
  variant?: AlertVariant;
  /** The main message text */
  message: string;
  /** Optional link text */
  linkText?: string;
  /** Optional link URL or click handler */
  onLinkClick?: () => void;
  /** Optional button text (only for page variant) */
  buttonText?: string;
  /** Optional button click handler */
  onButtonClick?: () => void;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Handler when dismiss is clicked */
  onDismiss?: () => void;
  /** Whether to show the status icon */
  showIcon?: boolean;
  /** Additional CSS class name */
  className?: string;
}

/** Color and icon configuration for each status - using semantic tokens */
const statusConfig: Record<AlertStatus, {
  background: string;
  iconColor: string;
  iconName: IconName;
}> = {
  info: {
    background: statusColors.info.background,
    iconColor: statusColors.info.default,
    iconName: 'information',
  },
  success: {
    background: statusColors.success.background,
    iconColor: statusColors.success.default,
    iconName: 'checkmark-circle',
  },
  warning: {
    background: statusColors.warning.background,
    iconColor: statusColors.warning.default,
    iconName: 'exclamation-point-circle',
  },
  failure: {
    background: statusColors.error.background,
    iconColor: statusColors.error.default,
    iconName: 'cross-circle',
  },
  muted: {
    background: backgroundColors.secondary,
    iconColor: textColors.secondary,
    iconName: 'information',
  },
};

/**
 * Alert Component (Banner)
 * 
 * A notification component for displaying important messages to users.
 * Supports different statuses (info, success, warning, failure, muted)
 * and variants (page-level, section single-line, section multi-line).
 * 
 * @example
 * ```tsx
 * // Page-level alert
 * <Alert 
 *   variant="page" 
 *   status="success" 
 *   message="Your changes have been saved."
 *   buttonText="View"
 *   onButtonClick={() => {}}
 *   dismissible
 * />
 * 
 * // Section alert
 * <Alert 
 *   variant="section" 
 *   status="warning" 
 *   message="Please review before submitting."
 *   linkText="Learn more"
 *   onLinkClick={() => {}}
 * />
 * 
 * // Multi-line section alert
 * <Alert 
 *   variant="section-multiline" 
 *   status="failure" 
 *   message="Something went wrong. Please try again later or contact support if the problem persists."
 *   linkText="Contact support"
 * />
 * ```
 */
export const Alert: React.FC<AlertProps> = ({
  status = 'info',
  variant = 'section',
  message,
  linkText,
  onLinkClick,
  buttonText,
  onButtonClick,
  dismissible = true,
  onDismiss,
  showIcon = true,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    onDismiss?.();
  }, [onDismiss]);

  if (!isVisible) return null;

  const config = statusConfig[status];

  // Muted variant doesn't show icon
  const shouldShowIcon = showIcon && status !== 'muted';

  // Build class names
  const alertClasses = [
    styles.alert,
    styles[variant],
    styles[status],
    className,
  ].filter(Boolean).join(' ');

  // Page variant
  if (variant === 'page') {
    return (
      <div 
        className={alertClasses}
        style={{ backgroundColor: config.background }}
        role="alert"
      >
        <div className={styles.pageContent}>
          <div className={styles.pageMain}>
            {shouldShowIcon && (
              <Icon 
                name={config.iconName}
                size="l"
                color={config.iconColor}
                className={styles.icon}
              />
            )}
            <div className={styles.textContent}>
              <span className={styles.message}>{message}</span>
              {linkText && (
                <button 
                  className={styles.link}
                  onClick={onLinkClick}
                  type="button"
                >
                  {linkText}
                </button>
              )}
            </div>
            {buttonText && (
              <button 
                className={styles.actionButton}
                onClick={onButtonClick}
                type="button"
              >
                {buttonText}
              </button>
            )}
          </div>
        </div>
        {dismissible && (
          <button
            className={styles.dismissButton}
            onClick={handleDismiss}
            aria-label="Dismiss alert"
            type="button"
          >
            <Icon name="cross" size="s" color={textColors.default} />
          </button>
        )}
      </div>
    );
  }

  // Section multi-line variant
  if (variant === 'section-multiline') {
    return (
      <div 
        className={alertClasses}
        style={{ backgroundColor: config.background }}
        role="alert"
      >
        <div className={styles.sectionMultiContent}>
          {shouldShowIcon && (
            <Icon 
              name={config.iconName}
              size="l"
              color={config.iconColor}
              className={styles.icon}
            />
          )}
          <div className={styles.textColumn}>
            <p className={styles.messageMulti}>{message}</p>
            {linkText && (
              <button 
                className={styles.link}
                onClick={onLinkClick}
                type="button"
              >
                {linkText}
              </button>
            )}
          </div>
        </div>
        {dismissible && (
          <button
            className={styles.dismissButtonSmall}
            onClick={handleDismiss}
            aria-label="Dismiss alert"
            type="button"
          >
            <Icon name="cross" size="s" color={textColors.default} />
          </button>
        )}
      </div>
    );
  }

  // Section single-line variant (default)
  return (
    <div 
      className={alertClasses}
      style={{ backgroundColor: config.background }}
      role="alert"
    >
      <div className={styles.sectionContent}>
        {shouldShowIcon && (
          <Icon 
            name={config.iconName}
            size="l"
            color={config.iconColor}
            className={styles.icon}
          />
        )}
        <div className={styles.textContent}>
          <span className={styles.message}>{message}</span>
          {linkText && (
            <button 
              className={styles.link}
              onClick={onLinkClick}
              type="button"
            >
              {linkText}
            </button>
          )}
        </div>
      </div>
      {dismissible && (
        <button
          className={styles.dismissButtonSmall}
          onClick={handleDismiss}
          aria-label="Dismiss alert"
          type="button"
        >
          <Icon name="cross" size="s" color={textColors.default} />
        </button>
      )}
    </div>
  );
};

export default Alert;

