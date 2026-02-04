import React from 'react';
import styles from './Modal.module.css';

export interface ModalWizardProgressProps {
  /** Current step (1-indexed) */
  currentStep: number;
  /** Total number of steps (2-4) */
  totalSteps: number;
  /** Additional CSS class name */
  className?: string;
}

/**
 * ModalWizardProgress Component
 * 
 * Step progress indicator for wizard-type modals.
 * Displays a horizontal bar with segments for each step.
 * Active steps are blue, inactive steps are gray.
 * 
 * @example
 * ```tsx
 * <ModalWizardProgress currentStep={2} totalSteps={3} />
 * ```
 */
export const ModalWizardProgress: React.FC<ModalWizardProgressProps> = ({
  currentStep,
  totalSteps,
  className,
}) => {
  // Validate props
  const validTotalSteps = Math.min(Math.max(totalSteps, 2), 4);
  const validCurrentStep = Math.min(Math.max(currentStep, 1), validTotalSteps);

  const progressClasses = [styles.wizardProgress, className].filter(Boolean).join(' ');

  return (
    <div className={progressClasses} role="progressbar" aria-valuenow={validCurrentStep} aria-valuemin={1} aria-valuemax={validTotalSteps}>
      {Array.from({ length: validTotalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= validCurrentStep;
        
        return (
          <div
            key={stepNumber}
            className={`${styles.progressStep} ${isActive ? styles.progressStepActive : styles.progressStepInactive}`}
            aria-label={`Step ${stepNumber} of ${validTotalSteps}${isActive ? ' (completed)' : ''}`}
          />
        );
      })}
    </div>
  );
};

export default ModalWizardProgress;
