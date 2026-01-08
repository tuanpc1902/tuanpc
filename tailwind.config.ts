import { theme } from 'antd';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3498db',
          dark: '#2980b9',
        },
        secondary: {
          DEFAULT: '#2ecc71',
          dark: '#27ae60',
        },
        turquoise: {
          DEFAULT: '#1abc9c',
          dark: '#16a085',
        },
        purple: {
          DEFAULT: '#9b59b6',
          dark: '#8e44ad',
        },
        dark: {
          DEFAULT: '#34495e',
          darker: '#2c3e50',
        },
        yellow: {
          DEFAULT: '#f1c40f',
          dark: '#f39c12',
        },
        orange: {
          DEFAULT: '#e67e22',
          dark: '#d35400',
        },
        red: {
          DEFAULT: '#e74c3c',
          dark: '#c0392b',
        },
        gray: {
          light: '#ecf0f1',
          DEFAULT: '#95a5a6',
          lighter: '#bdc3c7',
          dark: '#7f8c8d',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gradientColorStops: (theme) => ({
        'custom-gradient-start': '#3498db',
        'custom-gradient-end': '#2ecc71',
      }),
      keyframes: {
        pointer: {
          '100%': {
            transform: 'scale(.75)',
            ['-webkit-transform']: 'scale(.75)',
          },
        },
      },
    },
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      // max width
      'max-xs': {max: '390px'},
      'max-sm': {max: '639px'},
      'max-md': {max: '767px'},
      'max-lg': {max: '1023px'},
      'max-xl': {max: '1279px'},
      'max-2xl': {max: '1535px'},
    },
      // => @media (min-width: 640px) { ... }
  },
  plugins: [],
};
export default config;
