import type { ChartConfig, AiResponse, ChatMessage } from '../types';

export const MONTHS = [
  "Jan '24", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  "Jan '25", "Feb",
];

export const SALES_DATA = [
  14200, 15800, 20400, 18600, 14000, 12800,
  13200, 14800, 16400, 18200, 17600, 15200,
  22000, 25000,
];

const CORAL = '#F47E89';
const GREEN = '#06BF7F';

export const DEFAULT_CHART_CONFIG: ChartConfig = {
  chartType: 'bar',
  barColors: Array(14).fill(CORAL),
  targetBarColor: GREEN,
  targetThreshold: 20000,
  plotline: {
    value: 20000,
    color: GREEN,
    label: 'Target : 20k',
    style: 'dashed',
  },
  showDataLabels: true,
  xAxisLabel: 'Monthly · Fiscal',
  yAxisLabel: 'Total sales',
  showGridLines: true,
  conditionalFormatting: {
    enabled: true,
    aboveColor: GREEN,
    belowColor: CORAL,
  },
};

export function getBarColors(config: ChartConfig): string[] {
  if (config.conditionalFormatting.enabled && config.plotline) {
    return SALES_DATA.map(v =>
      v >= config.plotline!.value
        ? config.conditionalFormatting.aboveColor
        : config.conditionalFormatting.belowColor,
    );
  }
  return config.barColors;
}

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'user-1',
    role: 'user',
    text: 'Make the colour of columns to red and targets to green with a plotline target of 20k',
  },
  {
    id: 'ai-1',
    role: 'assistant',
    text: 'Based on your input, I have made following changes',
    options: [
      {
        title: 'Column changes',
        details: ['Bar colour: Yellow to red'],
        deepLink: { panelId: 'colors', settingId: 'barColor' },
      },
      {
        title: 'Conditional formatting',
        details: ['Colours: Purple to green'],
        deepLink: { panelId: 'colors', settingId: 'conditionalFormat' },
      },
      {
        title: 'Plotline added',
        details: ['Color : Green', 'Value : 20k'],
        deepLink: { panelId: 'colors', settingId: 'plotline' },
      },
    ],
  },
];

function matchPrompt(input: string): AiResponse {
  const lower = input.toLowerCase();

  if (lower.includes('colour') || lower.includes('color') || lower.includes('red')) {
    return {
      text: 'Based on your input, I have made following changes',
      options: [
        {
          title: 'Column changes',
          details: [`Bar colour: changed to ${lower.includes('blue') ? 'blue' : 'red'}`],
          deepLink: { panelId: 'colors', settingId: 'barColor' },
        },
        {
          title: 'Conditional formatting',
          details: ['Colours updated based on threshold'],
          deepLink: { panelId: 'colors', settingId: 'conditionalFormat' },
        },
      ],
      chartMutations: {
        conditionalFormatting: {
          enabled: true,
          aboveColor: GREEN,
          belowColor: lower.includes('blue') ? '#2770EF' : CORAL,
        },
      },
    };
  }

  if (lower.includes('data label')) {
    return {
      text: 'I\'ve updated the data label settings',
      options: [
        {
          title: 'Data labels',
          details: [lower.includes('remove') || lower.includes('hide') ? 'Labels: Hidden' : 'Labels: Visible on all bars'],
          deepLink: { panelId: 'axis', settingId: 'dataLabels' },
        },
      ],
      chartMutations: {
        showDataLabels: !(lower.includes('remove') || lower.includes('hide')),
      },
    };
  }

  if (lower.includes('line') && lower.includes('chart')) {
    return {
      text: 'I\'ve changed the chart type to line',
      options: [
        {
          title: 'Chart type changed',
          details: ['Type: Line chart'],
          deepLink: { panelId: 'chartType', settingId: 'chartType' },
        },
      ],
      chartMutations: {
        chartType: 'line',
      },
    };
  }

  if (lower.includes('plotline') || lower.includes('target')) {
    const numMatch = lower.match(/(\d+)\s*k?/);
    const val = numMatch ? parseInt(numMatch[1], 10) * (lower.includes('k') ? 1000 : 1) : 20000;
    return {
      text: 'Plotline has been updated',
      options: [
        {
          title: 'Plotline updated',
          details: [`Value: ${(val / 1000).toFixed(0)}k`, 'Color: Green'],
          deepLink: { panelId: 'colors', settingId: 'plotline' },
        },
      ],
      chartMutations: {
        plotline: { value: val, color: GREEN, label: `Target : ${(val / 1000).toFixed(0)}k`, style: 'dashed' },
      },
    };
  }

  if (lower.includes('grid')) {
    const hide = lower.includes('hide') || lower.includes('remove') || lower.includes('off');
    return {
      text: `Grid lines have been ${hide ? 'hidden' : 'shown'}`,
      options: [
        {
          title: 'Grid lines',
          details: [`Grid: ${hide ? 'Hidden' : 'Visible'}`],
          deepLink: { panelId: 'axis', settingId: 'gridLines' },
        },
      ],
      chartMutations: {
        showGridLines: !hide,
      },
    };
  }

  return {
    text: 'I\'ve analyzed your request and applied the changes to the chart',
    options: [
      {
        title: 'Changes applied',
        details: ['Settings updated based on your input'],
        deepLink: { panelId: 'colors', settingId: 'barColor' },
      },
    ],
    chartMutations: {},
  };
}

export function processPrompt(input: string): AiResponse {
  return matchPrompt(input);
}
