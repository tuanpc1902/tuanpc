import { useEffect, useState, useMemo } from 'react';
import CalcRemainTime from '~alias~/app/(pages)/demngayraquan/CalcRemainTime';
import formatNumberByLocale from '~alias~/app/lib/formatNumberByLocale';

/**
 * Custom hook để tính toán và hiển thị thời gian còn lại theo giờ, phút, giây
 * Tối ưu bằng cách chỉ format khi giá trị thay đổi
 * @param targetDate - Ngày mục tiêu dạng string (YYYY-MM-DD)
 * @returns String format thời gian còn lại
 */
export function useRealTimeCountdown(targetDate: string): string {
  const [remainTime, setRemainTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!targetDate) {
      setRemainTime({ hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const updateCountdown = () => {
      const calcRealtime = CalcRemainTime(targetDate);
      setRemainTime({
        hours: calcRealtime.hours,
        minutes: calcRealtime.minutes,
        seconds: calcRealtime.seconds,
      });
    };

    // Update immediately
    updateCountdown();

    // Update every second
    const intervalId = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(intervalId);
  }, [targetDate]);

  // Memoize format string để tránh format lại không cần thiết
  // Chỉ format khi giá trị thực sự thay đổi
  const realTime = useMemo(() => {
    const hours = formatNumberByLocale({ value: remainTime.hours });
    return `${hours} giờ ${remainTime.minutes} phút ${remainTime.seconds} giây`;
  }, [remainTime.hours, remainTime.minutes, remainTime.seconds]);

  return realTime;
}

