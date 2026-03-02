import React from 'react';
import styles from './Legend.module.css';

export interface LegendItem {
  color: string;
  label: string;
  value?: string | number;
}

export interface LegendProps {
  items: LegendItem[];
  orientation?: 'horizontal' | 'vertical';
  dotShape?: 'circle' | 'square' | 'line';
  className?: string;
}

export const Legend: React.FC<LegendProps> = ({
  items,
  orientation = 'horizontal',
  dotShape = 'circle',
  className,
}) => {
  const containerClasses = [
    styles.container,
    orientation === 'vertical' ? styles.vertical : styles.horizontal,
    className,
  ].filter(Boolean).join(' ');

  const renderDot = (color: string) => {
    if (dotShape === 'line') {
      return (
        <span
          className={styles.line}
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
      );
    }
    return (
      <span
        className={[styles.dot, dotShape === 'square' ? styles.square : styles.circle]
          .filter(Boolean)
          .join(' ')}
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
    );
  };

  return (
    <div className={containerClasses}>
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          {renderDot(item.color)}
          <span className={styles.label}>{item.label}</span>
          {item.value !== undefined && (
            <span className={styles.value}>{item.value}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Legend;
