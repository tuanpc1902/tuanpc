import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import type { CurrentDateTime } from '~alias~/app/lib/types';

/**
 * Custom hook để lấy ngày và giờ hiện tại, tự động cập nhật mỗi giây
 * @returns Object chứa date và time đã format
 */
export function useCurrentDateTime(): CurrentDateTime {
  const [currentDate, setCurrentDate] = useState<CurrentDateTime>({
    date: '',
    time: '',
  });

  useEffect(() => {
    const updateDateTime = () => {
      const text = dayjs()
        .locale('vi')
        .format('dddd, DD [tháng] MM [năm] YYYY');
      const date = text.charAt(0).toUpperCase() + text.slice(1);
      setCurrentDate({
        date: date,
        time: dayjs().format('HH [giờ] mm [phút] ss [giây]'),
      });
    };

    // Update immediately
    updateDateTime();

    // Update every second
    const intervalId = setInterval(updateDateTime, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  return currentDate;
}

