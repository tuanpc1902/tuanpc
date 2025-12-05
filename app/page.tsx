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

import logo from '../public/img.png';

const SpaceCustom = styled(Space)`
  display: flex;
`;

const imageAvatar = {
  src: logo.src,
  name: 'tuanpc',
  alt: 'avatar',
  h: logo.height,
  w: logo.width,
};

export default function Home() {
  return (
    <AppLayout>
      <SpaceCustom
        size={30}
        direction="vertical"
        align="center"
        className="flex"
      >
        <div className="flex items-center justify-center w-[18rem] h-[18rem] mx-auto bg-opacity-10 border-primary">
          <Image
            src={imageAvatar.src}
            className="min-w-[12.8rem] max-w[18rem] min-h-[12.8rem] max-h-[18rem] rounded-full border border-teal-800 object-cover object-center"
            alt="avatar"
            width={240}
            height={240}
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
                className="download-icon hover:animate-[bounce_1s_ease-in-out_infinite]"
              />
            </Link>
          </Tooltip>
        </Space>
        <div className="flex flex-col justify-center gap-5 sm:items-center sm:flex-row lg:leading-loose md:leading-loose sm:leading-relaxed leading-relaxed text-2xl sm:text-2xl lg:text-3xl md:text-3xl whitespace-nowrap">
          <a
            href={process.env.PROFILE_GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-x-4 px-8 py-4  font-semibold tracking-wide text-white bg-slate-800 rounded-lg h-[60px] w-full sm:w-[250px] button-effect hover:text-white"
          >
            <GithubIcon className="github-icon" />
            View on Github
          </a>

          <a
            href={process.env.PROFILE_FB_URL}
            target="_blank"
            className="inline-flex items-center justify-center gap-x-4 px-8 py-4  font-semibold tracking-wide text-white bg-gradient-primary rounded-lg h-[60px] w-full sm:w-[250px] button-effect hover:text-white"
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
