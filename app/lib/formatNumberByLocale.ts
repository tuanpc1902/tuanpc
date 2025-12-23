/**
 * Format số theo locale cụ thể
 * @param props - Object chứa value và locale
 * @param props.value - Số cần format
 * @param props.locale - Locale string (mặc định: 'vi-VN')
 * @returns String đã được format theo locale
 * @example
 * formatNumberByLocale({ value: 1000000 })
 * // "1.000.000"
 * 
 * formatNumberByLocale({ value: 1000000, locale: 'en-US' })
 * // "1,000,000"
 */
export default function formatNumberByLocale(props: {
  value: number;
  locale?: string;
}): string {
  const { value, locale = 'vi-VN' } = props;
  const num = Number(value);

  if (Number.isNaN(num)) {
    console.warn(`Invalid number value: ${value}`);
    return String(value);
  }

  try {
    return new Intl.NumberFormat(locale).format(num);
  } catch (error) {
    console.error(`Error formatting number with locale ${locale}:`, error);
    return String(num);
  }
}

