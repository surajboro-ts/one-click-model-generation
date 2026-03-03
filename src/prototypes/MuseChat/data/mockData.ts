export type ChartType = 'donut' | 'bar' | 'line' | 'stackedArea' | 'horizontalBar';

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: string;
  chart?: {
    type: ChartType;
    title: string;
    filterChips: string[];
  };
  isTyping?: boolean;
}

export interface ChatHistoryItem {
  id: string;
  label: string;
  active?: boolean;
}

export interface ChatHistorySection {
  title: string;
  items: ChatHistoryItem[];
}

export const chatHistory: ChatHistorySection[] = [
  {
    title: 'THIS WEEK',
    items: [
      { id: 'chat-1', label: 'Assisting the new sales manager', active: true },
      { id: 'chat-2', label: 'regions with lowest sales' },
    ],
  },
  {
    title: 'PREVIOUS CHATS',
    items: [
      { id: 'chat-3', label: 'Jacket sales last year' },
      { id: 'chat-4', label: 'top performing cities last quarter' },
      { id: 'chat-5', label: 'top store sales by state last year' },
      { id: 'chat-6', label: 'top 10 item types sold this year' },
    ],
  },
];

export interface AIResponseTemplate {
  text: string;
  chart: {
    type: ChartType;
    title: string;
    filterChips: string[];
  };
}

export const aiResponses: AIResponseTemplate[] = [
  {
    text: 'I analyzed the sales data across all regions for the past 12 months. The Western region leads with 34% of total revenue, followed by the Eastern region at 28%. The Southern and Northern regions contribute 22% and 16% respectively.\n\nNotably, the Western region saw a 12% year-over-year increase, driven primarily by new store openings in California and Oregon.',
    chart: {
      type: 'donut',
      title: 'Revenue share by region',
      filterChips: ['revenue', 'region = all', 'date = last 12 months'],
    },
  },
  {
    text: 'Here is the quarterly comparison of product categories. Outerwear continues to dominate with consistent growth across all four quarters. Footwear showed the most significant improvement, jumping 23% from Q1 to Q4.\n\nThe accessories category remained relatively flat, suggesting an opportunity for promotional campaigns.',
    chart: {
      type: 'bar',
      title: 'Quarterly sales by category',
      filterChips: ['sales', 'category = top 5', 'quarterly'],
    },
  },
  {
    text: 'The monthly trend shows a clear seasonal pattern in customer acquisition. There is a significant spike in November and December, correlating with holiday promotions. The summer months (June-August) show a secondary peak driven by back-to-school campaigns.\n\nCustomer retention rate averaged 72% across the year, with the highest retention during Q4.',
    chart: {
      type: 'line',
      title: 'Monthly customer acquisition trend',
      filterChips: ['customers', 'new acquisitions', 'monthly'],
    },
  },
  {
    text: 'Looking at the product mix over time, we can see how the composition of sales has shifted. Premium items now represent 40% of revenue, up from 28% two years ago. This shift toward higher-margin products is reflected in the improved gross margin of 42%.\n\nEconomy items have declined proportionally but still maintain steady absolute volume.',
    chart: {
      type: 'stackedArea',
      title: 'Product tier mix over time',
      filterChips: ['revenue', 'product tier', 'date = 2 years'],
    },
  },
  {
    text: 'Here are the top 8 performing stores ranked by total sales. The flagship Manhattan store leads by a significant margin at $4.2M, followed by the San Francisco and Chicago locations. The Dallas store showed the highest growth rate at 31% year-over-year despite being a newer location.\n\nAverage transaction value is highest at the Manhattan and Beverly Hills stores.',
    chart: {
      type: 'horizontalBar',
      title: 'Top 8 stores by total sales',
      filterChips: ['total sales', 'store = top 8', 'this year'],
    },
  },
];

export const initialMessages: ChatMessage[] = [
  {
    id: 'msg-init-1',
    role: 'user',
    text: 'Show me the revenue breakdown by region for the past year',
    timestamp: '07:42 PM',
  },
  {
    id: 'msg-init-2',
    role: 'ai',
    text: aiResponses[0].text,
    timestamp: '07:42 PM',
    chart: aiResponses[0].chart,
  },
];

let messageCounter = 100;
export function generateMessageId(): string {
  messageCounter += 1;
  return `msg-${messageCounter}`;
}

export function getCurrentTime(): string {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  return `${h.toString().padStart(2, '0')}:${minutes} ${ampm}`;
}

export function getRandomAIResponse(): AIResponseTemplate {
  const idx = Math.floor(Math.random() * aiResponses.length);
  return aiResponses[idx];
}
