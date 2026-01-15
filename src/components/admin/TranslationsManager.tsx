import { memo, useMemo, useState } from 'react';
import { Table, Input, Button, message, Space, Tabs } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useDataContext } from '~alias~/contexts/DataContext';
import { useLanguageContext } from '~alias~/contexts/LanguageContext';
import { getTranslation, translations, type Language } from '~alias~/lib/translations';
import './TranslationsManager.styles.scss';

function TranslationsManager() {
  const { language: currentLang } = useLanguageContext();
  const { translations: contextTranslations, updateTranslations } = useDataContext();
  const [activeLang, setActiveLang] = useState<Language>(currentLang);
  const [editingValues, setEditingValues] = useState<Record<string, string>>({});
  const t = (key: keyof typeof translations.vi) => getTranslation(currentLang, key);

  const handleSave = (lang: Language, key: string, value: string) => {
    updateTranslations(lang, key, value);
    setEditingValues((prev) => {
      const newValues = { ...prev };
      delete newValues[`${lang}_${key}`];
      return newValues;
    });
    message.success(t('saved'));
  };

  const handleChange = (lang: Language, key: string, value: string) => {
    setEditingValues((prev) => ({
      ...prev,
      [`${lang}_${key}`]: value,
    }));
  };

  const handleRevert = (lang: Language, key: string) => {
    const editingKey = `${lang}_${key}`;
    setEditingValues((prev) => {
      const nextValues = { ...prev };
      delete nextValues[editingKey];
      return nextValues;
    });
  };

  const handleDiscardAll = () => {
    setEditingValues((prev) => {
      const nextValues = { ...prev };
      Object.keys(nextValues).forEach((key) => {
        if (key.startsWith(`${activeLang}_`)) {
          delete nextValues[key];
        }
      });
      return nextValues;
    });
  };

  const pendingChanges = useMemo(() => {
    const activeTranslations = contextTranslations[activeLang];
    return Object.entries(activeTranslations)
      .map(([key, originalValue]) => {
        const editedValue = editingValues[`${activeLang}_${key}`];
        if (editedValue === undefined || editedValue === originalValue) return null;
        return {
          key,
          originalValue,
          editedValue,
        };
      })
      .filter(Boolean) as Array<{ key: string; originalValue: string; editedValue: string }>;
  }, [activeLang, contextTranslations, editingValues]);

  const getTranslationData = (lang: Language) => {
    const data = contextTranslations[lang];
    return Object.entries(data).map(([key, value]) => ({
      key,
      translationKey: key,
      value: editingValues[`${lang}_${key}`] !== undefined ? editingValues[`${lang}_${key}`] : value,
      originalValue: value,
    }));
  };

  const columns = [
    {
      title: t('key'),
      dataIndex: 'translationKey',
      key: 'translationKey',
      width: 200,
      fixed: 'left' as const,
    },
    {
      title: t('value'),
      key: 'value',
      render: (_: any, record: { translationKey: string; value: string; originalValue: string }) => (
        <Space.Compact style={{ width: '100%' }}>
          <Input
            value={record.value}
            onChange={(e) => handleChange(activeLang, record.translationKey, e.target.value)}
            style={{ flex: 1 }}
            size="large"
          />
          {editingValues[`${activeLang}_${record.translationKey}`] !== undefined &&
            editingValues[`${activeLang}_${record.translationKey}`] !== record.originalValue && (
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={() => handleSave(activeLang, record.translationKey, record.value)}
                size="large"
              >
                {t('save')}
              </Button>
            )}
        </Space.Compact>
      ),
    },
  ];

  const tabItems = [
    {
      key: 'vi',
      label: 'Tiếng Việt',
      children: (
        <Table
          columns={columns}
          dataSource={getTranslationData('vi')}
          rowKey="translationKey"
          pagination={{ pageSize: 20 }}
          scroll={{ x: 800 }}
        />
      ),
    },
    {
      key: 'en',
      label: 'English',
      children: (
        <Table
          columns={columns}
          dataSource={getTranslationData('en')}
          rowKey="translationKey"
          pagination={{ pageSize: 20 }}
          scroll={{ x: 800 }}
        />
      ),
    },
  ];

  return (
    <div className="translations-manager">
      {pendingChanges.length > 0 && (
        <div className="pending-changes-card">
          <div className="pending-header">
            <div className="pending-title">
              {t('pendingChanges')} ({pendingChanges.length})
            </div>
            <Button onClick={handleDiscardAll} size="small" className="pending-discard-btn">
              {t('discardAll')}
            </Button>
          </div>
          <div className="pending-list">
            {pendingChanges.map((item) => (
              <div key={item.key} className="pending-item">
                <div className="pending-key">{item.key}</div>
                <div className="pending-values">
                  <div className="pending-value">
                    <span className="pending-label">{t('currentValue')}</span>
                    <code>{item.originalValue}</code>
                  </div>
                  <div className="pending-value">
                    <span className="pending-label">{t('editedValue')}</span>
                    <code>{item.editedValue}</code>
                  </div>
                </div>
                <Button size="small" onClick={() => handleRevert(activeLang, item.key)}>
                  {t('revert')}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      <Tabs
        activeKey={activeLang}
        onChange={(key) => setActiveLang(key as Language)}
        items={tabItems}
      />
    </div>
  );
}

export default memo(TranslationsManager);
