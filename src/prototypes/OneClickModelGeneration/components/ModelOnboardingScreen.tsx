import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { fontFamily, fontWeight, fontSize } from '@tokens/typography';
import { systemColors } from '@tokens/colors';
import { spacing } from '@tokens/spacing';
import { Button } from '@components/Button';
import { Link } from '@components/Link';
import type { DataConnection } from '../data/mockData';
import { AgentPanel } from '../../_agentic/AgentPanel';
import { ReasoningBlock } from '../../_agentic/ReasoningBlock';
import type { ReasoningData } from '../../_agentic/ReasoningBlock';
import type { PlanStep } from '../../_agentic/types';
import { ClarifyingCard } from './ClarifyingCard';
import type { ClarifyQuestion } from './ClarifyingCard';
import '../../DataModelEditor/dme.css';

// DME SpotterModel gradient palette — matches the rotating conic border in dme.css.
// #48D1E0 is the cyan stop used by the DME; no Radiant token exists for it.
const DME_CYAN = '#48D1E0';

// ─── Hooks ────────────────────────────────────────────────────────────────────

function usePeriodicSweep(intervalMs: number) {
  const [sweepKey, setSweepKey] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSweepKey(k => k + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return sweepKey;
}

const PLACEHOLDER_PHRASES = [
  'I want to track sales performance by region',
  'I want to understand what\'s driving churn',
  'Build around my orders and customers tables',
  'Show me revenue trends by product line',
  'I need a model my sales team can use daily',
];

function useTypewriter(phrases: string[], typeMs = 48, deleteMs = 28, pauseMs = 2200) {
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    if (!isDeleting && displayed === current) {
      const t = setTimeout(() => setIsDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }
    if (isDeleting && displayed === '') {
      setIsDeleting(false);
      setPhraseIdx(i => (i + 1) % phrases.length);
      return;
    }
    const t = setTimeout(() => {
      setDisplayed(isDeleting
        ? current.slice(0, displayed.length - 1)
        : current.slice(0, displayed.length + 1)
      );
    }, isDeleting ? deleteMs : typeMs);
    return () => clearTimeout(t);
  }, [displayed, phraseIdx, isDeleting, phrases, typeMs, deleteMs, pauseMs]);

  return displayed;
}

// ─── Highlighted text — solid Radiant primary blue
function GradText({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ color: systemColors.light['content-brand'] }}>
      {children}
    </span>
  );
}

// ─── SpotterModel avatar — uses the canonical asset from /spotter-assets/ ──────
// Displayed at 64×64 for the hero context (SVG scales perfectly from its 32×32 base).
function AgentAvatar() {
  return (
    <img
      src="/spotter-assets/SpotterModel avatar.svg"
      width={64}
      height={64}
      alt="SpotterModel"
      style={{ display: 'block' }}
    />
  );
}

// ─── Sparkle / lightbulb hint icon — custom SVG, kept as-is ──────────────────
function SparkleIcon({ color = systemColors.light['content-secondary'] }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M37.8935 0.946728C38.1203 3.19863 39.1121 5.30445 40.7035 6.91443C42.2946 8.52353 44.3891 9.53915 46.638 9.79218C47.1737 9.85451 47.5763 10.3092 47.573 10.8479C47.5703 11.3869 47.1621 11.8372 46.6263 11.8935C44.375 12.1206 42.2686 13.1121 40.6592 14.7039C39.0495 16.2948 38.0339 18.3893 37.7814 20.6384C37.7191 21.1741 37.2638 21.5765 36.7251 21.5732C36.1861 21.5705 35.7364 21.1626 35.6801 20.6267C35.4525 18.3752 34.4609 16.2687 32.8698 14.6596C31.2784 13.0497 29.1839 12.034 26.9348 11.7816C26.3999 11.7189 25.9967 11.264 26 10.7253C26.0027 10.1863 26.4109 9.73599 26.9467 9.67966C29.1986 9.45285 31.3044 8.46106 32.9136 6.86991C34.5235 5.27842 35.5391 3.18393 35.7916 0.934774C35.8543 0.399928 36.3089 -0.00268115 36.8479 1.3446e-05C37.3867 0.00328346 37.8372 0.410855 37.8935 0.946728Z" fill={color}/>
      <path d="M34 29.5732C35.5873 27.986 36.9999 26.3098 38.0552 24.4866C36.6273 24.7779 34.8008 24.5814 33.3748 23.3644C32.6215 24.4316 31.7284 25.4209 30.8118 26.3375C28.5049 28.6443 27.6434 31.5732 27.6434 33.5732H20.6765C20.6765 31.6514 19.4935 28.6443 17.1866 26.3375C14 23.1508 12.5582 21.0531 12.5582 17.5732C12.5582 11.5475 17.6909 6.64429 24 6.64429C24.9424 6.64429 25.8587 6.75375 26.7354 6.96007C27.7873 7.2076 30.6176 5.58201 31.6493 4.15107C29.3758 2.96415 26.7694 2.28906 24.0008 2.28906C15.1777 2.28906 8 9.14568 8 17.5733C8 22.3635 10.4405 26.0138 14 29.5732C16.6757 32.249 16.6757 35.5732 16.6757 35.6901V37.5732H31.6495V35.6918C31.6495 35.6918 31.6495 31.9238 34 29.5732Z" fill={color}/>
      <path d="M16.6757 40.0342H31.6412V43.2095C31.6412 44.0739 31.1185 44.7833 30.4793 44.7833H27.5917V46.0967C27.5917 47.1474 26.5727 47.5189 26.0135 47.5733H22.0135C21.1073 47.5733 20.4744 46.8936 20.4744 46.0342V44.7833H17.9062C17.2297 44.7833 16.6757 44.0739 16.6757 43.2095V40.0342Z" fill={color}/>
      <path d="M8.80913 37.1153C7.84887 36.1547 7.24671 34.8946 7.10305 33.5442C7.06745 33.2229 6.79574 32.9799 6.4725 32.9797C6.1491 32.9799 5.87767 33.223 5.84187 33.5441C5.69797 34.8944 5.09566 36.1545 4.13507 37.1148C3.17497 38.0749 1.91484 38.6771 0.564503 38.8208C0.243179 38.8564 -0.000194398 39.1279 1.16515e-07 39.4513C-0.000151553 39.7746 0.243288 40.0462 0.564396 40.082C1.9147 40.2258 3.17479 40.8281 4.13507 41.7887C5.09514 42.7488 5.69715 44.0093 5.8413 45.3595C5.8769 45.6808 6.14811 45.924 6.4715 45.9238C6.79475 45.924 7.06653 45.681 7.10212 45.3594C7.24603 44.0091 7.84834 42.749 8.80877 41.7891C9.76902 40.8286 11.0295 40.2266 12.3795 40.0828C12.7008 40.0472 12.9442 39.7756 12.944 39.4522C12.9441 39.129 12.7011 38.8575 12.3795 38.8219C11.0293 38.6777 9.76921 38.0754 8.80913 37.1153Z" fill={color}/>
    </svg>
  );
}

