import { DatePicker } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import dayjs from 'dayjs';

type Props = {
  className: string;
  targetDate: string;
  onDateChange: (date: any, dateString: string | null) => void;
  size?: SizeType
}

export default function DatePickerCustom({className, targetDate, onDateChange, size}: Props
) {


  return (
    <DatePicker
      onChange={onDateChange}
      defaultValue={dayjs(targetDate)}
      className={`${className}`}
      size={size}
      locale={{
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
      }}
    />
  );
}
