import React, { useId } from 'react';
import styles from './NumericFilterInput.module.css';

export type NumericOperator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'between';

export interface NumericFilterValue {
  operator: NumericOperator;
  value: number;
  value2?: number;
}

export interface NumericFilterInputProps {
  value?: NumericFilterValue;
  onChange?: (v: NumericFilterValue) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const OPERATOR_LABELS: Record<NumericOperator, string> = {
  eq: '= (equals)',
  ne: '≠ (not equals)',
  gt: '> (greater than)',
  gte: '≥ (at least)',
  lt: '< (less than)',
  lte: '≤ (at most)',
  between: 'between',
};

const OPERATORS: NumericOperator[] = ['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'between'];

const DEFAULT_VALUE: NumericFilterValue = { operator: 'eq', value: 0 };

export const NumericFilterInput = React.forwardRef<HTMLDivElement, NumericFilterInputProps>(
  (
    {
      value = DEFAULT_VALUE,
      onChange,
      placeholder = '0',
      label,
      disabled = false,
      className,
    },
    ref
  ) => {
    const id = useId();

    const handleOperatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const operator = e.target.value as NumericOperator;
      const next: NumericFilterValue = {
        operator,
        value: value.value,
        value2: operator === 'between' ? (value.value2 ?? 0) : undefined,
      };
      onChange?.(next);
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.({ ...value, value: Number(e.target.value) });
    };

    const handleValue2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.({ ...value, value2: Number(e.target.value) });
    };

    const containerClasses = [styles.container, disabled && styles.disabled, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={containerClasses}>
        {label && (
          <label htmlFor={`${id}-value`} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.row}>
          <select
            className={styles.operatorSelect}
            value={value.operator}
            onChange={handleOperatorChange}
            disabled={disabled}
            aria-label="Filter operator"
          >
            {OPERATORS.map((op) => (
              <option key={op} value={op}>
                {OPERATOR_LABELS[op]}
              </option>
            ))}
          </select>

          <input
            id={`${id}-value`}
            type="number"
            className={styles.numberInput}
            value={value.value}
            onChange={handleValueChange}
            placeholder={placeholder}
            disabled={disabled}
            aria-label={label ? `${label} value` : 'Filter value'}
          />

          {value.operator === 'between' && (
            <>
              <span className={styles.andLabel}>and</span>
              <input
                type="number"
                className={styles.numberInput}
                value={value.value2 ?? 0}
                onChange={handleValue2Change}
                placeholder={placeholder}
                disabled={disabled}
                aria-label="Filter upper value"
              />
            </>
          )}
        </div>
      </div>
    );
  }
);

NumericFilterInput.displayName = 'NumericFilterInput';

export default NumericFilterInput;
