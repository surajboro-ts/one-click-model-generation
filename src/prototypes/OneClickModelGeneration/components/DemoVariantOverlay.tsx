import React, { useEffect, useRef, useState } from 'react';
import { fontFamily } from '@tokens/typography';
import { systemColors } from '@tokens/colors';
import { spacing } from '@tokens/spacing';
import type { DemoVariant } from './ModelOnboardingScreen';

/**
 * DemoVariantOverlay
 *
 * Rendered alongside DataModelEditorComponent when screen === 'editor'.
 * Reads window.__DEMO_DATA__ (set by the Proceed button) and drives the
 * AgentPanel inside the real DME via the established window API:
 *   _appendMsg / _updateMsg / _scrollMsgs / _onChatStart / _handleBuildModel
 *
 * Also shows the DemoTabBar (fixed top-right) so the user can switch variants.
 */

// ── Local type mirrors (matching the shape set by the Proceed button) ─────────

interface PlanPhase {
  planLabel:   string;
  planCaption: string;
  reasoning:   string;
  endStep:     number;
}

interface MicroStep {
  delayMs:    number;
  phaseIndex: number;
}

interface DemoData {
  variant:   DemoVariant;
  direction: { id: string; title: string; description: string };
  plan:      { phases: PlanPhase[]; steps: MicroStep[] };
}

// ── Message IDs ───────────────────────────────────────────────────────────────
const AGENT_MSG_ID  = 'build-agent-msg';    // Option 1: single agent reasoning msg
const GLOBAL_MSG_ID = 'global-reason-msg';  // Option 2: global reasoning msg
const PLAN_MSG_ID   = 'plan-steps-msg';     // Option 2: plan-steps card msg

// ── DemoTabBar ────────────────────────────────────────────────────────────────

