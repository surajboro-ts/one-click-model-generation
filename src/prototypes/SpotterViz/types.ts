export type PanelId = 'spotter' | 'chartType' | 'colors' | 'axis' | null;

export type SettingId =
  | 'barColor'
  | 'conditionalFormat'
  | 'plotline'
  | 'chartType'
  | 'xAxisLabel'
  | 'yAxisLabel'
  | 'gridLines'
  | 'dataLabels';

export interface DeepLink {
  panelId: PanelId;
  settingId: SettingId;
}

export interface AiOptionData {
  title: string;
  details: string[];
  deepLink: DeepLink;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  options?: AiOptionData[];
}

export interface PlotlineConfig {
  value: number;
  color: string;
  label: string;
  style: 'dashed' | 'solid';
}

export interface ChartConfig {
  chartType: 'bar' | 'line' | 'area';
  barColors: string[];
  targetBarColor: string;
  targetThreshold: number;
  plotline: PlotlineConfig | null;
  showDataLabels: boolean;
  xAxisLabel: string;
  yAxisLabel: string;
  showGridLines: boolean;
  conditionalFormatting: {
    enabled: boolean;
    aboveColor: string;
    belowColor: string;
  };
}

export interface AiResponse {
  text: string;
  options: AiOptionData[];
  chartMutations: Partial<ChartConfig>;
}
