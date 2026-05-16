import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import type { IncomingMessage, ServerResponse } from 'http';

function getMockResponse(prompt: string) {
  const reasoning = [
    { name: 'Understand the request', text: 'Analysing the user prompt and current model state to determine the best response type.' },
    { name: 'Evaluate model state', text: 'Checking which tables, columns, and joins are already present before making suggestions.' },
    { name: 'Generate suggestions', text: 'Selecting the most relevant items based on a typical retail analytics schema.' },
  ];

  if (prompt.includes('suggest joins') || prompt.includes('add joins')) {
    return {
      type: 'joins', message: "Here are the joins that best connect your tables. These relationships will let Spotter answer questions across your model.", context: null, reasoningSteps: reasoning,
      suggestions: [
        { name: 'Join 1', desc: 'Link orders to customers via customer_id', leftTable: 'fact_orders', leftCol: 'customer_id', cardinality: 'Many : 1', rightTable: 'dim_customers', rightCol: 'customer_id' },
        { name: 'Join 2', desc: 'Link order items to products via product_id', leftTable: 'fact_order_items', leftCol: 'product_id', cardinality: 'Many : 1', rightTable: 'dim_products', rightCol: 'product_id' },
        { name: 'Join 3', desc: 'Link orders to stores via store_id', leftTable: 'fact_orders', leftCol: 'store_id', cardinality: 'Many : 1', rightTable: 'dim_stores', rightCol: 'store_id' },
      ],
      questions: [], chips: [], modifications: [], loadingMessage: null,
    };
  }

  if (prompt.includes('add columns') || prompt.includes('suggest columns')) {
    return {
      type: 'columns', message: "I've selected the most analytically useful columns from your tables. These cover key metrics, dimensions, and identifiers Spotter will need.", context: null, reasoningSteps: reasoning,
      suggestions: [
        { table: 'fact_orders', columns: ['order_id', 'order_date', 'customer_id', 'store_id', 'total_amount', 'status'] },
        { table: 'dim_customers', columns: ['customer_id', 'full_name', 'email', 'region', 'segment'] },
        { table: 'dim_products', columns: ['product_id', 'product_name', 'category', 'unit_price', 'brand'] },
      ],
      questions: [], chips: [], modifications: [], loadingMessage: null,
    };
  }

  if (prompt.includes('generate formulas') || prompt.includes('add formulas') || prompt.includes('add metrics')) {
    return {
      type: 'formula_req', message: "What calculations or KPIs do you need? Describe the metrics you want to track — for example, revenue growth, average order value, or customer retention rate.", context: null, reasoningSteps: reasoning,
      suggestions: [], questions: [], chips: [], modifications: [], loadingMessage: null,
    };
  }

  if (prompt.includes('revenue') || prompt.includes('profit') || prompt.includes('margin') || prompt.includes('growth') || prompt.includes('kpi')) {
    return {
      type: 'formulas', message: "Here are formulas for the metrics you described. These use your existing columns and follow DAX conventions.", context: null, reasoningSteps: reasoning,
      suggestions: [
        { name: 'Total Revenue (REV)', code: 'SUM(fact_orders[total_amount])' },
        { name: 'Average Order Value (AOV)', code: 'DIVIDE(SUM(fact_orders[total_amount]), COUNTROWS(fact_orders))' },
        { name: 'YoY Revenue Growth (%)', code: 'DIVIDE([Total Revenue (REV)] - CALCULATE([Total Revenue (REV)], SAMEPERIODLASTYEAR(dim_date[date])), CALCULATE([Total Revenue (REV)], SAMEPERIODLASTYEAR(dim_date[date])))' },
        { name: 'Customer Count (CUST)', code: 'DISTINCTCOUNT(fact_orders[customer_id])' },
      ],
      questions: [], chips: [], modifications: [], loadingMessage: null,
    };
  }

  if (prompt.includes('enrich') || prompt.includes('ai readiness') || prompt.includes('ai-ready')) {
    return {
      type: 'enrich', message: "Here are specific improvements to make this model AI-ready:\n\n1. Add a description to `total_amount` — the column name alone doesn't indicate the currency or whether it's pre- or post-tax.\n2. Set AI context on `status` in `fact_orders` — clarify the allowed values (e.g. 'pending', 'shipped', 'returned').\n3. Add AI context to `segment` in `dim_customers` — explain what segments exist and how they're defined.\n4. Rename formula `Total Revenue (REV)` to include a business description so Spotter maps natural-language queries correctly.\n5. Add descriptions to `dim_stores` columns — store region and tier are ambiguous without context.\n\nWould you like me to apply all of these, or only specific ones? If only some, just tell me the numbers.", context: null, reasoningSteps: reasoning,
      suggestions: [], questions: [], chips: [], modifications: [], loadingMessage: null,
    };
  }

  if (prompt.includes('suggest tables') || prompt.includes('add tables') || prompt.includes('i want you to suggest tables')) {
    return {
      type: 'tables', message: "Here are the tables I recommend for a retail analytics model. Together they cover orders, customers, products, and stores — the core dimensions Spotter needs to answer sales questions.", context: null, reasoningSteps: reasoning,
      suggestions: [
        { name: 'fact_orders', desc: 'Core transaction table — one row per order with totals and status', pct: 97 },
        { name: 'dim_customers', desc: 'Customer master with region, segment, and contact details', pct: 94 },
        { name: 'dim_products', desc: 'Product catalogue with category, brand, and pricing', pct: 91 },
        { name: 'dim_stores', desc: 'Store locations with region and tier attributes', pct: 86 },
        { name: 'fact_order_items', desc: 'Line-item detail for per-product revenue and quantity analysis', pct: 83 },
      ],
      questions: [], chips: [], modifications: [], loadingMessage: null,
    };
  }

  // Default: clarify
  return {
    type: 'clarify', message: "Thanks — I have a couple of quick questions before I suggest tables.", context: null, reasoningSteps: reasoning,
    suggestions: [],
    questions: [
      { text: 'What is the primary business question this model should answer?' },
      { text: 'Who are the main users — analysts, executives, or operational teams?' },
    ],
    chips: [], modifications: [], loadingMessage: null,
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
  plugins: [
    react(),
    {
      name: 'api-chat',
      configureServer(server) {
        server.middlewares.use('/api/chat', async (req: IncomingMessage, res: ServerResponse) => {
          if (req.method !== 'POST') {
            res.statusCode = 405;
            res.end();
            return;
          }
          const chunks: Buffer[] = [];
          req.on('data', (chunk: Buffer) => chunks.push(chunk));
          req.on('end', async () => {
            try {
              const body = Buffer.concat(chunks).toString();
              const apiKey = env.ANTHROPIC_API_KEY;

              // No API key — return a realistic mock response based on the prompt
              if (!apiKey) {
                const parsed = JSON.parse(body);
                const lastMsg: string = parsed.messages?.slice(-1)[0]?.content ?? '';
                const prompt = lastMsg.split('\n')[0].toLowerCase();
                const mock = getMockResponse(prompt);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ content: [{ type: 'text', text: JSON.stringify(mock) }] }));
                return;
              }

              const upstream = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                  'x-api-key': apiKey,
                  'anthropic-version': '2023-06-01',
                  'content-type': 'application/json',
                },
                body,
              });
              const data = await upstream.json();
              res.statusCode = upstream.status;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
            } catch (e: unknown) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              const msg = e instanceof Error ? e.message : String(e);
              res.end(JSON.stringify({ error: { message: msg } }));
            }
          });
        });
      },
    },
  ],
  build: {
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@tokens': path.resolve(__dirname, './src/tokens'),
      '@components': path.resolve(__dirname, './src/components'),
      '@spotter': path.resolve(__dirname, './src/spotter'),
    },
  },
  };
});