function DemoTabBar({ current, onSwitch }: {
  current:  DemoVariant;
  onSwitch: (v: DemoVariant) => void;
}) {
  const VARIANTS: { id: DemoVariant; label: string }[] = [
    { id: 'option1', label: 'Option 1 — Reasoning only' },
    { id: 'option2', label: 'Option 2 — Per-step reasoning' },
  ];
  return (
    <div style={{
      position: 'fixed', top: 12, right: 16, zIndex: 9999,
      display: 'flex', gap: spacing.A,
      backgroundColor: systemColors.light['background-base'],
      border: `1px solid ${systemColors.light['border-divider']}`,
      borderRadius: spacing.B, padding: spacing.A,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    }}>
      {VARIANTS.map(v => (
        <button
          key={v.id}
          onClick={() => onSwitch(v.id)}
          style={{
            padding: `${spacing.A}px ${spacing.C}px`,
            borderRadius: 6, border: 'none', cursor: 'pointer',
            fontSize: 12, fontWeight: current === v.id ? 500 : 400,
            fontFamily: fontFamily.primary,
            backgroundColor: current === v.id
              ? systemColors.light['background-information']
              : 'transparent',
            color: current === v.id
              ? systemColors.light['content-brand']
              : systemColors.light['content-secondary'],
            transition: 'background-color 0.15s, color 0.15s',
          }}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}

// ── DemoVariantOverlay ────────────────────────────────────────────────────────

interface DemoVariantOverlayProps {
  /** Called when user switches variant in the DemoTabBar. Parent should
   *  update demoVariant state and navigate back to the onboarding screen. */
  onVariantSwitch: (v: DemoVariant) => void;
}

export const DemoVariantOverlay: React.FC<DemoVariantOverlayProps> = ({ onVariantSwitch }) => {
  // Read __DEMO_DATA__ synchronously at mount — set by the Proceed button
  const data = useRef<DemoData | null>((window as any).__DEMO_DATA__ ?? null);

  const plan      = data.current?.plan;
  const steps     = plan?.steps  ?? [];
  const phases    = plan?.phases ?? [];
  const variant   = data.current?.variant ?? 'option1';
  const direction = data.current?.direction;

  const [completedCount, setCompletedCount] = useState(0);
  const panelInitRef  = useRef(false);
  const allDoneFired  = useRef(false);

  const allDone = completedCount >= steps.length;

  // Phases that have fully completed (all their micro-steps done)
  const completedPhases = phases.filter(p => completedCount > p.endStep);
  // Current phase index (-1 when all done)
  const currentPhaseIdx = allDone ? -1 : (steps[completedCount]?.phaseIndex ?? 0);

  // ── Step timer chain ──────────────────────────────────────────────────────
  useEffect(() => {
    if (allDone || steps.length === 0) return;
    const t = setTimeout(
      () => setCompletedCount(c => c + 1),
      steps[completedCount].delayMs,
    );
    return () => clearTimeout(t);
  // steps is a stable ref-derived value — completedCount is the real dep
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedCount]);

  // ── Mount effect — activate chat view + push initial messages ─────────────
  useEffect(() => {
    if (panelInitRef.current) return;
    panelInitRef.current = true;

    // AgentPanel renders chat-view hidden by default (dme.css).
    // Show it immediately so messages are visible.
    const welcomeView = document.getElementById('welcome-view');
    const chatView    = document.getElementById('chat-view');
    if (welcomeView) welcomeView.style.display = 'none';
    if (chatView)    chatView.classList.add('active');

    if (variant === 'option1') {
      // Single agent-reasoning message that accumulates steps as build runs
      (window as any)._appendMsg?.({
        kind: 'agent', id: AGENT_MSG_ID,
        reasoning: {
          header: 'Reasoning', isDone: false,
          inlineText: phases[0]?.reasoning ?? 'Building model…',
          steps: [],
        },
        response: null,
      });
    } else {
      // Option 2 — global reasoning block collapses after 1.5 s, then plan card appears
      (window as any)._appendMsg?.({
        kind: 'agent', id: GLOBAL_MSG_ID,
        reasoning: {
          header: 'Reasoning', isDone: false,
          inlineText: 'Analysing direction…',
          steps: [],
        },
        response: null,
      });
      setTimeout(() => {
        (window as any)._updateMsg?.(GLOBAL_MSG_ID, {
          reasoning: {
            header: 'Reasoning', isDone: false,
            inlineText: 'Generating build plan…',
            steps: [],
          },
        });
      }, 700);
      setTimeout(() => {
        // Collapse global reasoning
        (window as any)._updateMsg?.(GLOBAL_MSG_ID, {
          reasoning: {
            header: 'Done', isDone: true, inlineText: '',
            steps: [
              { n: 1, name: 'Analysed direction',
                text: 'Mapped business goals to schema entities.', dotState: 'done' as const },
              { n: 2, name: 'Generated plan',
                text: `${phases.length} phases identified for model construction.`, dotState: 'done' as const },
            ],
          },
        });
        // Append the plan-steps card with all phases in pending state
        (window as any)._appendMsg?.({
          kind: 'plan-steps', id: PLAN_MSG_ID,
          data: {
            goal: direction?.description ?? direction?.title ?? '',
            steps: phases.map(p => ({ label: p.planLabel, state: 'pending' as const })),
          },
        });
        (window as any)._scrollMsgs?.();
      }, 1500);
    }

    (window as any)._scrollMsgs?.();
  // Run once on mount — variant and phases are stable for the overlay's lifetime
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── completedCount effect — update messages as build progresses ────────────
  useEffect(() => {
    if (!panelInitRef.current) return;

    if (variant === 'option1') {
      (window as any)._updateMsg?.(AGENT_MSG_ID, {
        reasoning: {
          header:     allDone ? 'Done' : 'Reasoning',
          isDone:     allDone,
          inlineText: allDone
            ? ''
            : (phases[currentPhaseIdx]?.reasoning ?? 'Building model…'),
          steps: completedPhases.map((p, i) => ({
            n: i + 1, name: p.planLabel, text: p.reasoning, dotState: 'done' as const,
          })),
        },
        response: allDone ? {
          text: `Model built — ${phases.length} phases complete. Tables, relationships, and formulas are ready.`,
          isVisible: true,
        } : null,
      });
    } else {
      // Option 2: evolve plan-steps (_updateMsg is a no-op if message not yet appended)
      (window as any)._updateMsg?.(PLAN_MSG_ID, {
        data: {
          goal: direction?.description ?? direction?.title ?? '',
          steps: phases.map((p, i) => ({
            label: p.planLabel,
            caption: completedPhases.includes(p) ? p.planCaption : undefined,
            state: completedPhases.includes(p) ? 'done'   as const
                 : i === currentPhaseIdx        ? 'active' as const
                 :                                'pending' as const,
            // Inline reasoning block shown inside the active step row
            reasoningData: i === currentPhaseIdx ? {
              header: 'Reasoning', isDone: false, inlineText: p.reasoning, steps: [],
            } : undefined,
          })),
        },
        showBuildCta: allDone,
      });
    }
    (window as any)._scrollMsgs?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedCount]);

  // ── allDone effect — enable chat input ────────────────────────────────────
  useEffect(() => {
    if (!allDone || allDoneFired.current) return;
    allDoneFired.current = true;

    if (variant === 'option1') {
      // Response text is already shown via _updateMsg above; open the chat input
      (window as any)._onChatStart?.();
    } else {
      // Option 2: "Build model" CTA appears in the plan card.
      // Register the handler so clicking it activates the chat input.
      (window as any)._handleBuildModel = () => {
        (window as any)._onChatStart?.();
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDone]);

  // The overlay has no visual representation of its own — it only renders
  // the DemoTabBar and imperatively drives the AgentPanel.
  return (
    <DemoTabBar current={variant} onSwitch={onVariantSwitch} />
  );
};

export default DemoVariantOverlay;