// ─── Connection split-button ───────────────────────────────────────────────────
// Custom pill shape with split layout — no Radiant Button variant matches this.
function ConnectionSelector({
  connectionName,
  onNameClick,
  onShowDetails,
}: {
  connectionName: string;
  onNameClick?: () => void;
  onShowDetails?: () => void;
}) {
  const [showOverflow, setShowOverflow] = useState(false);
  const chevronRef = useRef<HTMLButtonElement>(null);
  const overflowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showOverflow) return;
    const handler = (e: MouseEvent) => {
      if (
        chevronRef.current && !chevronRef.current.contains(e.target as Node) &&
        overflowRef.current && !overflowRef.current.contains(e.target as Node)
      ) setShowOverflow(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showOverflow]);

  return (
    <div style={{ display: 'flex', height: spacing.H, gap: 2, position: 'relative' }}>
      <button
        onClick={onNameClick}
        style={{
          height: spacing.H, padding: `6px ${spacing.B}px 6px ${spacing.D}px`, /* no exact spacing token for 6 */
          backgroundColor: systemColors.light['background-subtle'], borderRadius: '18px 1px 1px 18px',
          border: 'none', fontSize: 14, lineHeight: '20px', fontWeight: fontWeight.light,
          color: systemColors.light['content-primary'], fontFamily: 'inherit',
          maxWidth: 160, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
          cursor: onNameClick ? 'pointer' : 'default',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(0.95)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.filter = 'none'; }}
      >
        {connectionName}
      </button>
      <button
        ref={chevronRef}
        onClick={() => setShowOverflow(v => !v)}
        style={{
          width: 36, height: spacing.H, backgroundColor: systemColors.light['background-subtle'],
          borderRadius: '1px 16px 16px 1px', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, cursor: 'pointer',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(0.95)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.filter = 'none'; }}
        aria-label="Connection options"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M4 6L8 10L12 6" stroke={systemColors.light['content-primary']} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {showOverflow && (
        <div
          ref={overflowRef}
          style={{
            position: 'absolute', bottom: 'calc(100% + 6px)', left: 0, /* no exact spacing token for 6 */
            minWidth: 200, background: systemColors.light['background-base'], borderRadius: spacing.B,
            border: `1px solid ${systemColors.light['border-divider']}`,
            boxShadow: '0px 8px 16px rgba(25,35,49,0.08), 0px 0px 4px rgba(25,35,49,0.06)',
            overflow: 'hidden', zIndex: 50,
          }}
        >
          <button
            onClick={() => { setShowOverflow(false); onShowDetails?.(); }}
            style={{
              display: 'block', width: '100%', textAlign: 'left',
              height: 36, padding: `0 14px`, background: 'none', /* no exact spacing token for 14 */
              border: 'none', cursor: 'pointer', fontSize: 13,
              color: systemColors.light['content-primary'], fontFamily: 'inherit',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = systemColors.light['background-sunken']; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
          >
            Show connection details
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Build button — custom gradient arrow pill, kept as raw button ─────────────
function BuildButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label="Submit"
      style={{
        width: spacing.H, height: spacing.H, borderRadius: '50%',
        background: systemColors.light['content-brand'],
        border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? 'default' : 'pointer',
        transition: 'opacity 0.15s',
      }}
      onMouseEnter={e => { if (!disabled) (e.currentTarget as HTMLButtonElement).style.opacity = '0.9'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = disabled ? '0.4' : '1'; }}
    >
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M8 13V4M4 8l4-4 4 4"
          stroke="white"
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

// ─── Shared prompt bar border helper — matches DME .prompt-bar:focus-within
// Uses rotating conic gradient: purple → cyan → brand-blue → purple (4s loop).
function promptBorderStyle(focused: boolean): React.CSSProperties {
  if (focused) {
    return {
      borderColor: 'transparent',
      backgroundImage: `linear-gradient(white, white), conic-gradient(from var(--gradient-angle), ${systemColors.light['content-accent-purple']}, ${DME_CYAN}, ${systemColors.light['content-brand']}, ${systemColors.light['content-accent-purple']})`,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
      animation: 'rotate-border 4s linear infinite',
    };
  }
  return { borderColor: systemColors.light['border-divider'] };
}

// Prototype-specific elevation — no Radiant shadow token at this depth.
const PROMPT_BAR_SHADOW = '0px 2px 4px rgba(25,35,49,0.04), 0px 0px 4px rgba(25,35,49,0.10)';

// ─── Default prompt bar ────────────────────────────────────────────────────────
function PromptBar({
  onTextChange, onSubmit, connectionName, onConnectionClick, onShowConnectionDetails, initialText, submitDisabled,
}: {
  onTextChange: (text: string) => void; onSubmit: () => void;
  connectionName: string; onConnectionClick: () => void; onShowConnectionDetails: () => void;
  initialText?: string;
  submitDisabled?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const placeholder = useTypewriter(PLACEHOLDER_PHRASES);

  return (
    <div
      style={{
        width: '100%', display: 'flex', flexDirection: 'column',
        borderRadius: spacing.C, padding: spacing.D, gap: spacing.D,
        border: '1px solid', background: 'white',
        boxShadow: PROMPT_BAR_SHADOW, ...promptBorderStyle(focused),
      }}
    >
      <MentionEditor
        placeholder={placeholder}
        initialText={initialText}
        onTextChange={onTextChange}
        onFocusChange={setFocused}
        onSubmit={onSubmit}
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: spacing.H }}>
        <ConnectionSelector connectionName={connectionName} onNameClick={onConnectionClick} onShowDetails={onShowConnectionDetails} />
        <BuildButton onClick={onSubmit} disabled={submitDisabled} />
      </div>
    </div>
  );
}

// ─── Table mode bar ────────────────────────────────────────────────────────────
function getTableType(name: string): string {
  const l = name.toLowerCase();
  if (l.startsWith('fact_') || l.startsWith('fct_')) return 'Fact';
  if (l.startsWith('dim_'))    return 'Dim';
  if (l.startsWith('stg_') || l.startsWith('stage_')) return 'Stage';
  if (l.startsWith('bridge_') || l.startsWith('brdg_')) return 'Bridge';
  if (l.startsWith('agg_'))    return 'Agg';
  if (l.startsWith('mart_'))   return 'Mart';
  return 'Table';
}

const CONNECTION_TABLES = [
  'fact_sales_orders', 'fact_sales_pipeline', 'fact_customer_transactions',
  'fact_revenue_daily', 'fact_opportunity_stage',
  'dim_customers', 'dim_products', 'dim_sales_reps',
  'dim_regions', 'dim_date', 'dim_channels', 'dim_accounts',
  'bridge_customer_accounts', 'bridge_product_categories',
  'stg_salesforce_opportunities', 'stg_salesforce_accounts',
  'stg_salesforce_contacts', 'stg_stripe_charges', 'stg_stripe_customers',
  'agg_sales_by_region', 'agg_revenue_monthly', 'agg_customer_lifetime_value',
  'mart_sales_performance', 'mart_customer_360', 'mart_pipeline_analysis',
];

/** Shared helper — deletes the trigger+query text from the anchor node and inserts
 *  a chip element at that position, followed by a trailing space. */
function insertChip(chip: HTMLSpanElement, sel: Selection, trigger: '@' | '#'): void {
  const anchor = sel.anchorNode;
  if (anchor?.nodeType === Node.TEXT_NODE) {
    const full = anchor.textContent ?? '';
    const pos  = sel.anchorOffset;
    const idx  = full.slice(0, pos).lastIndexOf(trigger);
    if (idx !== -1) {
      anchor.textContent = full.slice(0, idx) + full.slice(pos);
      const rr = document.createRange();
      rr.setStart(anchor, idx);
      rr.collapse(true);
      sel.removeAllRanges();
      sel.addRange(rr);
    }
  }
  const r = sel.getRangeAt(0);
  r.insertNode(chip);
  const space = document.createTextNode(' ');
  const after = document.createRange();
  after.setStartAfter(chip);
  after.insertNode(space);
  after.setStartAfter(space);
  after.collapse(true);
  sel.removeAllRanges();
  sel.addRange(after);
}

// ─── Inline @mention editor ───────────────────────────────────────────────────
// @ — opens a table autocomplete dropdown; selecting a row inserts a blue chip.
// React does NOT control the DOM content — the ref is the source of truth.
function MentionEditor({
  placeholder,
  initialText,
  onTextChange,
  onFocusChange,
  onSubmit,
}: {
  placeholder: string;
  initialText?: string;
  onTextChange: (text: string) => void;
  onFocusChange: (focused: boolean) => void;
  onSubmit: () => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [mentionQuery,  setMentionQuery]  = useState<string | null>(null);
  const [activeIdx,     setActiveIdx]     = useState(0);
  const [isEmpty,       setIsEmpty]       = useState(!initialText);

  // On mount: restore initial text (e.g. when navigating back from directions),
  // then focus so the gradient border animates immediately.
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    if (initialText) {
      editor.innerText = initialText;
      setIsEmpty(false);
      onTextChange(initialText);
    }
    editor.focus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const suggestions = mentionQuery !== null
    ? CONNECTION_TABLES.filter(t => t.toLowerCase().includes(mentionQuery.toLowerCase())).slice(0, 8)
    : [];

  // Read only the anchor text node — NOT the full editor range.
  // Using the full range would include text from committed chip spans
  // (which are separate non-editable nodes) and cause false trigger detections.
  const detectMention = (): string | null => {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return null;
    const anchor = sel.anchorNode;
    if (!anchor || anchor.nodeType !== Node.TEXT_NODE) return null;
    const before = (anchor.textContent ?? '').slice(0, sel.anchorOffset);
    const mAt = before.match(/@(\w*)$/);
    return mAt ? mAt[1] : null;
  };

  const handleInput = () => {
    const editor = editorRef.current;
    if (!editor) return;
    const text  = editor.innerText ?? '';
    const empty = !text.trim() || text === '\n';
    setIsEmpty(empty);
    onTextChange(empty ? '' : text);
    const mention = detectMention();
    setMentionQuery(mention);
    if (mention !== null) setActiveIdx(0);
  };

  // Build a chip span with the given label, bg/color tokens, and data attribute
  const buildChip = (
    label: string,
    bgToken: string,
    colorToken: string,
    dataAttr: { key: string; value: string },
  ): HTMLSpanElement => {
    const chip = document.createElement('span');
    chip.setAttribute(dataAttr.key, dataAttr.value);
    chip.setAttribute('contenteditable', 'false');
    chip.textContent = label;
    chip.style.cssText = [
      'display:inline',
      `background:${bgToken}`,
      `color:${colorToken}`,
      'border-radius:4px',
      'padding:2px 6px',
      'font-size:14px',
      'font-weight:375', /* fontWeight.light */
      'margin:0 2px',
      'white-space:nowrap',
      'cursor:default',
      'user-select:none',
    ].join(';');
    return chip;
  };

  // Commit @tableName chip (blue)
  const commitMention = (tableName: string) => {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    const chip = buildChip(
      `@${tableName}`,
      systemColors.light['background-information'],
      systemColors.light['content-brand'],
      { key: 'data-table', value: tableName },
    );
    insertChip(chip, sel, '@');
    setMentionQuery(null);
    setTimeout(() => handleInput(), 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // @ suggestion navigation
    if (mentionQuery !== null && suggestions.length > 0) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, suggestions.length - 1)); return; }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); return; }
      if (e.key === 'Enter')     { e.preventDefault(); commitMention(suggestions[activeIdx]); return; }
      if (e.key === 'Escape')    { e.preventDefault(); setMentionQuery(null); return; }
    }
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSubmit(); }
  };

  const kbdStyle: React.CSSProperties = {
    fontFamily: 'inherit',
    background: systemColors.light['background-sunken'],
    border: `1px solid ${systemColors.light['border-divider']}`,
    borderRadius: 3, padding: '0px 4px',
    fontSize: 10, color: systemColors.light['content-primary'],
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: 48 }}>
      {/* Simulated placeholder — shown only when editor is empty */}
      {isEmpty && (
        <div style={{
          position: 'absolute', top: 0, left: 0, pointerEvents: 'none',
          fontSize: 16, lineHeight: '24px', fontWeight: fontWeight.light,
          color: systemColors.light['content-secondary'],
          fontFamily: 'inherit', letterSpacing: '-0.064px',
        }}>
          {placeholder}
        </div>
      )}

      {/* Contenteditable — React does not reconcile its children */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={() => onFocusChange(true)}
        onBlur={() => { onFocusChange(false); setMentionQuery(null); }}
        style={{
          width: '100%', minHeight: 48, outline: 'none',
          fontSize: 16, lineHeight: '24px', fontWeight: fontWeight.light,
          color: systemColors.light['content-primary'],
          fontFamily: 'inherit', letterSpacing: '-0.064px',
          whiteSpace: 'pre-wrap', wordBreak: 'break-word',
        }}
      />

      {/* @ table suggestion dropdown */}
      {mentionQuery !== null && suggestions.length > 0 && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 20,
          background: 'white', borderRadius: spacing.B, marginTop: spacing.A,
          border: `1px solid ${systemColors.light['border-divider']}`,
          boxShadow: '0px 8px 16px rgba(25,35,49,0.08), 0px 0px 4px rgba(25,35,49,0.06)',
          overflow: 'hidden',
        }}>
          {suggestions.map((t, i) => {
            const q  = mentionQuery.toLowerCase();
            const ms = t.toLowerCase().indexOf(q);
            return (
              <div
                key={t}
                onMouseDown={e => { e.preventDefault(); commitMention(t); }}
                onMouseEnter={() => setActiveIdx(i)}
                style={{
                  height: 36, padding: `0 14px`, display: 'flex', alignItems: 'center',
                  gap: spacing.B, cursor: 'pointer', fontSize: 13, fontFamily: 'inherit',
                  background: i === activeIdx ? systemColors.light['background-sunken'] : 'white',
                  color: systemColors.light['content-primary'],
                }}
              >
                <span style={{ color: systemColors.light['content-secondary'], fontSize: 11, flexShrink: 0 }}>
                  {getTableType(t)}
                </span>
                {!q || ms === -1 ? t : (
                  <span>
                    {t.slice(0, ms)}
                    <strong style={{ color: systemColors.light['content-brand'], fontWeight: fontWeight.light }}>{t.slice(ms, ms + q.length)}</strong>
                    {t.slice(ms + q.length)}
                  </span>
                )}
              </div>
            );
          })}
          <div style={{ padding: `6px 14px`, borderTop: `1px solid ${systemColors.light['border-divider']}`, display: 'flex', alignItems: 'center', gap: spacing.B }}>
            {(['↵', '↑↓'] as const).map((k, i) => (
              <React.Fragment key={k}>
                <kbd style={kbdStyle}>{k}</kbd>
                <span style={{ fontSize: 11, color: systemColors.light['content-secondary'], marginRight: spacing.B }}>{['to add', 'to navigate'][i]}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

// ─── Direction data ────────────────────────────────────────────────────────────

interface Direction {
  id: string;
  title: string;
  description: string;        // short subtitle used in BuildingScreen header
  goal: string;               // one-sentence goal shown on compact card
  keyQuestions: string[];     // 3 questions shown on compact card
  docHtml: string;            // full requirements doc HTML, shown in canvas panel
}

const MOCK_DIRECTIONS: Direction[] = [
  {
    id: 'd1',
    title: 'Sales performance by region',
    description: 'Track revenue, quota attainment, and deal pipeline across all sales regions.',
    goal: 'Enable sales leaders to track revenue, quota attainment, and deal pipeline across regions — so they can identify top performers and make data-driven coaching decisions.',
    keyQuestions: [
      'What is total revenue by region this quarter vs last quarter?',
      'Which regions are behind on their quota targets?',
      'What is the average deal size and win rate by region?',
    ],
    docHtml: `
<h2>Goal</h2>
<p>Enable sales leaders and regional managers to track revenue, quota attainment, and deal pipeline across all regions — so they can identify top performers, surface underperforming territories, and make data-driven coaching decisions.</p>

<h2>Key business questions</h2>
<ul>
  <li>What is total revenue by region this quarter vs last quarter?</li>
  <li>Which regions are behind on their quota targets?</li>
  <li>What is the average deal size and win rate by region?</li>
  <li>How has YoY revenue trended across territories?</li>
  <li>Which sales reps are consistently exceeding or missing quota?</li>
</ul>

<h2>Consumers &amp; personas</h2>
<ul>
  <li><strong>VP of Sales</strong> — quarterly board-level pipeline review, territory health at a glance</li>
  <li><strong>Regional Sales Managers</strong> — weekly rep coaching, deal-level drill-down</li>
  <li><strong>Revenue Operations</strong> — quota setting, forecast accuracy, data quality checks</li>
</ul>

<h2>Key metrics</h2>
<ul>
  <li>Total Revenue (closed-won deal value)</li>
  <li>Quota Attainment (% of quota achieved per rep / region)</li>
  <li>Deal Count (number of closed-won deals)</li>
  <li>YoY Revenue Growth (current period vs same period last year)</li>
  <li>Average Deal Size</li>
  <li>Win Rate</li>
</ul>

<h2>Dimensions &amp; filters</h2>
<ul>
  <li>Region, territory, sub-region</li>
  <li>Sales rep, team, manager</li>
  <li>Deal stage, deal type, product line</li>
  <li>Close date, fiscal quarter, fiscal year</li>
</ul>

<h2>Time handling</h2>
<p>Year-over-year and quarterly comparisons as the primary lens. Support fiscal calendar alignment (Q1 starts February). Include MTD and QTD running totals for real-time tracking.</p>

<h2>Guardrails</h2>
<ul>
  <li>Exclude test accounts and internal dummy deals from all revenue calculations</li>
  <li>Do not expose cost, margin, or commission data — this model is for revenue tracking only</li>
  <li>Unattributed orders (no region_id) should be excluded from regional breakdowns but included in company-wide totals</li>
</ul>

<h2>AI instructions</h2>
<p>When a user asks about "revenue", default to closed-won deal value unless they specify pipeline or forecast. "Quota" refers to the annual sales target, prorated by quarter. "Region" means the primary sales territory assignment — not the customer's billing address.</p>

<h2>Limitations</h2>
<ul>
  <li>Returns and refunds are not yet modelled — revenue figures are gross</li>
  <li>Territory re-assignments before 2023 may cause historical rep-level figures to appear understated</li>
  <li>Forecast data is not included in this model</li>
</ul>`.trim(),
  },
  {
    id: 'd2',
    title: 'Customer health and retention',
    description: 'Identify at-risk customers early by tracking engagement trends and support interactions.',
    goal: 'Give customer success teams a single view of customer health so they can proactively intervene before customers churn.',
    keyQuestions: [
      'Which customers have had low engagement over the last 30 days?',
      'What is the churn rate broken down by customer segment?',
      'How does support ticket volume correlate with churn risk?',
    ],
    docHtml: `
<h2>Goal</h2>
<p>Give customer success teams a single view of customer health — combining engagement signals, support history, and NPS scores — so they can proactively intervene before customers churn.</p>

<h2>Key business questions</h2>
<ul>
  <li>Which customers have had low engagement over the last 30 days?</li>
  <li>What is the churn rate broken down by customer segment?</li>
  <li>Which customer segments generate the most recurring revenue?</li>
  <li>How does support ticket volume correlate with churn risk?</li>
  <li>What is the NPS trend for at-risk customers vs healthy ones?</li>
</ul>

<h2>Consumers &amp; personas</h2>
<ul>
  <li><strong>Customer Success Managers</strong> — daily account health review, renewal risk identification</li>
  <li><strong>VP of Customer Success</strong> — portfolio-level churn forecasting, segment health</li>
  <li><strong>Product team</strong> — feature adoption signals, engagement depth analysis</li>
</ul>

<h2>Key metrics</h2>
<ul>
  <li>Churn Risk Score (composite — engagement + support + NPS)</li>
  <li>Last Active Date (most recent product session)</li>
  <li>Support Ticket Count (open + recent)</li>
  <li>NPS Score (latest survey response)</li>
  <li>Customer Lifetime Value (ARR × expected tenure)</li>
  <li>Days Since Last Login</li>
</ul>

<h2>Dimensions &amp; filters</h2>
<ul>
  <li>Customer segment (SMB, Mid-Market, Enterprise)</li>
  <li>CSM owner, account tier</li>
  <li>Product plan, contract type</li>
  <li>Renewal date, contract start date</li>
  <li>Health status (Healthy / At Risk / Critical)</li>
</ul>

<h2>Time handling</h2>
<p>Rolling 30/60/90-day windows for engagement metrics. Point-in-time snapshots for NPS and health score history. Renewal dates as forward-looking anchors for at-risk prioritisation.</p>

<h2>Guardrails</h2>
<ul>
  <li>Only include active customers (status = active) — exclude churned, suspended, and trial accounts</li>
  <li>Do not surface individual employee-level activity — aggregate at account level only</li>
  <li>Financial contract values should only be visible to CSM managers and above</li>
</ul>

<h2>AI instructions</h2>
<p>"Engagement" means product login activity and feature usage events — not email opens or marketing interactions. "At risk" means a churn risk score above 60. When asked about "customers", default to active accounts in the current book of business unless the user specifies a segment or time range.</p>

<h2>Limitations</h2>
<ul>
  <li>Mobile app engagement events are not yet ingested — engagement scores reflect web activity only</li>
  <li>NPS data has gaps for customers who opted out of surveys</li>
  <li>Historical churn risk scores before Q3 2023 are unavailable</li>
</ul>`.trim(),
  },
];


// ─── Direction card (compact) ──────────────────────────────────────────────────
// Shows title + goal + 3 key questions. Select radio picks the direction.
// "Open doc" button opens the full requirements canvas on the right.

function DirectionCard({
  direction,
  index,
  isSelected,
  onSelect,
  onOpenCanvas,
}: {
  direction: Direction;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onOpenCanvas: () => void;
}) {
  const numLabel = String(index + 1).padStart(2, '0');

  return (
    <div
      style={{
        flex: 1, minWidth: 0,
        display: 'flex', flexDirection: 'column',
        borderRadius: spacing.C, overflow: 'hidden',
        backgroundColor: systemColors.light['background-base'],
        border: `1.5px solid ${isSelected ? systemColors.light['content-brand'] : systemColors.light['border-divider']}`,
        transition: 'border-color 0.2s',
      }}
    >
      {/* Header — click to select */}
      <div
        onClick={onSelect}
        style={{
          display: 'flex', alignItems: 'center', gap: spacing.C,
          padding: `${spacing.C}px ${spacing.D}px`,
          cursor: 'pointer',
          backgroundColor: isSelected ? systemColors.light['background-information'] : 'transparent',
          borderBottom: `1px solid ${systemColors.light['border-divider']}`,
          transition: 'background-color 0.15s',
        }}
        onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = systemColors.light['background-sunken']; }}
        onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
      >
        {/* Radio */}
        <div style={{
          width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
          border: `1.5px solid ${isSelected ? systemColors.light['content-brand'] : systemColors.light['border-default']}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: systemColors.light['background-base'],
          transition: 'border-color 0.15s',
        }}>
          {isSelected && <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: systemColors.light['content-brand'] }} />}
        </div>
        {/* Number */}
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', flexShrink: 0, color: isSelected ? systemColors.light['content-brand'] : systemColors.light['content-secondary'] }}>
          {numLabel}
        </span>
        {/* Title */}
        <span style={{ flex: 1, fontSize: 14, fontWeight: 600, lineHeight: '20px', color: systemColors.light['content-primary'], overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {direction.title}
        </span>
        {/* Open doc button */}
        <Button
          variant="tertiary"
          size="small"
          onClick={e => { (e as React.MouseEvent).stopPropagation(); onOpenCanvas(); }}
          icon={
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M5 2H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9M8 2h4v4M12 2 7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          iconPosition="leading"
        >
          Open doc
        </Button>
      </div>

      {/* Body — goal + key questions */}
      <div style={{ padding: `${spacing.C}px ${spacing.D}px ${spacing.D}px`, display: 'flex', flexDirection: 'column', gap: spacing.C }}>
        {/* Goal */}
        <p style={{ margin: 0, fontSize: 13, fontWeight: fontWeight.light, lineHeight: '19px', color: systemColors.light['content-primary'] }}>
          {direction.goal}
        </p>
        {/* Divider */}
        <div style={{ height: 1, background: systemColors.light['border-divider'] }} />
        {/* Key questions */}
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {direction.keyQuestions.map((q, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: spacing.B, fontSize: 13, lineHeight: '18px', color: systemColors.light['content-secondary'], fontWeight: fontWeight.light }}>
              <span style={{ flexShrink: 0, marginTop: 4, width: 4, height: 4, borderRadius: '50%', backgroundColor: systemColors.light['content-tertiary'], display: 'inline-block' }} />
              {q}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


// ─── Requirements canvas panel ────────────────────────────────────────────────
// Full requirements doc for a direction. Slides in from the right.
// Sits alongside the chat column in a flex layout.

function RequirementsCanvas({
  direction,
  onClose,
  onUpdate,
}: {
  direction: Direction;
  onClose: () => void;
  onUpdate: (d: Direction) => void;
}) {
  const docRef     = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [toolbar, setToolbar] = useState<{ top: number; left: number } | null>(null);

  // Set initial HTML imperatively — dangerouslySetInnerHTML + contentEditable conflict in React
  useEffect(() => {
    if (docRef.current) {
      docRef.current.innerHTML = direction.docHtml;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectionChange = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !docRef.current?.contains(sel.anchorNode)) {
      setToolbar(null);
      return;
    }
    const range = sel.getRangeAt(0);
    const rect  = range.getBoundingClientRect();
    const containerRect = docRef.current!.getBoundingClientRect();
    setToolbar({
      top:  rect.top - containerRect.top - 44,
      left: rect.left - containerRect.left + rect.width / 2,
    });
  }, []);

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, [handleSelectionChange]);

  const execFmt = (cmd: string, value?: string) => {
    document.execCommand(cmd, false, value);
    docRef.current?.focus();
  };

  return (
    <div style={{
      width: '55%', flexShrink: 0,
      display: 'flex', flexDirection: 'column',
      borderLeft: `1px solid ${systemColors.light['border-divider']}`,
      backgroundColor: systemColors.light['background-base'],
      animation: 'slideInFromRight 0.25s cubic-bezier(0.4,0,0.2,1) both',
      overflow: 'hidden',
    }}>
      {/* Canvas header */}
      <div style={{
        height: 52, flexShrink: 0,
        display: 'flex', alignItems: 'center',
        padding: `0 ${spacing.D}px 0 ${spacing.F}px`,
        borderBottom: `1px solid ${systemColors.light['border-divider']}`,
        gap: spacing.C,
      }}>
        {/* Doc icon */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={{ flexShrink: 0, color: systemColors.light['content-secondary'] }}>
          <path d="M3 2h7l3 3v9H3V2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
          <path d="M10 2v3h3M6 7h4M6 10h4M6 13h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        {/* Title */}
        <span style={{ flex: 1, fontSize: fontSize.md, fontWeight: 600, color: systemColors.light['content-primary'], overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {direction.title}
        </span>
        {/* Format toolbar buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, borderRight: `1px solid ${systemColors.light['border-divider']}`, paddingRight: spacing.C, marginRight: spacing.A }}>
          {[
            { label: 'B',  title: 'Bold',   cmd: 'bold',    style: { fontWeight: 700 } },
            { label: 'I',  title: 'Italic', cmd: 'italic',  style: { fontStyle: 'italic' } },
            { label: '•',  title: 'Bullet list', cmd: 'insertUnorderedList', style: {} },
          ].map(({ label, title, cmd, style }) => (
            <button
              key={cmd}
              title={title}
              onMouseDown={e => { e.preventDefault(); execFmt(cmd); }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                width: 28, height: 28, borderRadius: 4,
                fontSize: 13, color: systemColors.light['content-secondary'],
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'inherit', ...style,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = systemColors.light['background-sunken']; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
            >
              {label}
            </button>
          ))}
        </div>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            width: 28, height: 28, borderRadius: 4, padding: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: systemColors.light['content-secondary'],
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = systemColors.light['background-sunken']; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
          aria-label="Close canvas"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Floating selection toolbar */}
      {toolbar && (
        <div
          ref={toolbarRef}
          onMouseDown={e => e.preventDefault()}
          style={{
            position: 'absolute',
            top: toolbar.top,
            left: toolbar.left,
            transform: 'translateX(-50%)',
            zIndex: 20,
            display: 'flex', alignItems: 'center', gap: 2,
            background: systemColors.light['content-primary'],
            borderRadius: 6, padding: '4px 6px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
          }}
        >
          {[
            { label: 'B',  cmd: 'bold' },
            { label: 'I',  cmd: 'italic' },
            { label: 'H2', cmd: 'formatBlock', val: 'h2' },
            { label: '•',  cmd: 'insertUnorderedList' },
          ].map(({ label, cmd, val }) => (
            <button
              key={cmd}
              onMouseDown={e => { e.preventDefault(); execFmt(cmd, val); }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'white', fontSize: 12, fontWeight: 600,
                padding: '2px 6px', borderRadius: 4,
                fontFamily: 'inherit', lineHeight: '18px',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Doc body */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
        <div
          ref={docRef}
          contentEditable
          suppressContentEditableWarning
          onInput={() => { if (docRef.current) onUpdate({ ...direction, docHtml: docRef.current.innerHTML }); }}
          style={{
            outline: 'none',
            padding: `${spacing.F}px`,
            fontSize: 13,
            lineHeight: '20px',
            fontFamily: fontFamily.primary,
            color: systemColors.light['content-primary'],
            minHeight: '100%',
          }}
        />
      </div>
    </div>
  );
}


// ─── DME auto-populate plan ────────────────────────────────────────────────────
// Phase labels/captions/reasoning for the 5-phase plan card shown in the DME's
// SpotterModel panel during progressive auto-population.

const DME_BUILD_PLAN: Record<string, Array<{ planLabel: string; planCaption: string; reasoning: string }>> = {
  d1: [
    {
      planLabel: 'Scanning schema',
      planCaption: 'Found 8 candidate tables in Snowflake\n4 match the sales performance context — 1 fact, 3 dimensions',
      reasoning: 'Scanning the Snowflake schema for fact and dimension tables related to sales performance and regional revenue…',
    },
    {
      planLabel: 'Selecting tables',
      planCaption: 'Adding FACT_SALES_ORDERS as the primary grain table\nDIM_REGIONS, DIM_SALES_REPS, and DIM_DATE joined as dimensions',
      reasoning: 'Adding fact_sales_orders as the primary grain table. Selecting dim_regions, dim_sales_reps, and dim_date as supporting dimensions.',
    },
    {
      planLabel: 'Building joins',
      planCaption: '3 joins validated via region_id, rep_id, and order_date\nNo ambiguous paths or circular references detected',
      reasoning: 'Joining dim_regions on region_id, dim_sales_reps on rep_id, and dim_date on order_date. All join paths are unambiguous.',
    },
    {
      planLabel: 'Mapping columns',
      planCaption: '23 columns labeled with types, descriptions, and AI context\nAll columns assigned to their respective tables',
      reasoning: 'Mapping columns to each table in the model. Assigning data types, descriptions, and AI context for all 23 fields.',
    },
    {
      planLabel: 'Adding formulas',
      planCaption: '4 metrics defined: Total Revenue, Quota Attainment, Deal Count, YoY Growth\nAll formulas validated against the model schema',
      reasoning: 'Building metric formulas and validating expressions against available columns. All 4 formulas pass schema validation.',
    },
  ],
  d2: [
    {
      planLabel: 'Scanning schema',
      planCaption: 'Found 6 candidate tables in Redshift\n3 match the churn analysis context — 1 fact, 2 dimensions',
      reasoning: 'Scanning the Redshift schema for tables related to customer engagement and retention…',
    },
    {
      planLabel: 'Selecting tables',
      planCaption: 'Adding FACT_CUSTOMER_ACTIVITY as the primary grain table\nDIM_CUSTOMERS and DIM_DATE joined as dimensions',
      reasoning: 'Adding fact_customer_activity as the primary grain table. Selecting dim_customers and dim_date as supporting dimensions.',
    },
    {
      planLabel: 'Building joins',
      planCaption: '2 joins validated via customer_id and date_id\nAll join paths verified — no missing foreign keys',
      reasoning: 'Joining dim_customers on customer_id and dim_date on date_id. Both join paths are clean with no ambiguity.',
    },
    {
      planLabel: 'Mapping columns',
      planCaption: '18 columns labeled with types, descriptions, and AI context\nAll columns assigned to their respective tables',
      reasoning: 'Mapping columns to each table in the model. Assigning data types, descriptions, and AI context for all 18 fields.',
    },
    {
      planLabel: 'Adding formulas',
      planCaption: '4 metrics defined: Last Active Date, Support Tickets, NPS Score, Churn Risk Score\nAll formulas validated against the model schema',
      reasoning: 'Building churn metric formulas and validating expressions against available columns. All 4 formulas pass schema validation.',
    },
  ],
};

// ─── Build plan data ───────────────────────────────────────────────────────────

// PlanPhase: one of the 5 visual phases shown in the plan card
interface PlanPhase {
  planLabel: string;
  planCaption: string;   // 2-line caption — \n renders as line break (white-space: pre-line)
  reasoning: string;
  endStep: number;       // inclusive last micro-step index for this phase
}

// MicroStep: one per item reveal — drives completedCount increments
interface MicroStep {
  delayMs: number;
  phaseIndex: number;    // 0-4 which of the 5 phases this step belongs to
}

interface DirectionPlan {
  phases: PlanPhase[];   // exactly 5 entries
  steps: MicroStep[];    // one per item: 15 for d1, 13 for d2
}

const BUILD_PLAN: Record<string, DirectionPlan> = {
  d1: {
    phases: [
      {
        planLabel: 'Scanning connection',
        planCaption: 'Found 8 candidate tables in Snowflake\n4 match the sales performance context — 1 fact, 3 dimensions',
        reasoning: 'Scanning the Snowflake schema for fact and dimension tables related to sales performance and regional revenue…',
        endStep: 0,
      },
      {
        planLabel: 'Selecting tables',
        planCaption: 'Adding FACT_SALES_ORDERS as the primary grain table\nDIM_REGIONS, DIM_SALES_REPS, and DIM_DATE joined as dimensions',
        reasoning: 'Identified fact_sales_orders as the primary grain (85K rows). Adding dimension tables for regions, sales reps, and calendar dates to enable full analytical coverage.',
        endStep: 4,
      },
      {
        planLabel: 'Building relationships',
        planCaption: '3 joins validated via region_id, rep_id, and order_date\nNo ambiguous paths or circular references detected',
        reasoning: 'Joining dim_regions on region_id (INNER), dim_sales_reps on rep_id (LEFT to preserve unassigned orders), and dim_date on order_date (INNER) for time-series analysis.',
        endStep: 7,
      },
      {
        planLabel: 'Configuring columns & formulas',
        planCaption: '23 columns labeled with types, descriptions, and AI context\n4 metrics defined: Total Revenue, Quota Attainment, Deal Count, YoY Growth',
        reasoning: 'Annotating all columns with AI-friendly context. Defining total_revenue (SUM), quota_attainment (ratio), deal_count (COUNT DISTINCT), and yoy_growth (LAG window) for full KPI coverage.',
        endStep: 11,
      },
      {
        planLabel: 'Making AI ready',
        planCaption: 'AI search context added to all 23 columns\n3 sample questions verified as answerable by the model',
        reasoning: 'Applying region_id IS NOT NULL filter to exclude unattributed system rows. Generating sample questions to validate coverage and setting AI context for each column.',
        endStep: 14,
      },
    ],
    // 15 micro-steps: 1 scan + 4 tables + 3 rels + 4 formulas + 3 questions
    steps: [
      { phaseIndex: 0, delayMs: 1200 }, // scan
      { phaseIndex: 1, delayMs: 400 },  // table 1
      { phaseIndex: 1, delayMs: 400 },  // table 2
      { phaseIndex: 1, delayMs: 400 },  // table 3
      { phaseIndex: 1, delayMs: 400 },  // table 4
      { phaseIndex: 2, delayMs: 450 },  // rel 1
      { phaseIndex: 2, delayMs: 450 },  // rel 2
      { phaseIndex: 2, delayMs: 450 },  // rel 3
      { phaseIndex: 3, delayMs: 400 },  // formula 1
      { phaseIndex: 3, delayMs: 400 },  // formula 2
      { phaseIndex: 3, delayMs: 400 },  // formula 3
      { phaseIndex: 3, delayMs: 400 },  // formula 4
      { phaseIndex: 4, delayMs: 400 },  // question 1
      { phaseIndex: 4, delayMs: 400 },  // question 2
      { phaseIndex: 4, delayMs: 400 },  // question 3
    ],
  },
  d2: {
    phases: [
      {
        planLabel: 'Scanning connection',
        planCaption: 'Found 6 candidate tables in Redshift\n3 match the churn analysis context — 1 fact, 2 dimensions',
        reasoning: 'Scanning the Redshift schema for customer activity, engagement, and support tables relevant to churn analysis…',
        endStep: 0,
      },
      {
        planLabel: 'Selecting tables',
        planCaption: 'Adding FACT_CUSTOMER_ACTIVITY as the primary grain table\nDIM_CUSTOMERS and DIM_DATE joined as dimensions',
        reasoning: 'Identified fact_customer_activity as the engagement grain (120K event rows). Adding dim_customers for account metadata and dim_date for time-windowed lookback analysis.',
        endStep: 3,
      },
      {
        planLabel: 'Building relationships',
        planCaption: '2 joins validated via customer_id and activity_date\nAll join paths verified — no missing foreign keys',
        reasoning: 'Joining dim_customers on customer_id (INNER) for segment and tier breakdown, and dim_date on activity_date (INNER) to enable 30-day and 90-day lookback windows.',
        endStep: 5,
      },
      {
        planLabel: 'Configuring columns & formulas',
        planCaption: '18 columns labeled with types, descriptions, and AI context\n4 metrics: Last Active Date, Support Tickets, NPS Score, Churn Risk Score',
        reasoning: 'Annotating all columns with churn-oriented AI context. Defining last_active_date (MAX), support_tickets (COUNT), nps_score (rolling AVG), and churn_risk_score (weighted composite).',
        endStep: 9,
      },
      {
        planLabel: 'Making AI ready',
        planCaption: 'AI search context added to all 18 columns\n3 sample questions verified as answerable by the model',
        reasoning: 'Applying active customer filter (status = active) to exclude closed accounts. Generating sample questions to validate engagement and revenue coverage.',
        endStep: 12,
      },
    ],
    // 13 micro-steps: 1 scan + 3 tables + 2 rels + 4 formulas + 3 questions
    steps: [
      { phaseIndex: 0, delayMs: 1200 }, // scan
      { phaseIndex: 1, delayMs: 450 },  // table 1
      { phaseIndex: 1, delayMs: 450 },  // table 2
      { phaseIndex: 1, delayMs: 450 },  // table 3
      { phaseIndex: 2, delayMs: 500 },  // rel 1
      { phaseIndex: 2, delayMs: 500 },  // rel 2
      { phaseIndex: 3, delayMs: 400 },  // formula 1
      { phaseIndex: 3, delayMs: 400 },  // formula 2
      { phaseIndex: 3, delayMs: 400 },  // formula 3
      { phaseIndex: 3, delayMs: 400 },  // formula 4
      { phaseIndex: 4, delayMs: 400 },  // question 1
      { phaseIndex: 4, delayMs: 400 },  // question 2
      { phaseIndex: 4, delayMs: 400 },  // question 3
    ],
  },
};

// ─── Model spec data (for BuildingScreen left canvas) ─────────────────────────

type SqlDataType = 'VARCHAR' | 'BIGINT' | 'INTEGER' | 'DATE' | 'FLOAT';
type JoinType = 'INNER' | 'LEFT' | 'RIGHT' | 'FULL';
type Cardinality = 'N:1' | '1:N' | '1:1' | 'N:N';
type QuestionStatus = 'answerable' | 'needs-formula' | 'missing-data';
export type ActiveTab = 'tables' | 'relationships' | 'formulas' | 'questions';

interface ModelColumnDef {
  name: string;
  dataType: SqlDataType;
  type: 'Dimension' | 'Metric';
  description: string;
  aiCtx: string;
}

interface ModelTableDef {
  tableName: string;
  tableType: 'Fact' | 'Dimension';
  rowCount: string;
  appearsAtStep: number;
  columns: ModelColumnDef[];
}

interface ModelRelationshipDef {
  leftTable: string;
  leftKey: string;
  rightTable: string;
  rightKey: string;
  joinType: JoinType;
  cardinality: Cardinality;
  appearsAtStep: number;
}

interface ModelFormulaDef {
  name: string;
  expression: string;
  outputType: 'Metric' | 'Dimension';
  baseTable: string;
  description: string;
  appearsAtStep: number;
}

interface SampleQuestionDef {
  question: string;
  tablesUsed: string[];
  keyColumns: string[];
  status: QuestionStatus;
  appearsAtStep: number;
}

interface ModelSpec {
  tables: ModelTableDef[];
  relationships: ModelRelationshipDef[];
  formulas: ModelFormulaDef[];
  questions: SampleQuestionDef[];
}


const MODEL_SPEC: Record<string, ModelSpec> = {
  d1: {
    tables: [
      {
        tableName: 'FACT_SALES_ORDERS',
        tableType: 'Fact',
        rowCount: '85K rows',
        appearsAtStep: 1,
        columns: [
          { name: 'order_id',     dataType: 'VARCHAR', type: 'Dimension', description: 'Unique order identifier. Primary key.',                         aiCtx: 'Unique identifier for each sales order' },
          { name: 'order_date',   dataType: 'DATE',    type: 'Dimension', description: 'Date the order was placed, normalised to YYYY-MM-DD.',          aiCtx: 'Date the order was placed' },
          { name: 'order_amount', dataType: 'BIGINT',  type: 'Metric',    description: 'Raw order value in USD at time of purchase.',                   aiCtx: 'Total revenue value of the order in USD' },
          { name: 'order_status', dataType: 'VARCHAR', type: 'Dimension', description: 'Order status: won, lost, pending.',                             aiCtx: 'Current status of the order — won, lost, or pending' },
          { name: 'region_id',    dataType: 'VARCHAR', type: 'Dimension', description: 'Join key → dim_regions. Use region_name for display.',          aiCtx: 'Sales region where the order originated' },
          { name: 'rep_id',       dataType: 'VARCHAR', type: 'Dimension', description: 'Join key → dim_sales_reps. Use rep_name for display.',          aiCtx: 'Sales representative who owns the order' },
        ],
      },
      {
        tableName: 'DIM_REGIONS',
        tableType: 'Dimension',
        rowCount: '12 rows',
        appearsAtStep: 2,  // micro-step 2
        columns: [
          { name: 'region_id',   dataType: 'VARCHAR', type: 'Dimension', description: 'Primary key.',                                                   aiCtx: 'Unique region identifier' },
          { name: 'region_name', dataType: 'VARCHAR', type: 'Dimension', description: 'Human-readable region label. Use for grouping and chart labels.', aiCtx: 'Human-readable name for the sales region' },
          { name: 'territory',   dataType: 'VARCHAR', type: 'Dimension', description: 'Aggregated territory grouping: AMER, EMEA, APAC.',               aiCtx: 'Broad territory grouping (AMER, EMEA, APAC)' },
        ],
      },
      {
        tableName: 'DIM_SALES_REPS',
        tableType: 'Dimension',
        rowCount: '48 rows',
        appearsAtStep: 3,
        columns: [
          { name: 'rep_id',       dataType: 'VARCHAR', type: 'Dimension', description: 'Primary key.',                  aiCtx: 'Unique identifier for the sales representative' },
          { name: 'rep_name',     dataType: 'VARCHAR', type: 'Dimension', description: 'Full name of the sales rep.',   aiCtx: 'Full name of the sales representative' },
          { name: 'quota_target', dataType: 'BIGINT',  type: 'Metric',    description: 'Annual quota in USD.',          aiCtx: 'Annual sales quota assigned to the rep in USD' },
        ],
      },
      {
        tableName: 'DIM_DATE',
        tableType: 'Dimension',
        rowCount: '1,826 rows',
        appearsAtStep: 4,
        columns: [
          { name: 'date_key', dataType: 'DATE',    type: 'Dimension', description: 'Primary key in YYYYMMDD format. Join on order_date.',  aiCtx: 'Calendar date key for time-based joins' },
          { name: 'quarter',  dataType: 'VARCHAR', type: 'Dimension', description: 'Quarter label (Q1–Q4). Use for QoQ analysis.',         aiCtx: 'Fiscal quarter label for quarterly comparisons' },
          { name: 'year',     dataType: 'INTEGER', type: 'Dimension', description: 'Calendar year. Use for year-over-year comparisons.',   aiCtx: 'Calendar year for year-over-year analysis' },
          { name: 'month',    dataType: 'VARCHAR', type: 'Dimension', description: 'Month name. Use for monthly trend views.',             aiCtx: 'Month name for monthly trend analysis' },
        ],
      },
    ],
    relationships: [
      { leftTable: 'fact_sales_orders', leftKey: 'region_id',  rightTable: 'dim_regions',    rightKey: 'region_id', joinType: 'INNER', cardinality: 'N:1', appearsAtStep: 5 },
      { leftTable: 'fact_sales_orders', leftKey: 'rep_id',     rightTable: 'dim_sales_reps', rightKey: 'rep_id',    joinType: 'LEFT',  cardinality: 'N:1', appearsAtStep: 6 },
      { leftTable: 'fact_sales_orders', leftKey: 'order_date', rightTable: 'dim_date',       rightKey: 'date_key',  joinType: 'INNER', cardinality: 'N:1', appearsAtStep: 7 },
    ],
    formulas: [
      { name: 'total_revenue',    expression: 'SUM(order_amount)',                                                    outputType: 'Metric', baseTable: 'fact_sales_orders', description: 'Sum of order_amount in USD. Primary revenue metric.',                               appearsAtStep: 8 },
      { name: 'quota_attainment', expression: 'total_revenue / quota_target',                                         outputType: 'Metric', baseTable: 'fact_sales_orders', description: 'Revenue as a ratio of the rep\'s annual quota target.',                            appearsAtStep: 9 },
      { name: 'deal_count',       expression: 'COUNT(DISTINCT order_id)',                                             outputType: 'Metric', baseTable: 'fact_sales_orders', description: 'Count of distinct closed deals per rep or region.',                                 appearsAtStep: 10 },
      { name: 'yoy_growth',       expression: '(curr_quarter_rev - prev_year_quarter_rev)\n/ prev_year_quarter_rev', outputType: 'Metric', baseTable: 'fact_sales_orders', description: 'Year-over-year revenue growth using a LAG window partitioned by region.',        appearsAtStep: 11 },
    ],
    questions: [
      { question: 'What is total revenue by region this quarter vs last quarter?', tablesUsed: ['fact_sales_orders', 'dim_regions', 'dim_date'],        keyColumns: ['total_revenue', 'region_name', 'quarter'],    status: 'answerable', appearsAtStep: 12 },
      { question: 'Which regions are behind on their quota targets?',              tablesUsed: ['fact_sales_orders', 'dim_regions', 'dim_sales_reps'], keyColumns: ['quota_attainment', 'region_name'],            status: 'answerable', appearsAtStep: 13 },
      { question: 'What is the average deal size and win rate by region?',         tablesUsed: ['fact_sales_orders', 'dim_regions'],                   keyColumns: ['deal_count', 'order_amount', 'region_name'], status: 'answerable', appearsAtStep: 14 },
    ],
  },
  d2: {
    tables: [
      {
        tableName: 'FACT_CUSTOMER_ACTIVITY',
        tableType: 'Fact',
        rowCount: '120K rows',
        appearsAtStep: 1,
        columns: [
          { name: 'activity_id',   dataType: 'VARCHAR', type: 'Dimension', description: 'Unique event identifier. Primary key.',           aiCtx: 'Unique identifier for each customer activity event' },
          { name: 'customer_id',   dataType: 'VARCHAR', type: 'Dimension', description: 'Join key → dim_customers.',                      aiCtx: 'Customer who performed the activity' },
          { name: 'activity_date', dataType: 'DATE',    type: 'Dimension', description: 'Date of the customer activity event.',            aiCtx: 'Date the activity occurred' },
          { name: 'activity_type', dataType: 'VARCHAR', type: 'Dimension', description: 'Type of activity: login, feature_use, support.',  aiCtx: 'Type of engagement event (login, feature use, support)' },
        ],
      },
      {
        tableName: 'DIM_CUSTOMERS',
        tableType: 'Dimension',
        rowCount: '4,200 rows',
        appearsAtStep: 2,  // micro-step 2
        columns: [
          { name: 'customer_id',    dataType: 'VARCHAR', type: 'Dimension', description: 'Primary key.',                                      aiCtx: 'Unique customer account identifier' },
          { name: 'customer_name',  dataType: 'VARCHAR', type: 'Dimension', description: 'Account name. Use for display in dashboards.',      aiCtx: 'Account display name for dashboards and reports' },
          { name: 'segment',        dataType: 'VARCHAR', type: 'Dimension', description: 'Segment: Enterprise, Mid-Market, SMB.',             aiCtx: 'Customer size segment (Enterprise, Mid-Market, SMB)' },
          { name: 'tier',           dataType: 'VARCHAR', type: 'Dimension', description: 'Subscription tier: Platinum, Gold, Silver.',        aiCtx: 'Subscription tier (Platinum, Gold, Silver)' },
          { name: 'contract_value', dataType: 'BIGINT',  type: 'Metric',    description: 'Annual contract value in USD.',                     aiCtx: 'Annual contract value in USD' },
        ],
      },
      {
        tableName: 'DIM_DATE',
        tableType: 'Dimension',
        rowCount: '1,826 rows',
        appearsAtStep: 3,
        columns: [
          { name: 'date_key', dataType: 'DATE',    type: 'Dimension', description: 'Primary key. Join on activity_date.',                aiCtx: 'Calendar date key for time-based joins' },
          { name: 'month',    dataType: 'VARCHAR', type: 'Dimension', description: 'Month name. Use for monthly trend views.',            aiCtx: 'Month name for monthly trend analysis' },
          { name: 'quarter',  dataType: 'VARCHAR', type: 'Dimension', description: 'Quarter label. Use for QoQ analysis.',               aiCtx: 'Quarter label for quarterly comparisons' },
        ],
      },
    ],
    relationships: [
      { leftTable: 'fact_customer_activity', leftKey: 'customer_id',   rightTable: 'dim_customers', rightKey: 'customer_id', joinType: 'INNER', cardinality: 'N:1', appearsAtStep: 4 },
      { leftTable: 'fact_customer_activity', leftKey: 'activity_date', rightTable: 'dim_date',      rightKey: 'date_key',   joinType: 'INNER', cardinality: 'N:1', appearsAtStep: 5 },
    ],
    formulas: [
      { name: 'last_active_date',  expression: 'MAX(activity_date)',                                                   outputType: 'Dimension', baseTable: 'fact_customer_activity', description: 'Most recent activity date per customer. Signals recency.',              appearsAtStep: 6 },
      { name: 'support_tickets',   expression: "COUNT(activity_id)\nWHERE activity_type = 'support'",                 outputType: 'Metric',    baseTable: 'fact_customer_activity', description: 'Count of support tickets. Elevated values flag at-risk accounts.',    appearsAtStep: 7 },
      { name: 'nps_score',         expression: 'AVG(nps_value)\nOVER (RANGE 60 PRECEDING)',                           outputType: 'Metric',    baseTable: 'fact_customer_activity', description: 'Rolling 60-day NPS average. A drop >10 pts flags churn risk.',        appearsAtStep: 8 },
      { name: 'churn_risk_score',  expression: '(0.4 * recency_score)\n+ (0.35 * ticket_trend)\n+ (0.25 * nps_drop)', outputType: 'Metric',    baseTable: 'fact_customer_activity', description: 'Weighted health score 0–100. 40% recency · 35% tickets · 25% NPS.', appearsAtStep: 9 },
    ],
    questions: [
      { question: 'Which customers have had low engagement over the last 30 days?', tablesUsed: ['fact_customer_activity', 'dim_customers'], keyColumns: ['last_active_date', 'customer_name'], status: 'answerable', appearsAtStep: 10 },
      { question: 'What is churn rate broken down by customer segment?',            tablesUsed: ['fact_customer_activity', 'dim_customers'], keyColumns: ['churn_risk_score', 'segment'],       status: 'answerable', appearsAtStep: 11 },
      { question: 'Which customer segments generate the most recurring revenue?',   tablesUsed: ['dim_customers'],                           keyColumns: ['contract_value', 'segment'],         status: 'answerable', appearsAtStep: 12 },
    ],
  },
};

// ─── Building screen ────────────────────────────────────────────────────────────

// ─── Join type + question status chip palettes ─────────────────────────────────

const JOIN_TYPE_STYLE: Record<JoinType, { bg: string; color: string }> = {
  INNER: { bg: '#EEF3FD', color: '#2770EF' },
  LEFT:  { bg: '#FEF3E8', color: '#D97706' },
  RIGHT: { bg: '#EDFAF4', color: '#059669' },
  FULL:  { bg: '#F3EEFB', color: '#7C3AED' },
};

const QUESTION_STATUS_STYLE: Record<QuestionStatus, { bg: string; color: string; label: string }> = {
  'answerable':    { bg: '#EDFAF4', color: '#059669', label: '✓ Answerable' },
  'needs-formula': { bg: '#FEF3E8', color: '#D97706', label: '⚠ Needs formula' },
  'missing-data':  { bg: '#FEF2F2', color: '#DC2626', label: '✗ Missing data' },
};

const TABS: { id: ActiveTab; baseLabel: string }[] = [
  { id: 'tables',        baseLabel: 'Tables & Columns' },
  { id: 'relationships', baseLabel: 'Relationships' },
  { id: 'formulas',      baseLabel: 'Metrics & Formulas' },
  { id: 'questions',     baseLabel: 'Sample questions' },
];

// @ts-ignore — kept for reference; invocation removed in favor of DME auto-populate
function BuildingScreen({
  direction,
  connection: _connection,
  onBuild,
}: {
  direction: Direction;
  connection: DataConnection;
  onBuild: () => void;
}) {
  const plan = BUILD_PLAN[direction.id] ?? BUILD_PLAN['d1'];
  const steps = plan.steps;
  const spec  = MODEL_SPEC[direction.id] ?? MODEL_SPEC['d1'];

  const [completedCount, setCompletedCount] = useState(0);
  const [activeTab,      setActiveTab]      = useState<ActiveTab>('tables');
  // Tabs that recently got new items — cleared after 600ms for pulse animation
  const [pulsedTabs,     setPulsedTabs]     = useState<Set<ActiveTab>>(new Set());
  // Track previous visible counts to detect new arrivals for pulse + auto-switch
  const prevCountsRef = useRef({ tables: 0, relationships: 0, formulas: 0, questions: 0 });

  // Stable ID for the single build-phase plan+reasoning message
  const PLAN_MSG_ID = 'plan-steps-msg';

  // Helper: compute plan-steps data from current completedCount using phase ranges
  const makePlanStepsData = (count: number) => ({
    goal: direction.description,
    steps: plan.phases.map((phase, i): PlanStep => {
      const phaseStart = i === 0 ? 0 : plan.phases[i - 1].endStep + 1;
      const isDone     = count > phase.endStep;
      const isActive   = !isDone && count >= phaseStart;
      return {
        label:   phase.planLabel,
        caption: phase.planCaption,
        state:   isDone ? 'done' : isActive ? 'active' : 'pending',
      };
    }),
  });

  // Guard against React StrictMode double-invoking the mount effect
  const panelInitRef = useRef(false);

  // Chain timeouts — each step completes after its own delayMs
  useEffect(() => {
    if (completedCount >= steps.length) return;
    const t = setTimeout(() => setCompletedCount(c => c + 1), steps[completedCount].delayMs);
    return () => clearTimeout(t);
  }, [completedCount, steps]);

  const allDone = completedCount >= steps.length;

  // Visible items per tab (progressive reveal)
  const visibleTables        = spec.tables.filter(t => t.appearsAtStep <= completedCount);
  const visibleRelationships = spec.relationships.filter(r => r.appearsAtStep <= completedCount);
  const visibleFormulas      = spec.formulas.filter(f => f.appearsAtStep <= completedCount);
  const visibleQuestions     = spec.questions.filter(q => q.appearsAtStep <= completedCount);

  // Current phase index: which of the 5 phases we're mid-way through (-1 when all done)
  const currentPhaseIdx = allDone ? -1 : (steps[completedCount]?.phaseIndex ?? 0);

  // Phases that have completely finished (all their micro-steps done)
  const completedPhases = plan.phases.filter(p => completedCount > p.endStep);

  // Reasoning block data — merged into the plan-steps message
  const reasoningData: ReasoningData = {
    header:     allDone ? 'Done' : 'Reasoning',
    isDone:     allDone,
    inlineText: allDone ? '' : (plan.phases[currentPhaseIdx]?.reasoning ?? ''),
    steps:      completedPhases.map((phase, i) => ({
      n: i + 1, name: phase.planLabel, text: phase.reasoning, dotState: 'done' as const,
    })),
  };

  // Helper — append a user bubble then an agent reply
  const appendUserAndRespond = (text: string) => {
    (window as any)._freezeConversation?.();
    (window as any)._appendMsg?.({ kind: 'user', id: `u-${Date.now()}`, text });
    (window as any)._scrollMsgs?.();
    setTimeout(() => {
      (window as any)._appendMsg?.({
        kind: 'agent', id: `a-${Date.now()}`,
        reasoning: { header: 'Done', isDone: true, inlineText: '', steps: [] },
        response: { text: "Got it — I've updated the draft. Check the left panel for changes.", isVisible: true },
      });
      (window as any)._scrollMsgs?.();
    }, 1200);
  };

  // On mount: start chat view and push the single plan+reasoning message
  useEffect(() => {
    if (panelInitRef.current) return;
    panelInitRef.current = true;

    const welcomeView = document.getElementById('welcome-view');
    const chatView    = document.getElementById('chat-view');
    if (welcomeView) welcomeView.style.display = 'none';
    if (chatView)    chatView.classList.add('active');

    (window as any)._appendMsg?.({
      kind: 'plan-steps',
      id:   PLAN_MSG_ID,
      data: makePlanStepsData(0),
      reasoning: {
        header:     'Building your draft…',
        isDone:     false,
        inlineText: plan.phases[0]?.reasoning ?? 'Analysing schema…',
        steps:      [],
      },
    });
    (window as any)._scrollMsgs?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep plan steps + reasoning in sync as build steps complete.
  // Also: auto-switch active tab and trigger pulse when a new section starts filling.
  useEffect(() => {
    (window as any)._updateMsg?.(PLAN_MSG_ID, {
      data:      makePlanStepsData(completedCount),
      reasoning: reasoningData,
    });
    (window as any)._scrollMsgs?.();

    // Detect which tabs just got their first item (or any new item)
    const prev = prevCountsRef.current;
    const curr = {
      tables:        visibleTables.length,
      relationships: visibleRelationships.length,
      formulas:      visibleFormulas.length,
      questions:     visibleQuestions.length,
    };

    const tabOrder: ActiveTab[] = ['tables', 'relationships', 'formulas', 'questions'];
    const newlyActive: ActiveTab[] = [];
    for (const tab of tabOrder) {
      if (curr[tab] > prev[tab]) newlyActive.push(tab);
    }

    if (newlyActive.length > 0) {
      // Auto-switch to the first tab that just started filling
      const switchTo = newlyActive[0];
      setActiveTab(switchTo);

      // Pulse all tabs that received new items
      setPulsedTabs(s => {
        const next = new Set(s);
        newlyActive.forEach(t => next.add(t));
        return next;
      });
      const timeout = setTimeout(() => {
        setPulsedTabs(s => {
          const next = new Set(s);
          newlyActive.forEach(t => next.delete(t));
          return next;
        });
      }, 600);
      prevCountsRef.current = curr;
      return () => clearTimeout(timeout);
    }

    prevCountsRef.current = curr;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedCount]);

  // When build finishes: show Build CTA on plan card and enable chat input
  useEffect(() => {
    if (!allDone) return;

    (window as any)._updateMsg?.(PLAN_MSG_ID, {
      data:         makePlanStepsData(steps.length),
      reasoning:    reasoningData,
      showBuildCta: true,
    });
    (window as any)._scrollMsgs?.();

    // Register build handler — sets global DME state before navigating
    (window as any)._handleBuildModel = () => {
      // Map MODEL_SPEC → window._modelState so init-dme.js pre-populates the DME
      (window as any)._modelState = {
        addedTables:  spec.tables.map(t => t.tableName.toLowerCase()),
        addedJoins:   spec.relationships.map(r => `${r.leftTable}-${r.rightTable}`),
        addedColumns: spec.tables.flatMap(t =>
          t.columns.map(c => `${t.tableName.toLowerCase()}.${c.name}`)
        ),
        initialContext: direction.description,
        hasAskedClarify: false,
        clarifyCount: 0,
        model: {
          tables: spec.tables.map(t => ({
            name: t.tableName.toLowerCase(),
            desc: `${t.tableType} table · ${t.rowCount}`,
          })),
          joins: spec.relationships.map((r, i) => ({
            name:        `Join ${i + 1}`,
            desc:        `${r.leftTable} → ${r.rightTable} via ${r.leftKey}`,
            leftTable:   r.leftTable,
            leftCol:     r.leftKey,
            cardinality: r.cardinality === 'N:1' ? 'Many : 1' : r.cardinality === '1:N' ? '1 : Many' : r.cardinality,
            rightTable:  r.rightTable,
            rightCol:    r.rightKey,
          })),
          columns: spec.tables.map(t => ({
            table:   t.tableName.toLowerCase(),
            columns: t.columns.map(c => c.name),
          })),
          formulas: spec.formulas.map(f => ({
            name: f.name,
            code: f.expression,
          })),
        },
        changeLog:      [],
        tablePositions: {},
      };
      (window as any).__DME_CONFIG__ = { spotterModel: true, welcomeVariant: 'existing' };
      onBuild();
    };

    // Register chip click handler for follow-up questions
    (window as any)._handleChipClick = (text: string) => appendUserAndRespond(text);

    // Enable chat input
    if ((window as any)._onChatStart) {
      (window as any)._onChatStart();
      (window as any)._onChatStart = null;
    }

    // Wire send button + textarea
    const wireInput = () => {
      const btn = document.getElementById('chat-send-btn');
      const ta  = document.getElementById('chat-textarea') as HTMLTextAreaElement | null;
      if (!btn || !ta) { setTimeout(wireInput, 50); return; }
      const doSend = () => {
        const text = ta.value.trim();
        if (!text) return;
        ta.value = '';
        appendUserAndRespond(text);
      };
      btn.addEventListener('click', doSend);
      ta.addEventListener('keydown', (e: Event) => {
        const ke = e as KeyboardEvent;
        if (ke.key === 'Enter' && !ke.shiftKey) { ke.preventDefault(); doSend(); }
      });
      ta.focus();
    };
    setTimeout(wireInput, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDone]);

  // ── Shared chip renderer ──────────────────────────────────────────────────────
  const TypeChip = ({ type }: { type: 'Dimension' | 'Metric' }) => {
    const s = type === 'Dimension'
      ? { bg: '#EDFAF4', color: '#059669' }
      : { bg: '#F3EEFB', color: '#7C3AED' };
    return (
      <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 500, letterSpacing: '0.03em', background: s.bg, color: s.color, borderRadius: 4, padding: `2px ${spacing.B}px` }}>
        {type}
      </span>
    );
  };

  // ── Formula syntax highlighting ───────────────────────────────────────────────
  // Tokenises a formula expression into coloured spans:
  //   • aggregate keywords (SUM, AVG, …) → brand blue
  //   • TABLE.column or bare column refs  → accent purple
  //   • numeric literals                  → success green
  //   • everything else                   → default monospace
  const FormulaText = ({ expr }: { expr: string }) => {
    const KEYWORDS = /\b(SUM|AVG|COUNT|MIN|MAX|IF|ELSE|THEN|AND|OR|NOT|NULL|TRUE|FALSE|COALESCE|CASE|WHEN|END|CAST|AS|ROUND|ABS|FLOOR|CEIL|CEILING|DISTINCT|OVER|PARTITION|BY|ORDER|FILTER|WHERE)\b/gi;
    const TABLE_COL = /\b([A-Z_][A-Z0-9_]*\.[A-Z_][A-Z0-9_]*)\b/gi;
    const NUMBER    = /\b(\d+(?:\.\d+)?)\b/g;

    // Build a flat token list via a combined regex pass
    type Token = { text: string; kind: 'keyword' | 'ref' | 'num' | 'plain' };
    const tokens: Token[] = [];
    let remaining = expr;

    // Simple one-pass tokeniser — processes left to right
    const combined = /(\b(?:SUM|AVG|COUNT|MIN|MAX|IF|ELSE|THEN|AND|OR|NOT|NULL|TRUE|FALSE|COALESCE|CASE|WHEN|END|CAST|AS|ROUND|ABS|FLOOR|CEIL|CEILING|DISTINCT|OVER|PARTITION|BY|ORDER|FILTER|WHERE)\b)|([A-Z_][A-Z0-9_]*\.[A-Z_][A-Z0-9_]*)|(\b\d+(?:\.\d+)?\b)/gi;
    let last = 0;
    let m: RegExpExecArray | null;
    combined.lastIndex = 0;
    while ((m = combined.exec(expr)) !== null) {
      if (m.index > last) tokens.push({ text: expr.slice(last, m.index), kind: 'plain' });
      if (m[1]) tokens.push({ text: m[0], kind: 'keyword' });
      else if (m[2]) tokens.push({ text: m[0], kind: 'ref' });
      else tokens.push({ text: m[0], kind: 'num' });
      last = m.index + m[0].length;
    }
    if (last < expr.length) tokens.push({ text: expr.slice(last), kind: 'plain' });

    // Suppress unused-variable lint warnings from the regex constants above
    void KEYWORDS; void TABLE_COL; void NUMBER; void remaining;

    const COLOR: Record<Token['kind'], string | undefined> = {
      keyword: systemColors.light['content-brand'],
      ref:     systemColors.light['content-accent-purple'],
      num:     systemColors.light['content-success'],
      plain:   undefined,
    };
    return (
      <pre style={{ margin: 0, fontSize: 12, fontFamily: 'monospace', lineHeight: '18px', whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: systemColors.light['content-primary'] }}>
        {tokens.map((tok, i) => (
          <span key={i} style={COLOR[tok.kind] ? { color: COLOR[tok.kind] } : undefined}>{tok.text}</span>
        ))}
      </pre>
    );
  };

  // ── Left canvas tab content ────────────────────────────────────────────────────

  const tabGridHeader = (cols: string[], gridCols: string) => (
    <div style={{ display: 'grid', gridTemplateColumns: gridCols, padding: `${spacing.B}px ${spacing.C}px`, backgroundColor: systemColors.light['background-sunken'], borderBottom: `1px solid ${systemColors.light['border-divider']}` }}>
      {cols.map(h => (
        <span key={h} style={{ fontSize: 12, fontWeight: 500, color: systemColors.light['content-secondary'] }}>{h}</span>
      ))}
    </div>
  );

  const emptyState = (label: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.C, padding: `${spacing.H}px 0` }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: systemColors.light['content-brand'], animation: 'pulseDot 1.2s ease-in-out infinite', flexShrink: 0 }} />
      <span style={{ fontSize: 14, color: systemColors.light['content-secondary'], fontWeight: fontWeight.light }}>{label}</span>
    </div>
  );

  // "+ Add" buttons — only rendered after build completes (canvas locked during build)
  const addRowBtn = (label: string) => !allDone ? null : (
    <div style={{ padding: `${spacing.B}px ${spacing.C}px`, borderTop: `1px solid ${systemColors.light['border-divider']}` }}>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 13, color: systemColors.light['content-brand'], fontFamily: 'inherit', fontWeight: fontWeight.light }}>
        {label}
      </button>
    </div>
  );

  // Skeleton shimmer rows — shown while a section has no items yet and build is in progress
  const skeletonRow = (gridCols: string, colWidths: string[]) => (
    <div style={{ display: 'grid', gridTemplateColumns: gridCols, padding: `${spacing.C}px ${spacing.C}px`, alignItems: 'center', gap: spacing.C }}>
      {colWidths.map((w, i) => (
        <div key={i} style={{ height: 12, width: w, borderRadius: 4, background: `linear-gradient(90deg, ${systemColors.light['background-sunken']} 25%, ${systemColors.light['background-subtle']} 50%, ${systemColors.light['background-sunken']} 75%)`, backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
      ))}
    </div>
  );

  const skeletonBlock = (gridCols: string, colWidths: string[], rows = 3) => (
    <div style={{ border: `1px solid ${systemColors.light['border-divider']}`, borderRadius: spacing.B, overflow: 'hidden' }}>
      {Array.from({ length: rows }).map((_, i) => (
        <React.Fragment key={i}>
          {i > 0 && <div style={{ height: 1, background: systemColors.light['border-divider'] }} />}
          {skeletonRow(gridCols, colWidths)}
        </React.Fragment>
      ))}
    </div>
  );

  // ── Shared trailing shimmer helper — appears after the last real row while loading ──
  const trailingShimmerRow = (gridCols: string, colWidths: string[]) => (
    <div style={{ display: 'grid', gridTemplateColumns: gridCols, padding: `${spacing.C}px ${spacing.C}px`, alignItems: 'center', gap: spacing.C, borderTop: `1px solid ${systemColors.light['border-divider']}` }}>
      {colWidths.map((w, i) => (
        <div key={i} style={{ height: 12, width: w, borderRadius: 4, background: `linear-gradient(90deg, ${systemColors.light['background-sunken']} 25%, ${systemColors.light['background-subtle']} 50%, ${systemColors.light['background-sunken']} 75%)`, backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
      ))}
    </div>
  );

  // Column grid definition — aligns with DME Columns tab fields
  const COL_GRID = '140px 110px 80px 1fr 1fr';

  // ── Tables & Columns content ──────────────────────────────────────────────────
  const tablesContent = (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: spacing.H }}>
      {visibleTables.length === 0
        ? (!allDone
            ? skeletonBlock(COL_GRID, ['120px', '80px', '50px', '60%', '55%'])
            : emptyState('No tables found'))
        : visibleTables.map(table => {
          const tableChip = table.tableType === 'Fact'
            ? { bg: '#EEF3FD', color: systemColors.light['content-brand'] }
            : { bg: '#EDFAF4', color: '#059669' };
          return (
            <div key={table.tableName} style={{ animation: 'slideUpIn 0.4s cubic-bezier(0.4,0,0.2,1) both' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.B, marginBottom: spacing.C }}>
                <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', color: systemColors.light['content-primary'] }}>{table.tableName}</span>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', background: tableChip.bg, color: tableChip.color, borderRadius: 4, padding: `1px 6px` }}>{table.tableType}</span>
                <span style={{ fontSize: 12, color: systemColors.light['content-secondary'], fontWeight: fontWeight.light }}>· {table.columns.length} columns · {table.rowCount}</span>
              </div>
              <div style={{ border: `1px solid ${systemColors.light['border-divider']}`, borderRadius: spacing.B, overflow: 'hidden' }}>
                {tabGridHeader(['Column', 'Source table', 'Data type', 'Description', 'AI context'], COL_GRID)}
                {table.columns.map((col, ci) => (
                  <div key={col.name} style={{ display: 'grid', gridTemplateColumns: COL_GRID, padding: `${spacing.C}px ${spacing.C}px`, borderBottom: ci < table.columns.length - 1 ? `1px solid ${systemColors.light['border-divider']}` : 'none', alignItems: 'flex-start', animation: 'rowHighlight 1.2s ease both' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: systemColors.light['content-primary'], lineHeight: '20px' }}>{col.name}</span>
                    <span style={{ fontSize: 11, fontWeight: 400, color: systemColors.light['content-secondary'], fontFamily: 'monospace', lineHeight: '20px' }}>{table.tableName.toLowerCase()}</span>
                    <span style={{ fontSize: 11, fontWeight: 400, color: systemColors.light['content-secondary'], fontFamily: 'monospace', lineHeight: '20px' }}>{col.dataType}</span>
                    <div
                      className="editable-cell"
                      contentEditable={allDone ? 'true' : 'false'}
                      suppressContentEditableWarning
                      style={{ fontSize: 13, fontWeight: fontWeight.light, color: systemColors.light['content-secondary'], lineHeight: '20px' }}
                    >{col.description}</div>
                    <div
                      className="editable-cell"
                      contentEditable={allDone ? 'true' : 'false'}
                      suppressContentEditableWarning
                      style={{ fontSize: 13, fontWeight: fontWeight.light, color: systemColors.light['content-secondary'], lineHeight: '20px', fontStyle: 'italic' }}
                    >{col.aiCtx}</div>
                  </div>
                ))}
                {addRowBtn('+ Add column')}
              </div>
            </div>
          );
        })
      }
      {/* Table-level shimmer placeholder — visible while the next table is about to appear */}
      {visibleTables.length < spec.tables.length && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.B, marginBottom: spacing.C }}>
            <div style={{ height: 14, width: 140, borderRadius: 4, background: `linear-gradient(90deg, ${systemColors.light['background-sunken']} 25%, ${systemColors.light['background-subtle']} 50%, ${systemColors.light['background-sunken']} 75%)`, backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
            <div style={{ height: 14, width: 40, borderRadius: 4, background: `linear-gradient(90deg, ${systemColors.light['background-sunken']} 25%, ${systemColors.light['background-subtle']} 50%, ${systemColors.light['background-sunken']} 75%)`, backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
          </div>
          {skeletonBlock(COL_GRID, ['120px', '80px', '50px', '60%', '55%'], 3)}
        </div>
      )}
      {allDone && visibleTables.length > 0 && (
        <button style={{ background: 'none', border: `1px dashed ${systemColors.light['border-divider']}`, borderRadius: spacing.B, cursor: 'pointer', padding: `${spacing.C}px`, fontSize: 13, color: systemColors.light['content-brand'], fontFamily: 'inherit', fontWeight: fontWeight.light, textAlign: 'left' as const }}>
          + Add table from connection
        </button>
      )}
    </div>
  );

  // ── Relationships content ─────────────────────────────────────────────────────
  const REL_GRID = '1fr 120px 1fr 120px 80px 90px';
  const relationshipsContent = (
    <div style={{ width: '100%' }}>
      {visibleRelationships.length === 0
        ? (!allDone
            ? skeletonBlock(REL_GRID, ['70%', '60px', '70%', '60px', '50px', '55px'], 2)
            : emptyState('No relationships found'))
        : (
          <div style={{ border: `1px solid ${systemColors.light['border-divider']}`, borderRadius: spacing.B, overflow: 'hidden', animation: 'slideUpIn 0.35s ease both' }}>
            {tabGridHeader(['From table', 'From key', 'To table', 'To key', 'Type', 'Cardinality'], REL_GRID)}
            {visibleRelationships.map((rel, ri) => {
              const jStyle = JOIN_TYPE_STYLE[rel.joinType];
              return (
                <div key={ri} style={{ display: 'grid', gridTemplateColumns: REL_GRID, padding: `${spacing.C}px ${spacing.C}px`, borderBottom: ri < visibleRelationships.length - 1 ? `1px solid ${systemColors.light['border-divider']}` : 'none', alignItems: 'center', animation: 'rowHighlight 1.2s ease both' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: systemColors.light['content-primary'] }}>{rel.leftTable}</span>
                  <span style={{ fontSize: 12, fontFamily: 'monospace', color: systemColors.light['content-secondary'] }}>{rel.leftKey}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: systemColors.light['content-primary'] }}>{rel.rightTable}</span>
                  <span style={{ fontSize: 12, fontFamily: 'monospace', color: systemColors.light['content-secondary'] }}>{rel.rightKey}</span>
                  <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, background: jStyle.bg, color: jStyle.color, borderRadius: 4, padding: `2px 6px` }}>{rel.joinType}</span>
                  <span style={{ fontSize: 12, color: systemColors.light['content-secondary'], fontWeight: fontWeight.light }}>{rel.cardinality}</span>
                </div>
              );
            })}
            {/* Trailing shimmer — loading next relationship */}
            {visibleRelationships.length < spec.relationships.length && trailingShimmerRow(REL_GRID, ['70%', '60px', '70%', '60px', '50px', '55px'])}
            {addRowBtn('+ Add relationship')}
          </div>
        )
      }
    </div>
  );

  // ── Metrics & Formulas content ────────────────────────────────────────────────
  const FORMULA_GRID = '140px 1fr 100px 1fr';
  const formulasContent = (
    <div style={{ width: '100%' }}>
      {visibleFormulas.length === 0
        ? (!allDone
            ? skeletonBlock(FORMULA_GRID, ['100px', '75%', '60px', '60%'], 2)
            : emptyState('No formulas found'))
        : (
          <div style={{ border: `1px solid ${systemColors.light['border-divider']}`, borderRadius: spacing.B, overflow: 'hidden', animation: 'slideUpIn 0.35s ease both' }}>
            {tabGridHeader(['Name', 'Expression', 'Output type', 'Description'], FORMULA_GRID)}
            {visibleFormulas.map((f, fi) => (
              <div key={f.name} style={{ display: 'grid', gridTemplateColumns: FORMULA_GRID, padding: `${spacing.C}px ${spacing.C}px`, borderBottom: fi < visibleFormulas.length - 1 ? `1px solid ${systemColors.light['border-divider']}` : 'none', alignItems: 'flex-start', animation: 'rowHighlight 1.2s ease both', gap: spacing.C }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: systemColors.light['content-primary'], lineHeight: '20px' }}>{f.name}</div>
                  <div style={{ fontSize: 11, fontWeight: fontWeight.light, color: systemColors.light['content-secondary'], marginTop: 2 }}>{f.baseTable}</div>
                </div>
                <div style={{ background: systemColors.light['background-sunken'], borderRadius: 4, padding: `${spacing.A}px ${spacing.B}px` }}>
                  <FormulaText expr={f.expression} />
                </div>
                <div><TypeChip type={f.outputType} /></div>
                <div
                  className="editable-cell"
                  contentEditable={allDone ? 'true' : 'false'}
                  suppressContentEditableWarning
                  style={{ fontSize: 13, fontWeight: fontWeight.light, color: systemColors.light['content-secondary'], lineHeight: '20px' }}
                >{f.description}</div>
              </div>
            ))}
            {/* Trailing shimmer — loading next formula */}
            {visibleFormulas.length < spec.formulas.length && trailingShimmerRow(FORMULA_GRID, ['100px', '75%', '60px', '60%'])}
            {addRowBtn('+ Add formula')}
          </div>
        )
      }
    </div>
  );

  // ── Sample questions content ───────────────────────────────────────────────────
  const questionsContent = (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: spacing.C }}>
      {visibleQuestions.length === 0
        ? (!allDone
            ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.C }}>
                {[1, 2].map(i => (
                  <div key={i} style={{ border: `1px solid ${systemColors.light['border-divider']}`, borderRadius: spacing.B, padding: `${spacing.C}px ${spacing.D}px` }}>
                    <div style={{ height: 14, width: '65%', borderRadius: 4, marginBottom: spacing.B, background: `linear-gradient(90deg, ${systemColors.light['background-sunken']} 25%, ${systemColors.light['background-subtle']} 50%, ${systemColors.light['background-sunken']} 75%)`, backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
                    <div style={{ display: 'flex', gap: spacing.A }}>
                      {[50, 70, 55].map((w, j) => (
                        <div key={j} style={{ height: 18, width: w, borderRadius: 4, background: `linear-gradient(90deg, ${systemColors.light['background-sunken']} 25%, ${systemColors.light['background-subtle']} 50%, ${systemColors.light['background-sunken']} 75%)`, backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )
            : emptyState('No sample questions found'))
        : (
          <>
            {visibleQuestions.map((q, qi) => {
              const s = QUESTION_STATUS_STYLE[q.status];
              return (
                <div key={qi} style={{ border: `1px solid ${systemColors.light['border-divider']}`, borderRadius: spacing.B, padding: `${spacing.C}px ${spacing.D}px`, animation: 'rowHighlight 1.2s ease both' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: spacing.C, marginBottom: spacing.B }}>
                    <div
                      className="editable-cell"
                      contentEditable={allDone ? 'true' : 'false'}
                      suppressContentEditableWarning
                      style={{ fontSize: 14, fontWeight: 500, color: systemColors.light['content-primary'], lineHeight: '20px', flex: 1 }}
                    >{q.question}</div>
                    <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 500, background: s.bg, color: s.color, borderRadius: 4, padding: `2px 8px`, flexShrink: 0 }}>{s.label}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: spacing.A }}>
                    {q.tablesUsed.map(t => (
                      <span key={t} style={{ fontSize: 11, background: '#EEF3FD', color: systemColors.light['content-brand'], borderRadius: 4, padding: `1px 6px`, fontWeight: 400 }}>{t}</span>
                    ))}
                    {q.keyColumns.map(c => (
                      <span key={c} style={{ fontSize: 11, fontFamily: 'monospace', background: systemColors.light['background-sunken'], color: systemColors.light['content-secondary'], borderRadius: 4, padding: `1px 6px` }}>{c}</span>
                    ))}
                  </div>
                </div>
              );
            })}
            {/* Trailing shimmer question card — while next question is loading */}
            {visibleQuestions.length < spec.questions.length && (
              <div style={{ border: `1px solid ${systemColors.light['border-divider']}`, borderRadius: spacing.B, padding: `${spacing.C}px ${spacing.D}px` }}>
                <div style={{ height: 14, width: '60%', borderRadius: 4, marginBottom: spacing.B, background: `linear-gradient(90deg, ${systemColors.light['background-sunken']} 25%, ${systemColors.light['background-subtle']} 50%, ${systemColors.light['background-sunken']} 75%)`, backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
                <div style={{ display: 'flex', gap: spacing.A }}>
                  {[55, 70, 50].map((w, j) => (
                    <div key={j} style={{ height: 18, width: w, borderRadius: 4, background: `linear-gradient(90deg, ${systemColors.light['background-sunken']} 25%, ${systemColors.light['background-subtle']} 50%, ${systemColors.light['background-sunken']} 75%)`, backgroundSize: '200% 100%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
                  ))}
                </div>
              </div>
            )}
            {allDone && (
              <button style={{ background: 'none', border: `1px dashed ${systemColors.light['border-divider']}`, borderRadius: spacing.B, cursor: 'pointer', padding: `${spacing.C}px ${spacing.D}px`, fontSize: 13, color: systemColors.light['content-brand'], fontFamily: 'inherit', fontWeight: fontWeight.light, textAlign: 'left' as const }}>
                + Add question
              </button>
            )}
          </>
        )
      }
    </div>
  );

  const tabContentMap: Record<ActiveTab, React.ReactNode> = {
    tables:        tablesContent,
    relationships: relationshipsContent,
    formulas:      formulasContent,
    questions:     questionsContent,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', overflow: 'hidden', fontFamily: fontFamily.primary, color: systemColors.light['content-primary'], background: systemColors.light['background-base'] }}>

      {/* Keyframes needed by BuildingScreen (not inherited from the main component's <style> block
          because BuildingScreen renders as an early return, bypassing that block entirely) */}
      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.75); }
        }
        @keyframes slideUpIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rowHighlight {
          0%   { opacity: 0; background-color: rgba(39,112,239,0.06); transform: translateY(8px); }
          30%  { opacity: 1; background-color: rgba(39,112,239,0.06); transform: translateY(0); }
          100% { background-color: transparent; }
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes tabPulse {
          0%   { background-color: transparent; }
          30%  { background-color: rgba(39,112,239,0.08); }
          100% { background-color: transparent; }
        }
        @property --gradient-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes rotate-border {
          to { --gradient-angle: 360deg; }
        }
        .editable-cell[contenteditable="true"] {
          cursor: text;
          border-radius: 3px;
          padding: 2px 4px;
          margin: -2px -4px;
          transition: box-shadow 0.15s;
        }
        .editable-cell[contenteditable="true"]:hover {
          box-shadow: inset 0 0 0 1px var(--rd-sys-color-border-default);
        }
        .editable-cell[contenteditable="true"]:focus {
          outline: none;
          box-shadow: inset 0 0 0 2px var(--rd-sys-color-content-brand);
        }
      `}</style>

      {/* ── Header 1: Data model editor ── */}
      <div style={{ height: 60, flexShrink: 0, display: 'flex', alignItems: 'center', padding: `0 ${spacing.E}px`, borderBottom: `1px solid ${systemColors.light['border-divider']}`, backgroundColor: systemColors.light['background-base'] }}>
        <span style={{ fontSize: 20, fontWeight: 500, color: systemColors.light['content-primary'] }}>Data model editor</span>
      </div>

      {/* ── Header 2: direction title ── */}
      <div style={{ height: 60, flexShrink: 0, display: 'flex', alignItems: 'center', padding: `0 ${spacing.E}px`, gap: spacing.C, borderBottom: `1px solid ${systemColors.light['border-divider']}`, backgroundColor: systemColors.light['background-base'] }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: spacing.A }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: systemColors.light['content-primary'], lineHeight: '24px', letterSpacing: '-0.072px' }}>{direction.title}</span>
          <span style={{ fontSize: 12, fontWeight: 400, color: systemColors.light['content-secondary'], lineHeight: '18px' }}>{direction.description.slice(0, 70)}{direction.description.length > 70 ? '…' : ''}</span>
        </div>
      </div>

      {/* ── Main: canvas (left) + SpotterModel panel (right) ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* ── Left canvas ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: systemColors.light['background-base'] }}>

          {/* Tab bar — labels include live counts; pulse highlight when new items arrive */}
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, borderBottom: `1px solid ${systemColors.light['border-divider']}`, padding: `0 ${spacing.F}px`, backgroundColor: systemColors.light['background-base'] }}>
            {(() => {
              const tabCounts: Record<ActiveTab, number> = {
                tables:        visibleTables.length,
                relationships: visibleRelationships.length,
                formulas:      visibleFormulas.length,
                questions:     visibleQuestions.length,
              };
              return TABS.map(tab => {
                const isActive  = activeTab === tab.id;
                const isPulsing = pulsedTabs.has(tab.id);
                const count     = tabCounts[tab.id];
                return (
                  <div
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: `14px ${spacing.D}px 12px`,
                      fontSize: 13,
                      fontWeight: isActive ? 500 : fontWeight.light,
                      color: isActive ? systemColors.light['content-brand'] : systemColors.light['content-secondary'],
                      borderBottom: isActive ? `2px solid ${systemColors.light['content-brand']}` : '2px solid transparent',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap' as const,
                      marginBottom: -1,
                      userSelect: 'none' as const,
                      transition: 'color 0.15s',
                      borderRadius: isPulsing ? '4px 4px 0 0' : undefined,
                      animation: isPulsing ? 'tabPulse 0.6s ease both' : undefined,
                    }}
                  >
                    {tab.baseLabel}
                    {count > 0 && (
                      <span style={{ marginLeft: spacing.A, fontSize: 11, fontWeight: 500, color: isActive ? systemColors.light['content-brand'] : systemColors.light['content-tertiary'] }}>
                        · {count}
                      </span>
                    )}
                  </div>
                );
              });
            })()}
          </div>

          {/* Tab content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: `${spacing.F}px` }}>
            {tabContentMap[activeTab]}
          </div>
        </div>

        {/* ── SpotterModel right panel — AgentPanel from DME ── */}
        {/* Plan overview + reasoning are pushed as MessageItems via window._* APIs */}
        <AgentPanel welcomeVariant="blank" />

      </div>
    </div>
  );
}


