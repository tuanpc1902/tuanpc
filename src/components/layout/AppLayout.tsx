import { Suspense, memo } from 'react';
import Loading from '../Spinner/Loading';

interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="font-roboto flex h-full flex-col items-center justify-center px-2 sm:px-0">
      <Suspense fallback={<Loading fullScreen />}>{children}</Suspense>
    </div>
  );
};

export default memo(AppLayout);
