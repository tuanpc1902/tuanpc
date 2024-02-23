import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.scss';
// import { Roboto_Font } from './(config)/fonts';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'tuanpc',
  description: 'My Profile',
  icons: {
    icon: '/favicon.ico'
  },
  verification: {
    other: {
      facebook: ['fb.com/tuanpc1902']
    }
  }
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i&display=swap" />
    </head>
    {/* <body className={`${Roboto_Font.className} antialiased h-screen`}> */}
    <body className={`antialiased h-screen`}>
      <AntdRegistry>{children}</AntdRegistry>
    </body>
  </html>
);

export default RootLayout;
