import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initConsentDefaults } from './analytics/consent';
import './index.css';

initConsentDefaults();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
