'use client';
import React, { Suspense } from 'react';
import { ConfigProvider, Flex, Layout } from 'antd';
const { Footer, Content } = Layout;
import styles from './pages.module.scss';
import HeaderLayout from '../components/header/page';
import antdConfig from '../(config)/antd.config';
import Spinner from '../components/spinner/spinner';
import styled from 'styled-components';

interface LayoutProps {
  children: React.ReactNode;
}

const StyledContent = styled(Content)``;

const StyledFooter = styled(Footer)`
  color: #fff;
`;

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ConfigProvider theme={antdConfig.theme}>
      <main id="__tuanpc1902" className="">
        <Flex
          gap="middle"
          wrap="wrap"
          align="center"
          justify="center"
          className="max-w-[128rem] mx-auto"
        >
          <Layout className="">
            <HeaderLayout />
            <StyledContent className="mt-[2rem] h-[50rem] p-[2rem]">
              <Suspense fallback={<Spinner />}>{children}</Suspense>
            </StyledContent>
            <StyledFooter className="p-[2rem] text-center bg-[rgba(15 23 42 / var(--tw-bg-opacity))]">
              ©2024 tuanpc
            </StyledFooter>
          </Layout>
        </Flex>
      </main>
    </ConfigProvider>
  );
};

export default AppLayout;
