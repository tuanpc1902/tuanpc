import { Dayjs } from 'dayjs';
import { SizeType } from 'antd/es/config-provider/SizeContext';

export interface DatePickerCustomProps {
  className?: string;
  defaultValue: string;
  formatString?: string;
  onDateChange: (date: Dayjs | null, dateString: string | null) => void;
  size?: SizeType;
}

export type SelectOption = {
  key: string;
  value: string;
  label: string;
};

export interface SelectCustomProps {
  onSelect: (e: string) => void;
  options: readonly SelectOption[] | SelectOption[];
  defaultValue?: string;
}

export interface CountResult {
  days: string;
  weeks: string;
  months: string;
  daysOfWeeks: string;
  weeksOfMonths: string;
  dayOfMonths: string;
}

export interface RemainTimeResult {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CurrentDateTime {
  date: string;
  time: string;
}

