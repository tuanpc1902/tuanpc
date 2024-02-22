import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.scss';
// import { Roboto_Font } from './(config)/fonts';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'tuanpc',
  description: 'My Profile',
  
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    {/* <body className={`${Roboto_Font.className} antialiased h-screen`}> */}
    <body className={`antialiased h-screen`}>
      <AntdRegistry>{children}</AntdRegistry>
    </body>
  </html>
);

export default RootLayout;
