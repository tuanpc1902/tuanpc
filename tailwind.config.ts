import { theme } from 'antd';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
      'max-xs': '400px',
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
      // => @media (min-width: 640px) { ... }
  },
  plugins: [],
};
export default config;
