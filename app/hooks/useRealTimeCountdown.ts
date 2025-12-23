import { useEffect, useState } from 'react';
import CalcRemainTime from '~alias~/app/(pages)/demngayraquan/CalcRemainTime';
import formatNumberByLocale from '~alias~/app/lib/formatNumberByLocale';

/**
 * Custom hook để tính toán và hiển thị thời gian còn lại theo giờ, phút, giây
 * @param targetDate - Ngày mục tiêu dạng string (YYYY-MM-DD)
 * @returns String format thời gian còn lại
 */
export function useRealTimeCountdown(targetDate: string): string {
  const [realTime, setRealTime] = useState('');

  useEffect(() => {
    if (!targetDate) {
      setRealTime('0 giờ 0 phút 0 giây');
      return;
    }

    const updateCountdown = () => {
      const calcRealtime = CalcRemainTime(targetDate);
      const hours = formatNumberByLocale({ value: calcRealtime.hours });
      const minutes = calcRealtime.minutes;
      const seconds = calcRealtime.seconds;
      setRealTime(`${hours} giờ ${minutes} phút ${seconds} giây`);
    };

    // Update immediately
    updateCountdown();

    // Update every second
    const intervalId = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(intervalId);
  }, [targetDate]);

  return realTime;
}

