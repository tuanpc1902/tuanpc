import { memo, useState } from 'react';
import { Tabs, Button, message, Modal } from 'antd';
import { ReloadOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MetaTags from '~alias~/components/common/MetaTags';
import { useDataContext } from '~alias~/contexts/DataContext';
import { useLanguageContext } from '~alias~/contexts/LanguageContext';
import { useAuth } from '~alias~/contexts/AuthContext';
import { getTranslation, translations } from '~alias~/lib/translations';
import ProjectsManager from '~alias~/components/admin/ProjectsManager';
import TranslationsManager from '~alias~/components/admin/TranslationsManager';
import ConstantsManager from '~alias~/components/admin/ConstantsManager';
import './Admin.styles.scss';

function Admin() {
  const { language } = useLanguageContext();
  const { resetData } = useDataContext();
  const { logout, user } = useAuth();
  const navigate = useNavigate();
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

  const handleLogout = async () => {
    try {
      await logout();
      message.success(language === 'vi' ? 'Đăng xuất thành công!' : 'Logout successful!');
      // Navigate will happen automatically when isAuthenticated becomes false
      // But we can navigate immediately for better UX
      navigate('/admin/login', { replace: true });
    } catch (error: any) {
      console.error('Logout error:', error);
      const errorMessage = error?.message || (language === 'vi' ? 'Đăng xuất thất bại!' : 'Logout failed!');
      message.error(errorMessage);
    }
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
            <div>
              <h1 className="admin-title">{t('adminPanel')}</h1>
              <p className="admin-subtitle">
                {language === 'vi'
                  ? 'Quản lý và cập nhật nội dung website'
                  : 'Manage and update website content'}
              </p>
              {user && (
                <p className="admin-user-info" style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>
                  {language === 'vi' ? 'Đăng nhập bởi' : 'Logged in as'}: {user.email}
                </p>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button
              type="default"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              size="large"
            >
              {language === 'vi' ? 'Đăng xuất' : 'Logout'}
            </Button>
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
