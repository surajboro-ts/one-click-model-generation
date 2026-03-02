import React, { useState, useCallback } from 'react';
import styles from './FormBuilder.module.css';

/* ─── Types ─────────────────────────────────────────────────────────────── */

export type FieldType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'toggle'
  | 'date';

export interface FormFieldOption {
  id: string;
  label: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: FormFieldOption[];
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
    message?: string;
  };
}

export interface FormBuilderProps {
  fields: FormField[];
  value?: Record<string, unknown>;
  onChange?: (value: Record<string, unknown>) => void;
  onSubmit?: (value: Record<string, unknown>) => void;
  submitLabel?: string;
  className?: string;
}

/* ─── Validation ────────────────────────────────────────────────────────── */

function validateField(field: FormField, val: unknown): string | null {
  if (field.required) {
    if (val === undefined || val === null || val === '') return `${field.label} is required`;
    if (Array.isArray(val) && val.length === 0) return `${field.label} is required`;
  }
  if (val && field.validation?.pattern) {
    const re = new RegExp(field.validation.pattern);
    if (!re.test(String(val))) {
      return field.validation.message ?? `${field.label} format is invalid`;
    }
  }
  return null;
}

/* ─── Toggle switch sub-component ──────────────────────────────────────── */

interface InlineToggleProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const InlineToggle: React.FC<InlineToggleProps> = ({ id, checked, onChange, disabled }) => (
  <label className={styles.toggleLabel} htmlFor={id}>
    <input
      type="checkbox"
      id={id}
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
      className={styles.toggleInput}
    />
    <span className={[styles.toggleTrack, checked && styles.toggleTrackOn].filter(Boolean).join(' ')}>
      <span
        className={styles.toggleThumb}
        style={{ transform: checked ? 'translateX(12px)' : 'translateX(0)' }}
      />
    </span>
  </label>
);

/* ─── Field renderer ────────────────────────────────────────────────────── */

interface FieldRendererProps {
  field: FormField;
  value: unknown;
  error: string | null;
  onChange: (val: unknown) => void;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({ field, value, error, onChange }) => {
  const inputId = `form-field-${field.id}`;

  const renderInput = () => {
    switch (field.type) {
      case 'text':
        return (
          <input
            id={inputId}
            type="text"
            className={[styles.input, error && styles.inputError].filter(Boolean).join(' ')}
            value={(value as string) ?? ''}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case 'textarea':
        return (
          <textarea
            id={inputId}
            className={[styles.textarea, error && styles.inputError].filter(Boolean).join(' ')}
            value={(value as string) ?? ''}
            placeholder={field.placeholder}
            rows={4}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case 'date':
        return (
          <input
            id={inputId}
            type="date"
            className={[styles.input, error && styles.inputError].filter(Boolean).join(' ')}
            value={(value as string) ?? ''}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case 'select':
        return (
          <select
            id={inputId}
            className={[styles.select, error && styles.inputError].filter(Boolean).join(' ')}
            value={(value as string) ?? ''}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">{field.placeholder ?? 'Select an option'}</option>
            {field.options?.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'radio': {
        const radioVal = value as string | undefined;
        return (
          <div className={styles.optionGroup} role="radiogroup" aria-labelledby={`${inputId}-label`}>
            {field.options?.map((opt) => (
              <label key={opt.id} className={styles.optionLabel}>
                <input
                  type="radio"
                  name={field.id}
                  value={opt.id}
                  checked={radioVal === opt.id}
                  onChange={() => onChange(opt.id)}
                  className={styles.optionInput}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        );
      }

      case 'checkbox': {
        const checkVals = (value as string[]) ?? [];
        return (
          <div className={styles.optionGroup} role="group" aria-labelledby={`${inputId}-label`}>
            {field.options?.map((opt) => (
              <label key={opt.id} className={styles.optionLabel}>
                <input
                  type="checkbox"
                  value={opt.id}
                  checked={checkVals.includes(opt.id)}
                  onChange={(e) => {
                    const next = e.target.checked
                      ? [...checkVals, opt.id]
                      : checkVals.filter((v) => v !== opt.id);
                    onChange(next);
                  }}
                  className={styles.optionInput}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        );
      }

      case 'toggle':
        return (
          <InlineToggle
            id={inputId}
            checked={(value as boolean) ?? false}
            onChange={onChange}
          />
        );

      default:
        return null;
    }
  };

  const isGroupField = field.type === 'radio' || field.type === 'checkbox';

  return (
    <div className={styles.fieldWrapper}>
      {field.type !== 'toggle' ? (
        <label
          id={isGroupField ? `${inputId}-label` : undefined}
          htmlFor={isGroupField ? undefined : inputId}
          className={styles.fieldLabel}
        >
          {field.label}
          {field.required && <span className={styles.required} aria-hidden="true">*</span>}
        </label>
      ) : (
        <div className={styles.toggleRow}>
          <span className={styles.fieldLabel}>
            {field.label}
            {field.required && <span className={styles.required} aria-hidden="true">*</span>}
          </span>
          {renderInput()}
        </div>
      )}

      {field.type !== 'toggle' && renderInput()}

      {error && (
        <span className={styles.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

/* ─── FormBuilder ───────────────────────────────────────────────────────── */

export const FormBuilder: React.FC<FormBuilderProps> = ({
  fields,
  value: controlledValue,
  onChange,
  onSubmit,
  submitLabel = 'Submit',
  className,
}) => {
  const [internalValues, setInternalValues] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const formValues = controlledValue ?? internalValues;

  const handleFieldChange = useCallback(
    (fieldId: string, val: unknown) => {
      const next = { ...formValues, [fieldId]: val };
      setInternalValues(next);
      onChange?.(next);
      // Clear error on change
      setErrors((prev) => ({ ...prev, [fieldId]: null }));
    },
    [formValues, onChange]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const newErrors: Record<string, string | null> = {};
      let hasErrors = false;

      fields.forEach((field) => {
        const err = validateField(field, formValues[field.id]);
        newErrors[field.id] = err;
        if (err) hasErrors = true;
      });

      setErrors(newErrors);

      if (!hasErrors) {
        onSubmit?.(formValues);
      }
    },
    [fields, formValues, onSubmit]
  );

  return (
    <form
      className={[styles.form, className].filter(Boolean).join(' ')}
      onSubmit={handleSubmit}
      noValidate
    >
      {fields.map((field) => (
        <FieldRenderer
          key={field.id}
          field={field}
          value={formValues[field.id]}
          error={errors[field.id] ?? null}
          onChange={(val) => handleFieldChange(field.id, val)}
        />
      ))}

      {onSubmit && (
        <div className={styles.submitRow}>
          <button type="submit" className={styles.submitButton}>
            {submitLabel}
          </button>
        </div>
      )}
    </form>
  );
};

export default FormBuilder;
