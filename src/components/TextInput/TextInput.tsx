import React, { forwardRef, useId } from 'react';
import styles from './TextInput.module.css';

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text */
  label?: string;
  /** Whether to show the label */
  showLabel?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input has an error */
  error?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Additional CSS class name */
  className?: string;
}

/**
 * TextInput Component
 * 
 * A text input field with optional label and error states.
 * 
 * @example
 * ```tsx
 * <TextInput label="Name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
 * <TextInput label="Email" error errorMessage="Invalid email" />
 * ```
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  label,
  showLabel = true,
  placeholder,
  value,
  onChange,
  disabled = false,
  error = false,
  errorMessage,
  className,
  ...props
}, ref) => {
  const id = useId();

  const containerClasses = [
    styles.container,
    disabled && styles.disabled,
    error && styles.error,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {showLabel && label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={error}
        aria-describedby={error && errorMessage ? `${id}-error` : undefined}
        {...props}
      />
      {error && errorMessage && (
        <span id={`${id}-error`} className={styles.errorMessage}>
          {errorMessage}
        </span>
      )}
    </div>
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;
