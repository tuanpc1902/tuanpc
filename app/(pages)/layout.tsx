import React, { Suspense } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return <Suspense fallback={<>Đang tải.../</>}>{children}</Suspense>;
};

export default AppLayout;
