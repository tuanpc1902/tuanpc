import { memo } from 'react';
import type { CountResult } from '~alias~/lib/types';
import AnimatedNumber from '~alias~/components/AnimatedNumber/AnimatedNumber';

interface CountdownItemsProps {
  display: string;
  count: CountResult;
  realTime: string;
}

const CountdownItems = memo(function CountdownItems({
  display,
  count,
  realTime,
}: CountdownItemsProps) {
  return (
    <>
      {(display === 'all' || display === 'day') && (
        <div className="countdown-item countdown-day" style={{ animationDelay: '0.25s' }}>
          <div className="countdown-value">
            <AnimatedNumber value={count.days} />
          </div>
          <div className="countdown-label">ngày</div>
        </div>
      )}
      {(display === 'all' || display === 'week') && (
        <div className="countdown-item countdown-week" style={{ animationDelay: '0.3s' }}>
          <div className="countdown-value">
            <AnimatedNumber value={count.weeks} />{' '}
            <span className="countdown-separator">tuần</span>{' '}
            <AnimatedNumber value={count.daysOfWeeks} />
          </div>
          <div className="countdown-label">ngày</div>
        </div>
      )}
      {(display === 'all' || display === 'hour') && (
        <div className="countdown-item countdown-hour" style={{ animationDelay: '0.35s' }}>
          <div className="countdown-value">{realTime}</div>
          <div className="countdown-label">thời gian còn lại</div>
        </div>
      )}
    </>
  );
});

export default CountdownItems;
