import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import MetaTags from '~alias~/components/common/MetaTags';
import { useLanguageContext } from '~alias~/contexts/LanguageContext';
import { getTranslation, translations } from '~alias~/lib/translations';
import './NotFound.styles.scss';

function NotFound() {
  const { language } = useLanguageContext();
  const t = (key: keyof typeof translations.vi) => getTranslation(language, key);

  return (
    <>
      <MetaTags
        title="404 - Trang đang phát triển | tuanpc"
        description="Trang này đang được phát triển"
      />
      <div className="not-found-container">
        <Result
          status="404"
          title="404"
          subTitle={language === 'vi' ? 'Trang này đang được phát triển' : 'This page is under development'}
          extra={
            <Link to="/">
              <Button type="primary" size="large">
                {t('home')}
              </Button>
            </Link>
          }
        />
      </div>
    </>
  );
}

export default memo(NotFound);
