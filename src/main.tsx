import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { InspectorProvider } from './context/InspectorContext';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <InspectorProvider>
        <App />
      </InspectorProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
