import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { InspectorProvider } from './context/InspectorContext';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import App from './App';
import './styles/global.css';

const isIgnored = () => {
  try { return localStorage.getItem('vercel_ignore') === 'true'; } catch { return false; }
};

inject({
  beforeSend: (event) => isIgnored() ? null : event,
});
injectSpeedInsights();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <InspectorProvider>
        <App />
      </InspectorProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
