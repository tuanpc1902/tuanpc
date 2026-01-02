/**
 * Các constants dùng chung trong ứng dụng
 */

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
  // {
  //   key: '4',
  //   value: 'month',
  //   label: 'Tháng',
  // },
  {
    key: '5',
    value: 'hour',
    label: 'Giờ',
  },
] as const;

export const STORAGE_KEYS = {
  DEM_NGAY_RA_QUAN_TARGET_DATE: 'demNgayRaQuanTargetDate',
} as const;

export const DATE_FORMATS = {
  DISPLAY: 'DD-MM-YYYY',
  STORAGE: 'YYYY-MM-DD',
} as const;

export const ENV_VARS = {
  PROFILE_GITHUB_URL: process.env.NEXT_PUBLIC_PROFILE_GITHUB_URL || '/',
  PROFILE_FB_URL: process.env.NEXT_PUBLIC_PROFILE_FB_URL || '/',
} as const;

