import type { Metadata } from 'next';

import './globals.scss';
<<<<<<< HEAD
=======
import Head from 'next/head';
>>>>>>> e1bd2ef77ee4cc672b1f1977817062857330eeb6

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
    <body className={`antialiased md:subpixel-antialiased`}>{children}</body>
  </html>
);

export default RootLayout;
