import { Button, Checkbox, Form, Input, Modal } from 'antd';
import styled from 'styled-components';
import { TFieldTypeSignUp } from './sign-up-types';
import { sql } from '@vercel/postgres';
import { User } from '~alias~/app/lib/definitions';
import { getUser, getUserByUsername } from '~alias~/app/lib/data';
import { useFormState } from 'react-dom';

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

const StyledModal = styled(Modal)``;

const StyledSignUpModal = styled(Form)`
  margin: 0 auto;
  .ant-form-item {
    .ant-form-item-label {
      text-align: left;
    }
  }
`;

export default function SignUpModal({ open, handleCancel }: TSignUpModal) {
  return (
    <>
      <StyledModal
        title="Sign up"
        open={open}
        onOk={() => {}}
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
          <Form.Item<TFieldTypeSignUp>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<TFieldTypeSignUp>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<TFieldTypeSignUp>
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
}