// ─── Clarifying questions data ────────────────────────────────────────────────

const CLARIFYING_QUESTIONS: ClarifyQuestion[] = [
  {
    question: "What's the main business outcome this model should support?",
    options: [
      { label: 'Track and analyse sales performance' },
      { label: 'Monitor customer retention and churn' },
      { label: 'Understand product engagement' },
      { label: 'Operational reporting' },
    ],
  },
  {
    question: 'Who are the primary consumers of this model?',
    options: [
      { label: 'Sales and revenue teams' },
      { label: 'Customer success managers' },
      { label: 'Product and data teams' },
      { label: 'Executive stakeholders' },
    ],
  },
  {
    question: 'How should time be handled in this model?',
    options: [
      { label: 'Year-over-year and quarterly comparisons' },
      { label: 'Rolling 30/60/90-day windows' },
      { label: 'Month-to-date and quarter-to-date' },
      { label: 'Point-in-time snapshots' },
    ],
  },
];

// ─── Chat message types ────────────────────────────────────────────────────────

type ChatMsg =
  | { kind: 'user';       id: string; text: string }
  | { kind: 'reasoning';  id: string; data: ReasoningData; responseText?: string }
  | { kind: 'directions'; id: string };

type ChatPhase =
  | 'reasoning_initial'  // first reasoning block; bottom = locked input
  | 'clarifying'         // ClarifyingCard occupies bottom slot
  | 'reasoning_post'     // second reasoning block; bottom = locked input
  | 'directions'         // direction cards in stream; bottom slot empty
  | 'idle';              // chat on screen; prompt bar at bottom for follow-up

