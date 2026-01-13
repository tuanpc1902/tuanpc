import { useEffect, useState, useMemo, useRef } from 'react';
import dayjs from 'dayjs';
import type { CountResult } from '~alias~/lib/types';
import { getTargetEndOfDay } from '~alias~/lib/utils/dateHelpers';

const EMPTY_RESULT: CountResult = {
  days: '0',
  weeks: '0',
  months: '0',
  daysOfWeeks: '0',
  weeksOfMonths: '0',
  dayOfMonths: '0',
};

const UPDATE_INTERVAL = 1000; // 1 second - update in real-time

/**
 * Hook to calculate time differences between now and target date
 * Returns days, weeks, months, and their breakdowns
 * Automatically updates in real-time
 */
export function useDateCalculations(targetDate: string): CountResult {
  const [now, setNow] = useState<dayjs.Dayjs>(dayjs());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const targetDateRef = useRef(targetDate);

  // Update targetDate ref when it changes
  useEffect(() => {
    targetDateRef.current = targetDate;
  }, [targetDate]);

  // Set up interval to update 'now' in real-time
  useEffect(() => {
    // Initial update
    setNow(dayjs());

    // Set up interval for real-time updates
    intervalRef.current = setInterval(() => {
      setNow(dayjs());
    }, UPDATE_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return useMemo(() => {
    const currentTargetDate = targetDateRef.current;
    
    if (!currentTargetDate || typeof currentTargetDate !== 'string' || !currentTargetDate.trim()) {
      return EMPTY_RESULT;
    }

    try {
      const dayjsTarget = getTargetEndOfDay(currentTargetDate);
      
      if (!dayjsTarget || !dayjsTarget.isValid()) {
        return EMPTY_RESULT;
      }

      const dayjsNow = now;
      
      // Check if target date is in the past
      if (dayjsTarget.isBefore(dayjsNow) || dayjsTarget.isSame(dayjsNow)) {
        return EMPTY_RESULT;
      }

      // Calculate total days
      const days = Math.floor(dayjsTarget.diff(dayjsNow, 'days', true));
      
      if (days < 0) {
        return EMPTY_RESULT;
      }

      // Calculate weeks and remaining days
      const weeks = Math.floor(days / 7);
      const dayOfWeeks = days % 7;

      // Calculate months and remaining time
      const months = dayjsTarget.diff(dayjsNow, 'months');
      const dateAfterMonths = dayjsNow.add(months, 'month');
      const remainingDaysAfterMonths = Math.floor(
        dayjsTarget.diff(dateAfterMonths, 'days', true)
      );
      const weeksOfMonths = Math.floor(remainingDaysAfterMonths / 7);
      const dayOfMonths = remainingDaysAfterMonths % 7;

      return {
        days: String(days),
        weeks: String(weeks),
        months: String(months),
        daysOfWeeks: String(dayOfWeeks),
        weeksOfMonths: String(weeksOfMonths),
        dayOfMonths: String(dayOfMonths),
      };
    } catch (error) {
      console.error('[useDateCalculations] Error calculating date differences:', error);
      return EMPTY_RESULT;
    }
  }, [now, targetDate]);
}
