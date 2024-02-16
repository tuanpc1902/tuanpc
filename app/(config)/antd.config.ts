import { ConfigProviderProps } from 'antd';
import { Roboto_Font } from './fonts';

const antdConfig: ConfigProviderProps = {
  theme: {
    token: {
      fontFamily: Roboto_Font.style.fontFamily,
      fontWeightStrong: Roboto_Font.style.fontWeight,
      fontSize: 14,
    },
  },
};
export default antdConfig;
