import React from 'react';
import { LoadingIndicator } from '@components/LoadingIndicator';
import { Button } from '@components/Button';
import { spacing } from '@tokens/spacing';
import { ReasoningBlock } from './ReasoningBlock';
import styles from './PlanStepsCard.module.css';
import type { PlanStepsData } from './types';

interface PlanStepsCardProps {
  data: PlanStepsData;
  showBuildCta?: boolean;
  onBuild?: () => void;
}

export const PlanStepsCard: React.FC<PlanStepsCardProps> = ({ data, showBuildCta, onBuild }) => (
  <div className={styles.card}>
    {/* Body: steps */}
    <div className={styles.body}>
      <div className={styles.steps}>
        {data.steps.map((step, i) => (
          <div key={i} className={styles.step} style={{ opacity: step.state === 'pending' ? 0.45 : 1 }}>
            {/* Icon slot: spinner | check | empty circle */}
            <div className={styles.iconSlot}>
              {step.state === 'active' ? (
                <LoadingIndicator.Contextual size="xs" className={styles.spinner} />
              ) : step.state === 'done' ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <circle cx="8" cy="8" r="8" fill="var(--rd-sys-color-content-success)" />
                  <path d="M4.5 8L7 10.5L11.5 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <circle cx="8" cy="8" r="7" stroke="var(--rd-sys-color-border-default)" strokeWidth="1.5"/>
                </svg>
              )}
            </div>

            {/* Label + caption + optional per-step reasoning (Option 2 active step) */}
            <div className={styles.info}>
              <span className={[styles.label, styles[step.state]].join(' ')}>
                {step.label}
              </span>
              {step.caption && (
                <span className={styles.caption}>{step.caption}</span>
              )}
              {step.reasoningData && (
                <div style={{ marginTop: spacing.B }}>
                  <ReasoningBlock data={step.reasoningData} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Build model CTA — shown only when all steps are done */}
    {showBuildCta && (
      <div className={styles.ctaFooter}>
        <Button variant="primary" onClick={onBuild} fullWidth>
          Build model
        </Button>
      </div>
    )}
  </div>
);
