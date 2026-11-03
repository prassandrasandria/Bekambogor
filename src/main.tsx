import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initializeWebMcp } from './services/webMcp';

// Initialize WebMCP tools for Agentic Browsing & AI Agents
initializeWebMcp();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
