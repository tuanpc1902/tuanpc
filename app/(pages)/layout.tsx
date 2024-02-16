'use client';
import React from 'react';
import { ConfigProvider, Flex, Layout } from 'antd';
const { Footer, Content } = Layout;
import styles from './pages.module.scss';
import HeaderLayout from '../components/header/page';
import { Inter } from 'next/font/google';
const Inter_Font = Inter({ subsets: ['latin', 'vietnamese'] });

interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: Inter_Font.style.fontFamily,
        },
      }}
    >
      <Flex
        gap="middle"
        wrap="wrap"
        align="center"
        justify="center"
        className={`${styles.app__layout}`}
      >
        <Layout className={`${styles.flex}`}>
          <HeaderLayout />
          <Content style={{ padding: '20px 40px', height: 800 }}>
            {children}
          </Content>
          <Footer
            style={{
              textAlign: 'center',
              background: '#001529',
              color: '#fff',
            }}
          >
            ©2024 tuanpc1902
          </Footer>
        </Layout>
      </Flex>
    </ConfigProvider>
  );
};

export default AppLayout;
