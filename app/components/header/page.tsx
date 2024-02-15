'use client';
import { Flex, Menu, Space } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Link from 'next/link';
import styled from 'styled-components';

const StyledHeader = styled(Header)`
  color: #fff;
  padding: 0 4rem;
`;

const StyledLogo = styled.h1`
  font-size: 3.2rem;
  width: fit-content;
  margin: 0;
  background: linear-gradient(
      to right,
      rgb(100, 207, 202) 0%,
      rgb(207, 41, 193) 100%
    )
    text;
  -webkit-text-fill-color: transparent;
`;

const StyledNavigation = styled(Menu)`
  background: transparent;
  max-width: calc(100% - 20rem);
  .ant-menu-item {
    a {
      color: #fff;
      &:hover {
        color: aqua;
      }
    }
    &:hover {
      &:after {
        border-bottom-color: #fff !important;
      }
    }
  }
`;

const navigators = [
  {
    label: (
      <Link href="profile" rel="noopener noreferrer">
        Profile
      </Link>
    ),
    key: 'profile',
  },
  {
    label: (
      <Link href="projects" rel="noopener noreferrer">
        Projects
      </Link>
    ),
    key: 'projects',
  },
  {
    label: (
      <Link href="contact" rel="noopener noreferrer">
        Contact
      </Link>
    ),
    key: 'contact',
  },
];

const HeaderLayout = () => {
  return (
    <StyledHeader>
      <Flex align="center" justify="space-between">
        <Space size={20}>
          <StyledLogo>tuanpc1902</StyledLogo>
          <StyledNavigation
            items={navigators}
            mode="horizontal"
            style={{ width: 'calc(100% - 20rem);' }}
          />
        </Space>
      </Flex>
    </StyledHeader>
  );
};
export default HeaderLayout;
