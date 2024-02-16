'use client';
import React from 'react';
import AppLayout from './layout';

function MyApp({ Component, pageProps }: any) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default MyApp;
