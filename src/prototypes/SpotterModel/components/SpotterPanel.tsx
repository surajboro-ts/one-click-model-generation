import React, { useRef, useEffect } from 'react';
import { Button } from '../../../components';
import { colors, PANEL_WIDTH } from '../styles';
import { AgentMessage } from './AgentMessage';
import { UserMessage } from './UserMessage';
import { SuggestionChip } from './SuggestionChip';
import { TableRecommendation } from './TableRecommendation';
import { JoinRecommendation } from './JoinRecommendation';
import { ImpactAnalysis } from './ImpactAnalysis';
import { PromptBar } from './PromptBar';
import type { FlowStep, ConversationMessage, TableDef, JoinDef, ImpactItem } from '../data/mockData';

interface SpotterPanelProps {
  messages: ConversationMessage[];
  step: FlowStep;
  isTyping: boolean;
  onClose: () => void;
  onSend: (text: string) => void;
  onChipClick: (label: string) => void;
  suggestionChips: string[];
  recommendedTables: TableDef[];
  selectedTableIds: Set<string>;
  onToggleTable: (id: string) => void;
  onConfirmTables: () => void;
  recommendedJoins: JoinDef[];
  selectedJoinIds: Set<string>;
  onToggleJoin: (id: string) => void;
  onConfirmJoins: () => void;
  contextTokens: Array<{ type: 'Table' | 'Join' | 'Column'; label?: string }>;
  quickActions: Array<{ label: string; action: string }>;
  onQuickAction: (action: string) => void;
  impacts: ImpactItem[];
  onCancelDelete: () => void;
  onProceedDelete: () => void;
}

export const SpotterPanel: React.FC<SpotterPanelProps> = ({
  messages, step, isTyping, onClose, onSend, onChipClick,
  suggestionChips, recommendedTables, selectedTableIds, onToggleTable, onConfirmTables,
  recommendedJoins, selectedJoinIds, onToggleJoin, onConfirmJoins,
  contextTokens, quickActions, onQuickAction,
  impacts, onCancelDelete, onProceedDelete,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const renderContent = (msg: ConversationMessage, idx: number) => {
    const isLatest = idx === messages.length - 1;

    if (msg.role === 'user') {
      return <UserMessage key={msg.id} text={msg.text} animate={isLatest} />;
    }

    switch (msg.contentType) {
      case 'table-list':
        return (
          <AgentMessage key={msg.id} text={msg.text} animate={isLatest}>
            <div style={styles.recoList}>
              {recommendedTables.map((t) => (
                <TableRecommendation
                  key={t.id}
                  table={t}
                  checked={selectedTableIds.has(t.id)}
                  onToggle={() => onToggleTable(t.id)}
                />
              ))}
            </div>
            {selectedTableIds.size > 0 && (
              <Button variant="primary" size="small" onClick={onConfirmTables}>
                Add {selectedTableIds.size} table{selectedTableIds.size > 1 ? 's' : ''} to canvas
              </Button>
            )}
          </AgentMessage>
        );

      case 'join-list':
        return (
          <AgentMessage key={msg.id} text={msg.text} animate={isLatest}>
            <div style={styles.recoList}>
              {recommendedJoins.map((j) => (
                <JoinRecommendation
                  key={j.id}
                  join={j}
                  checked={selectedJoinIds.has(j.id)}
                  onToggle={() => onToggleJoin(j.id)}
                />
              ))}
            </div>
            {selectedJoinIds.size > 0 && (
              <Button variant="primary" size="small" onClick={onConfirmJoins}>
                Add {selectedJoinIds.size} join{selectedJoinIds.size > 1 ? 's' : ''} to canvas
              </Button>
            )}
          </AgentMessage>
        );

      case 'impact-analysis':
        return (
          <AgentMessage key={msg.id} text="" animate={isLatest}>
            <ImpactAnalysis
              tableName="Customer_Dim"
              impacts={impacts}
              onCancel={onCancelDelete}
              onProceed={onProceedDelete}
            />
          </AgentMessage>
        );

      case 'suggestion-chips':
        return (
          <AgentMessage key={msg.id} text={msg.text} animate={isLatest}>
            <div style={styles.chipRow}>
              {suggestionChips.map((c) => (
                <SuggestionChip key={c} label={c} onClick={() => onChipClick(c)} />
              ))}
            </div>
          </AgentMessage>
        );

      default:
        return <AgentMessage key={msg.id} text={msg.text} animate={isLatest} />;
    }
  };

  return (
    <div style={styles.panel}>
      <div style={styles.header}>
        <div style={styles.headerLeft} />
        <button style={styles.closeBtn} onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4L12 12M12 4L4 12" stroke={colors.textSecondary} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div ref={scrollRef} style={styles.messages}>
        {messages.map((msg, i) => renderContent(msg, i))}
        {isTyping && <TypingIndicator />}
      </div>

      <PromptBar
        onSend={onSend}
        contextTokens={contextTokens}
        quickActions={quickActions}
        onQuickAction={onQuickAction}
        step={step}
      />
    </div>
  );
};

const TypingIndicator: React.FC = () => (
  <div style={styles.typingRow}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill={colors.bgSubtle} />
      <path d="M12 6C9.2 6 7 8.2 7 11s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z" fill={colors.textBrand} />
    </svg>
    <div style={styles.dots}>
      <span style={{ ...styles.dot, animationDelay: '0s' }} />
      <span style={{ ...styles.dot, animationDelay: '0.2s' }} />
      <span style={{ ...styles.dot, animationDelay: '0.4s' }} />
    </div>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  panel: {
    width: PANEL_WIDTH,
    borderLeft: `1px solid ${colors.borderDivider}`,
    backgroundColor: colors.bg,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    flexShrink: 0,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    height: 60,
    flexShrink: 0,
  },
  headerLeft: {},
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
    display: 'flex',
    alignItems: 'center',
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '0 24px',
    display: 'flex',
    flexDirection: 'column',
  },
  recoList: {
    border: `1px solid ${colors.borderDivider}`,
    borderRadius: 8,
    overflow: 'hidden',
    maxHeight: 320,
    overflowY: 'auto',
  },
  chipRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  typingRow: {
    display: 'flex',
    gap: 12,
    padding: '12px 0',
    alignItems: 'center',
  },
  dots: {
    display: 'flex',
    gap: 4,
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: colors.textTertiary,
    animation: 'spotterBounce 1.2s infinite ease-in-out',
    display: 'block',
  },
};
