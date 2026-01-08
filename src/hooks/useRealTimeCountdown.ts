import { useEffect, useState, useMemo, useRef } from 'react';
import CalcRemainTime from '~alias~/pages/DemNgayRaQuan/CalcRemainTime';
import formatNumberByLocale from '~alias~/lib/formatNumberByLocale';

const UPDATE_INTERVAL = 1000; // 1 second
const INITIAL_TIME = { hours: 0, minutes: 0, seconds: 0 };

/**
 * Hook for real-time countdown with optimized updates
 * Only updates state when values actually change
 */
export function useRealTimeCountdown(targetDate: string): string {
  const [remainTime, setRemainTime] = useState(INITIAL_TIME);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const targetDateRef = useRef(targetDate);

  useEffect(() => {
    targetDateRef.current = targetDate;
  }, [targetDate]);

  useEffect(() => {
    if (!targetDate || typeof targetDate !== 'string' || !targetDate.trim()) {
      setRemainTime(INITIAL_TIME);
      return;
    }

    const updateCountdown = () => {
      try {
        const result = CalcRemainTime(targetDateRef.current);
        
        setRemainTime(prev => {
          // Only update if values actually changed to prevent unnecessary re-renders
          if (
            prev.hours !== result.hours ||
            prev.minutes !== result.minutes ||
            prev.seconds !== result.seconds
          ) {
            return result;
          }
          return prev;
        });
      } catch (error) {
        console.error('[useRealTimeCountdown] Error calculating remain time:', error);
        setRemainTime(INITIAL_TIME);
      }
    };

    // Initial update
    updateCountdown();
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Set up new interval
    intervalRef.current = setInterval(updateCountdown, UPDATE_INTERVAL);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [targetDate]);

  return useMemo(() => {
    try {
      const hours = formatNumberByLocale({ value: remainTime.hours });
      const minutes = formatNumberByLocale({ value: remainTime.minutes });
      const seconds = formatNumberByLocale({ value: remainTime.seconds });
      
      return `${hours} giờ ${minutes} phút ${seconds} giây`;
    } catch (error) {
      console.error('[useRealTimeCountdown] Error formatting time:', error);
      return '0 giờ 0 phút 0 giây';
    }
  }, [remainTime.hours, remainTime.minutes, remainTime.seconds]);
}
