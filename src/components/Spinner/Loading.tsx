import { memo } from 'react';
import { Flex, Spin } from 'antd';

interface LoadingProps {
  tip?: string;
  size?: 'small' | 'default' | 'large';
  fullScreen?: boolean;
}

/**
 * Loading component with customizable options
 */
function Loading({
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
      <div className="flex items-center justify-center min-h-screen bg-[#2c3e50]">
        {content}
      </div>
    );
  }

  return content;
}

export default memo(Loading);
