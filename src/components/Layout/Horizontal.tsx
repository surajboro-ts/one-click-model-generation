import React, { forwardRef } from 'react';
import styles from './Layout.module.css';

export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type FlexJustify = 'start' | 'center' | 'end' | 'space-between' | 'space-around';

export interface HorizontalProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number | string;
  align?: FlexAlign;
  justify?: FlexJustify;
  wrap?: boolean;
}

export const Horizontal = forwardRef<HTMLDivElement, HorizontalProps>(({
  gap,
  align = 'center',
  justify = 'start',
  wrap = false,
  className,
  style,
  children,
  ...props
}, ref) => {
  const classes = [styles.horizontal, className].filter(Boolean).join(' ');
  return (
    <div
      ref={ref}
      className={classes}
      style={{
        gap: typeof gap === 'number' ? `${gap}px` : gap,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
});

Horizontal.displayName = 'Horizontal';
export default Horizontal;
