import { memo, useMemo, useState } from 'react';
import { Table, Input, Button, message, Space } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useDataContext } from '~alias~/contexts/DataContext';
import { useLanguageContext } from '~alias~/contexts/LanguageContext';
import { getTranslation, translations } from '~alias~/lib/translations';
import './ConstantsManager.styles.scss';

function ConstantsManager() {
  const { language } = useLanguageContext();
  const { constants, updateConstants } = useDataContext();
  const [editingValues, setEditingValues] = useState<Record<string, string>>({});
  const t = (key: keyof typeof translations.vi) => getTranslation(language, key);

  const handleSave = (key: string, value: string) => {
    updateConstants(key, value);
    setEditingValues((prev) => {
      const newValues = { ...prev };
      delete newValues[key];
      return newValues;
    });
    message.success(t('saved'));
  };

  const handleChange = (key: string, value: string) => {
    setEditingValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRevert = (key: string) => {
    setEditingValues((prev) => {
      const nextValues = { ...prev };
      delete nextValues[key];
      return nextValues;
    });
  };

  const handleDiscardAll = () => {
    setEditingValues({});
  };

  const pendingChanges = useMemo(() => {
    return Object.entries(constants)
      .map(([key, originalValue]) => {
        const editedValue = editingValues[key];
        if (editedValue === undefined || editedValue === originalValue) return null;
        return {
          key,
          originalValue,
          editedValue,
        };
      })
      .filter(Boolean) as Array<{ key: string; originalValue: string; editedValue: string }>;
  }, [constants, editingValues]);

  const dataSource = Object.entries(constants).map(([key, value]) => ({
    key,
    constantKey: key,
    value: editingValues[key] !== undefined ? editingValues[key] : value,
    originalValue: value,
  }));

  const columns = [
    {
      title: t('constantName'),
      dataIndex: 'constantKey',
      key: 'constantKey',
      width: 250,
    },
    {
      title: t('value'),
      key: 'value',
      render: (_: any, record: { constantKey: string; value: string; originalValue: string }) => (
        <Space.Compact style={{ width: '100%' }}>
          <Input
            value={record.value}
            onChange={(e) => handleChange(record.constantKey, e.target.value)}
            style={{ flex: 1 }}
            size="large"
          />
          {editingValues[record.constantKey] !== undefined &&
            editingValues[record.constantKey] !== record.originalValue && (
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={() => handleSave(record.constantKey, record.value)}
                size="large"
              >
                {t('save')}
              </Button>
            )}
        </Space.Compact>
      ),
    },
  ];

  return (
    <div className="constants-manager">
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
                <Button size="small" onClick={() => handleRevert(item.key)}>
                  {t('revert')}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="constantKey"
        pagination={false}
      />
    </div>
  );
}

export default memo(ConstantsManager);
