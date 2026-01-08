import { Flex, Spin } from 'antd';

interface LoadingProps {
  tip?: string;
  size?: 'small' | 'default' | 'large';
  fullScreen?: boolean;
}

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
