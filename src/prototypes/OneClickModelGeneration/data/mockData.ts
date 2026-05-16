/**
 * Mock data for OneClickModelGeneration prototype
 */

export interface DataConnection {
  id: string;
  name: string;
  type: 'database' | 'api' | 'file';
  icon: string;
}

export const dataConnections: DataConnection[] = [
  { id: '1', name: 'PostgreSQL', type: 'database', icon: '🗄️' },
  { id: '2', name: 'MySQL', type: 'database', icon: '🗄️' },
  { id: '3', name: 'Snowflake', type: 'database', icon: '❄️' },
  { id: '4', name: 'REST API', type: 'api', icon: '🔌' },
  { id: '5', name: 'CSV Upload', type: 'file', icon: '📄' },
];

export const mockDatasets: Record<string, any> = {
  retail: {
    tables: [
      { name: 'customers', rows: 15000, columns: 12 },
      { name: 'orders', rows: 85000, columns: 8 },
      { name: 'products', rows: 5000, columns: 10 },
      { name: 'categories', rows: 25, columns: 3 },
      { name: 'order_items', rows: 250000, columns: 5 },
      { name: 'payments', rows: 85000, columns: 6 },
    ],
  },
};

export const mockAIResponses = [
  "Based on the dataset structure, I suggest creating relationships between orders and customers via customer_id, and between orders and products through order_items table.",
  "I've identified several fields that could benefit from indexing: customer_id, order_date, and product_id for faster queries.",
  "Consider adding a calculated field for total_order_value by aggregating order_items. This will improve dashboard performance.",
  "Your schema looks well-normalized. The order_items junction table properly handles the many-to-many relationship between orders and products.",
];
