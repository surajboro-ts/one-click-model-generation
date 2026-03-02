import React, { useId } from 'react';
import styles from './Slider.module.css';

export interface SliderMark {
  value: number;
  label?: string;
}

export interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  showValue?: boolean;
  label?: string;
  marks?: SliderMark[];
  className?: string;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      step = 1,
      onChange,
      disabled = false,
      showValue = false,
      label,
      marks,
      className,
    },
    ref
  ) => {
    const id = useId();
    const fillPercent = ((value - min) / (max - min)) * 100;

    const containerClasses = [styles.container, disabled && styles.disabled, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        className={containerClasses}
        style={{ '--fill-percent': `${fillPercent}%` } as React.CSSProperties}
      >
        {/* Label row */}
        {(label || showValue) && (
          <div className={styles.labelRow}>
            {label && (
              <label htmlFor={id} className={styles.label}>
                {label}
              </label>
            )}
            {showValue && <span className={styles.valueDisplay}>{value}</span>}
          </div>
        )}

        {/* Track + input */}
        <div className={styles.trackWrapper}>
          <input
            ref={ref}
            id={id}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            className={styles.input}
            onChange={(e) => onChange?.(Number(e.target.value))}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-label={label}
          />
        </div>

        {/* Marks */}
        {marks && marks.length > 0 && (
          <div className={styles.marks}>
            {marks.map((mark) => {
              const markPercent = ((mark.value - min) / (max - min)) * 100;
              return (
                <div
                  key={mark.value}
                  className={styles.markItem}
                  style={{ left: `${markPercent}%` }}
                >
                  <div className={styles.markDot} />
                  {mark.label && <span className={styles.markLabel}>{mark.label}</span>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export default Slider;
