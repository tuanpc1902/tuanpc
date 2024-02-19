'use client';
import React, { Suspense } from 'react';
import { ConfigProvider, Flex, Layout } from 'antd';
const { Footer, Content } = Layout;
import styles from './pages.module.scss';
import HeaderLayout from '../components/header/page';
import antdConfig from '../(config)/antd.config';
import Spinner from '../components/spinner/spinner';

interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main id="tuanpc1902">
      <ConfigProvider theme={antdConfig.theme}>
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
              <Suspense fallback={<Spinner />}>{children}</Suspense>
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
    </main>
  );
};

export default AppLayout;
