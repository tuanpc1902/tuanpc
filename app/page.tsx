'use client';
import React from 'react';
import AppLayout from './(pages)/layout';

const ProfilePage = React.lazy(() => import('./(pages)/profile/page'));

export default function Home() {
  return (
    <AppLayout>
      <ProfilePage />
    </AppLayout>
  );
}
