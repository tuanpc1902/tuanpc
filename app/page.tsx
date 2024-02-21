'use client';
import React from 'react';
import AppLayout from './(pages)/layout';
import {
  ContactIcon,
  DownloadIcon,
  GithubIcon,
} from './components/icons/icons';
import Image from 'next/image';
import styled from 'styled-components';
import { Space, Tooltip } from 'antd';
import Link from 'next/link';

const SpaceCustom = styled(Space)`
  display: flex;
`;

export default function Home() {
  return (
    <AppLayout>
      <SpaceCustom
        size={30}
        direction="vertical"
        align="center"
        className="flex"
      >
        <div className="flex items-center justify-center w-[12.8rem] h-[12.8rem] mx-auto bg-opacity-10 border-primary">
          <Image
            src="/favicon.ico"
            // src="/IMG_9654.jpg"
            className="min-w-[12.8rem] h-[12.8rem] rounded-full border border-teal-800"
            alt="avatar"
            width={128}
            height={128}
          />
        </div>
        <Space
          size={5}
          className="max-w-xl mx-auto text-[3rem] font-normal flex items-center leading-snug text-center text-white lg:leading-relaxed lg:text-4xl"
        >
          Pham Cong Tuan{' '}
          <Tooltip
            className="cursor-pointer"
            color="#fc6c8f"
            title="Download My CV"
          >
            <Link
              className="text-white hover:text-white"
              href="/IMG_9654.jpg"
              download="/IMG_9654.jpg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadIcon
                width="2.8rem"
                height="2.8rem"
                className="download-icon hover:animate-[bounce_1s_ease-in-out_infinite]"
              />
            </Link>
          </Tooltip>
        </Space>
        <div className="flex flex-col justify-center gap-5 sm:items-center sm:flex-row">
          <a
            href={process.env.PROFILE_GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-x-4 px-8 py-4  font-semibold tracking-wide text-white bg-slate-800 rounded-lg h-[60px] w-full sm:w-[230px] button-effect hover:text-white"
          >
            <GithubIcon className="github-icon" />
            View on Github
          </a>

          <a
            href={process.env.PROFILE_FB_URL}
            target="_blank"
            className="inline-flex items-center justify-center gap-x-4 px-8 py-4  font-semibold tracking-wide text-white bg-gradient-primary rounded-lg h-[60px] w-full sm:w-[230px] button-effect hover:text-white"
            rel="noreferrer"
          >
            <ContactIcon className="contact-icon" />
            <span>Contact me</span>
          </a>
        </div>
      </SpaceCustom>
      {/* https://vt.tiktok.com/ZSFjpJpb5/ */}
    </AppLayout>
  );
}
