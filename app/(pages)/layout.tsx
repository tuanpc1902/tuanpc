import React, { Suspense } from 'react';
import { ConfigProvider } from 'antd';
import antdConfig from '../(config)/antd.config';
import Spinner from '../components/spinner/spinner';

interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ConfigProvider theme={antdConfig.theme}>
      <div className="p-[2rem] flex h-full flex-col items-center justify-center px-2 sm:px-0">
        <Suspense fallback={<Spinner />}>{children}</Suspense>
      </div>
    </ConfigProvider>
  );
};

export default AppLayout;
