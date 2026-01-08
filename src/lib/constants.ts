// Select Options
export const SELECT_OPTIONS = [
  {
    key: '1',
    value: 'all',
    label: 'Tất cả',
  },
  {
    key: '2',
    value: 'day',
    label: 'Ngày',
  },
  {
    key: '3',
    value: 'week',
    label: 'Tuần',
  },
  {
    key: '5',
    value: 'hour',
    label: 'Giờ',
  },
] as const;

// Storage Keys
export const STORAGE_KEYS = {
  DEM_NGAY_RA_QUAN_TARGET_DATE: 'demNgayRaQuanTargetDate',
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'DD-MM-YYYY',
  STORAGE: 'YYYY-MM-DD',
  INPUT: 'DD/MM/YYYY',
} as const;

// Environment Variables
export const ENV_VARS = {
  PROFILE_GITHUB_URL: import.meta.env.VITE_PROFILE_GITHUB_URL || '/',
  PROFILE_FB_URL: import.meta.env.VITE_PROFILE_FB_URL || '/',
} as const;

// Date Calculation Constants
export const DATE_CALCULATION = {
  SECONDS_PER_MINUTE: 60,
  MINUTES_PER_HOUR: 60,
  HOURS_PER_DAY: 24,
  DAYS_PER_WEEK: 7,
  SECONDS_PER_HOUR: 3600,
} as const;

// UI Constants
export const UI = {
  ANIMATION_DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
  },
  DEBOUNCE_DELAY: 300,
} as const;
