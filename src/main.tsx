import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './globals.scss';
import 'dayjs/locale/vi';
import 'dayjs/locale/en';
import dayjs from 'dayjs';

// Set initial locale for dayjs based on saved language or default to Vietnamese
const savedLanguage = localStorage.getItem('language') || 'vi';
dayjs.locale(savedLanguage);

// Get root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Make sure there is a div with id="root" in your HTML.');
}

// Create root and render app
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
