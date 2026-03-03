export interface TableDef {
  id: string;
  name: string;
  type: 'Fact' | 'Dim';
  columnCount: number;
  description: string;
}

export interface ColumnDef {
  id: string;
  name: string;
  sourceTable: string;
  sourceColumn: string;
  description: string;
}

export interface JoinDef {
  id: string;
  leftTable: string;
  leftColumn: string;
  rightTable: string;
  rightColumn: string;
  joinType: 'inner' | 'left' | 'right' | 'outer';
  cardinality: 'Many : 1' | '1 : 1' | '1 : Many' | 'Many : Many';
  description: string;
}

export const ALL_TABLES: TableDef[] = [
  { id: 't1', name: 'NewRetail_Sales_Fact', type: 'Fact', columnCount: 28, description: 'Primary retail sales transaction data with revenue, units, and product details.' },
  { id: 't2', name: 'Sales_Targets_Fact', type: 'Fact', columnCount: 33, description: 'Sales targets by region, product category, and time period.' },
  { id: 't3', name: 'Customer_Dim', type: 'Dim', columnCount: 22, description: 'Customer demographics, loyalty status, and geographic attributes.' },
  { id: 't4', name: 'Product_Dim', type: 'Dim', columnCount: 40, description: 'Product catalog with categories, pricing tiers, and inventory metadata.' },
  { id: 't5', name: 'Sales_Transactions_Fact', type: 'Fact', columnCount: 18, description: 'Granular point-of-sale transaction records.' },
  { id: 't6', name: 'NewRetail_Sales_Fact', type: 'Fact', columnCount: 15, description: 'Updated retail sales fact table with new schema.' },
  { id: 't7', name: 'Opportunity_Status_Dim', type: 'Dim', columnCount: 8, description: 'Pipeline opportunity stages and status values.' },
  { id: 't8', name: 'Sales_Pipeline_Fact', type: 'Fact', columnCount: 24, description: 'Sales pipeline data with opportunity values.' },
  { id: 't9', name: 'Region_Dim', type: 'Dim', columnCount: 12, description: 'Geographic region hierarchy and attributes.' },
  { id: 't10', name: 'Inventory_Levels_Fact', type: 'Fact', columnCount: 16, description: 'Current and historical inventory levels by product.' },
  { id: 't11', name: 'Shipping_Method_Dim', type: 'Dim', columnCount: 6, description: 'Shipping carrier and method attributes.' },
  { id: 't12', name: 'Forecast_Fact', type: 'Fact', columnCount: 20, description: 'Revenue and demand forecast data.' },
  { id: 't13', name: 'Date_Dim', type: 'Dim', columnCount: 18, description: 'Calendar date dimensions with fiscal periods.' },
  { id: 't14', name: 'Currency_Dim', type: 'Dim', columnCount: 5, description: 'Currency codes and exchange rate references.' },
  { id: 't15', name: 'Customer_Satisfaction_Fact', type: 'Fact', columnCount: 14, description: 'NPS scores and customer satisfaction survey results.' },
];

export const RECOMMENDED_TABLES = ALL_TABLES.slice(0, 5);

export const CANVAS_TABLES = ALL_TABLES.slice(0, 4);

