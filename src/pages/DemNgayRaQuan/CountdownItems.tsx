import { memo } from 'react';
import { CountdownItem } from './styles';
import type { CountResult } from '~alias~/lib/types';
import AnimatedNumber from '~alias~/components/AnimatedNumber/AnimatedNumber';

interface CountdownItemsProps {
  display: string;
  count: CountResult;
  realTime: string;
}

const colorMap = {
  day: '#9b59b6',
  week: '#1abc9c',
  hour: '#e74c3c',
} as const;

const CountdownItems = memo(function CountdownItems({
  display,
  count,
  realTime,
}: CountdownItemsProps) {
  return (
    <>
      {(display === 'all' || display === 'day') && (
        <CountdownItem $color={colorMap.day} $index={0}>
          <div className="countdown-value">
            <AnimatedNumber value={count.days} />
          </div>
          <div className="countdown-label">ngày</div>
        </CountdownItem>
      )}
      {(display === 'all' || display === 'week') && (
        <CountdownItem $color={colorMap.week} $index={1}>
          <div className="countdown-value">
            <AnimatedNumber value={count.weeks} />{' '}
            <span className="countdown-separator">tuần</span>{' '}
            <AnimatedNumber value={count.daysOfWeeks} />
          </div>
          <div className="countdown-label">ngày</div>
        </CountdownItem>
      )}
      {(display === 'all' || display === 'hour') && (
        <CountdownItem $color={colorMap.hour} $index={2}>
          <div className="countdown-value">{realTime}</div>
          <div className="countdown-label">thời gian còn lại</div>
        </CountdownItem>
      )}
    </>
  );
});

export default CountdownItems;
