import React from 'react';
import { Flex, Spin } from 'antd';

export default function Loading() {
  return (
    <Flex align="center" gap="middle">
      <Spin tip="Loading" size="large">
      </Spin>
    </Flex>
  )
}