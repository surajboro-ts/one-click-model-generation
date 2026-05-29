import React, { useState } from 'react';
import { ClarifyingCard } from '../OneClickModelGeneration/components/ClarifyingCard';
import type { ClarifyQuestion } from '../OneClickModelGeneration/components/ClarifyingCard';

// ── Types ─────────────────────────────────────────────────────────────────────

export type StopLayer = 'tables' | 'joins' | 'formulas' | 'other';

export type StopClarifyResult =
  | { action: 'resume' }
  | { action: 'review' }
  | { action: 'manual' }
  | { action: 'rebuild'; layer: StopLayer; issue: string };

export interface StopClarifyCardProps {
  isReadOnly?: boolean;
  onComplete: (result: StopClarifyResult) => void;
}

// ── Static question data ──────────────────────────────────────────────────────

const STEP1_Q: ClarifyQuestion = {
  question: "What's on your mind?",
  options: [
    { label: "Something in the build isn't right" },
    { label: 'I want to review before continuing' },
    { label: "I'll finish building manually" },
    { label: 'Resume — I stopped by mistake' },
  ],
};

const STEP2_Q: ClarifyQuestion = {
  question: "Which part of the build isn't right?",
  options: [
    { label: 'The tables selected' },
    { label: 'The joins between tables' },
    { label: 'The formulas or metrics' },
  ],
};

const STEP3_QUESTIONS: Record<string, ClarifyQuestion> = {
  'The tables selected': {
    question: 'What specifically is off with the tables?',
    options: [
      { label: "A table that was added doesn't belong" },
      { label: 'An important table is missing' },
      { label: 'The wrong grain table was chosen' },
    ],
  },
  'The joins between tables': {
    question: 'What specifically is off with the joins?',
    options: [
      { label: 'The join cardinality is wrong' },
      { label: 'Wrong columns used for the join' },
      { label: 'A join is missing between tables' },
    ],
  },
  'The formulas or metrics': {
    question: 'What specifically is off with the formulas?',
    options: [
      { label: 'The metric definition is incorrect' },
      { label: 'The aggregation type is wrong' },
      { label: 'A formula or metric is missing' },
    ],
  },
};

const LAYER_MAP: Record<string, StopLayer> = {
  'The tables selected':     'tables',
  'The joins between tables':'joins',
  'The formulas or metrics': 'formulas',
};

// ── Component ─────────────────────────────────────────────────────────────────

export const StopClarifyCard: React.FC<StopClarifyCardProps> = ({
  isReadOnly,
  onComplete,
}) => {
  // step 1 = "what's on your mind?", step 2 = "which part?", step 3 = "what specifically?"
  const [step, setStep]         = useState<1 | 2 | 3>(1);
  const [layerKey, setLayerKey] = useState<string>('');

  // questions array passed to ClarifyingCard: single entry at index 0,
  // currentStep is always 0 since each "outer step" is a fresh card.
  // We add ghost entries to give the right total count:
  //   step 1: 1 question  (1/1)
  //   step 2: 2 remaining (1/2)
  //   step 3: 1 remaining (1/1 — layer-specific final step)
  const buildQuestionsArray = (): ClarifyQuestion[] => {
    if (step === 1) return [STEP1_Q];
    if (step === 2) return [STEP2_Q, { question: '', options: [] }]; // 1/2
    return [STEP3_QUESTIONS[layerKey] ?? STEP3_QUESTIONS['The tables selected']];
  };

  const handleNext = (selections: string[], _freeText?: string) => {
    const sel = selections[0] ?? _freeText ?? '';

    if (step === 1) {
      if (sel === "Something in the build isn't right") {
        setStep(2);
        return;
      }
      if (sel === 'I want to review before continuing') {
        onComplete({ action: 'review' });
        return;
      }
      if (sel === "I'll finish building manually") {
        onComplete({ action: 'manual' });
        return;
      }
      if (sel === 'Resume — I stopped by mistake') {
        onComplete({ action: 'resume' });
        return;
      }
      // free-text "something else" fallback
      onComplete({ action: 'rebuild', layer: 'other', issue: sel });
      return;
    }

    if (step === 2) {
      if (sel === 'The tables selected' || sel === 'The joins between tables' || sel === 'The formulas or metrics') {
        setLayerKey(sel);
        setStep(3);
        return;
      }
      // free-text "something else" → full rebuild
      onComplete({ action: 'rebuild', layer: 'other', issue: sel || _freeText || 'Something else' });
      return;
    }

    // step 3 — specific issue selected
    const layer = LAYER_MAP[layerKey] ?? 'other';
    onComplete({ action: 'rebuild', layer, issue: sel || _freeText || 'Something else' });
  };

  const handleCancel = () => {
    if (step === 3) { setStep(2); setLayerKey(''); return; }
    if (step === 2) { setStep(1); return; }
    // Step 1 cancel — treat as "review" (user doesn't want to act yet)
    onComplete({ action: 'review' });
  };

  if (isReadOnly) {
    // Show a frozen placeholder when the card has been submitted
    return (
      <div style={{
        borderRadius: 12,
        border: '1px solid var(--rd-sys-color-border-divider)',
        boxShadow: '0 2px 8px rgba(29,35,47,0.06)',
        padding: '12px 16px',
        fontSize: 13,
        color: 'var(--rd-sys-color-content-secondary)',
        fontFamily: 'var(--font-family-primary)',
        background: 'var(--rd-sys-color-background-subtle)',
      }}>
        Selection submitted
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <ClarifyingCard
        questions={buildQuestionsArray()}
        currentStep={0}
        onNext={handleNext}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default StopClarifyCard;
