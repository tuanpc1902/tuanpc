import { memo } from 'react';
import { CountdownItem } from './styles';
import type { CountResult } from '~alias~/app/lib/types';

interface CountdownItemsProps {
  display: string;
  count: CountResult;
  realTime: string;
}

/**
 * Component hiển thị các countdown items
 * Memoized để tránh re-render không cần thiết
 */
const CountdownItems = memo(function CountdownItems({
  display,
  count,
  realTime,
}: CountdownItemsProps) {
  return (
    <>
      {(display === 'all' || display === 'day') && (
        <CountdownItem $color="#fd79a8">
          {count.days} ngày
        </CountdownItem>
      )}
      {(display === 'all' || display === 'week') && (
        <CountdownItem $color="#00cec9">
          {count.weeks} tuần {count.daysOfWeeks} ngày
        </CountdownItem>
      )}
      {(display === 'all' || display === 'hour') && (
        <CountdownItem $color="#ff7675">
          {realTime}
        </CountdownItem>
      )}
    </>
  );
});

export default CountdownItems;

