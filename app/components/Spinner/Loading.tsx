import React from 'react';
import { Flex, Spin } from 'antd';

interface LoadingProps {
  tip?: string;
  size?: 'small' | 'default' | 'large';
  fullScreen?: boolean;
}

/**
 * Loading component với các tùy chọn tùy chỉnh
 * @param tip - Text hiển thị khi loading
 * @param size - Kích thước spinner
 * @param fullScreen - Có hiển thị full screen không
 */
export default function Loading({
  tip = 'Đang tải...',
  size = 'large',
  fullScreen = false,
}: LoadingProps) {
  const content = (
    <Flex align="center" justify="center" gap="middle" vertical>
      <Spin tip={tip} size={size} />
    </Flex>
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {content}
      </div>
    );
  }

  return content;
}