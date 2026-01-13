import { memo, ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import enUS from 'antd/locale/en_US';
import { useLanguageContext } from '~alias~/contexts/LanguageContext';

interface ConfigProviderWrapperProps {
  children: ReactNode;
}

function ConfigProviderWrapper({ children }: ConfigProviderWrapperProps) {
  const { language } = useLanguageContext();
  
  return (
    <ConfigProvider locale={language === 'vi' ? viVN : enUS}>
      {children}
    </ConfigProvider>
  );
}

export default memo(ConfigProviderWrapper);
