import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import App from './App';
import './globals.scss';
import 'dayjs/locale/vi';
import dayjs from 'dayjs';

dayjs.locale('vi');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={viVN}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
