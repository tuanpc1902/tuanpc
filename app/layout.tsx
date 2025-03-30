import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.scss';


export const metaData: Metadata = {
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
    <body className={`antialiased h-screen `}>
      <AntdRegistry>{children}</AntdRegistry>
    </body>
  </html>
);

export default RootLayout;
