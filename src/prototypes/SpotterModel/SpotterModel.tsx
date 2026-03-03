import React, { useState, useCallback } from 'react';
import { EditorHeader } from './components/EditorHeader';
import { ModelSubheader } from './components/ModelSubheader';
import { TablesSidebar } from './components/TablesSidebar';
import { ModelCanvas } from './components/ModelCanvas';
import { ColumnsTable } from './components/ColumnsTable';
import { SpotterPanel } from './components/SpotterPanel';
import { colors } from './styles';
import {
  RECOMMENDED_TABLES,
  CANVAS_TABLES,
  JOINS,
  CONVERSATION_SCRIPT,
  SUGGESTION_CHIPS,
  DELETE_IMPACT,
} from './data/mockData';
import type { FlowStep, ConversationMessage, ImpactItem } from './data/mockData';

const TYPING_DELAY = 1200;

const CANVAS_JOINS = [
  { id: 'cj1', fromTable: 'NewRetail_Sales_Fact', toTable: 'Customer_Dim' },
  { id: 'cj2', fromTable: 'NewRetail_Sales_Fact', toTable: 'Product_Dim' },
  { id: 'cj3', fromTable: 'Sales_Targets_Fact', toTable: 'Customer_Dim' },
  { id: 'cj4', fromTable: 'Sales_Targets_Fact', toTable: 'Product_Dim' },
];

function getContextTokens(step: FlowStep, activeTab: string): Array<{ type: 'Table' | 'Join' | 'Column'; label?: string }> {
  if (step === 'context-interaction') return [{ type: 'Table' }, { type: 'Join' }];
  if (activeTab === 'Columns' || step === 'columns-view') return [{ type: 'Table' }, { type: 'Join' }, { type: 'Column' }];
  if (step === 'delete-impact') return [{ type: 'Table', label: 'Customer_Dim' }];
  return [];
}

function getQuickActions(step: FlowStep): Array<{ label: string; action: string }> {
  if (step === 'context-interaction') {
    return [
      { label: 'Create an outer-outer join', action: 'outer-join' },
      { label: 'Find relevant joins with other tables', action: 'find-joins' },
    ];
  }
  return [];
}

