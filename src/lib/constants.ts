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
  DEM_NGAY_RA_QUAN_PRESETS: 'demNgayRaQuanPresets',
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'DD-MM-YYYY',
  STORAGE: 'YYYY-MM-DD',
  INPUT: 'DD/MM/YYYY',
} as const;

// Environment Variables
export const ENV_VARS = {
  PROFILE_GITHUB_URL: import.meta.env.VITE_PROFILE_GITHUB_URL || '',
  PROFILE_FB_URL: import.meta.env.VITE_PROFILE_FB_URL || '',
  CV_URL: import.meta.env.VITE_CV_URL || '/tuanpc - VMTD 2026.pdf',
  CV_FILE_NAME: import.meta.env.VITE_CV_FILE_NAME || 'tuanpc - VMTD 2026.pdf',
  SITE_URL: import.meta.env.VITE_SITE_URL || '',
  OG_IMAGE_URL: import.meta.env.VITE_OG_IMAGE_URL || '',
  // Stats configuration
  STAT_START_YEAR: '2022', // Năm bắt đầu làm việc
  STAT_PROJECTS_AUTO: 'true', // Auto count từ projects
  STAT_PROJECTS_VALUE: '10+', // Manual value khi không auto
  STAT_TECHNOLOGIES_AUTO: 'true', // Auto count từ unique tags
  STAT_TECHNOLOGIES_VALUE: '15+', // Manual value khi không auto
  STAT_STATUS_VALUE: 'Active', // Manual value
} as const;

// Date Calculation Constants
export const DATE_CALCULATION = {
  SECONDS_PER_MINUTE: 60,
  SECONDS_PER_HOUR: 3600,
} as const;
