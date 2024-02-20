'use client';
import React from 'react';
import AppLayout from './(pages)/layout';

const HomePage = React.lazy(() => import('./components/home/home'));

export default function Home() {
  return (
    <AppLayout>
      <HomePage />
    </AppLayout>
  );
}
