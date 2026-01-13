import { useEffect, useState, useMemo, useRef } from 'react';
import dayjs from 'dayjs';
import type { CurrentDateTime } from '~alias~/lib/types';

const DEFAULT_DATE: CurrentDateTime = { date: '', time: '' };
const UPDATE_INTERVAL = 1000; // 1 second

/**
 * Hook to get current date and time with real-time updates
 * Optimized to prevent unnecessary re-renders
 */
export function useCurrentDateTime(): CurrentDateTime {
  const [now, setNow] = useState<dayjs.Dayjs | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
    
    // Set initial time immediately
    setNow(dayjs());
    
    // Set up interval for updates
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
    if (!isMounted || !now) {
      return DEFAULT_DATE;
    }

    try {
      const dateText = now.locale('vi').format('dddd, DD [tháng] MM [năm] YYYY');
      const capitalizedDate = dateText.charAt(0).toUpperCase() + dateText.slice(1);
      
      return {
        date: capitalizedDate,
        time: now.format('HH [giờ] mm [phút] ss [giây]'),
      };
    } catch (error) {
      console.error('[useCurrentDateTime] Error formatting date/time:', error);
      return DEFAULT_DATE;
    }
  }, [now, isMounted]);
}
