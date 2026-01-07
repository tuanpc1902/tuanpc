import { useMemo } from 'react';
import dayjs from 'dayjs';
import type { CountResult } from '~alias~/app/lib/types';

/**
 * Custom hook để tính toán khoảng thời gian giữa ngày hiện tại và hết ngày trước ngày mục tiêu
 * Ví dụ: nếu targetDate là 28/01/2026, sẽ tính đến hết ngày 27/01/2026 (23:59:59)
 * @param targetDate - Ngày mục tiêu dạng string (YYYY-MM-DD)
 * @returns Object chứa các giá trị đã tính toán
 */
export function useDateCalculations(targetDate: string): CountResult {
  return useMemo(() => {
    if (!targetDate) {
      return {
        days: '0',
        weeks: '0',
        months: '0',
        daysOfWeeks: '0',
        weeksOfMonths: '0',
        dayOfMonths: '0',
      };
    }

    const normalized =
      typeof targetDate === 'string' ? targetDate.trim() : String(targetDate);

    // Tính đến hết ngày trước ngày được chọn (ví dụ: chọn 28/01/2026 thì tính đến hết 27/01/2026)
    const dayjsTarget = dayjs(normalized, 'YYYY-MM-DD', true).isValid()
      ? dayjs(normalized, 'YYYY-MM-DD', true).subtract(1, 'day').endOf('day')
      : dayjs(normalized).subtract(1, 'day').endOf('day');

    const dayjsNow = dayjs();

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

    // Calculate total days difference (using floor to handle partial days)
    const days = Math.floor(dayjsTarget.diff(dayjsNow, 'days', true));
    
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
    
    // Calculate remaining days after months (using floor to handle partial days)
    const dateAfterMonths = dayjsNow.add(months, 'month');
    const remainingDaysAfterMonths = Math.floor(dayjsTarget.diff(dateAfterMonths, 'days', true));
    
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
}

