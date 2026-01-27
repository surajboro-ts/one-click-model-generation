import React, { useCallback, FormEvent } from 'react';
import { Modal } from '../Modal';
import { Button } from '../Button';
import { LoadingOverlay } from '../LoadingIndicator';
import { Alert } from '../Alert';
import styles from './FormModal.module.css';

/**
 * FormModal Props
 */
export interface FormModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Handler to close the modal */
  onClose: () => void;
  /** Modal title */
  title: string;
  /** Form content */
  children: React.ReactNode;
  /** Handler called when form is submitted */
  onSubmit: () => void | Promise<void>;
  /** Submit button text */
  submitText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Whether the form is submitting */
  isSubmitting?: boolean;
  /** Loading text during submission */
  loadingText?: string;
  /** Whether submit is disabled */
  isSubmitDisabled?: boolean;
  /** Error message to display */
  error?: string;
  /** Handler to clear error */
  onErrorClose?: () => void;
  /** Modal size */
  size?: 'small' | 'medium' | 'large';
  /** Additional className */
  className?: string;
  /** Whether to close on overlay click when not submitting */
  closeOnOverlayClick?: boolean;
}

/**
 * FormModal Component
 * 
 * A modal optimized for form content with validation and submission.
 * 
 * **Features:**
 * - Form submission handling with loading state
 * - Error display with dismissible banner
 * - Prevents accidental close during submission
 * - Keyboard accessible (Enter to submit when focused)
 * 
 * @example
 * ```tsx
 * <FormModal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   title="Create New Item"
 *   onSubmit={handleSubmit}
 *   isSubmitting={isSubmitting}
 *   error={error}
 * >
 *   <TextInput label="Name" value={name} onChange={setName} />
 *   <Select label="Category" options={categories} value={category} onChange={setCategory} />
 * </FormModal>
 * ```
 */
export const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitText = 'Save',
  cancelText = 'Cancel',
  isSubmitting = false,
  loadingText,
  isSubmitDisabled = false,
  error,
  onErrorClose,
  size = 'medium',
  className,
  closeOnOverlayClick = true,
}) => {
  // Handle form submission
  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (!isSubmitting && !isSubmitDisabled) {
      onSubmit();
    }
  }, [isSubmitting, isSubmitDisabled, onSubmit]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    if (!isSubmitting) {
      onClose();
    }
  }, [isSubmitting, onClose]);

  const footer = (
    <div className={styles.footer}>
      <Button
        variant="secondary"
        onClick={handleCancel}
        disabled={isSubmitting}
      >
        {cancelText}
      </Button>
      <Button
        variant="primary"
        htmlType="submit"
        onClick={() => onSubmit()}
        loading={isSubmitting}
        disabled={isSubmitDisabled || isSubmitting}
      >
        {submitText}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title={title}
      footer={footer}
      size={size}
      className={className}
      closeOnOverlayClick={closeOnOverlayClick && !isSubmitting}
      closeOnEscape={!isSubmitting}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Error banner */}
        {error && (
          <div className={styles.errorBanner}>
            <Alert
              status="failure"
              message={error}
              variant="section"
              dismissible={!!onErrorClose}
              onDismiss={onErrorClose}
            />
          </div>
        )}

        {/* Form content with loading overlay */}
        <LoadingOverlay isVisible={isSubmitting} text={loadingText}>
          <div className={styles.content}>
            {children}
          </div>
        </LoadingOverlay>
      </form>
    </Modal>
  );
};

/**
 * FormField Component - Helper for consistent form field layout
 */
export interface FormFieldProps {
  /** Field label */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Field content */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  helperText,
  error,
  children,
  className,
}) => (
  <div className={`${styles.field} ${className || ''}`}>
    {label && (
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
    )}
    {children}
    {(helperText || error) && (
      <span className={`${styles.helperText} ${error ? styles.errorText : ''}`}>
        {error || helperText}
      </span>
    )}
  </div>
);

/**
 * FormRow Component - Helper for horizontal field layout
 */
export const FormRow: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={`${styles.row} ${className || ''}`}>{children}</div>
);

export default FormModal;
