import React, { useState, useCallback } from 'react';
import { FormBuilder } from '../FormBuilder';
import type { FormField, FormBuilderProps } from '../FormBuilder';

export interface DynamicFormProps extends FormBuilderProps {
  initialValue?: Record<string, unknown>;
}

/**
 * Checks whether a form has validation errors.
 * Returns true if any required field is empty or pattern validation fails.
 */
export function hasDynamicFormError(
  fields: FormField[],
  value: Record<string, unknown>
): boolean {
  for (const field of fields) {
    const val = value[field.id];

    if (field.required) {
      if (val === undefined || val === null || val === '') return true;
      if (Array.isArray(val) && val.length === 0) return true;
    }

    if (val && field.validation?.pattern) {
      const re = new RegExp(field.validation.pattern);
      if (!re.test(String(val))) return true;
    }
  }
  return false;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  initialValue,
  onChange,
  onSubmit,
  submitLabel,
  className,
}) => {
  const [formValue, setFormValue] = useState<Record<string, unknown>>(
    initialValue ?? {}
  );

  const handleChange = useCallback(
    (next: Record<string, unknown>) => {
      setFormValue(next);
      onChange?.(next);
    },
    [onChange]
  );

  return (
    <FormBuilder
      fields={fields}
      value={formValue}
      onChange={handleChange}
      onSubmit={onSubmit}
      submitLabel={submitLabel}
      className={className}
    />
  );
};

export default DynamicForm;
