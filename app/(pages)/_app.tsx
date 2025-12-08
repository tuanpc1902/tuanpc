'use client';
import React from 'react';
import AppLayout from './layout';
import { ConfigProvider } from 'antd';
import viVNLocale from 'antd/locale/vi_VN'; // Ant Design locale
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

// Set moment locale globally
dayjs().locale('vi')

function MyApp({ Component, pageProps }: any) {
  return (
    <AppLayout>
      <ConfigProvider locale={viVNLocale}>
        <Component {...pageProps} />
      </ConfigProvider>
    </AppLayout>
  );
}

export default MyApp;
