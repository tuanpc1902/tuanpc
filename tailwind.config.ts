import { theme } from 'antd';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gradientColorStops: (theme) => ({
        'custom-gradient-start': '#6a5af9',
        'custom-gradient-end': '#d66efd',
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