export const COLUMNS: ColumnDef[] = [
  { id: 'c1', name: 'Transaction_ID', sourceTable: 'NewRetail_Sales_Fact', sourceColumn: 'Transaction_ID', description: '' },
  { id: 'c2', name: 'Customer_ID', sourceTable: 'NewRetail_Sales_Fact', sourceColumn: 'Customer_ID', description: '' },
  { id: 'c3', name: 'Product_SKU', sourceTable: 'NewRetail_Sales_Fact', sourceColumn: 'Product_SKU', description: '' },
  { id: 'c4', name: 'Gross_Revenue', sourceTable: 'NewRetail_Sales_Fact', sourceColumn: 'Gross_Revenue', description: '' },
  { id: 'c5', name: 'Net_Sales_Amount', sourceTable: 'NewRetail_Sales_Fact', sourceColumn: 'Net_Sales_Amount', description: '' },
  { id: 'c6', name: 'Units_Sold', sourceTable: 'NewRetail_Sales_Fact', sourceColumn: 'Units_Sold', description: '' },
  { id: 'c7', name: 'Target_ID', sourceTable: 'Sales_Targets_Fact', sourceColumn: 'Target_ID', description: '' },
  { id: 'c8', name: 'Target_Amount', sourceTable: 'Sales_Targets_Fact', sourceColumn: 'Target_Amount', description: '' },
  { id: 'c9', name: 'Target_Start_Date', sourceTable: 'Sales_Targets_Fact', sourceColumn: 'Target_Start_Date', description: '' },
  { id: 'c10', name: 'Customer_Name', sourceTable: 'Customer_Dim', sourceColumn: 'Customer_Name', description: '' },
  { id: 'c11', name: 'Loyalty_Status', sourceTable: 'Customer_Dim', sourceColumn: 'Loyalty_Status', description: '' },
  { id: 'c12', name: 'Customer_City', sourceTable: 'Customer_Dim', sourceColumn: 'Customer_City', description: '' },
  { id: 'c13', name: 'First_Purchase', sourceTable: 'Customer_Dim', sourceColumn: 'First_Purchase', description: '' },
];

export const JOINS: JoinDef[] = [
  {
    id: 'j1',
    leftTable: 'Sales',
    leftColumn: 'CustomerID',
    rightTable: 'Customer_Dim',
    rightColumn: 'CustomerID',
    joinType: 'left',
    cardinality: 'Many : 1',
    description: 'Links sales transactions to customer demographics for customer-level analysis.',
  },
  {
    id: 'j2',
    leftTable: 'NewRetail_Sales_Fact',
    leftColumn: 'Product_SKU',
    rightTable: 'Product_Dim',
    rightColumn: 'Product_SKU',
    joinType: 'left',
    cardinality: 'Many : 1',
    description: 'Connects retail sales to product catalog for product attribute enrichment.',
  },
  {
    id: 'j3',
    leftTable: 'Sales_Targets_Fact',
    leftColumn: 'CustomerID',
    rightTable: 'Customer_Dim',
    rightColumn: 'ProductID',
    joinType: 'left',
    cardinality: 'Many : 1',
    description: 'Associates targets with customer segments for target tracking.',
  },
  {
    id: 'j4',
    leftTable: 'Sales_Targets_Fact',
    leftColumn: 'CustomerID',
    rightTable: 'Customer_Dim',
    rightColumn: 'CustomerID',
    joinType: 'left',
    cardinality: 'Many : 1',
    description: 'Maps sales targets to customer records for goal-vs-actual comparison.',
  },
  {
    id: 'j5',
    leftTable: 'NewRetail_Sales_Fact',
    leftColumn: 'Product_Category_ID',
    rightTable: 'Product_Dim',
    rightColumn: 'Category_ID',
    joinType: 'left',
    cardinality: 'Many : 1',
    description: 'Connects retail sales to product categories for category-level reporting.',
  },
];

export type FlowStep =
  | 'onboarding'
  | 'table-recommendations'
  | 'tables-added'
  | 'join-recommendations'
  | 'joins-added'
  | 'context-interaction'
  | 'columns-view'
  | 'delete-impact';

export interface ConversationMessage {
  id: string;
  role: 'agent' | 'user';
  text: string;
  step: FlowStep;
  contentType?: 'text' | 'table-list' | 'join-list' | 'impact-analysis' | 'suggestion-chips';
}