// ─── Agent avatar row (small, used in chat stream) ────────────────────────────
// alignItems: flex-start keeps the avatar pinned to the top when the reasoning
// box is expanded. paddingTop: spacing.A on the content wrapper offsets the
// ReasoningBlock header down by 4 px so that:
//   avatar center   = 32/2        = 16 px from row top
//   header text ctr = 4 + 4 + ~7  = 15 px from row top  (wrapper pad + header pad + half line-height)
// → within 1 px — visually aligned.

function AgentRow({ children }: { children: React.ReactNode }) {
  return (
    // paddingLeft: spacing.C aligns the agent avatar with the user avatar, which
    // sits at spacing.C (12 px) inside its grey card's padding.
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing.C, paddingLeft: spacing.C }}>
      <img
        src="/spotter-assets/SpotterModel avatar.svg"
        width={32} height={32} alt="SpotterModel"
        style={{ flexShrink: 0 }}
      />
      <div style={{ flex: 1, minWidth: 0, paddingTop: spacing.A }}>{children}</div>
    </div>
  );
}

// Left indent for response text sitting below an AgentRow:
//   row_indent + avatar_width + gap + ReasoningBlock header left padding
//   = spacing.C  +    32      + spacing.C +       spacing.A
//   = 12 + 32 + 12 + 4 = 60 px
const AGENT_TEXT_INDENT = spacing.C + 32 + spacing.C + spacing.A; // 60 px

