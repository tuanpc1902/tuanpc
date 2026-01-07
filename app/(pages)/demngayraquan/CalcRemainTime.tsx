import dayjs from 'dayjs';
import type { RemainTimeResult } from '~alias~/app/lib/types';

/**
 * Tính toán thời gian còn lại từ hiện tại đến hết ngày trước ngày mục tiêu
 * Ví dụ: nếu targetDate là 28/01/2026, sẽ tính đến hết ngày 27/01/2026 (23:59:59)
 * @param targetDate - Ngày mục tiêu dạng string (YYYY-MM-DD) hoặc ISO string
 * @returns Object chứa hours, minutes, seconds còn lại. Trả về 0 nếu ngày đã qua
 * @example
 * const result = CalcRemainTime('2024-12-31');
 * // Tính đến hết ngày 30/12/2024
 * // { hours: 100, minutes: 30, seconds: 45 }
 */
export default function CalcRemainTime(targetDate: string): RemainTimeResult {
  const normalized =
    typeof targetDate === 'string' ? targetDate.trim() : String(targetDate);

  // Ưu tiên parse strict theo định dạng lưu trữ, fallback sang parse lỏng
  // Tính đến hết ngày trước ngày được chọn (ví dụ: chọn 28/01/2026 thì tính đến hết 27/01/2026)
  const target =
    dayjs(normalized, 'YYYY-MM-DD', true).isValid()
      ? dayjs(normalized, 'YYYY-MM-DD', true).subtract(1, 'day').endOf('day')
      : dayjs(normalized).subtract(1, 'day').endOf('day');

  // Validate date
  if (!target.isValid()) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const now = dayjs();

  // Nếu target đã qua rồi
  if (target.isBefore(now) || target.isSame(now)) {
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
