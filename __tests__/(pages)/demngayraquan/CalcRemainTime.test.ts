import CalcRemainTime from '~alias~/app/(pages)/demngayraquan/CalcRemainTime';
import dayjs from 'dayjs';

describe('CalcRemainTime', () => {
  it('should return zero for past dates', () => {
    const pastDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    const result = CalcRemainTime(pastDate);
    expect(result).toEqual({ hours: 0, minutes: 0, seconds: 0 });
  });

  it('should calculate correct time for future dates', () => {
    const futureDate = dayjs().add(1, 'day').format('YYYY-MM-DD');
    const result = CalcRemainTime(futureDate);
    expect(result.hours).toBeGreaterThan(0);
  });

  it('should handle invalid dates', () => {
    const result = CalcRemainTime('invalid-date');
    expect(result).toEqual({ hours: 0, minutes: 0, seconds: 0 });
  });
});

