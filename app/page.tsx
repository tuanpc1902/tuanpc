'use client';
import { memo } from 'react';
import AppLayout from './(pages)/layout';
import {
  CalendarIcon,
  ContactIcon,
  DownloadIcon,
  GithubIcon,
} from './components/icons/icons';
import { Button, Space, Tooltip, Image } from 'antd';
import Link from 'next/link';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { ENV_VARS } from '~alias~/app/lib/constants';

const imageAvatar = {
  src: '/author.webp',
  name: 'tuanpc',
  alt: 'avatar',
} as const;

function Home() {
  return (
    <ErrorBoundary>
      <AppLayout>
        <Space
          size={30}
          orientation="vertical"
          align="center"
          className="w-full h-screen text-white justify-center flex flex-col items-center"
        >
          <div className="flex items-center justify-center w-[24rem] h-[24rem] mx-auto bg-opacity-10 border-primary rounded-full border-2 overflow-hidden shadow-lg shadow-primary/10">
            <Image
              src={imageAvatar.src}
              className="rounded-full border border-teal-800 object-cover object-center"
              alt={imageAvatar.alt}
              width={240}
              height={240}
              loading="lazy"
            />
          </div>
          
          <Space
            size={5}
            className="max-w-[40rem] mx-auto font-normal flex items-center leading-snug text-center text-white"
          >
            <span className="font-extrabold text-4xl lg:text-6xl whitespace-nowrap">
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
          
          <div className="grid gap-4 sm:gap-5 lg:grid-cols-2 sm:items-center text-2xl lg:text-3xl whitespace-nowrap">
            <Link
              href={ENV_VARS.PROFILE_GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-x-4 px-8 py-4 font-semibold tracking-wide text-white bg-slate-800 rounded-lg h-[60px] w-full sm:w-[250px] button-effect hover:text-white"
            >
              <GithubIcon className="github-icon" />
              View on Github
            </Link>

            <Link
              href={ENV_VARS.PROFILE_FB_URL}
              target="_blank"
              className="inline-flex items-center justify-center gap-x-4 px-8 py-4 font-semibold tracking-wide text-white bg-gradient-primary rounded-lg h-[60px] w-full sm:w-[250px] button-effect hover:text-white"
              rel="noreferrer"
            >
              <ContactIcon className="contact-icon" />
              <span>Contact me</span>
            </Link>
            
            <Link href="/demngayraquan" className="lg:col-span-2 lg:place-self-center">
              <Button
                type="primary"
                className="text-lg text-white font-bold bg-gradient-danger rounded-lg h-[60px] w-full sm:w-[250px] button-effect hover:text-white inline-flex items-center justify-center gap-x-4 px-8 py-4"
                danger
                icon={<CalendarIcon className="calendar-icon" />}
                size="large"
              >
                Đếm ngày ra quân
              </Button>
            </Link>
          </div>
        </Space>
      </AppLayout>
    </ErrorBoundary>
  );
}

export default memo(Home);
