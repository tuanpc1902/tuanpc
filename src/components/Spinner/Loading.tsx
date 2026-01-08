import { memo } from 'react';
import { Flex, Spin, Skeleton } from 'antd';

interface LoadingProps {
  tip?: string;
  size?: 'small' | 'default' | 'large';
  fullScreen?: boolean;
  skeleton?: boolean;
  rows?: number;
}

/**
 * Loading component with customizable options
 * Supports both spinner and skeleton loading states
 */
function Loading({
  tip = 'Đang tải...',
  size = 'large',
  fullScreen = false,
  skeleton = false,
  rows = 3,
}: LoadingProps) {
  if (skeleton) {
    const skeletonContent = (
      <div style={{ width: '100%', maxWidth: '600px', padding: '2rem' }}>
        <Skeleton active paragraph={{ rows }} />
      </div>
    );

    if (fullScreen) {
      return (
        <div 
          className="flex items-center justify-center min-h-screen bg-[#2c3e50]"
          role="status"
          aria-label="Loading"
        >
          {skeletonContent}
        </div>
      );
    }

    return (
      <div role="status" aria-label="Loading">
        {skeletonContent}
      </div>
    );
  }

  const content = (
    <Flex align="center" justify="center" gap="middle" vertical>
      <Spin tip={tip} size={size} />
    </Flex>
  );

  if (fullScreen) {
    return (
      <div 
        className="flex items-center justify-center min-h-screen bg-[#2c3e50]"
        role="status"
        aria-label={tip}
      >
        {content}
      </div>
    );
  }

  return (
    <div role="status" aria-label={tip}>
      {content}
    </div>
  );
}

export default memo(Loading);
