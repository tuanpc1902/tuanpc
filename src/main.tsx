import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import App from './App';
import './globals.scss';
import 'dayjs/locale/vi';
import dayjs from 'dayjs';

// Set Vietnamese locale for dayjs
dayjs.locale('vi');

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
      <ConfigProvider locale={viVN}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
