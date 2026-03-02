import React from 'react';
import styles from './FormControl.module.css';

export interface FormControlProps {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormControl: React.FC<FormControlProps> = ({
  label,
  helperText,
  error = false,
  errorMessage,
  required = false,
  disabled = false,
  htmlFor,
  children,
  className,
}) => {
  const classes = [
    styles.container,
    disabled && styles.disabled,
    error && styles.error,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {label && (
        <label className={styles.label} htmlFor={htmlFor}>
          {label}
          {required && <span className={styles.required} aria-hidden="true"> *</span>}
        </label>
      )}
      <div className={styles.control}>{children}</div>
      {error && errorMessage ? (
        <p className={styles.errorMessage} role="alert">{errorMessage}</p>
      ) : helperText ? (
        <p className={styles.helperText}>{helperText}</p>
      ) : null}
    </div>
  );
};

export default FormControl;
