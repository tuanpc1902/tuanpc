import { memo, useMemo } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { DatePickerCustomProps } from '~alias~/lib/types';
import { DATE_FORMATS } from '~alias~/lib/constants';

// Vietnamese locale configuration
const VI_LOCALE = {
  lang: {
    locale: 'vi_VN',
    placeholder: 'Chọn ngày',
    rangePlaceholder: ['Ngày bắt đầu', 'Ngày kết thúc'] as [string, string],
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
    fieldDateFormat: DATE_FORMATS.INPUT,
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
    shortWeekDays: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'] as string[],
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
    ] as string[],
  },
  timePickerLocale: {},
};

/**
 * Custom DatePicker component with Vietnamese locale
 * Optimized with memoization
 */
const DatePickerCustom = memo(function DatePickerCustom({
  className,
  defaultValue,
  onDateChange,
  formatString,
  size,
}: DatePickerCustomProps) {
  const defaultDateValue = useMemo(() => {
    try {
      return dayjs(defaultValue, formatString ?? DATE_FORMATS.STORAGE);
    } catch (error) {
      console.error('[DatePickerCustom] Error parsing default date:', error);
      return dayjs();
    }
  }, [defaultValue, formatString]);

  return (
    <DatePicker
      onChange={onDateChange}
      defaultValue={defaultDateValue}
      format={DATE_FORMATS.INPUT}
      className={className}
      size={size}
      locale={VI_LOCALE}
      aria-label="Chọn ngày"
    />
  );
});

DatePickerCustom.displayName = 'DatePickerCustom';

export default DatePickerCustom;
