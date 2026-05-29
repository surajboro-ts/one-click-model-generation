import React, { useState } from 'react';
import { systemColors } from '@tokens/colors';
import { spacing } from '@tokens/spacing';
import { fontWeight, fontFamily, fontSize } from '@tokens/typography';
import { TextInput } from '@components/TextInput';
import { Button } from '@components/Button';

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

// ── Sub-types ─────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3;

const LAYER_OPTIONS: Record<Exclude<StopLayer, 'other'>, string[]> = {
  tables: [
    'A table that was added doesn\'t belong',
    'An important table is missing',
    'The wrong grain table was chosen',
  ],
  joins: [
    'The join cardinality is wrong',
    'Wrong columns used for the join',
    'A join is missing between tables',
  ],
  formulas: [
    'The metric definition is incorrect',
    'The aggregation type is wrong',
    'A formula or metric is missing',
  ],
};

const LAYER_LABEL: Record<Exclude<StopLayer, 'other'>, string> = {
  tables:   'tables',
  joins:    'joins',
  formulas: 'formulas',
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const divider = (
  <div style={{ height: 1, backgroundColor: systemColors.light['border-divider'] }} />
);

// ── Row ───────────────────────────────────────────────────────────────────────

interface RowProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  chevron?: boolean;
}

const Row: React.FC<RowProps> = ({ label, onClick, disabled, chevron }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${spacing.C}px ${spacing.D}px`,
        cursor: disabled ? 'default' : 'pointer',
        backgroundColor: hovered && !disabled
          ? systemColors.light['background-subtle']
          : 'transparent',
        transition: 'background-color 0.1s',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span style={{
        fontSize: fontSize.sm,
        fontWeight: fontWeight.regular,
        lineHeight: '20px',
        color: systemColors.light['content-primary'],
        fontFamily: fontFamily.primary,
      }}>
        {label}
      </span>
      {chevron && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden style={{ flexShrink: 0, color: systemColors.light['content-tertiary'] }}>
          <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  );
};

// ── Header ─────────────────────────────────────────────────────────────────────

interface CardHeaderProps {
  question: string;
  onBack?: () => void;
}

const CardHeader: React.FC<CardHeaderProps> = ({ question, onBack }) => (
  <>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: spacing.B,
      padding: `${spacing.C}px ${spacing.D}px`,
      borderBottom: `1px solid ${systemColors.light['border-divider']}`,
    }}>
      {onBack && (
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            color: systemColors.light['content-secondary'],
            flexShrink: 0,
          }}
          aria-label="Back"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      <p style={{
        margin: 0,
        fontSize: fontSize.sm,
        fontWeight: 600,
        lineHeight: '20px',
        color: systemColors.light['content-primary'],
        fontFamily: fontFamily.primary,
      }}>
        {question}
      </p>
    </div>
  </>
);

// ── Main component ─────────────────────────────────────────────────────────────

export const StopClarifyCard: React.FC<StopClarifyCardProps> = ({
  isReadOnly,
  onComplete,
}) => {
  const [step, setStep]               = useState<Step>(1);
  const [layer, setLayer]             = useState<StopLayer | null>(null);
  const [showFreeText, setShowFreeText] = useState(false);
  const [freeText, setFreeText]       = useState('');

  const disabled = isReadOnly;

  const handleSomethingElse = () => {
    if (disabled) return;
    setShowFreeText(true);
  };

  const handleFreeTextSubmit = () => {
    if (!freeText.trim()) return;
    if (step === 2) {
      onComplete({ action: 'rebuild', layer: 'other', issue: freeText.trim() });
    } else {
      onComplete({ action: 'rebuild', layer: layer ?? 'other', issue: freeText.trim() });
    }
  };

  // ── Step 1 ──────────────────────────────────────────────────────────────────

  if (step === 1) {
    return (
      <div style={cardStyle}>
        <CardHeader question="What's on your mind?" />
        <div>
          <Row
            label="Something in the build isn't right"
            chevron
            disabled={disabled}
            onClick={() => setStep(2)}
          />
          {divider}
          <Row
            label="I want to review before continuing"
            disabled={disabled}
            onClick={() => onComplete({ action: 'review' })}
          />
          {divider}
          <Row
            label="I'll finish building manually"
            disabled={disabled}
            onClick={() => onComplete({ action: 'manual' })}
          />
          {divider}
          <Row
            label="Resume — I stopped by mistake"
            disabled={disabled}
            onClick={() => onComplete({ action: 'resume' })}
          />
        </div>
      </div>
    );
  }

  // ── Step 2 ──────────────────────────────────────────────────────────────────

  if (step === 2) {
    return (
      <div style={cardStyle}>
        <CardHeader
          question="Which part of the build isn't right?"
          onBack={disabled ? undefined : () => setStep(1)}
        />
        <div>
          <Row label="The tables selected"        chevron disabled={disabled} onClick={() => { setLayer('tables');   setStep(3); }} />
          {divider}
          <Row label="The joins between tables"   chevron disabled={disabled} onClick={() => { setLayer('joins');    setStep(3); }} />
          {divider}
          <Row label="The formulas or metrics"    chevron disabled={disabled} onClick={() => { setLayer('formulas'); setStep(3); }} />
          {divider}

          {/* "Something else" — inline text field */}
          {showFreeText ? (
            <div style={{ padding: `${spacing.C}px ${spacing.D}px`, backgroundColor: systemColors.light['background-subtle'] }}>
              <TextInput
                placeholder="Describe what's off…"
                value={freeText}
                onChange={e => setFreeText(e.target.value)}
                showLabel={false}
                autoFocus
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: spacing.B }}>
                <Button
                  variant="primary"
                  onClick={handleFreeTextSubmit}
                  disabled={!freeText.trim()}
                >
                  Done
                </Button>
              </div>
            </div>
          ) : (
            <Row label="Something else…" disabled={disabled} onClick={handleSomethingElse} />
          )}
        </div>
      </div>
    );
  }

  // ── Step 3 ──────────────────────────────────────────────────────────────────

  const layerKey = (layer ?? 'tables') as Exclude<StopLayer, 'other'>;
  const layerOptions = LAYER_OPTIONS[layerKey] ?? LAYER_OPTIONS.tables;
  const layerLabel   = LAYER_LABEL[layerKey] ?? 'tables';

  return (
    <div style={cardStyle}>
      <CardHeader
        question={`What specifically is off with the ${layerLabel}?`}
        onBack={disabled ? undefined : () => { setStep(2); setShowFreeText(false); setFreeText(''); }}
      />
      <div>
        {layerOptions.map((opt, i) => (
          <React.Fragment key={i}>
            <Row
              label={opt}
              disabled={disabled}
              onClick={() => onComplete({ action: 'rebuild', layer: layerKey, issue: opt })}
            />
            {divider}
          </React.Fragment>
        ))}

        {/* "Something else" — inline text field */}
        {showFreeText ? (
          <div style={{ padding: `${spacing.C}px ${spacing.D}px`, backgroundColor: systemColors.light['background-subtle'] }}>
            <TextInput
              placeholder="Describe what's wrong…"
              value={freeText}
              onChange={e => setFreeText(e.target.value)}
              showLabel={false}
              autoFocus
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: spacing.B }}>
              <Button
                variant="primary"
                onClick={handleFreeTextSubmit}
                disabled={!freeText.trim()}
              >
                Done
              </Button>
            </div>
          </div>
        ) : (
          <Row label="Something else…" disabled={disabled} onClick={handleSomethingElse} />
        )}
      </div>
    </div>
  );
};

// ── Styles ────────────────────────────────────────────────────────────────────

const cardStyle: React.CSSProperties = {
  backgroundColor: systemColors.light['background-base'],
  borderRadius: 8,
  border: `1px solid ${systemColors.light['border-divider']}`,
  boxShadow: '0 2px 8px rgba(29,35,47,0.08)',
  fontFamily: fontFamily.primary,
  overflow: 'hidden',
  animation: 'slideUpIn 0.25s cubic-bezier(0.4,0,0.2,1) both',
  width: '100%',
};

export default StopClarifyCard;
