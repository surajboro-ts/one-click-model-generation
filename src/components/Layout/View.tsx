import React, { forwardRef } from 'react';
import styles from './Layout.module.css';
import type { FlexAlign, FlexJustify } from './Horizontal';

export interface ViewProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number | string;
  align?: FlexAlign;
  justify?: FlexJustify;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
}

export const View = forwardRef<HTMLDivElement, ViewProps>(({
  gap,
  align,
  justify = 'start',
  flexDirection,
  className,
  style,
  children,
  ...props
}, ref) => {
  const classes = [styles.view, className].filter(Boolean).join(' ');
  return (
    <div
      ref={ref}
      className={classes}
      style={{
        gap: typeof gap === 'number' ? `${gap}px` : gap,
        alignItems: align,
        justifyContent: justify,
        flexDirection,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
});

View.displayName = 'View';
export default View;
