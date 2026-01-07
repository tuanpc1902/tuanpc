import { useEffect, useState, useMemo } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import type { CurrentDateTime } from '~alias~/app/lib/types';

/**
 * Custom hook để lấy ngày và giờ hiện tại, tự động cập nhật mỗi giây
 * Tối ưu bằng cách chỉ format khi cần thiết
 * Fix hydration mismatch bằng cách dùng giá trị mặc định trên server
 * @returns Object chứa date và time đã format
 */
export function useCurrentDateTime(): CurrentDateTime {
  // Dùng giá trị mặc định để tránh hydration mismatch
  const defaultDate: CurrentDateTime = {
    date: '',
    time: '',
  };

  const [now, setNow] = useState<dayjs.Dayjs | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Chỉ set date/time sau khi component đã mount (client-side only)
    setIsMounted(true);
    setNow(dayjs());

    // Update every second
    const intervalId = setInterval(() => {
      setNow(dayjs());
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Memoize format strings để tránh format lại không cần thiết
  const currentDate = useMemo(() => {
    // Trả về giá trị mặc định nếu chưa mount hoặc chưa có now
    if (!isMounted || !now) {
      return defaultDate;
    }

    const text = now
      .locale('vi')
      .format('dddd, DD [tháng] MM [năm] YYYY');
    const date = text.charAt(0).toUpperCase() + text.slice(1);
    
    return {
      date: date,
      time: now.format('HH [giờ] mm [phút] ss [giây]'),
    };
  }, [now, isMounted]);

  return currentDate;
}

