import React, { Suspense } from 'react';
import  {Roboto} from "next/font/google";

const interFont = Roboto({
  weight: ['400', '700'],
  subsets: ['latin', 'vietnamese'] ,
  display: 'swap',
  style: 'normal',
  fallback: ['system-ui', 'arial']
})
interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
      <div className={interFont.className + ` p-[2rem] flex h-full flex-col items-center justify-center px-2 sm:px-0`}>
        <Suspense fallback={<>Đang tải.../</>}>{children}</Suspense>
      </div>
  );
};

export default AppLayout;
