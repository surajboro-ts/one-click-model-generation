import React, { useState, useRef, useCallback } from 'react';
import styles from './SplitPane.module.css';

export interface SplitPaneProps {
  left: React.ReactNode;
  right: React.ReactNode;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export const SplitPane = React.forwardRef<HTMLDivElement, SplitPaneProps>(
  (
    {
      left,
      right,
      defaultSize = 50,
      minSize = 20,
      maxSize = 80,
      direction = 'horizontal',
      className,
    },
    ref
  ) => {
    const [splitPercent, setSplitPercent] = useState(
      Math.min(Math.max(defaultSize, minSize), maxSize)
    );
    const isDragging = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handlePointerDown = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        e.preventDefault();
        isDragging.current = true;
        (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      },
      []
    );

    const handlePointerMove = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging.current || !containerRef.current) return;
        e.preventDefault();

        const rect = containerRef.current.getBoundingClientRect();

        let newPercent: number;
        if (direction === 'horizontal') {
          const offsetX = e.clientX - rect.left;
          newPercent = (offsetX / rect.width) * 100;
        } else {
          const offsetY = e.clientY - rect.top;
          newPercent = (offsetY / rect.height) * 100;
        }

        const clamped = Math.min(Math.max(newPercent, minSize), maxSize);
        setSplitPercent(clamped);
      },
      [direction, minSize, maxSize]
    );

    const handlePointerUp = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (isDragging.current) {
          isDragging.current = false;
          (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
        }
      },
      []
    );

    const isHorizontal = direction === 'horizontal';

    const containerClasses = [
      styles.container,
      isHorizontal ? styles.horizontal : styles.vertical,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const dividerClasses = [
      styles.divider,
      isHorizontal ? styles.dividerHorizontal : styles.dividerVertical,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={(node) => {
          // Merge forwarded ref and internal containerRef
          containerRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }}
        className={containerClasses}
      >
        {/* Primary panel */}
        <div
          className={styles.panel}
          style={
            isHorizontal
              ? { flexBasis: `${splitPercent}%`, width: `${splitPercent}%` }
              : { flexBasis: `${splitPercent}%`, height: `${splitPercent}%` }
          }
        >
          {left}
        </div>

        {/* Drag divider */}
        <div
          className={dividerClasses}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          role="separator"
          aria-orientation={isHorizontal ? 'vertical' : 'horizontal'}
          aria-valuenow={Math.round(splitPercent)}
          aria-valuemin={minSize}
          aria-valuemax={maxSize}
          tabIndex={0}
          onKeyDown={(e) => {
            const step = 5;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
              e.preventDefault();
              setSplitPercent((p) => Math.min(p + step, maxSize));
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
              e.preventDefault();
              setSplitPercent((p) => Math.max(p - step, minSize));
            }
          }}
        />

        {/* Secondary panel */}
        <div
          className={styles.panel}
          style={
            isHorizontal
              ? { flexBasis: `${100 - splitPercent}%`, width: `${100 - splitPercent}%` }
              : { flexBasis: `${100 - splitPercent}%`, height: `${100 - splitPercent}%` }
          }
        >
          {right}
        </div>
      </div>
    );
  }
);

SplitPane.displayName = 'SplitPane';

export default SplitPane;
