'use client';
import React, { useState } from 'react';
import AppLayout from './(pages)/layout';
import {
  CalendarIcon,
  ContactIcon,
  DownloadIcon,
  GithubIcon,
} from './components/icons/icons';
import styled from 'styled-components';
import { Button, Space, Tooltip, Image } from 'antd';
import Link from 'next/link';
import type { ConfigProviderProps } from 'antd';
import logo from '../public/author.png';

const SpaceCustom = styled(Space)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const imageAvatar = {
  src: logo.src,
  name: 'tuanpc',
  alt: 'avatar',
  h: logo.height,
  w: logo.width,
};

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];

type SizeType = ConfigProviderProps['componentSize'];

export default function Home() {
  const [size, setSize] = useState<SizeType>('large');

  return (
    <AppLayout>
      <SpaceCustom
        size={30}
        orientation="vertical"
        align="center"
        className="w-full h-screen text-white justify-center"
      >
        <div className="flex items-center justify-center w-[24rem] h-[24rem] mx-auto bg-opacity-10 border-primary rounded-full border-2 overflow-hidden shadow-lg shadow-primary/10">
          <Image
            src={imageAvatar.src}
            className="min-w-[24rem] max-w[24rem] min-h-[24rem] max-h-[24rem] rounded-full border border-teal-800 object-cover object-center"
            alt="avatar"
          />
        </div>
        <Space
          size={5}
          className="max-w-[40rem] mx-auto font-normal flex items-center leading-snug text-center text-white"
        >
          <span className="lg:leading-loose md:leading-loose sm:leading-relaxed leading-relaxed font-extrabold text-4xl sm:text-4xl lg:text-6xl md:text-6xl whitespace-nowrap">
            Phạm Công Tuấn{' '}
          </span>
          <Tooltip
            className="cursor-pointer"
            color="#fc6c8f"
            title="Download My CV"
          >
            <Link
              className="text-white hover:text-white"
              href={imageAvatar.src}
              download={imageAvatar.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadIcon
                width="2.8rem"
                height="2.8rem"
                className="download-icon hover:animate-[bounce_1s_ease-in-out_infinite] ml-2"
              />
            </Link>
          </Tooltip>
        </Space>
        <div className="grid gap-5 xl:gap-5 lg:gap-5 md:gap-4 sm:gap-4 sm:md:grid-cols-1 lg:xl:grid-cols-2  sm:items-center sm:flex-row lg:leading-loose md:leading-loose sm:leading-relaxed leading-relaxed text-2xl sm:text-2xl lg:text-3xl md:text-3xl whitespace-nowrap">
          <Link
            href={process.env.PROFILE_GITHUB_URL || '/'}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-x-4 px-8 py-4  font-semibold tracking-wide text-white bg-slate-800 rounded-lg h-[60px] w-full sm:w-[250px] button-effect hover:text-white"
          >
            <GithubIcon className="github-icon" />
            View on Github
          </Link>

          <Link
            href={process.env.PROFILE_FB_URL || '/'}
            target="_blank"
            className="inline-flex items-center justify-center gap-x-4 px-8 py-4  font-semibold tracking-wide text-white bg-gradient-primary rounded-lg h-[60px] w-full sm:w-[250px] button-effect hover:text-white"
            rel="noreferrer"
          >
            <ContactIcon className="contact-icon" />
            <span>Contact me</span>
          </Link>
          
          <Link href="/demngayraquan" className={'lg:xl:col-span-2 lg:xl:place-self-center'}>
            <Button
              type="primary"
              className="text-[18px] text-white font-bold bg-gradient-danger rounded-lg h-[60px] w-full sm:w-[250px] button-effect hover:text-white inline-flex items-center justify-center gap-x-4 px-8 py-4"
              danger
              icon={<CalendarIcon className={'calendar-icon'} />}
              size={size}
            >
              Đếm ngày ra quân
            </Button>
          </Link>
        </div>
      </SpaceCustom>
      {/* https://vt.tiktok.com/ZSFjpJpb5/ */}
    </AppLayout>
  );
}
