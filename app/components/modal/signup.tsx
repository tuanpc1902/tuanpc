import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { MouseEvent, useState } from 'react';
import styled from 'styled-components';

type TSignUpModal = {
  open: boolean;
  handleCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  confirmPassword?: string;
};

const StyledModal = styled(Modal)`
  .ant-modal-body {
  }
`;

const StyledSignUpModal = styled(Form)`
  .ant-form-item .ant-form-item-label {
    text-align: left;
  }
`;

const SignUpModal = ({ open, handleCancel }: TSignUpModal) => {
  const handleOk = () => {};

  return (
    <>
      <StyledModal
        title="Sign up"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={<></>}
      >
        <StyledSignUpModal
          className=""
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 400 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: 'Please input your confirm password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </StyledSignUpModal>
      </StyledModal>
    </>
  );
};
export default SignUpModal;
