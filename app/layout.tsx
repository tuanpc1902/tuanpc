import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.scss';
import { Roboto_Font } from './(config)/fonts';

export const metadata: Metadata = {
  title: 'tuanpc1902',
  description: 'Generated by create next app',
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body className={`${Roboto_Font.className} antialiased`}>
      <AntdRegistry>{children}</AntdRegistry>
    </body>
  </html>
);

export default RootLayout;
