import { Dayjs } from 'dayjs';
import { SizeType } from 'antd/es/config-provider/SizeContext';

/**
 * Props cho DatePickerCustom component
 */
export interface DatePickerCustomProps {
  className?: string;
  defaultValue: string;
  formatString?: string;
  onDateChange: (date: Dayjs | null, dateString: string | null) => void;
  size?: SizeType;
}

/**
 * Props cho SelectCustom component
 */
export interface SelectCustomProps {
  onSelect: (e: string) => void;
  options: Array<{
    key: string;
    value: string;
    label: string;
  }>;
  defaultValue?: string;
}

/**
 * Kết quả tính toán thời gian còn lại
 */
export interface CountResult {
  days: string;
  weeks: string;
  months: string;
  daysOfWeeks: string;
  weeksOfMonths: string;
  dayOfMonths: string;
}

/**
 * Kết quả tính toán thời gian realtime
 */
export interface RemainTimeResult {
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Current date time object
 */
export interface CurrentDateTime {
  date: string;
  time: string;
}

