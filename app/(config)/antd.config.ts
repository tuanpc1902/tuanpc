import { ConfigProviderProps } from 'antd';

import { Inter } from 'next/font/google';
const Inter_Font = Inter({ subsets: ['latin', 'vietnamese'] });

const antdConfig: ConfigProviderProps = {
  theme: {
    token: {
      fontFamily: Inter_Font.style.fontFamily,
      fontWeightStrong: Inter_Font.style.fontWeight,
      fontSize: 14,
    },
  },
};
export default antdConfig;
