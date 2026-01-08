import dayjs, { Dayjs } from 'dayjs';
import { DATE_FORMATS } from '../constants';

/**
 * Normalizes a date string to YYYY-MM-DD format
 */
export function normalizeDateString(date: string | Dayjs): string {
  if (dayjs.isDayjs(date)) {
    return date.format(DATE_FORMATS.STORAGE);
  }
  
  const trimmed = typeof date === 'string' ? date.trim() : String(date);
  
  if (!trimmed) {
    return '';
  }

  // Try to parse as YYYY-MM-DD first
  const parsed = dayjs(trimmed, DATE_FORMATS.STORAGE, true);
  if (parsed.isValid()) {
    return parsed.format(DATE_FORMATS.STORAGE);
  }

  // Try to parse as DD-MM-YYYY
  const parsedDisplay = dayjs(trimmed, DATE_FORMATS.DISPLAY, true);
  if (parsedDisplay.isValid()) {
    return parsedDisplay.format(DATE_FORMATS.STORAGE);
  }

  // Fallback to dayjs default parsing
  const fallback = dayjs(trimmed);
  return fallback.isValid() ? fallback.format(DATE_FORMATS.STORAGE) : '';
}

/**
 * Validates if a date string is valid
 */
export function isValidDate(date: string): boolean {
  if (!date || typeof date !== 'string') {
    return false;
  }

  const normalized = normalizeDateString(date);
  return dayjs(normalized, DATE_FORMATS.STORAGE, true).isValid();
}

/**
 * Gets the end of day for a target date (subtracts 1 day and sets to end of day)
 */
export function getTargetEndOfDay(date: string): Dayjs | null {
  const normalized = normalizeDateString(date);
  if (!normalized) {
    return null;
  }

  const target = dayjs(normalized, DATE_FORMATS.STORAGE, true);
  if (!target.isValid()) {
    return null;
  }

  return target.subtract(1, 'day').endOf('day');
}
