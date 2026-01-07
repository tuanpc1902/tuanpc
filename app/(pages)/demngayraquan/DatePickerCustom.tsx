import { memo, useMemo } from 'react';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import type { DatePickerCustomProps } from '~alias~/app/lib/types';

// Memoize locale object để tránh tạo lại mỗi lần render
const VI_LOCALE = {
  lang: {
    locale: 'vi_VN',
    placeholder: 'Chọn ngày',
    rangePlaceholder: ['Ngày bắt đầu', 'Ngày kết thúc'],
    today: 'Hôm nay',
    now: 'Bây giờ',
    backToToday: 'Quay về hôm nay',
    ok: 'Đồng ý',
    clear: 'Xóa',
    month: 'Tháng',
    year: 'Năm',
    week: 'Tuần',
    timeSelect: 'Chọn thời gian',
    dateSelect: 'Chọn ngày',
    monthSelect: 'Chọn tháng',
    yearSelect: 'Chọn năm',
    decadeSelect: 'Chọn thập kỷ',
    yearFormat: 'YYYY',
    fieldDateFormat: 'DD/MM/YYYY',
    cellDateFormat: 'D',
    fieldDateTimeFormat: 'DD/MM/YYYY HH:mm:ss',
    monthFormat: 'MMMM',
    fieldWeekFormat: 'YYYY-wo',
    monthBeforeYear: true,
    previousMonth: 'Tháng trước (PageUp)',
    nextMonth: 'Tháng sau (PageDown)',
    previousYear: 'Năm trước (Control + left)',
    nextYear: 'Năm sau (Control + right)',
    previousDecade: 'Thập kỷ trước',
    nextDecade: 'Thập kỷ sau',
    previousCentury: 'Thế kỷ trước',
    nextCentury: 'Thế kỷ sau',
    shortWeekDays: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    shortMonths: [
      'Tháng một',
      'Tháng hai',
      'Tháng ba',
      'Tháng bốn',
      'Tháng năm',
      'Tháng sáu',
      'Tháng bảy',
      'Tháng tám',
      'Tháng chín',
      'Tháng mười',
      'Tháng mười một',
      'Tháng mười hai',
    ],
  },
  timePickerLocale: {},
};

/**
 * Custom DatePicker component với locale tiếng Việt
 * @param props - Props của DatePickerCustom
 * @param props.defaultValue - Giá trị mặc định (YYYY-MM-DD)
 * @param props.onDateChange - Callback khi ngày thay đổi
 * @param props.size - Kích thước picker
 * @param props.formatString - Format string cho defaultValue
 * @param props.className - CSS class name
 */
const DatePickerCustom = memo(function DatePickerCustom({
  className,
  defaultValue,
  onDateChange,
  formatString,
  size,
}: DatePickerCustomProps) {
  // Memoize parsed date để tránh parse lại mỗi lần render
  const defaultDateValue = useMemo(
    () => dayjs(defaultValue, formatString ?? 'YYYY-MM-DD'),
    [defaultValue, formatString]
  );

  return (
    <DatePicker
      onChange={onDateChange}
      defaultValue={defaultDateValue}
      format="DD/MM/YYYY"
      className={className}
      size={size}
      locale={VI_LOCALE}
    />
  );
});

export default DatePickerCustom;
