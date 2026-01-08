import dayjs from 'dayjs';
import type { RemainTimeResult } from '~alias~/lib/types';
import { getTargetEndOfDay } from '~alias~/lib/utils/dateHelpers';
import { DATE_CALCULATION } from '~alias~/lib/constants';

const EMPTY_TIME: RemainTimeResult = { hours: 0, minutes: 0, seconds: 0 };

/**
 * Calculates remaining time until target date
 * Returns hours, minutes, and seconds
 */
export default function CalcRemainTime(targetDate: string): RemainTimeResult {
  if (!targetDate || typeof targetDate !== 'string' || !targetDate.trim()) {
    return EMPTY_TIME;
  }

  try {
    const target = getTargetEndOfDay(targetDate);
    
    if (!target || !target.isValid()) {
      return EMPTY_TIME;
    }

    const now = dayjs();
    
    // Check if target date is in the past or same as now
    if (target.isBefore(now) || target.isSame(now)) {
      return EMPTY_TIME;
    }

    const diffSeconds = target.diff(now, 'seconds');
    
    if (diffSeconds <= 0) {
      return EMPTY_TIME;
    }

    return {
      hours: Math.floor(diffSeconds / DATE_CALCULATION.SECONDS_PER_HOUR),
      minutes: Math.floor(
        (diffSeconds % DATE_CALCULATION.SECONDS_PER_HOUR) / DATE_CALCULATION.SECONDS_PER_MINUTE
      ),
      seconds: diffSeconds % DATE_CALCULATION.SECONDS_PER_MINUTE,
    };
  } catch (error) {
    console.error('[CalcRemainTime] Error calculating remain time:', error);
    return EMPTY_TIME;
  }
}
