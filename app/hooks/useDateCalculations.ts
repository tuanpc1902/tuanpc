import { useMemo } from 'react';
import dayjs from 'dayjs';
import type { CountResult } from '~alias~/app/lib/types';

const EMPTY_RESULT: CountResult = {
  days: '0',
  weeks: '0',
  months: '0',
  daysOfWeeks: '0',
  weeksOfMonths: '0',
  dayOfMonths: '0',
};

export function useDateCalculations(targetDate: string): CountResult {
  return useMemo(() => {
    if (!targetDate) return EMPTY_RESULT;

    const normalized = typeof targetDate === 'string' ? targetDate.trim() : String(targetDate);
    const dayjsTarget = dayjs(normalized, 'YYYY-MM-DD', true).isValid()
      ? dayjs(normalized, 'YYYY-MM-DD', true).subtract(1, 'day').endOf('day')
      : dayjs(normalized).subtract(1, 'day').endOf('day');

    if (!dayjsTarget.isValid()) return EMPTY_RESULT;

    const dayjsNow = dayjs();
    const days = Math.floor(dayjsTarget.diff(dayjsNow, 'days', true));
    
    if (days < 0) return EMPTY_RESULT;

    const months = dayjsTarget.diff(dayjsNow, 'months');
    const dateAfterMonths = dayjsNow.add(months, 'month');
    const remainingDaysAfterMonths = Math.floor(dayjsTarget.diff(dateAfterMonths, 'days', true));
    const weeksOfMonths = Math.floor(remainingDaysAfterMonths / 7);
    const dayOfMonths = remainingDaysAfterMonths % 7;
    const weeks = Math.floor(days / 7);
    const dayOfWeeks = days % 7;

    return {
      days: String(days),
      weeks: String(weeks),
      months: String(months),
      daysOfWeeks: String(dayOfWeeks),
      weeksOfMonths: String(weeksOfMonths),
      dayOfMonths: String(dayOfMonths),
    };
  }, [targetDate]);
}