// ─── User message row ─────────────────────────────────────────────────────────
// Avatar + text inside the sunken card, with spacing.C (12 px) padding all around.
// AgentRow matches this left padding so both avatars share the same x-position.

function UserMsgRow({ text }: { text: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: spacing.C,
      backgroundColor: systemColors.light['background-sunken'],
      borderRadius: spacing.C,
      padding: spacing.C,
    }}>
      <img
        src="/spotter-assets/User avatar.png"
        width={32} height={32} alt="User"
        style={{ borderRadius: '50%', flexShrink: 0 }}
      />
      <div style={{
        flex: 1,
        fontSize: fontSize.sm,
        fontWeight: fontWeight.light,
        lineHeight: '22px',
        color: systemColors.light['content-primary'],
        whiteSpace: 'pre-line',
        paddingTop: spacing.A,
      }}>
        {text}
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export interface ModelOnboardingScreenProps {
  connection: DataConnection;
  onBuild: () => void;
  onSkip: () => void;
  /** Re-opens the connection selection screen so the user can switch connections. */
  onChangeConnection?: () => void;
}

export const ModelOnboardingScreen: React.FC<ModelOnboardingScreenProps> = ({
  connection,
  onBuild,
  onSkip,
  onChangeConnection,
}) => {
  const connectionName = connection.name;
  const [showConnDetails, setShowConnDetails] = useState(false);

  // ── Screen state machine ──────────────────────────────────────────────────
  type ScreenState = 'prompt' | 'chat' | 'building';
  const [screenState,       setScreenState]       = useState<ScreenState>('prompt');
  const [_selectedDirection, _setSelectedDirection] = useState<Direction | null>(null);
  const [currentPromptText, setCurrentPromptText] = useState('');
  const [lastPrompt,        setLastPrompt]         = useState('');

  // ── Chat state ────────────────────────────────────────────────────────────
  // Start idle — effect fires only when handleBuild/handleFollowUp
  // explicitly transitions into 'reasoning_initial'.
  const [chatPhase,      setChatPhase]      = useState<ChatPhase>('idle');
  const [clarifyStep,    setClarifyStep]    = useState(0);
  const [clarifyAnswers, setClarifyAnswers] = useState<Array<{ selections: string[]; freeText?: string }>>([]);
  const [chatMessages,   setChatMessages]   = useState<ChatMsg[]>([]);
  const [directions,   setDirections]   = useState<Direction[]>(MOCK_DIRECTIONS);
  const [selectedId,   setSelectedId]   = useState<string | null>(null);
  const [canvasDirection, setCanvasDirection] = useState<Direction | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const reasoningMsgId = useRef<string>('');

  const sweepKey = usePeriodicSweep(4000);
  const SUBTITLE = "I'll build an AI-ready model for you in minutes";

  // Auto-scroll when a new message is appended
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [chatMessages.length]);

  // When a direction is selected/deselected the bottom slot height changes.
  // useLayoutEffect fires synchronously after DOM mutation but BEFORE paint,
  // so the scroll anchors before the user ever sees the layout shift.
  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
  }, [selectedId]);

  // Also scroll when the last reasoning message gains a responseText — this is
  // an in-place update (no length change) so the above effect won't fire.
  const reasoningMsgs = chatMessages
    .filter((m): m is Extract<ChatMsg, { kind: 'reasoning' }> => m.kind === 'reasoning');
  const lastReasoningResponseText =
    reasoningMsgs.length > 0 ? reasoningMsgs[reasoningMsgs.length - 1].responseText : undefined;
  useEffect(() => {
    if (lastReasoningResponseText) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastReasoningResponseText]);

  // ── Reasoning helpers ─────────────────────────────────────────────────────

  const updateReasoningMsg = useCallback(
    (id: string, patch: Partial<Omit<Extract<ChatMsg, { kind: 'reasoning' }>, 'kind' | 'id'>>) => {
      setChatMessages(prev => prev.map(m =>
        m.id === id && m.kind === 'reasoning' ? { ...m, ...patch } : m
      ));
    }, []);

  // Kick off the initial reasoning sequence once we enter 'reasoning_initial'
  useEffect(() => {
    if (chatPhase !== 'reasoning_initial') return;

    const msgId = `r-initial-${Date.now()}`;
    reasoningMsgId.current = msgId;

    const inProgress: ReasoningData = {
      header: 'Reasoning', isDone: false,
      inlineText: 'Analysing your prompt…',
      steps: [],
    };
    setChatMessages(prev => [...prev, { kind: 'reasoning', id: msgId, data: inProgress }]);

    const t1 = setTimeout(() => updateReasoningMsg(msgId, {
      data: { ...inProgress, inlineText: 'Mapping business context and schema…' },
    }), 900);

    const t2 = setTimeout(() => updateReasoningMsg(msgId, {
      data: { ...inProgress, inlineText: 'Identifying what I need to know…' },
    }), 1800);

    // t3: mark reasoning done + show response text
    const t3 = setTimeout(() => {
      updateReasoningMsg(msgId, {
        data: {
          header: 'Done', isDone: true, inlineText: '',
          steps: [
            { n: 1, name: 'Parsed prompt',      text: 'Extracted business context and key entities.',          dotState: 'done' },
            { n: 2, name: 'Checked schema',     text: 'Scanned connection for candidate tables.',              dotState: 'done' },
            { n: 3, name: 'Prepared questions', text: 'Identified 3 clarifying questions to refine scope.',   dotState: 'done' },
          ],
        },
        responseText: "Got it — before I start building, I have a few quick questions.",
      });
    }, 2600);

    // t4: show clarifying card ~350 ms after the response text, so the user
    // has a moment to read it before the card slides in from the bottom.
    const t4 = setTimeout(() => setChatPhase('clarifying'), 2950);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatPhase]);

  // Kick off the post-clarify reasoning sequence
  useEffect(() => {
    if (chatPhase !== 'reasoning_post') return;

    const msgId = `r-post-${Date.now()}`;
    reasoningMsgId.current = msgId;

    const inProgress: ReasoningData = {
      header: 'Reasoning', isDone: false,
      inlineText: 'Mapping your answers to available tables…',
      steps: [],
    };
    setChatMessages(prev => [...prev, { kind: 'reasoning', id: msgId, data: inProgress }]);

    const t1 = setTimeout(() => updateReasoningMsg(msgId, {
      data: { ...inProgress, inlineText: 'Identifying tables and joins…' },
    }), 800);

    const t2 = setTimeout(() => updateReasoningMsg(msgId, {
      data: { ...inProgress, inlineText: 'Preparing 2 directions…' },
    }), 1600);

    const t3 = setTimeout(() => {
      updateReasoningMsg(msgId, {
        data: {
          header: 'Done', isDone: true, inlineText: '',
          steps: [
            { n: 1, name: 'Mapped context',       text: 'Matched goals and audience to schema entities.',  dotState: 'done' },
            { n: 2, name: 'Selected tables',      text: 'Found 4 candidate tables across 2 directions.',  dotState: 'done' },
            { n: 3, name: 'Prepared directions',  text: 'Generated 2 annotated model directions.',        dotState: 'done' },
          ],
        },
      });
      setChatMessages(prev => [...prev, { kind: 'directions', id: `dir-${Date.now()}` }]);
      setChatPhase('directions');
    }, 2400);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatPhase]);

  // ── Action handlers ───────────────────────────────────────────────────────

  const handleBuild = () => {
    if (!currentPromptText.trim()) return;
    const text = currentPromptText.trim();
    setLastPrompt(text);
    setChatMessages([{ kind: 'user', id: `u-${Date.now()}`, text }]);
    setChatPhase('reasoning_initial');
    setClarifyStep(0);
    setClarifyAnswers([]);
    setSelectedId(null);
    setDirections(MOCK_DIRECTIONS);
    setCurrentPromptText(''); // clear draft after send
    setScreenState('chat');
  };

  const handleClarifyNext = (selections: string[], freeText?: string) => {
    const newAnswers = [...clarifyAnswers, { selections, freeText }];
    setClarifyAnswers(newAnswers);

    if (clarifyStep < CLARIFYING_QUESTIONS.length - 1) {
      // Advance card in-place — no bubble yet
      setClarifyStep(s => s + 1);
    } else {
      // All questions answered — format combined Q: A: bubble
      const summary = newAnswers.map((ans, i) => {
        const q = CLARIFYING_QUESTIONS[i].question;
        const a = [...ans.selections, ...(ans.freeText ? [ans.freeText] : [])].join(', ');
        return `Q: ${q}\nA: ${a}`;
      }).join('\n\n');

      setChatMessages(prev => [
        ...prev,
        { kind: 'user', id: `u-${Date.now()}`, text: summary },
      ]);
      setChatPhase('reasoning_post');
    }
  };

  const handleClarifyCancel = () => {
    // Stay on chat screen; show prompt bar for follow-up
    setChatPhase('idle');
  };

  const handleFollowUp = () => {
    if (!currentPromptText.trim()) return;
    const text = currentPromptText.trim();
    setChatMessages(prev => [...prev, { kind: 'user', id: `u-${Date.now()}`, text }]);
    setClarifyAnswers([]);
    setClarifyStep(0);
    setSelectedId(null);
    setCurrentPromptText(''); // clear draft after send
    setChatPhase('reasoning_initial');
  };

  // ── Early return for BuildingScreen ──────────────────────────────────────
  // BuildingScreen removed: population now happens directly in the DME via auto-populate.
  // The 'building' screen state is no longer used.

  const selectedDirection_ = directions.find(d => d.id === selectedId) ?? null;

  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column',
        background: systemColors.light['background-base'],
        width: '100%', height: '100vh', overflow: 'hidden',
        fontFamily: fontFamily.primary, color: systemColors.light['content-primary'],
      }}
    >
      {/* Keyframes */}
      <style>{`
        @property --gradient-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes rotate-border { to { --gradient-angle: 360deg; } }
        @keyframes gradientSweepStatic {
          0%   { background-position: 100% 0; }
          55%  { background-position: 50% 0; }
          100% { background-position: 0% 0; }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.75); }
        }
        @keyframes slideUpIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideInFromRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }
        textarea::placeholder { color: ${systemColors.light['content-secondary']}; }
        /* Direction card doc typography */
        [contenteditable] h2 {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: var(--rd-sys-color-content-secondary);
          margin: 20px 0 6px;
          padding: 0;
        }
        [contenteditable] h2:first-child {
          margin-top: 0;
        }
        [contenteditable] p {
          margin: 0 0 4px;
          font-size: 13px;
          line-height: 20px;
          color: var(--rd-sys-color-content-primary);
        }
        [contenteditable] ul {
          margin: 0 0 4px;
          padding-left: 18px;
        }
        [contenteditable] li {
          font-size: 13px;
          line-height: 20px;
          color: var(--rd-sys-color-content-primary);
          margin-bottom: 2px;
        }
        [contenteditable] strong {
          font-weight: 600;
          color: var(--rd-sys-color-content-primary);
        }
      `}</style>

      {/* ── Top header ── */}
      <div style={{
        height: 60, flexShrink: 0,
        display: 'flex', alignItems: 'center',
        padding: `0 ${spacing.E}px`,
        borderBottom: `1px solid ${systemColors.light['border-divider']}`,
        backgroundColor: systemColors.light['background-base'],
        gap: spacing.B,
      }}>
        <span style={{ fontSize: 20, fontWeight: 500, color: systemColors.light['content-primary'], whiteSpace: 'nowrap', flexShrink: 0 }}>
          Data model editor
        </span>
      </div>

      {/* ── Sub-header ── */}
      <div style={{
        height: 60, flexShrink: 0,
        display: 'flex', alignItems: 'center',
        padding: `0 ${spacing.E}px`, gap: spacing.C,
        borderBottom: `1px solid ${systemColors.light['border-divider']}`,
        backgroundColor: systemColors.light['background-base'],
      }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: spacing.A }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: systemColors.light['content-primary'], lineHeight: '24px', letterSpacing: '-0.072px' }}>
            Add model name
          </span>
          <span style={{ fontSize: 12, fontWeight: 400, color: systemColors.light['content-primary'], lineHeight: '18px', letterSpacing: '-0.072px' }}>
            Add description
          </span>
        </div>
      </div>

      {/* ── Prompt screen ── */}
      {screenState === 'prompt' && (
        <>
          <main style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflowY: 'auto',
            padding: `${spacing.H}px ${spacing.F}px`,
          }}>
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              width: '100%', maxWidth: 791,
              animation: 'slideUpIn 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: spacing.F }}>
                {/* Hero */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: spacing.C }}>
                  <AgentAvatar />
                  <h2 style={{
                    fontSize: 32, lineHeight: '40px', fontWeight: 600,
                    letterSpacing: '-0.128px', color: systemColors.light['content-primary'],
                    textAlign: 'center', margin: 0,
                  }}>
                    Hi! I&apos;m <GradText>SpotterModel</GradText>
                  </h2>
                  <div style={{ display: 'flex', justifyContent: 'center', minHeight: 24 }}>
                    <p key={sweepKey} style={{
                      fontSize: 18, lineHeight: '24px', fontWeight: 600,
                      margin: 0, color: systemColors.light['content-primary'],
                      background: `linear-gradient(90deg, currentColor 0 20%, ${systemColors.light['content-accent-purple']} 35%, ${DME_CYAN} 52%, ${systemColors.light['content-brand']} 65%, currentColor 80% 100%)`,
                      backgroundSize: '300% 100%', backgroundPosition: '100% 0',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text', WebkitBoxDecorationBreak: 'clone',
                      animation: 'gradientSweepStatic 1.4s ease-in-out forwards',
                    }}>
                      {SUBTITLE}
                    </p>
                  </div>
                </div>
                {/* Prompt bar + hint */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 760, gap: spacing.C }}>
                  <PromptBar
                    onTextChange={setCurrentPromptText}
                    onSubmit={handleBuild}
                    connectionName={connectionName}
                    onConnectionClick={() => onChangeConnection?.()}
                    onShowConnectionDetails={() => setShowConnDetails(true)}
                    initialText={lastPrompt || undefined}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing.B }}>
                    <SparkleIcon />
                    <span style={{ fontSize: 14, lineHeight: '20px', fontWeight: fontWeight.light, color: systemColors.light['content-secondary'] }}>
                      Type <span style={{ color: systemColors.light['content-primary'] }}>@</span> to reference specific tables
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p style={{
              position: 'absolute', bottom: spacing.B, fontSize: 14,
              lineHeight: '20px', fontWeight: fontWeight.light,
              color: systemColors.light['content-secondary'], textAlign: 'center',
            }}>
              SpotterModel responses should be reviewed.{' '}
              <Link href="#">Learn more</Link>
            </p>
          </main>

          {/* Footer — only on prompt screen */}
          <footer style={{
            height: 72, flexShrink: 0, /* no exact spacing token */
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: `0 ${spacing.F}px`,
            backgroundColor: systemColors.light['background-sunken'],
            borderTop: `6px solid ${systemColors.light['content-brand']}`,
          }}>
            <Button variant="secondary" onClick={onSkip}>
              I'll build it manually
            </Button>
            <Button variant="primary" onClick={onBuild}>
              Exit data model
            </Button>
          </footer>
        </>
      )}

      {/* ── Chat screen ── */}
      {screenState === 'chat' && (
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Chat column */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
            {/* Scrollable messages area */}
            <div style={{
              flex: 1, overflowY: 'auto',
              padding: `${spacing.F}px`,
              paddingBottom: spacing.J,
            }}>
              <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: spacing.D }}>
                {chatMessages.map(msg => {
                  if (msg.kind === 'user') {
                    return <UserMsgRow key={msg.id} text={msg.text} />;
                  }

                  if (msg.kind === 'reasoning') {
                    return (
                      <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', gap: spacing.B }}>
                        <AgentRow>
                          <ReasoningBlock data={msg.data} />
                        </AgentRow>
                        {msg.responseText && msg.data.isDone && (
                          <div style={{
                            paddingLeft: AGENT_TEXT_INDENT,
                            fontSize: fontSize.sm, fontWeight: fontWeight.light,
                            lineHeight: '22px', color: systemColors.light['content-primary'],
                            animation: 'fadeIn 0.3s ease both',
                          }}>
                            {msg.responseText}
                          </div>
                        )}
                      </div>
                    );
                  }

                  if (msg.kind === 'directions') {
                    return (
                      <div key={msg.id} style={{
                        display: 'flex', flexDirection: 'column', gap: spacing.D,
                        animation: 'slideUpIn 0.35s cubic-bezier(0.4,0,0.2,1) both',
                      }}>
                        {/* SpotterModel intro text */}
                        <div style={{ paddingLeft: AGENT_TEXT_INDENT }}>
                          <p style={{ margin: 0, fontSize: fontSize.sm, fontWeight: fontWeight.light, lineHeight: '22px', color: systemColors.light['content-primary'] }}>
                            Based on your goals, I've put together two directions. Each one is a full requirements doc — open it to review what I've drafted and edit anything you'd like to change. When you're ready, select one and proceed.
                          </p>
                        </div>
                        {/* Direction cards side-by-side */}
                        <div style={{ display: 'flex', gap: spacing.D, alignItems: 'stretch' }}>
                          {directions.map((d, i) => (
                            <DirectionCard
                              key={d.id}
                              direction={d}
                              index={i}
                              isSelected={selectedId === d.id}
                              onSelect={() => setSelectedId(id => id === d.id ? null : d.id)}
                              onOpenCanvas={() => setCanvasDirection(d)}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return null;
                })}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Bottom slot — Proceed CTA (when direction selected) or ClarifyingCard / PromptBar */}
            <div style={{
              flexShrink: 0,
              backgroundColor: systemColors.light['background-base'],
              minHeight: 162, // matches PromptBar slot height — prevents downward shift when CTA replaces it
            }}>
              {selectedId ? (
                /* ── Proceed CTA — Radiant Button large, right-aligned ── */
                <div style={{ padding: `${spacing.D}px ${spacing.F}px` }}>
                  <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', justifyContent: 'center', animation: 'slideUpIn 0.2s ease both' }}>
                    <Button
                      variant="primary"
                      size="large"
                      onClick={() => {
                        if (!selectedDirection_) return;
                        const spec  = MODEL_SPEC[selectedDirection_.id]  ?? MODEL_SPEC['d1'];
                        const dPlan = DME_BUILD_PLAN[selectedDirection_.id] ?? DME_BUILD_PLAN['d1'];
                        (window as any).__DME_AUTO_DATA__ = {
                          goal:          selectedDirection_.goal,
                          phases:        dPlan,
                          tables:        spec.tables,
                          relationships: spec.relationships,
                          formulas:      spec.formulas,
                        };
                        (window as any).__DME_CONFIG__ = {
                          spotterModel:   true,
                          welcomeVariant: 'blank',
                          autoPopulate:   true,
                        };
                        onBuild();
                      }}
                    >
                      Proceed in this direction →
                    </Button>
                  </div>
                </div>
              ) : (
                <div style={{ padding: `${spacing.D}px ${spacing.F}px` }}>
                  <div style={{ maxWidth: 760, margin: '0 auto' }}>
                    {chatPhase === 'clarifying' ? (
                      <ClarifyingCard
                        questions={CLARIFYING_QUESTIONS}
                        currentStep={clarifyStep}
                        onNext={handleClarifyNext}
                        onCancel={handleClarifyCancel}
                      />
                    ) : (
                      /* PromptBar is always visible. Only the send button is disabled
                         while SpotterModel is reasoning — the user can still type. */
                      <PromptBar
                        onTextChange={setCurrentPromptText}
                        onSubmit={handleFollowUp}
                        submitDisabled={chatPhase === 'reasoning_initial' || chatPhase === 'reasoning_post'}
                        initialText={currentPromptText || undefined}
                        connectionName={connectionName}
                        onConnectionClick={() => onChangeConnection?.()}
                        onShowConnectionDetails={() => setShowConnDetails(true)}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer — chat state (same as prompt screen footer) */}
            <footer style={{
              height: 72, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: `0 ${spacing.F}px`,
              backgroundColor: systemColors.light['background-sunken'],
              borderTop: `6px solid ${systemColors.light['content-brand']}`,
            }}>
              <Button variant="secondary" onClick={onSkip}>
                I'll build it manually
              </Button>
              <Button variant="primary" onClick={onBuild}>
                Exit data model
              </Button>
            </footer>
          </div>

          {/* Requirements canvas — slides in when a direction doc is opened */}
          {canvasDirection && (
            <RequirementsCanvas
              direction={canvasDirection}
              onClose={() => setCanvasDirection(null)}
              onUpdate={updated => {
                setDirections(ds => ds.map(x => x.id === updated.id ? updated : x));
                setCanvasDirection(updated);
              }}
            />
          )}
        </div>
      )}

      {/* ── Connection details overlay ── */}
      {showConnDetails && (
        <div
          style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(29,35,47,0.80)', zIndex: 100 }}
          onClick={e => { if (e.target === e.currentTarget) setShowConnDetails(false); }}
        >
          <div style={{ width: 480, background: systemColors.light['background-base'], borderRadius: 6, boxShadow: '0 24px 32px rgba(29,35,47,0.16)', display: 'flex', flexDirection: 'column', fontFamily: fontFamily.primary }}>
            <div style={{ padding: `${spacing.F}px 28px ${spacing.D}px`, borderBottom: `1px solid ${systemColors.light['border-divider']}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: systemColors.light['content-primary'], margin: 0, letterSpacing: '-0.072px' }}>{connection.name}</h3>
                <span style={{ fontSize: 13, color: systemColors.light['content-secondary'] }}>Modified: {connection.modified}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.D }}>
                <span style={{ fontSize: 12, color: systemColors.light['content-secondary'] }}>Source: <strong style={{ fontWeight: 500 }}>{connection.source}</strong></span>
                <span style={{ fontSize: 12, color: systemColors.light['content-secondary'] }}>Created: {connection.created}</span>
              </div>
            </div>
            <div style={{ padding: `${spacing.D}px 28px ${spacing.F}px`, display: 'flex', flexDirection: 'column', gap: spacing.D }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: systemColors.light['content-primary'], margin: `0 0 6px` }}>Description</p>
                <p style={{ fontSize: 14, lineHeight: '20px', color: systemColors.light['content-primary'], fontWeight: fontWeight.light, margin: 0 }}>{connection.desc}</p>
              </div>
              <div style={{ height: 1, background: systemColors.light['border-divider'] }} />
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: systemColors.light['content-primary'], margin: `0 0 ${spacing.B}px` }}>Tags</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.B }}>
                  {connection.tags.map(tag => (
                    <span key={tag} style={{ fontSize: 13, color: systemColors.light['content-secondary'], background: systemColors.light['background-sunken'], padding: '3px 10px', borderRadius: spacing.A }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div style={{ height: 1, background: systemColors.light['border-divider'] }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: systemColors.light['content-primary'], margin: `0 0 ${spacing.A}px` }}>Tables</p>
                  <p style={{ fontSize: 14, color: systemColors.light['content-primary'], margin: 0 }}>{connection.tables} tables</p>
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: systemColors.light['content-primary'], margin: `0 0 ${spacing.A}px` }}>Author</p>
                  <p style={{ fontSize: 14, color: systemColors.light['content-secondary'], margin: 0 }}>{connection.author}</p>
                </div>
              </div>
            </div>
            <div style={{ padding: `0 28px`, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', borderTop: `1px solid ${systemColors.light['border-divider']}`, background: systemColors.light['background-sunken'], borderRadius: '0 0 6px 6px' }}>
              <Button variant="primary" onClick={() => setShowConnDetails(false)}>Done</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelOnboardingScreen;
