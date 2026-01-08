import { useEffect, useState, useMemo, useRef } from 'react';
import CalcRemainTime from '~alias~/pages/DemNgayRaQuan/CalcRemainTime';
import formatNumberByLocale from '~alias~/lib/formatNumberByLocale';

export function useRealTimeCountdown(targetDate: string): string {
  const [remainTime, setRemainTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!targetDate) {
      setRemainTime({ hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const updateCountdown = () => {
      const result = CalcRemainTime(targetDate);
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
    };

    // Initial update
    updateCountdown();
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(updateCountdown, 1000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [targetDate]);

  return useMemo(() => {
    const hours = formatNumberByLocale({ value: remainTime.hours });
    const minutes = formatNumberByLocale({ value: remainTime.minutes });
    const seconds = formatNumberByLocale({ value: remainTime.seconds });
    return `${hours} giờ ${minutes} phút ${seconds} giây`;
  }, [remainTime.hours, remainTime.minutes, remainTime.seconds]);
}
