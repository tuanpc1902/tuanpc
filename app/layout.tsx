import type { Metadata } from 'next';
import './globals.scss';
import { Suspense } from 'react';
import Loading from './components/Spinner/Loading';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

export const metadata: Metadata = {
  title: 'tuanpc - Phạm Công Tuấn',
  description: 'My Profile - Portfolio và các công cụ hữu ích',
  icons: {
    icon: '/favicon.ico',
  },
  verification: {
    other: {
      facebook: ['fb.com/tuanpc1902'],
    },
  },
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="vi">
    <head></head>
    <ErrorBoundary>
      <Suspense fallback={<Loading fullScreen />}>
        <body className={`antialiased h-screen`}>{children}</body>
      </Suspense>
    </ErrorBoundary>
  </html>
);

export default RootLayout;