export const CONVERSATION_SCRIPT: Record<FlowStep, ConversationMessage[]> = {
  onboarding: [
    {
      id: 'msg-welcome',
      role: 'agent',
      text: "Hi! I'm SpotterModel, your modeling assistant.\n\nI've analyzed your **Retail 360** model and its connection schema. Here's what I see:\n\n- **15 tables** available in the Global Sales connection\n- **0 tables** currently in the model\n- **0 joins** configured\n\nLet me help you build this out. What would you like to start with?",
      step: 'onboarding',
      contentType: 'suggestion-chips',
    },
  ],
  'table-recommendations': [
    {
      id: 'msg-user-add-tables',
      role: 'user',
      text: 'Help me add the right tables for a retail performance model',
      step: 'table-recommendations',
    },
    {
      id: 'msg-table-reco',
      role: 'agent',
      text: "Based on your retail performance use case, I recommend these tables. Select the ones you'd like to add:",
      step: 'table-recommendations',
      contentType: 'table-list',
    },
  ],
  'tables-added': [
    {
      id: 'msg-user-confirm-tables',
      role: 'user',
      text: 'Add selected tables',
      step: 'tables-added',
    },
    {
      id: 'msg-tables-done',
      role: 'agent',
      text: "Selected tables have been added to the canvas!\n\nIf the current setup looks good, we can move on to selecting the columns you want to include in your model.\n\nWhat would you like to do next?",
      step: 'tables-added',
      contentType: 'suggestion-chips',
    },
  ],
  'join-recommendations': [
    {
      id: 'msg-user-create-joins',
      role: 'user',
      text: 'Create joins',
      step: 'join-recommendations',
    },
    {
      id: 'msg-join-reco',
      role: 'agent',
      text: "I've analyzed the column structures and found these optimal joins. Review and select the ones to add:",
      step: 'join-recommendations',
      contentType: 'join-list',
    },
  ],
  'joins-added': [
    {
      id: 'msg-user-confirm-joins',
      role: 'user',
      text: 'Add selected joins',
      step: 'joins-added',
    },
    {
      id: 'msg-joins-done',
      role: 'agent',
      text: "Selected joins have been added to the canvas!\n\nIf the current setup looks good, we can move on to selecting the columns you want to include in your model.\n\nWhat would you like to do next?",
      step: 'joins-added',
      contentType: 'suggestion-chips',
    },
  ],
  'context-interaction': [
    {
      id: 'msg-context-info',
      role: 'agent',
      text: "I see you've selected a join on the canvas. Here are some actions you can take:",
      step: 'context-interaction',
      contentType: 'suggestion-chips',
    },
  ],
  'columns-view': [
    {
      id: 'msg-columns-switch',
      role: 'agent',
      text: "You're now viewing the columns in your model. I can help you:\n\n- Select which columns to include or exclude\n- Add descriptions to columns\n- Rename columns for better readability\n- Create calculated columns\n\nWhat would you like to do?",
      step: 'columns-view',
      contentType: 'suggestion-chips',
    },
  ],
  'delete-impact': [
    {
      id: 'msg-user-delete',
      role: 'user',
      text: 'delete this table',
      step: 'delete-impact',
    },
    {
      id: 'msg-delete-version',
      role: 'agent',
      text: 'delete this table',
      step: 'delete-impact',
      contentType: 'text',
    },
    {
      id: 'msg-impact',
      role: 'agent',
      text: '',
      step: 'delete-impact',
      contentType: 'impact-analysis',
    },
  ],
};

export const SUGGESTION_CHIPS: Record<string, string[]> = {
  onboarding: ['Add tables', 'Create joins', 'Select columns'],
  'tables-added': ['Select columns', 'Create joins', 'Find more tables'],
  'joins-added': ['Select columns', 'Create joins', 'Find more tables'],
  'context-interaction': ['Create an outer-outer join', 'Find relevant joins with other tables'],
  'columns-view': ['Add descriptions', 'Rename columns', 'Create formula'],
};

export const TABLE_POSITIONS: Record<string, { x: number; y: number }> = {
  NewRetail_Sales_Fact: { x: 80, y: 60 },
  Sales_Targets_Fact: { x: 420, y: 60 },
  Customer_Dim: { x: 80, y: 300 },
  Product_Dim: { x: 420, y: 300 },
};

export interface ImpactItem {
  type: 'warning' | 'info';
  title: string;
  details: string[];
}

export const DELETE_IMPACT: ImpactItem[] = [
  {
    type: 'warning',
    title: 'Impact: 2 Joins will be removed',
    details: ['NewRetail_Sales_Fact → Customer_Dim', 'Customer_Dim → Product_Dim'],
  },
  {
    type: 'info',
    title: 'Impact: 3 Answers will be updated',
    details: ['Answer detail', 'Answer detail'],
  },
];
