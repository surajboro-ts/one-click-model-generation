import React, { useEffect, useRef, useState } from 'react';
import { UserBubble } from './UserBubble';
import { TypingIndicator } from './TypingIndicator';
import { AgentMessage } from './AgentMessage';
import { ReasoningBlock } from './ReasoningBlock';
import { AgentResponseBlock } from './AgentResponseBlock';
import { PlanStepsCard } from './PlanStepsCard';
import { StopClarifyCard } from './StopClarifyCard';
import type { MessageItem, SuggType, ReasoningData, StopClarifyResult } from './types';

export interface AgentPanelProps {
  welcomeVariant: 'blank' | 'existing';
}

export const AgentPanel: React.FC<AgentPanelProps> = ({ welcomeVariant }) => {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [chatStarted, setChatStarted] = useState(false);
  const [autoPopulating, setAutoPopulating] = useState(false);
  const [activeClarifyId, setActiveClarifyId] = useState<string | null>(null);
  const chatMsgsRef      = useRef<HTMLDivElement>(null);
  const lastUserRef      = useRef<HTMLDivElement>(null);
  const shouldScrollNext = useRef(false);

  useEffect(() => {
    // Pre-populate with onboarding history if available (carry-over from the
    // full-screen onboarding flow). Consume immediately so StrictMode's second
    // mount doesn't duplicate messages.
    const carried = (window as any).__ONBOARDING_HISTORY__;
    if (Array.isArray(carried) && carried.length > 0) {
      setMessages(carried as MessageItem[]);
      setChatStarted(true);
      delete (window as any).__ONBOARDING_HISTORY__;
    }

    if (welcomeVariant === 'blank') {
      (window as any)._onChatStart = () => setChatStarted(true);
    }

    // Idempotent append — if a message with the same id already exists (e.g.
    // React StrictMode double-invoke) update it in place instead of duplicating.
    (window as any)._appendMsg = (item: MessageItem) =>
      setMessages(prev => {
        if (prev.some(m => m.id === item.id)) {
          return prev.map(m => m.id === item.id ? { ...m, ...item } as MessageItem : m);
        }
        return [...prev, item];
      });

    (window as any)._updateMsg = (id: string, patch: Partial<MessageItem>) =>
      setMessages(prev => prev.map(m => m.id === id ? { ...m, ...patch } as MessageItem : m));
    (window as any)._removeMsg = (id: string) =>
      setMessages(prev => prev.filter(m => m.id !== id));
    (window as any)._scrollMsgs = () => {
      // Explicit programmatic scroll (called by init-dme.js on step completions
      // and final "Model ready" message) — scroll to bottom so the latest content
      // is always visible regardless of where the user currently is.
      const container = chatMsgsRef.current;
      if (!container) return;
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    };
    (window as any)._updateReasoning = (id: string, reasoning: ReasoningData) =>
      setMessages(prev => prev.map(m =>
        m.id === id && m.kind === 'agent' ? { ...m, reasoning } : m
      ));
    (window as any)._demoteVersionCards = () =>
      setMessages(prev => prev.map(m => {
        if (m.kind === 'agent' && m.response?.versionCard) {
          return { ...m, response: { ...m.response, versionCard: { ...m.response.versionCard, isLatest: false } } };
        }
        return m;
      }));
    (window as any)._freezeConversation = () =>
      setMessages(prev => prev.map(m =>
        m.kind === 'agent' && m.response ? { ...m, response: { ...m.response, chips: undefined } } : m
      ));

    // Called by startAutoPopulate to control the "building" state.
    // true  → show prompt bar immediately (disabled send), show Stop button
    // false → re-enable send, hide Stop button
    (window as any)._setAutoPopulating = (val: boolean) => {
      setAutoPopulating(val);
      if (val) setChatStarted(true); // ensure chat bar is visible
    };

    return () => {
      delete (window as any)._onChatStart;
      delete (window as any)._appendMsg;
      delete (window as any)._updateMsg;
      delete (window as any)._removeMsg;
      delete (window as any)._scrollMsgs;
      delete (window as any)._updateReasoning;
      delete (window as any)._demoteVersionCards;
      delete (window as any)._freezeConversation;
      delete (window as any)._setAutoPopulating;
      delete (window as any)._handleBuildModel;
    };
  }, [welcomeVariant]);

  // Format the user bubble text from a clarify result
  const formatStopUserText = (result: StopClarifyResult): string => {
    if (result.action === 'resume') return 'Resume — I stopped by mistake';
    if (result.action === 'review') return 'I want to review before continuing';
    if (result.action === 'manual') return "I'll finish building manually";
    if (result.action === 'rebuild') {
      const layerLabel: Record<string, string> = {
        tables:   'The tables selected',
        joins:    'The joins between tables',
        formulas: 'The formulas or metrics',
        other:    'Something in the build',
      };
      return `${layerLabel[result.layer] ?? 'Something'} isn't right — ${result.issue}`;
    }
    return '';
  };

  // Stop button handler — aborts the build and shows the clarify card in the prompt bar.
  const handleStopAutoPopulate = () => {
    (window as any).__DME_AUTO_ABORT__?.();
    delete (window as any).__DME_AUTO_ABORT__;
    (window as any)._setColumnShimmer?.(false);
    (window as any)._setFormulaShimmer?.(false);
    (window as any)._setDMEAutoPopulating?.(false);
    (window as any)._autoPopulating = false;
    setAutoPopulating(false);
    // Discard version card — not shown in the clarify flow
    delete (window as any).__DME_STOP_VERSION__;
    // Show clarify card in place of the prompt bar
    setActiveClarifyId('stop-' + Date.now());
  };

  // Called when the user submits the clarify card in the prompt bar.
  const handleStopClarifyComplete = (result: StopClarifyResult) => {
    setActiveClarifyId(null);

    const now = Date.now();
    const userId     = 'stop-user-'     + now;
    const responseId = 'stop-response-' + now;

    const userText = formatStopUserText(result);

    // Append user bubble
    setMessages(prev => [...prev, { kind: 'user', id: userId, text: userText } as MessageItem]);

    if (result.action === 'resume') {
      setAutoPopulating(true);
      (window as any)._restartBuildFromPhase?.('__resume__');
      setTimeout(() => (window as any)._scrollMsgs?.(), 100);
      return;
    }

    if (result.action === 'review') {
      setMessages(prev => [...prev, {
        kind: 'agent',
        id: responseId,
        reasoning: { header: 'Waiting', isDone: true, inlineText: '', steps: [] },
        response: {
          text: "Take your time. I've saved everything built so far. When you're ready, resume and I'll continue from where we left off.",
          isVisible: true,
          chips: [{ text: 'Resume building', variant: 'enrich' }],
        },
      } as MessageItem]);
      setTimeout(() => (window as any)._scrollMsgs?.(), 60);
      return;
    }

    if (result.action === 'manual') {
      setMessages(prev => [...prev, {
        kind: 'agent',
        id: responseId,
        reasoning: { header: 'Handing off', isDone: true, inlineText: '', steps: [] },
        response: {
          text: "No problem — I'll step back. Everything built so far is saved. You can always ask me for help with specific parts.",
          isVisible: true,
          chips: [
            { text: 'Help with formulas',   variant: 'default' },
            { text: 'Suggest more columns', variant: 'default' },
          ],
        },
      } as MessageItem]);
      setTimeout(() => (window as any)._scrollMsgs?.(), 60);
      return;
    }

    // rebuild — determine label for response text
    const layerLabel: Record<string, string> = {
      tables:   'tables',
      joins:    'joins',
      formulas: 'formulas',
      other:    'the beginning',
    };
    const label = layerLabel[result.layer] ?? 'the beginning';

    setMessages(prev => [...prev, {
      kind: 'agent',
      id: responseId,
      reasoning: { header: `Rebuilding from ${label}`, isDone: false, inlineText: `Resetting ${label} and replanning…`, steps: [] },
      response: null,
    } as MessageItem]);

    setTimeout(() => {
      setAutoPopulating(true);
      (window as any)._restartBuildFromPhase?.(result.layer, result.issue);
      setTimeout(() => {
        setMessages(prev => prev.map(m =>
          m.id === responseId && m.kind === 'agent'
            ? { ...m, reasoning: { header: `Rebuilding from ${label}`, isDone: true, inlineText: '', steps: [] } }
            : m
        ));
      }, 600);
      setTimeout(() => (window as any)._scrollMsgs?.(), 80);
    }, 800);
  };

  // Auto-scroll: fires on user send + the first agent response only.
  // plan-steps arrival scrolls to the bottom to reveal the plan card.
  // All further updates in the same response chain are suppressed so the
  // user can freely scroll without being pulled back.
  // Explicit programmatic scrolls (e.g. from init-dme step completions)
  // go through _scrollMsgs which always scrolls to the bottom independently.
  useEffect(() => {
    if (!messages.length) return;
    const lastMsg = messages[messages.length - 1];

    const scrollToLastUser = () => {
      const el = lastUserRef.current;
      const container = chatMsgsRef.current;
      if (!el || !container) return;
      const elRect = el.getBoundingClientRect();
      const cRect  = container.getBoundingClientRect();
      container.scrollTo({ top: Math.max(0, container.scrollTop + (elRect.top - cRect.top) - 12), behavior: 'smooth' });
    };

    if (lastMsg.kind === 'user') {
      // New user message — scroll into view and arm the "scroll once on first response" flag
      shouldScrollNext.current = true;
      scrollToLastUser();
      return;
    }

    if (lastMsg.kind === 'plan-steps') {
      // Plan card first appeared — scroll to bottom so it's fully visible
      shouldScrollNext.current = false;
      const container = chatMsgsRef.current;
      if (container) container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      return;
    }

    if (shouldScrollNext.current) {
      // First non-user, non-plan response after a user send — scroll once then suppress
      shouldScrollNext.current = false;
      scrollToLastUser();
      return;
    }

    // Suppress all subsequent message additions in the same response chain
  }, [messages.length]);

  return (
    <div className="agent-panel" id="agent-panel">
      <div className="panel-resize-handle" id="panel-resize-handle"></div>

      {/* Header */}
      <div className="agent-panel-header">
        <span className="agent-title">SpotterModel</span>
        <div className="context-chip" id="context-chip-btn">
          <img src="/spotter-assets/Contextual spinner.svg" className="ctx-chip-spinner" width="14" height="14" alt="" />
          <span>Context</span>
        </div>
        <div className="close-btn">
          <img src="/spotter-assets/cross-s.svg" width="14" height="14" alt="close" />
        </div>
      </div>

      {/* Welcome view — variant-driven */}
      {welcomeVariant === 'blank' ? (
        <div className="agent-panel-body" id="welcome-view">
          <div className="agent-content-group">
            <div className="agent-intro">
              <div className="agent-mascot">
                <img src="/spotter-assets/SpotterModel avatar.svg" width="32" height="32" alt="SpotterModel" />
              </div>
              <div className="agent-headline">
                Let's build an <span className="hl-blue">AI-ready</span> model
              </div>
            </div>
            <div className="prompt-bar-wrapper">
              <div className="prompt-bar">
                <textarea className="agent-textarea" id="welcome-textarea" placeholder="What is this model's use case?" autoFocus></textarea>
                <div className="prompt-bar-actions">
                  <button className="send-btn" id="welcome-send" title="Send">
                    <img src="/spotter-assets/Primary buttton/Primary buttton/arrow-up-m.svg" width="16" height="16" alt="send" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ul className="agent-bullets">
            <li className="bullet-item">Find the right tables for your use case</li>
            <li className="bullet-item">Join tables without errors</li>
            <li className="bullet-item">Add columns with <span className="bullet-emphasis">AI-friendly context</span></li>
            <li className="bullet-item">Generate reliable formulas</li>
          </ul>
        </div>
      ) : (
        <div className="edit-intro-view" id="welcome-view">
          <div className="edit-intro-body">
            <div className="agent-mascot">
              <img src="/spotter-assets/SpotterModel avatar.svg" width="32" height="32" alt="SpotterModel" />
            </div>
            <div className="edit-intro-headline">Welcome back</div>
            <div className="edit-intro-sub">Let's ensure this model is ready for AI search</div>
            <button
              className="check-ai-readiness-btn"
              id="check-ai-btn"
              onClick={() => (window as any).startChat?.('Check for AI readiness')}
            >
              <img src="/spotter-assets/ai icon.svg" width="16" height="16" alt="" className="ai-icon-brand" />
              Check for AI readiness
            </button>
          </div>
        </div>
      )}

      {/* Chat view */}
      <div className="chat-view" id="chat-view">
        <div className="chat-messages" id="chat-messages" ref={chatMsgsRef}>
          {(() => {
            const lastUserIdx = messages.reduce((acc, m, i) => m.kind === 'user' ? i : acc, -1);
            return messages.map((msg, idx) => {
            const isReadOnly = idx < messages.length - 1;
            if (msg.kind === 'user') return (
              <UserBubble
                key={msg.id}
                ref={idx === lastUserIdx ? lastUserRef : undefined}
                text={msg.text}
                html={msg.html}
              />
            );
            if (msg.kind === 'typing') return <TypingIndicator key={msg.id} label={msg.label} />;
            if (msg.kind === 'plan-steps') return (
              <AgentMessage key={msg.id}>
                {msg.reasoning && <ReasoningBlock data={msg.reasoning} />}
                {msg.text && (
                  <p style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 300, lineHeight: '20px', color: 'var(--rd-sys-color-content-primary)' }}>
                    {msg.text}
                  </p>
                )}
                <PlanStepsCard
                  data={msg.data}
                  showBuildCta={msg.showBuildCta}
                  onBuild={() => (window as any)._handleBuildModel?.()}
                />
              </AgentMessage>
            );
            if (msg.kind === 'agent') return (
              <AgentMessage key={msg.id}>
                <ReasoningBlock data={msg.reasoning} />
                {msg.response && (
                  <AgentResponseBlock
                    data={msg.response}
                    isReadOnly={isReadOnly}
                    onAddToModel={(st: SuggType, items: unknown[]) => (window as any)._handleAddToModel?.(msg.id, st, items)}
                    onRefine={(st: SuggType) => (window as any)._handleSuggestionRefine?.(st)}
                    onChipClick={(text: string) => (window as any)._handleChipClick?.(text)}
                    onRestoreVersion={(num: number) => (window as any)._restoreVersion?.(num)}
                  />
                )}
              </AgentMessage>
            );
            // MRD card carried from the onboarding screen — rendered via window.__renderMRD__
            // registered in OneClickModelGeneration/index.tsx.
            // reasoning + responseText are merged in when the onboarding history was serialised
            // so the reasoning block, response text, and MRD card appear as one AgentMessage.
            if (msg.kind === 'mrd') return (
              <AgentMessage key={msg.id}>
                {msg.reasoning && <ReasoningBlock data={msg.reasoning} />}
                {msg.responseText && (
                  <p style={{ margin: '4px 0 8px', fontSize: 14, fontWeight: 300, lineHeight: '20px', color: 'var(--rd-sys-color-content-primary)', whiteSpace: 'pre-line' }}>
                    {msg.responseText}
                  </p>
                )}
                {(window as any).__renderMRD__?.(msg) ?? null}
              </AgentMessage>
            );

            return null;
          });
          })()}
        </div>
      </div>

      {/* Bottom prompt bar */}
      {welcomeVariant === 'blank' ? (
        chatStarted && (
          activeClarifyId ? (
            /* Clarify card replaces prompt bar when user pauses auto-generation */
            <div className="chat-input-wrapper">
              <StopClarifyCard
                onComplete={handleStopClarifyComplete}
              />
            </div>
          ) : (
            <div className="chat-input-wrapper">
              <div className="prompt-bar" id="chat-prompt-bar">
                <textarea
                  className="agent-textarea"
                  id="chat-textarea"
                  placeholder={autoPopulating ? 'Building your model…' : 'Let me help you build a model'}
                  disabled={autoPopulating}
                ></textarea>
                <div className="prompt-bar-actions">
                  {autoPopulating ? (
                    /* Pause button — replaces send icon while building */
                    <button
                      className="send-btn"
                      title="Pause generation"
                      onClick={handleStopAutoPopulate}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <rect x="2.5" y="1.5" width="3" height="11" rx="1" fill="white" />
                        <rect x="8.5" y="1.5" width="3" height="11" rx="1" fill="white" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className="send-btn"
                      id="chat-send-btn"
                      title="Send"
                    >
                      <img src="/spotter-assets/Primary buttton/Primary buttton/arrow-up-m.svg" width="16" height="16" alt="send" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        )
      ) : (
        <div className="chat-input-wrapper">
          <div className="prompt-bar" id="chat-prompt-bar">
            <textarea className="agent-textarea" id="chat-textarea" placeholder="Edit columns, formulas, tables or joins" autoFocus></textarea>
            <div className="prompt-bar-actions">
              <button className="send-btn" id="chat-send-btn" title="Send">
                <img src="/spotter-assets/Primary buttton/Primary buttton/arrow-up-m.svg" width="16" height="16" alt="send" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="agent-footer">
        SpotterModel responses should be reviewed. <a href="#">Learn more</a>
      </div>
    </div>
  );
};

export default AgentPanel;
