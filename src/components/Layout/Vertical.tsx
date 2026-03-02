import React, { forwardRef } from 'react';
import styles from './Layout.module.css';
import type { FlexAlign, FlexJustify } from './Horizontal';

export interface VerticalProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number | string;
  align?: FlexAlign;
  justify?: FlexJustify;
}

export const Vertical = forwardRef<HTMLDivElement, VerticalProps>(({
  gap,
  align = 'stretch',
  justify = 'start',
  className,
  style,
  children,
  ...props
}, ref) => {
  const classes = [styles.vertical, className].filter(Boolean).join(' ');
  return (
    <div
      ref={ref}
      className={classes}
      style={{
        gap: typeof gap === 'number' ? `${gap}px` : gap,
        alignItems: align,
        justifyContent: justify,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
});

Vertical.displayName = 'Vertical';
export default Vertical;
