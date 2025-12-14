import type { Metadata } from 'next';

import './globals.scss';
import { Suspense } from 'react';
import Loading from './components/Spinner/Loading';
export const metadata: Metadata = {
  title: 'tuanpc',

  description: 'My Profile',

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
  <html lang="en">
    <head></head>
    <Suspense fallback={<Loading/>}><body className={`antialiased h-screen`}>{children}</body></Suspense>
  </html>
);

export default RootLayout;
