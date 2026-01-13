import { memo, useState } from 'react';
import { Tabs, Button, message, Modal } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import MetaTags from '~alias~/components/common/MetaTags';
import { useDataContext } from '~alias~/contexts/DataContext';
import { useLanguageContext } from '~alias~/contexts/LanguageContext';
import { getTranslation, translations } from '~alias~/lib/translations';
import ProjectsManager from '~alias~/components/admin/ProjectsManager';
import TranslationsManager from '~alias~/components/admin/TranslationsManager';
import ConstantsManager from '~alias~/components/admin/ConstantsManager';
import './Admin.styles.scss';

function Admin() {
  const { language } = useLanguageContext();
  const { resetData } = useDataContext();
  const [activeTab, setActiveTab] = useState('projects');
  const t = (key: keyof typeof translations.vi) => getTranslation(language, key);

  const handleReset = () => {
    Modal.confirm({
      title: t('confirmReset'),
      content: t('confirmResetContent'),
      okText: t('reset'),
      cancelText: t('cancel'),
      okType: 'danger',
      onOk: () => {
        resetData();
        message.success(t('dataResetSuccess'));
      },
    });
  };

  const tabItems = [
    {
      key: 'projects',
      label: t('projectsManagement'),
      children: <ProjectsManager />,
    },
    {
      key: 'translations',
      label: t('translationsManagement'),
      children: <TranslationsManager />,
    },
    {
      key: 'constants',
      label: t('constantsManagement'),
      children: <ConstantsManager />,
    },
  ];

  return (
    <>
      <MetaTags
        title="Admin Panel | tuanpc"
        description="Quản lý nội dung website"
      />
      <div className="admin-container">
        <div className="admin-header">
          <div className="admin-header-content">
            <h1 className="admin-title">{t('adminPanel')}</h1>
            <p className="admin-subtitle">
              {language === 'vi'
                ? 'Quản lý và cập nhật nội dung website'
                : 'Manage and update website content'}
            </p>
          </div>
          <Button
            type="default"
            danger
            icon={<ReloadOutlined />}
            onClick={handleReset}
            size="large"
          >
            {t('resetToDefault')}
          </Button>
        </div>
        <div className="admin-content">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            size="large"
          />
        </div>
      </div>
    </>
  );
}

export default memo(Admin);
