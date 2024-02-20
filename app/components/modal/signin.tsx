import { Modal } from 'antd';
import { MouseEvent, useState } from 'react';

type TSignUpModal = {
  open: boolean;
  handleCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const SignUpModal = ({ open, handleCancel }: TSignUpModal) => {
  const handleOk = () => {};

  return (
    <>
      <Modal title="Title" open={open} onOk={handleOk} onCancel={handleCancel}>
        <p>{123}</p>
      </Modal>
    </>
  );
};
export default SignUpModal;
