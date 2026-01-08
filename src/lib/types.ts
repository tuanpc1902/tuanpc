import { Dayjs } from 'dayjs';
import { SizeType } from 'antd/es/config-provider/SizeContext';

// Date Picker Types
export interface DatePickerCustomProps {
  className?: string;
  defaultValue: string;
  formatString?: string;
  onDateChange: (date: Dayjs | null, dateString: string | null) => void;
  size?: SizeType;
}

// Select Types
export interface SelectOption {
  readonly key: string;
  readonly value: string;
  readonly label: string;
}

export interface SelectCustomProps {
  onSelect: (value: string) => void;
  options: readonly SelectOption[] | SelectOption[];
  defaultValue?: string;
}

// Countdown Types
export interface CountResult {
  readonly days: string;
  readonly weeks: string;
  readonly months: string;
  readonly daysOfWeeks: string;
  readonly weeksOfMonths: string;
  readonly dayOfMonths: string;
}

export interface RemainTimeResult {
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
}

export interface CurrentDateTime {
  readonly date: string;
  readonly time: string;
}

// Error Types
export interface AppError {
  readonly message: string;
  readonly code?: string;
  readonly timestamp: number;
}

// Storage Types
export type StorageValue<T> = T | ((prev: T) => T);
