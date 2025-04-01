import React, { Suspense } from 'react';
import { Poppins } from 'next/font/google';

interface LayoutProps {
  children: React.ReactNode;
}

const poppinsFont = Poppins({
  weight: ["400", "800"],
  subsets: ["latin"],
  fallback: ["Roboto"]
})

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
      <div className={poppinsFont.className + ``}>
        <Suspense fallback={<>Đang tải.../</>}>{children}</Suspense>
      </div>
  );
};

export default AppLayout;
