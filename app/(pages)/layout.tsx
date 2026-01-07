'use client';
import React, { Suspense, memo } from 'react';
import { Roboto } from "next/font/google";
import Loading from '~alias~/app/components/Spinner/Loading';

const interFont = Roboto({
  weight: ['400', '700'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  style: 'normal',
  fallback: ['system-ui', 'arial'],
  preload: true,
});

interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={`${interFont.className} flex h-full flex-col items-center justify-center px-2 sm:px-0`}>
      <Suspense fallback={<Loading fullScreen />}>{children}</Suspense>
    </div>
  );
};

export default memo(AppLayout);
