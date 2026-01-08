interface FormatNumberOptions {
  value: number;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

/**
 * Formats a number according to the specified locale
 * @param options - Formatting options
 * @returns Formatted number string
 */
export default function formatNumberByLocale({
  value,
  locale = 'vi-VN',
  minimumFractionDigits = 0,
  maximumFractionDigits = 0,
}: FormatNumberOptions): string {
  const num = Number(value);

  if (Number.isNaN(num)) {
    console.warn(`[formatNumberByLocale] Invalid number value: ${value}`);
    return String(value);
  }

  try {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(num);
  } catch (error) {
    console.error(`[formatNumberByLocale] Error formatting number with locale ${locale}:`, error);
    return String(num);
  }
}
