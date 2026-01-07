import { useEffect, useState, useMemo } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import type { CurrentDateTime } from '~alias~/app/lib/types';

const DEFAULT_DATE: CurrentDateTime = { date: '', time: '' };

export function useCurrentDateTime(): CurrentDateTime {
  const [now, setNow] = useState<dayjs.Dayjs | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setNow(dayjs());
    const intervalId = setInterval(() => setNow(dayjs()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  return useMemo(() => {
    if (!isMounted || !now) return DEFAULT_DATE;

    const text = now.locale('vi').format('dddd, DD [tháng] MM [năm] YYYY');
    return {
      date: text.charAt(0).toUpperCase() + text.slice(1),
      time: now.format('HH [giờ] mm [phút] ss [giây]'),
    };
  }, [now, isMounted]);
}

