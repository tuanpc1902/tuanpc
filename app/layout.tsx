import type { Metadata } from 'next';

import './globals.scss';

import Head from 'next/head';

export const metadata: Metadata = {
  title: 'tuanpc1',

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
    <Head>
    <metadata/>
  </Head>
    <body className={`antialiased md:subpixel-antialiased h-screen`}>{children}</body>
  </html>
);

export default RootLayout;
