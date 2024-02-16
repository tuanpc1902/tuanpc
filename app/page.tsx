'use client';
import React from 'react';
import ProfilePage from './(pages)/profile/page';
import AppLayout from './(pages)/layout';

export default function Home() {
  return (
    <AppLayout>
      <ProfilePage />
    </AppLayout>
  );
}
