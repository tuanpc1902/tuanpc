import { memo, useState, useMemo } from 'react';
import { Card, Form, Input, Button, message, Space, Divider, Switch, InputNumber } from 'antd';
import { SaveOutlined, ReloadOutlined, ThunderboltOutlined, EditOutlined } from '@ant-design/icons';
import { useDataContext } from '~alias~/contexts/DataContext';
import { useLanguageContext } from '~alias~/contexts/LanguageContext';
import './StatsManager.styles.scss';

function StatsManager() {
  const { language } = useLanguageContext();
  const { constants, updateConstants, projects } = useDataContext();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
  // Watch form values for real-time preview
  const watchedValues = Form.useWatch([], form) || {};
  
  // Calculate auto values
  const autoValues = useMemo(() => {
    const startYear = parseInt(watchedValues.STAT_START_YEAR || constants.STAT_START_YEAR || '2022', 10);
    const currentYear = new Date().getFullYear();
    const yearsExperience = Math.max(0, currentYear - startYear);
    
    const visibleProjects = projects.filter(p => !p.hidden);
    const projectsCount = visibleProjects.length;
    
    const uniqueTags = new Set<string>();
    visibleProjects.forEach(project => {
      project.tags.forEach(tag => uniqueTags.add(tag));
    });
    const techCount = uniqueTags.size;
    
    return {
      years: yearsExperience === 0 ? '<1' : `${yearsExperience}+`,
      projects: `${projectsCount}+`,
      technologies: `${techCount}+`,
    };
  }, [watchedValues.STAT_START_YEAR, constants.STAT_START_YEAR, projects]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      // Convert boolean values to strings for Firebase
      const updateData = {
        ...values,
        STAT_PROJECTS_AUTO: values.STAT_PROJECTS_AUTO ? 'true' : 'false',
        STAT_TECHNOLOGIES_AUTO: values.STAT_TECHNOLOGIES_AUTO ? 'true' : 'false',
        STAT_START_YEAR: values.STAT_START_YEAR.toString(),
      };
      
      // Update each constant
      Object.entries(updateData).forEach(([key, value]) => {
        updateConstants(key, value as string);
      });

      message.success(
        language === 'vi' ? 'Đã cập nhật thống kê!' : 'Stats updated successfully!'
      );
    } catch (error) {
      message.error(
        language === 'vi' ? 'Cập nhật thất bại!' : 'Update failed!'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.setFieldsValue({
      STAT_START_YEAR: constants.STAT_START_YEAR || '2022',
      STAT_PROJECTS_AUTO: constants.STAT_PROJECTS_AUTO === 'true',
      STAT_PROJECTS_VALUE: constants.STAT_PROJECTS_VALUE || '10+',
      STAT_TECHNOLOGIES_AUTO: constants.STAT_TECHNOLOGIES_AUTO === 'true',
      STAT_TECHNOLOGIES_VALUE: constants.STAT_TECHNOLOGIES_VALUE || '15+',
      STAT_STATUS_VALUE: constants.STAT_STATUS_VALUE || 'Active',
    });
    message.info(language === 'vi' ? 'Đã đặt lại giá trị' : 'Values reset');
  };

  return (
    <div className="stats-manager">
      <Card
        title={
          <Space>
            <span className="title-icon">📊</span>
            <span>{language === 'vi' ? 'Quản lý thống kê' : 'Stats Management'}</span>
          </Space>
        }
        className="stats-manager-card"
      >
        <p className="stats-description">
          {language === 'vi'
            ? 'Cấu hình các giá trị thống kê hiển thị trên trang chủ. Chọn chế độ tự động để giá trị được tính toán từ dữ liệu thực tế.'
            : 'Configure the statistics values displayed on the home page. Enable auto mode to calculate values from actual data.'}
        </p>

        <Divider />

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            STAT_START_YEAR: constants.STAT_START_YEAR || '2022',
            STAT_PROJECTS_AUTO: constants.STAT_PROJECTS_AUTO === 'true',
            STAT_PROJECTS_VALUE: constants.STAT_PROJECTS_VALUE || '10+',
            STAT_TECHNOLOGIES_AUTO: constants.STAT_TECHNOLOGIES_AUTO === 'true',
            STAT_TECHNOLOGIES_VALUE: constants.STAT_TECHNOLOGIES_VALUE || '15+',
            STAT_STATUS_VALUE: constants.STAT_STATUS_VALUE || 'Active',
          }}
        >
          <div className="stats-grid-form">
            {/* Years Configuration - Start Year */}
            <Form.Item
              name="STAT_START_YEAR"
              label={
                <Space>
                  <span>📅</span>
                  <span>{language === 'vi' ? 'Năm bắt đầu' : 'Start Year'}</span>
                </Space>
              }
              rules={[
                {
                  required: true,
                  message: language === 'vi' ? 'Vui lòng nhập năm' : 'Please enter year',
                },
              ]}
              tooltip={language === 'vi' ? 'Năm bắt đầu làm việc, dùng để tự động tính số năm kinh nghiệm' : 'The year you started working, used to automatically calculate years of experience'}
            >
              <InputNumber
                placeholder="2022"
                size="large"
                min={1990}
                max={new Date().getFullYear()}
                style={{ width: '100%' }}
              />
            </Form.Item>

            {/* Projects Configuration */}
            <Form.Item
              label={
                <Space>
                  <span>📦</span>
                  <span>{language === 'vi' ? 'Dự án' : 'Projects'}</span>
                </Space>
              }
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <Form.Item
                  name="STAT_PROJECTS_AUTO"
                  valuePropName="checked"
                  style={{ marginBottom: 8 }}
                >
                  <Space>
                    <Switch />
                    <ThunderboltOutlined style={{ color: watchedValues.STAT_PROJECTS_AUTO ? '#1890ff' : '#999' }} />
                    <span style={{ fontSize: '13px', color: watchedValues.STAT_PROJECTS_AUTO ? '#1890ff' : '#666' }}>
                      {language === 'vi' ? 'Tự động đếm từ danh sách dự án' : 'Auto-count from project list'}
                    </span>
                  </Space>
                </Form.Item>
                {watchedValues.STAT_PROJECTS_AUTO ? (
                  <div style={{ padding: '8px 12px', background: '#f0f2f5', borderRadius: '6px', fontSize: '13px' }}>
                    <Space>
                      <ThunderboltOutlined style={{ color: '#52c41a' }} />
                      <span>{language === 'vi' ? 'Giá trị tự động:' : 'Auto value:'}</span>
                      <strong style={{ color: '#1890ff' }}>{autoValues.projects}</strong>
                    </Space>
                  </div>
                ) : (
                  <Form.Item
                    name="STAT_PROJECTS_VALUE"
                    rules={[
                      {
                        required: !watchedValues.STAT_PROJECTS_AUTO,
                        message: language === 'vi' ? 'Vui lòng nhập giá trị' : 'Please enter value',
                      },
                    ]}
                    style={{ marginBottom: 0 }}
                  >
                    <Input
                      placeholder="10+"
                      size="large"
                      maxLength={20}
                      prefix={<EditOutlined />}
                    />
                  </Form.Item>
                )}
              </Space>
            </Form.Item>

            {/* Technologies Configuration */}
            <Form.Item
              label={
                <Space>
                  <span>⭐</span>
                  <span>{language === 'vi' ? 'Công nghệ' : 'Technologies'}</span>
                </Space>
              }
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <Form.Item
                  name="STAT_TECHNOLOGIES_AUTO"
                  valuePropName="checked"
                  style={{ marginBottom: 8 }}
                >
                  <Space>
                    <Switch />
                    <ThunderboltOutlined style={{ color: watchedValues.STAT_TECHNOLOGIES_AUTO ? '#1890ff' : '#999' }} />
                    <span style={{ fontSize: '13px', color: watchedValues.STAT_TECHNOLOGIES_AUTO ? '#1890ff' : '#666' }}>
                      {language === 'vi' ? 'Tự động đếm từ tags dự án' : 'Auto-count from project tags'}
                    </span>
                  </Space>
                </Form.Item>
                {watchedValues.STAT_TECHNOLOGIES_AUTO ? (
                  <div style={{ padding: '8px 12px', background: '#f0f2f5', borderRadius: '6px', fontSize: '13px' }}>
                    <Space>
                      <ThunderboltOutlined style={{ color: '#52c41a' }} />
                      <span>{language === 'vi' ? 'Giá trị tự động:' : 'Auto value:'}</span>
                      <strong style={{ color: '#1890ff' }}>{autoValues.technologies}</strong>
                    </Space>
                  </div>
                ) : (
                  <Form.Item
                    name="STAT_TECHNOLOGIES_VALUE"
                    rules={[
                      {
                        required: !watchedValues.STAT_TECHNOLOGIES_AUTO,
                        message: language === 'vi' ? 'Vui lòng nhập giá trị' : 'Please enter value',
                      },
                    ]}
                    style={{ marginBottom: 0 }}
                  >
                    <Input
                      placeholder="15+"
                      size="large"
                      maxLength={20}
                      prefix={<EditOutlined />}
                    />
                  </Form.Item>
                )}
              </Space>
            </Form.Item>

            {/* Status - Always Manual */}
            <Form.Item
              name="STAT_STATUS_VALUE"
              label={
                <Space>
                  <span>🚀</span>
                  <span>{language === 'vi' ? 'Trạng thái' : 'Status'}</span>
                </Space>
              }
              rules={[
                {
                  required: true,
                  message: language === 'vi' ? 'Vui lòng nhập giá trị' : 'Please enter value',
                },
              ]}
            >
              <Input
                placeholder="Active"
                size="large"
                maxLength={20}
              />
            </Form.Item>
          </div>

          <Divider />

          <div className="stats-actions">
            <Button
              type="default"
              icon={<ReloadOutlined />}
              onClick={handleReset}
              size="large"
            >
              {language === 'vi' ? 'Đặt lại' : 'Reset'}
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSave}
              loading={loading}
              size="large"
            >
              {language === 'vi' ? 'Lưu thay đổi' : 'Save Changes'}
            </Button>
          </div>
        </Form>

        <div className="stats-preview">
          <h4>{language === 'vi' ? '👀 Xem trước:' : '👀 Preview:'}</h4>
          <div className="preview-grid">
            <div className="preview-stat">
              <div className="preview-icon">�</div>
              <div className="preview-value">{autoValues.years}</div>
              <div className="preview-label">
                {language === 'vi' ? 'Năm kinh nghiệm' : 'Years Experience'}
              </div>
              <div className="preview-mode">
                <ThunderboltOutlined style={{ fontSize: '12px', color: '#52c41a' }} />
                <span style={{ fontSize: '11px', color: '#999' }}>
                  {language === 'vi' ? 'Tự động' : 'Auto'}
                </span>
              </div>
            </div>
            <div className="preview-stat">
              <div className="preview-icon">📦</div>
              <div className="preview-value">
                {watchedValues.STAT_PROJECTS_AUTO 
                  ? autoValues.projects 
                  : (watchedValues.STAT_PROJECTS_VALUE || constants.STAT_PROJECTS_VALUE || '10+')}
              </div>
              <div className="preview-label">
                {language === 'vi' ? 'Dự án' : 'Projects'}
              </div>
              <div className="preview-mode">
                {watchedValues.STAT_PROJECTS_AUTO ? (
                  <>
                    <ThunderboltOutlined style={{ fontSize: '12px', color: '#52c41a' }} />
                    <span style={{ fontSize: '11px', color: '#999' }}>
                      {language === 'vi' ? 'Tự động' : 'Auto'}
                    </span>
                  </>
                ) : (
                  <>
                    <EditOutlined style={{ fontSize: '12px', color: '#1890ff' }} />
                    <span style={{ fontSize: '11px', color: '#999' }}>
                      {language === 'vi' ? 'Thủ công' : 'Manual'}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="preview-stat">
              <div className="preview-icon">⭐</div>
              <div className="preview-value">
                {watchedValues.STAT_TECHNOLOGIES_AUTO 
                  ? autoValues.technologies 
                  : (watchedValues.STAT_TECHNOLOGIES_VALUE || constants.STAT_TECHNOLOGIES_VALUE || '15+')}
              </div>
              <div className="preview-label">
                {language === 'vi' ? 'Công nghệ' : 'Technologies'}
              </div>
              <div className="preview-mode">
                {watchedValues.STAT_TECHNOLOGIES_AUTO ? (
                  <>
                    <ThunderboltOutlined style={{ fontSize: '12px', color: '#52c41a' }} />
                    <span style={{ fontSize: '11px', color: '#999' }}>
                      {language === 'vi' ? 'Tự động' : 'Auto'}
                    </span>
                  </>
                ) : (
                  <>
                    <EditOutlined style={{ fontSize: '12px', color: '#1890ff' }} />
                    <span style={{ fontSize: '11px', color: '#999' }}>
                      {language === 'vi' ? 'Thủ công' : 'Manual'}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="preview-stat">
              <div className="preview-icon">🚀</div>
              <div className="preview-value">
                {watchedValues.STAT_STATUS_VALUE || constants.STAT_STATUS_VALUE || 'Active'}
              </div>
              <div className="preview-label">
                {language === 'vi' ? 'Trạng thái' : 'Status'}
              </div>
              <div className="preview-mode">
                <EditOutlined style={{ fontSize: '12px', color: '#1890ff' }} />
                <span style={{ fontSize: '11px', color: '#999' }}>
                  {language === 'vi' ? 'Thủ công' : 'Manual'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default memo(StatsManager);
