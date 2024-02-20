'use client';
import { Button, Flex, Space } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Link from 'next/link';
import styled from 'styled-components';
import SignUpModal from '../modal/signup';
import { useState } from 'react';

const StyledHeader = styled(Header)`
  background: rgba(15 23 42 / var(--tw-bg-opacity));
  padding: 2rem;
  height: 8.5rem;
  line-height: 8.5rem;
  border-bottom: 1px solid rgb(30 41 59/1);
`;

const StyledSpace = styled(Space)`
  width: 100%;
`;

const SignUpButton = styled(Button)`
  background: transparent;
  border: 0;
  color: #fff;
  &:hover {
    background: transparent !important;
    border: 0 !important;
    color: #fff !important;
  }
  height: auto;
  padding: 0.8rem 2rem;
`;

const LoginButton = styled(Button)`
  border: 0;
  height: auto;
  padding: 0.8rem 2rem;
`;

const HeaderLayout = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <>
      <StyledHeader className="flex items-center text-[#fff]">
        <Flex align="center" justify="space-between" className="w-full">
          <StyledSpace size={20} className="justify-between w-full">
            <Link href="/">
              <div className="font-bold m-0 max-w-fit text-[2.5rem] bg-gradient-primary bg-clip-text text-transparent">
                tuanpc
              </div>
            </Link>
            <Space>
              <SignUpButton
                className=""
                onClick={() => setOpenModal(true)}
                onTouchStart={() => setOpenModal(true)}
              >
                Sign up
              </SignUpButton>
              <LoginButton type="primary" className="bg-gradient-primary">
                Login
              </LoginButton>
            </Space>
          </StyledSpace>
        </Flex>
      </StyledHeader>
      <SignUpModal open={openModal} handleCancel={handleCancel} />
    </>
  );
};
export default HeaderLayout;
