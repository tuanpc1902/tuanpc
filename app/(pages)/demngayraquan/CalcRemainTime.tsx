import dayjs from 'dayjs';
import type { RemainTimeResult } from '~alias~/app/lib/types';

const EMPTY_TIME: RemainTimeResult = { hours: 0, minutes: 0, seconds: 0 };

export default function CalcRemainTime(targetDate: string): RemainTimeResult {
  const normalized = typeof targetDate === 'string' ? targetDate.trim() : String(targetDate);
  const target = dayjs(normalized, 'YYYY-MM-DD', true).isValid()
    ? dayjs(normalized, 'YYYY-MM-DD', true).subtract(1, 'day').endOf('day')
    : dayjs(normalized).subtract(1, 'day').endOf('day');

  if (!target.isValid()) return EMPTY_TIME;

  const now = dayjs();
  if (target.isBefore(now) || target.isSame(now)) return EMPTY_TIME;

  const diffSeconds = target.diff(now, 'seconds');
  return {
    hours: Math.floor(diffSeconds / 3600),
    minutes: Math.floor((diffSeconds % 3600) / 60),
    seconds: diffSeconds % 60,
  };
}
