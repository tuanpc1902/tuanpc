'use client';
import React from 'react';
import AppLayout from './(pages)/layout';
import { Poppins, Oswald } from 'next/font/google';
import HeaderLayout from './(pages)/_layout/header';

export const poppinsFont = Poppins({
  weight: ['400', '600', '700', '800'],
  fallback: ["Roboto"],
  subsets: ["latin"]
})


export const oswald = Oswald({
 weight: ["400", "600", "700"],
 subsets: ['latin', 'vietnamese'] ,
 display: 'swap',
 style: 'normal',
 fallback: ['system-ui', 'sans-serif']
})

export default function Home() {
  return (
    <AppLayout>
      <div className={oswald.className + `bg-[#222831]`}>
        <HeaderLayout/>
      </div>
    </AppLayout>
  );
}
