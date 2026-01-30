import React, { createElement, forwardRef, ElementType } from 'react';
import styles from './Typography.module.css';

/**
 * V2 Typography variants (recommended)
 */
export type V2Variant = 
  | 'headline-large'
  | 'page-title'
  | 'modal-title'
  | 'section-label'
  | 'content-label'
  | 'content-label-subhead'
  | 'body-large'
  | 'body-normal'
  | 'footnote'
  | 'caption'
  | 'overline';

/**
 * Legacy heading variants
 */
export type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/**
 * Legacy paragraph variants
 */
export type ParagraphVariant = 'p' | 'p-bold' | 'p-small' | 'p-small-bold' | 'p-large' | 'p-large-bold';

export type TypographyVariant = V2Variant | HeadingVariant | ParagraphVariant;

export type TypographyColor = 
  | 'base'
  | 'gray'
  | 'gray-light'
  | 'info'
  | 'accent'
  | 'success'
  | 'warning'
  | 'failure'
  | 'white';

export interface EllipsisConfig {
  /**
   * Number of lines before truncation
   */
  rows: number;
  /**
   * Allow margin when ellipsis is enabled
   * @default false
   */
  allowMargin?: boolean;
}

export interface TypographyProps {
  /**
   * Typography variant
   */
  variant: TypographyVariant;
  /**
   * Content to display
   */
  children: React.ReactNode;
  /**
   * Text color
   * @default 'base'
   */
  color?: TypographyColor;
  /**
   * Override the default HTML tag
   */
  as?: ElementType;
  /**
   * Remove bottom margin
   * @default false
   */
  noMargin?: boolean;
  /**
   * Preserve whitespace
   * @default false
   */
  preserveWhitespace?: boolean;
  /**
   * Enable word wrapping
   * @default false
   */
  wrapContent?: boolean;
  /**
   * Ellipsis configuration for text truncation
   */
  ellipsis?: EllipsisConfig;
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  /**
   * Data test ID
   */
  dataTestId?: string;
  /**
   * Click handler
   */
  onClick?: () => void;
}

/**
 * Maps variants to their default HTML tags
 */
const variantToTagMap: Record<TypographyVariant, ElementType> = {
  // V2 variants
  'headline-large': 'h1',
  'page-title': 'h2',
  'modal-title': 'h3',
  'section-label': 'h4',
  'content-label': 'h5',
  'content-label-subhead': 'h6',
  'body-large': 'p',
  'body-normal': 'p',
  'footnote': 'p',
  'caption': 'span',
  'overline': 'span',
  // Legacy variants
  'h1': 'h1',
  'h2': 'h2',
  'h3': 'h3',
  'h4': 'h4',
  'h5': 'h5',
  'h6': 'h6',
  'p': 'p',
  'p-bold': 'p',
  'p-small': 'p',
  'p-small-bold': 'p',
  'p-large': 'p',
  'p-large-bold': 'p',
};

/**
 * Maps variants to their CSS class names
 */
const variantToClassMap: Record<TypographyVariant, string> = {
  // V2 variants
  'headline-large': styles.headlineLarge,
  'page-title': styles.pageTitle,
  'modal-title': styles.modalTitle,
  'section-label': styles.sectionLabel,
  'content-label': styles.contentLabel,
  'content-label-subhead': styles.contentLabelSubhead,
  'body-large': styles.bodyLarge,
  'body-normal': styles.bodyNormal,
  'footnote': styles.footnote,
  'caption': styles.caption,
  'overline': styles.overline,
  // Legacy variants
  'h1': styles.h1,
  'h2': styles.h2,
  'h3': styles.h3,
  'h4': styles.h4,
  'h5': styles.h5,
  'h6': styles.h6,
  'p': styles.p,
  'p-bold': styles.pBold,
  'p-small': styles.pSmall,
  'p-small-bold': styles.pSmallBold,
  'p-large': styles.pLarge,
  'p-large-bold': styles.pLargeBold,
};

/**
 * Maps colors to their CSS class names
 */
const colorToClassMap: Record<TypographyColor, string> = {
  'base': styles.colorBase,
  'gray': styles.colorGray,
  'gray-light': styles.colorGrayLight,
  'info': styles.colorInfo,
  'accent': styles.colorAccent,
  'success': styles.colorSuccess,
  'warning': styles.colorWarning,
  'failure': styles.colorFailure,
  'white': styles.colorWhite,
};

/**
 * Typography Component
 * 
 * A flexible text component supporting Radiant V2 typography system.
 * 
 * **V2 Variants (recommended):**
 * - `headline-large` - 32px, hero sections
 * - `page-title` - 24px, page headers
 * - `modal-title` - 20px, modal headers
 * - `section-label` - 18px, section headers
 * - `content-label` - 16px, content headers
 * - `content-label-subhead` - 14px, subheaders
 * - `body-large` - 16px, large body text
 * - `body-normal` - 14px, default body text
 * - `footnote` - 12px, footnotes
 * - `caption` - 12px, image captions
 * - `overline` - 12px, section labels (uppercase)
 * 
 * **Legacy Variants:**
 * - `h1` through `h6` - Semantic headings
 * - `p`, `p-bold`, `p-small`, `p-large` - Paragraphs
 * 
 * @example
 * ```tsx
 * // V2 typography
 * <Typography variant="page-title">Dashboard</Typography>
 * <Typography variant="body-normal" color="gray">Description text</Typography>
 * 
 * // With ellipsis
 * <Typography variant="body-normal" ellipsis={{ rows: 2 }}>
 *   Long text that will be truncated...
 * </Typography>
 * 
 * // Legacy headings
 * <Typography variant="h1">Main Heading</Typography>
 * ```
 */
export const Typography = forwardRef<HTMLElement, TypographyProps>(({
  variant,
  children,
  color = 'base',
  as,
  noMargin = false,
  preserveWhitespace = false,
  wrapContent = false,
  ellipsis,
  className = '',
  style,
  dataTestId,
  onClick,
  ...props
}, ref) => {
  const tag = as || variantToTagMap[variant];
  const isEllipsisEnabled = ellipsis?.rows !== undefined;
  const isEllipsisOnFirstLine = ellipsis?.rows === 1;

  const classes = [
    styles.typography,
    variantToClassMap[variant],
    colorToClassMap[color],
    preserveWhitespace && styles.whiteSpace,
    (noMargin || (isEllipsisEnabled && !ellipsis?.allowMargin)) && styles.noMargin,
    (wrapContent || isEllipsisEnabled) && styles.wrapContent,
    isEllipsisOnFirstLine && styles.ellipsisOnFirstLine,
    isEllipsisEnabled && !isEllipsisOnFirstLine && styles.ellipsisMultiLine,
    className,
  ].filter(Boolean).join(' ');

  const inlineStyle: React.CSSProperties = {
    ...style,
    ...(isEllipsisEnabled && !isEllipsisOnFirstLine && { WebkitLineClamp: ellipsis.rows }),
  };

  return createElement(
    tag,
    {
      ref,
      className: classes,
      style: inlineStyle,
      'data-testid': dataTestId,
      onClick,
      ...props,
    },
    children
  );
});

Typography.displayName = 'Typography';

export default Typography;
