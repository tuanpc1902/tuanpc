import { useEffect, useState, useMemo } from 'react';
import dayjs from 'dayjs';
import type { CountResult } from '~alias~/app/lib/types';

/**
 * Custom hook để tính toán khoảng thời gian giữa ngày hiện tại và ngày mục tiêu
 * @param targetDate - Ngày mục tiêu dạng string (YYYY-MM-DD)
 * @returns Object chứa các giá trị đã tính toán
 */
export function useDateCalculations(targetDate: string): CountResult {
  const [count, setCount] = useState<CountResult>({
    days: '0',
    weeks: '0',
    months: '0',
    daysOfWeeks: '0',
    weeksOfMonths: '0',
    dayOfMonths: '0',
  });

  const calculations = useMemo(() => {
    const normalized =
      typeof targetDate === 'string' ? targetDate.trim() : String(targetDate);

    const dayjsTarget = dayjs(normalized, 'YYYY-MM-DD', true).isValid()
      ? dayjs(normalized, 'YYYY-MM-DD', true).startOf('day')
      : dayjs(normalized).startOf('day');

    const dayjsNow = dayjs().startOf('day');

    if (!dayjsTarget.isValid()) {
      return {
        days: '0',
        weeks: '0',
        months: '0',
        daysOfWeeks: '0',
        weeksOfMonths: '0',
        dayOfMonths: '0',
      };
    }

    // Calculate total days difference
    const days = dayjsTarget.diff(dayjsNow, 'days');
    
    if (days < 0) {
      return {
        days: '0',
        weeks: '0',
        months: '0',
        daysOfWeeks: '0',
        weeksOfMonths: '0',
        dayOfMonths: '0',
      };
    }

    // Calculate months difference
    const months = dayjsTarget.diff(dayjsNow, 'months');
    
    // Calculate remaining days after months
    const dateAfterMonths = dayjsNow.add(months, 'month');
    const remainingDaysAfterMonths = dayjsTarget.diff(dateAfterMonths, 'days');
    
    // Calculate weeks from remaining days
    const weeksOfMonths = Math.floor(remainingDaysAfterMonths / 7);
    
    // Calculate remaining days after weeks
    const dayOfMonths = remainingDaysAfterMonths % 7;
    
    // Calculate total weeks
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

  useEffect(() => {
    setCount(calculations);
  }, [calculations]);

  return count;
}

