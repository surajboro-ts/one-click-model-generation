/**
 * Mock data for OneClickModelGeneration prototype
 */

export interface DataObject {
  id: string;
  name: string;
  type: 'Model' | 'Table';
  source: string;
  sourceProvider: 'snowflake' | 'dbt' | 'db_connection';
  tags: string[];
  author: string;
  lastModified: string;
}

export const dataObjects: DataObject[] = [
  { id: '1',  name: 'Sales Analytics Model',       type: 'Model', source: 'Sales_Integration',        sourceProvider: 'snowflake',    tags: ['Analysis', 'Sales'],      author: 'Alice Styles',  lastModified: '3 days ago' },
  { id: '2',  name: 'Inventory Model',              type: 'Model', source: 'Inventory_Integration',    sourceProvider: 'dbt',          tags: ['Sales'],                  author: 'Mark Rivera',   lastModified: '20 days ago' },
  { id: '3',  name: 'fact_orders',                  type: 'Table', source: 'snowflake_prod_connection', sourceProvider: 'snowflake',    tags: [],                         author: 'Priya Patel',   lastModified: '1 month ago' },
  { id: '4',  name: 'Customer Segments Model',      type: 'Model', source: 'CRM_Integration',          sourceProvider: 'snowflake',    tags: ['Analysis', 'CRM'],        author: 'David Chen',    lastModified: '5 days ago' },
  { id: '5',  name: 'dim_products',                 type: 'Table', source: 'snowflake_prod_connection', sourceProvider: 'snowflake',    tags: [],                         author: 'Priya Patel',   lastModified: '45 days ago' },
  { id: '6',  name: 'Marketing Attribution Model',  type: 'Model', source: 'Marketing_dbt',            sourceProvider: 'dbt',          tags: ['Marketing', 'Analysis'],  author: 'Sarah Kim',     lastModified: '2 weeks ago' },
  { id: '7',  name: 'dim_customers',                type: 'Table', source: 'postgres_prod',            sourceProvider: 'db_connection', tags: [],                         author: 'Alice Styles',  lastModified: '3 months ago' },
  { id: '8',  name: 'Finance Model',                type: 'Model', source: 'Finance_Integration',      sourceProvider: 'snowflake',    tags: ['Finance'],                author: 'Mark Rivera',   lastModified: '1 week ago' },
  { id: '9',  name: 'fact_transactions',            type: 'Table', source: 'postgres_prod',            sourceProvider: 'db_connection', tags: [],                         author: 'David Chen',    lastModified: '2 months ago' },
  { id: '10', name: 'HR Analytics Model',           type: 'Model', source: 'HR_Integration',           sourceProvider: 'snowflake',    tags: ['HR'],                     author: 'Sarah Kim',     lastModified: '4 days ago' },
  { id: '11', name: 'dim_employees',                type: 'Table', source: 'postgres_prod',            sourceProvider: 'db_connection', tags: [],                         author: 'David Chen',    lastModified: '2 weeks ago' },
  { id: '12', name: 'Supply Chain Model',           type: 'Model', source: 'ERP_Integration',          sourceProvider: 'dbt',          tags: ['Operations'],             author: 'Priya Patel',   lastModified: '6 days ago' },
  { id: '13', name: 'fact_returns',                 type: 'Table', source: 'snowflake_prod_connection', sourceProvider: 'snowflake',    tags: [],                         author: 'Mark Rivera',   lastModified: '3 weeks ago' },
  { id: '14', name: 'Revenue Forecast Model',       type: 'Model', source: 'Finance_Integration',      sourceProvider: 'snowflake',    tags: ['Finance', 'Analysis'],    author: 'Alice Styles',  lastModified: '1 day ago' },
  { id: '15', name: 'dim_stores',                   type: 'Table', source: 'snowflake_prod_connection', sourceProvider: 'snowflake',    tags: [],                         author: 'Priya Patel',   lastModified: '5 weeks ago' },
  { id: '16', name: 'Product Performance Model',    type: 'Model', source: 'Sales_Integration',        sourceProvider: 'snowflake',    tags: ['Sales', 'Analysis'],      author: 'David Chen',    lastModified: '10 days ago' },
  { id: '17', name: 'fact_web_events',              type: 'Table', source: 'Marketing_dbt',            sourceProvider: 'dbt',          tags: [],                         author: 'Sarah Kim',     lastModified: '1 month ago' },
  { id: '18', name: 'Customer Lifetime Value Model',type: 'Model', source: 'CRM_Integration',          sourceProvider: 'snowflake',    tags: ['CRM', 'Marketing'],       author: 'Alice Styles',  lastModified: '8 days ago' },
];

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
