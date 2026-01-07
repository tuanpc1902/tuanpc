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

