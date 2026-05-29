import type { ToolcallData } from './ToolcallCard';
import type { ReasoningStep, ReasoningData } from './ReasoningBlock';
import type { SuggType, TableSuggestion, JoinSuggestion, ColumnGroup, FormulaSuggestion } from './SuggestionCard';
import type { ChipItem } from './NextActionChips';

export type { ToolcallData, ReasoningStep, ReasoningData, SuggType, TableSuggestion, JoinSuggestion, ColumnGroup, FormulaSuggestion, ChipItem };

// ── Plan Steps Card ───────────────────────────────────────────────────────────

export interface PlanStep {
  label: string;
  caption?: string;
  state: 'done' | 'active' | 'pending';
  reasoningData?: ReasoningData;  // only set on the active step (Option 2 per-step reasoning)
}

export interface PlanStepsData {
  goal: string;
  steps: PlanStep[];
}

export interface VersionCardData {
  versionNum: number;
  label: string;
  isLatest: boolean;
  isDisabled?: boolean;
}

export interface ResponseData {
  text: string;
  isVisible: boolean;
  suggType?: SuggType | 'clarify' | 'confirmation' | 'enrich' | 'spotter_enable' | 'formula_req';
  tables?: TableSuggestion[];
  joins?: JoinSuggestion[];
  columnGroups?: ColumnGroup[];
  formulas?: FormulaSuggestion[];
  chips?: ChipItem[];
  clarifyQuestions?: string[];
  versionCard?: VersionCardData;
}

export type MessageItem =
  | { kind: 'user';       id: string; text: string }
  | { kind: 'typing';     id: string; label: string }
  | { kind: 'agent';      id: string; reasoning: ReasoningData; response: ResponseData | null }
  | { kind: 'plan-steps'; id: string; data: PlanStepsData; reasoning?: ReasoningData; showBuildCta?: boolean }
  // Carried from the onboarding screen — rendered via window.__renderMRD__
  | { kind: 'mrd';        id: string; mrdData: Record<string, unknown>; version: number; isCollapsed: boolean };
