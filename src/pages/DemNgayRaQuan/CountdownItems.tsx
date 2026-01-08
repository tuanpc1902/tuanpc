import { memo } from 'react';
import { CountdownItem } from './styles';
import type { CountResult } from '~alias~/lib/types';

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
        <CountdownItem $color={colorMap.day}>
          <div className="countdown-value">{count.days}</div>
          <div className="countdown-label">ngày</div>
        </CountdownItem>
      )}
      {(display === 'all' || display === 'week') && (
        <CountdownItem $color={colorMap.week}>
          <div className="countdown-value">
            {count.weeks} <span className="countdown-separator">tuần</span> {count.daysOfWeeks}
          </div>
          <div className="countdown-label">ngày</div>
        </CountdownItem>
      )}
      {(display === 'all' || display === 'hour') && (
        <CountdownItem $color={colorMap.hour}>
          <div className="countdown-value">{realTime}</div>
          <div className="countdown-label">thời gian còn lại</div>
        </CountdownItem>
      )}
    </>
  );
});

export default CountdownItems;
