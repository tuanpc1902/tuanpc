import dayjs from 'dayjs';
import type { RemainTimeResult } from '~alias~/app/lib/types';

/**
 * Tính toán thời gian còn lại từ hiện tại đến ngày mục tiêu
 * @param targetDate - Ngày mục tiêu dạng string (YYYY-MM-DD) hoặc ISO string
 * @returns Object chứa hours, minutes, seconds còn lại. Trả về 0 nếu ngày đã qua
 * @example
 * const result = CalcRemainTime('2024-12-31');
 * // { hours: 100, minutes: 30, seconds: 45 }
 */
export default function CalcRemainTime(targetDate: string): RemainTimeResult {
  const now = dayjs();
  const target = dayjs(targetDate);

  // Validate date
  if (!target.isValid()) {
    console.warn(`Invalid target date: ${targetDate}`);
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  // Nếu target đã qua rồi
  if (target.isBefore(now)) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const diffSeconds = target.diff(now, 'seconds');
  const hours = Math.floor(diffSeconds / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);
  const seconds = diffSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
  };
}
