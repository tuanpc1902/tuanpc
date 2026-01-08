import { useEffect, useState, useMemo } from 'react';
import CalcRemainTime from '~alias~/pages/DemNgayRaQuan/CalcRemainTime';
import formatNumberByLocale from '~alias~/lib/formatNumberByLocale';

export function useRealTimeCountdown(targetDate: string): string {
  const [remainTime, setRemainTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!targetDate) {
      setRemainTime({ hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const updateCountdown = () => {
      const result = CalcRemainTime(targetDate);
      setRemainTime(result);
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, [targetDate]);

  return useMemo(() => {
    const hours = formatNumberByLocale({ value: remainTime.hours });
    return `${hours} giờ ${remainTime.minutes} phút ${remainTime.seconds} giây`;
  }, [remainTime.hours, remainTime.minutes, remainTime.seconds]);
}