const SpotterModel: React.FC = () => {
  const [step, setStep] = useState<FlowStep>('onboarding');
  const [activeTab, setActiveTab] = useState('Tables');
  const [messages, setMessages] = useState<ConversationMessage[]>(
    CONVERSATION_SCRIPT.onboarding,
  );
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTableIds, setSelectedTableIds] = useState<Set<string>>(new Set());
  const [selectedJoinIds, setSelectedJoinIds] = useState<Set<string>>(new Set());
  const [selectedCanvasJoin, setSelectedCanvasJoin] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(true);
  const [animateCanvas, setAnimateCanvas] = useState(false);

  const addMessages = useCallback((newMsgs: ConversationMessage[], delay = TYPING_DELAY) => {
    const userMsgs = newMsgs.filter((m) => m.role === 'user');
    const agentMsgs = newMsgs.filter((m) => m.role === 'agent');

    if (userMsgs.length > 0) {
      setMessages((prev) => [...prev, ...userMsgs]);
    }

    if (agentMsgs.length > 0) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, ...agentMsgs]);
      }, delay);
    }
  }, []);

  const goToStep = useCallback((nextStep: FlowStep) => {
    setStep(nextStep);
    const script = CONVERSATION_SCRIPT[nextStep];
    if (script) {
      addMessages(script);
    }
  }, [addMessages]);

  const handleChipClick = useCallback((label: string) => {
    switch (label) {
      case 'Add tables':
        goToStep('table-recommendations');
        break;
      case 'Create joins':
        goToStep('join-recommendations');
        break;
      case 'Select columns':
        setActiveTab('Columns');
        goToStep('columns-view');
        break;
      case 'Find more tables':
        goToStep('table-recommendations');
        break;
      default:
        break;
    }
  }, [goToStep]);

  const handleToggleTable = useCallback((id: string) => {
    setSelectedTableIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleConfirmTables = useCallback(() => {
    setAnimateCanvas(true);
    goToStep('tables-added');
    setTimeout(() => setAnimateCanvas(false), 600);
  }, [goToStep]);

  const handleToggleJoin = useCallback((id: string) => {
    setSelectedJoinIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleConfirmJoins = useCallback(() => {
    setAnimateCanvas(true);
    goToStep('joins-added');
    setTimeout(() => setAnimateCanvas(false), 600);
  }, [goToStep]);

  const handleJoinClick = useCallback((joinId: string) => {
    setSelectedCanvasJoin(joinId);
    if (step !== 'context-interaction' && step !== 'delete-impact') {
      goToStep('context-interaction');
    }
  }, [step, goToStep]);

  const handleSend = useCallback((text: string) => {
    const userMsg: ConversationMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      step,
    };
    setMessages((prev) => [...prev, userMsg]);

    const lower = text.toLowerCase();
    if (lower.includes('delete') || lower.includes('remove')) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setStep('delete-impact');
        const impactMsgs = CONVERSATION_SCRIPT['delete-impact'].filter((m) => m.role === 'agent');
        setMessages((prev) => [...prev, ...impactMsgs]);
      }, TYPING_DELAY);
    } else if (lower.includes('table')) {
      goToStep('table-recommendations');
    } else if (lower.includes('join')) {
      goToStep('join-recommendations');
    } else if (lower.includes('column')) {
      setActiveTab('Columns');
      goToStep('columns-view');
    } else {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const agentReply: ConversationMessage = {
          id: `agent-${Date.now()}`,
          role: 'agent',
          text: "I understand. Let me help you with that. Could you be more specific about what you'd like to do? You can ask me to add tables, create joins, manage columns, or modify your model.",
          step,
          contentType: 'suggestion-chips',
        };
        setMessages((prev) => [...prev, agentReply]);
      }, TYPING_DELAY);
    }
  }, [step, goToStep]);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    if (tab === 'Columns' && step !== 'columns-view') {
      goToStep('columns-view');
    }
  }, [step, goToStep]);

  const handleQuickAction = useCallback((_action: string) => {
    // Quick actions are informational in the prototype
  }, []);

  const showCanvas = activeTab === 'Tables';
  const showTables = step !== 'onboarding' && step !== 'table-recommendations';
  const showJoinsOnCanvas = step === 'joins-added' || step === 'context-interaction' || step === 'columns-view' || step === 'delete-impact';

  return (
    <div style={styles.root}>
      <style>{keyframes}</style>
      <EditorHeader activeTab={activeTab} onTabChange={handleTabChange} />
      <div style={styles.body}>
        <div style={styles.mainArea}>
          <ModelSubheader />
          <div style={styles.content}>
            <TablesSidebar />
            {showCanvas ? (
              <ModelCanvas
                tables={showTables ? CANVAS_TABLES : []}
                joins={showJoinsOnCanvas ? CANVAS_JOINS : []}
                step={step}
                selectedJoin={selectedCanvasJoin}
                onJoinClick={handleJoinClick}
                onTableClick={() => {}}
                animate={animateCanvas}
              />
            ) : (
              <ColumnsTable />
            )}
          </div>
        </div>
        {panelOpen && (
          <SpotterPanel
            messages={messages}
            step={step}
            isTyping={isTyping}
            onClose={() => setPanelOpen(false)}
            onSend={handleSend}
            onChipClick={handleChipClick}
            suggestionChips={SUGGESTION_CHIPS[step] || []}
            recommendedTables={RECOMMENDED_TABLES}
            selectedTableIds={selectedTableIds}
            onToggleTable={handleToggleTable}
            onConfirmTables={handleConfirmTables}
            recommendedJoins={JOINS}
            selectedJoinIds={selectedJoinIds}
            onToggleJoin={handleToggleJoin}
            onConfirmJoins={handleConfirmJoins}
            contextTokens={getContextTokens(step, activeTab)}
            quickActions={getQuickActions(step)}
            onQuickAction={handleQuickAction}
            impacts={DELETE_IMPACT as ImpactItem[]}
            onCancelDelete={() => goToStep('joins-added')}
            onProceedDelete={() => goToStep('joins-added')}
          />
        )}
      </div>
    </div>
  );
};

const keyframes = `
@keyframes spotterFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes spotterCardAppear {
  from { opacity: 0; transform: scale(0.92); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes spotterBounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40% { transform: translateY(-5px); opacity: 1; }
}
`;

const styles: Record<string, React.CSSProperties> = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: colors.bg,
    overflow: 'hidden',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  body: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  mainArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  content: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
};

export default SpotterModel;
