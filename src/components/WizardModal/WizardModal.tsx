import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../Button';
import { LoadingOverlay } from '../LoadingIndicator';
import { Alert } from '../Alert';
import styles from './WizardModal.module.css';

/**
 * WizardStep definition
 */
export interface WizardStep {
  /** Unique step identifier */
  id: string;
  /** Step title displayed in header */
  title: string;
  /** Step content */
  content: React.ReactNode;
  /** Optional validation function - return true to allow navigation */
  validate?: () => boolean | Promise<boolean>;
  /** Text for next/forward button (defaults to "Continue" or "Finish") */
  nextButtonText?: string;
  /** Text for back button (defaults to "Back") */
  backButtonText?: string;
  /** Whether to hide the back button for this step */
  hideBackButton?: boolean;
  /** Whether to hide the next button for this step */
  hideNextButton?: boolean;
}

/**
 * WizardModal Props
 */
export interface WizardModalProps {
  /** Whether the wizard is open */
  isOpen: boolean;
  /** Handler to close the wizard */
  onClose: () => void;
  /** Wizard title */
  title: string;
  /** Array of wizard steps */
  steps: WizardStep[];
  /** Handler called when wizard is completed */
  onComplete: () => void | Promise<void>;
  /** Current step index (controlled mode) */
  currentStep?: number;
  /** Handler for step change (controlled mode) */
  onStepChange?: (step: number) => void;
  /** Whether content is loading */
  isLoading?: boolean;
  /** Loading text */
  loadingText?: string;
  /** Error message to display */
  error?: string;
  /** Handler to clear error */
  onErrorClose?: () => void;
  /** Whether to show progress bar */
  showProgress?: boolean;
  /** Size of the wizard modal */
  size?: 'medium' | 'large';
  /** Additional className */
  className?: string;
}

/**
 * WizardModal Component
 * 
 * A multi-step wizard modal for complex workflows.
 * Based on the WizardModal pattern from radiant-code.
 * 
 * **Features:**
 * - Step-by-step navigation with progress indicator
 * - Forward/back navigation with validation
 * - Loading states and error handling
 * - Configurable step content
 * 
 * @example
 * ```tsx
 * <WizardModal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   title="Create new item"
 *   steps={[
 *     { id: 'step1', title: 'Basic Info', content: <Step1 /> },
 *     { id: 'step2', title: 'Details', content: <Step2 /> },
 *     { id: 'step3', title: 'Review', content: <Step3 /> },
 *   ]}
 *   onComplete={handleComplete}
 *   showProgress
 * />
 * ```
 */
export const WizardModal: React.FC<WizardModalProps> = ({
  isOpen,
  onClose,
  title,
  steps,
  onComplete,
  currentStep: controlledStep,
  onStepChange,
  isLoading = false,
  loadingText,
  error,
  onErrorClose,
  showProgress = true,
  size = 'large',
  className,
}) => {
  const [internalStep, setInternalStep] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  // Use controlled or internal step
  const currentStep = controlledStep ?? internalStep;
  const setCurrentStep = onStepChange ?? setInternalStep;

  // Reset to first step when modal opens
  useEffect(() => {
    if (isOpen && controlledStep === undefined) {
      setInternalStep(0);
    }
  }, [isOpen, controlledStep]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading && !isNavigating) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, isLoading, isNavigating, onClose]);

  const currentStepData = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  // Navigate to next step
  const handleNext = useCallback(async () => {
    if (isNavigating || isLoading) return;

    // Validate current step if validation exists
    if (currentStepData.validate) {
      setIsNavigating(true);
      try {
        const isValid = await currentStepData.validate();
        if (!isValid) {
          setIsNavigating(false);
          return;
        }
      } catch {
        setIsNavigating(false);
        return;
      }
    }

    if (isLastStep) {
      // Complete the wizard
      setIsNavigating(true);
      try {
        await onComplete();
      } finally {
        setIsNavigating(false);
      }
    } else {
      // Go to next step
      setCurrentStep(currentStep + 1);
      setIsNavigating(false);
    }
  }, [currentStep, currentStepData, isLastStep, isLoading, isNavigating, onComplete, setCurrentStep]);

  // Navigate to previous step
  const handleBack = useCallback(() => {
    if (isNavigating || isLoading || isFirstStep) return;
    setCurrentStep(currentStep - 1);
  }, [currentStep, isFirstStep, isLoading, isNavigating, setCurrentStep]);

  // Handle overlay click
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isLoading && !isNavigating) {
      onClose();
    }
  }, [isLoading, isNavigating, onClose]);

  if (!isOpen) return null;

  const modalClasses = [
    styles.modal,
    styles[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={modalClasses} role="dialog" aria-modal="true">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.headerTitle}>{title}</span>
            {steps.length > 1 && (
              <span className={styles.stepTitle}>{currentStepData.title}</span>
            )}
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            disabled={isLoading || isNavigating}
            aria-label="Close wizard"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        {showProgress && steps.length > 1 && (
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`${styles.progressStep} ${index <= currentStep ? styles.progressStepActive : ''}`}
                  style={{ width: `${100 / steps.length}%` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Error Banner */}
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

        {/* Content */}
        <LoadingOverlay isVisible={isLoading} text={loadingText}>
          <div className={styles.content}>
            {currentStepData.content}
          </div>
        </LoadingOverlay>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            {/* Cancel/Deny button could go here */}
          </div>
          <div className={styles.footerRight}>
            {!isFirstStep && !currentStepData.hideBackButton && (
              <Button
                variant="secondary"
                onClick={handleBack}
                disabled={isLoading || isNavigating}
              >
                {currentStepData.backButtonText || 'Back'}
              </Button>
            )}
            {!currentStepData.hideNextButton && (
              <Button
                variant="primary"
                onClick={handleNext}
                loading={isNavigating}
                disabled={isLoading}
              >
                {currentStepData.nextButtonText || (isLastStep ? 'Finish' : 'Continue')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardModal;
