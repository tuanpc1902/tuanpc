'use client';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import  {Roboto} from "next/font/google";
import { Spin } from 'antd';

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

   const [auto, setAuto] = useState(false);
   const [percent, setPercent] = useState(-50);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setPercent((v) => {
        const nextPercent = v + 5;
        return nextPercent > 150 ? -50 : nextPercent;
      });
    }, 100);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [percent]);

   const mergedPercent = auto ? 'auto' : percent;

  return (
    <div className={`${interFont.className} flex h-full flex-col items-center justify-center px-2 sm:px-0`}>
      <Suspense fallback={<Spin size="large" className='' />}>{children}</Suspense>
    </div>
  );
};

export default AppLayout;
