import formatNumberByLocale from '~alias~/app/lib/formatNumberByLocale';

describe('formatNumberByLocale', () => {
  it('should format number with default locale (vi-VN)', () => {
    expect(formatNumberByLocale({ value: 1000000 })).toBe('1.000.000');
  });

  it('should format number with en-US locale', () => {
    expect(formatNumberByLocale({ value: 1000000, locale: 'en-US' })).toBe('1,000,000');
  });

  it('should handle NaN values', () => {
    expect(formatNumberByLocale({ value: NaN })).toBe('NaN');
  });

  it('should handle zero', () => {
    expect(formatNumberByLocale({ value: 0 })).toBe('0');
  });
});

