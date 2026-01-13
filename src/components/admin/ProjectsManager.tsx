import { memo, useState, useMemo } from 'react';
import {
  Button,
  Input,
  Form,
  Modal,
  message,
  Checkbox,
  Select,
  Empty,
  Card,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  ClearOutlined,
} from '@ant-design/icons';
import { useDataContext } from '~alias~/contexts/DataContext';
import { useLanguageContext } from '~alias~/contexts/LanguageContext';
import { getTranslation, translations } from '~alias~/lib/translations';
import type { Project } from '~alias~/lib/projects';
import { ProjectsTable } from './ProjectsTable';
import './ProjectsManager.styles.scss';

function ProjectsManager() {
  const { language } = useLanguageContext();
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    reorderProjects,
    togglePinProject,
    toggleHideProject,
  } = useDataContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
  const [featuredFilter, setFeaturedFilter] = useState<boolean | undefined>(undefined);
  const t = (key: keyof typeof translations.vi) => getTranslation(language, key);

  const handleAdd = () => {
    setEditingProject(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    form.setFieldsValue({
      ...project,
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : project.tags,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteProject(id);
    message.success(t('projectDeleted'));
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // Convert tags string to array
      const processedValues = {
        ...values,
        tags: typeof values.tags === 'string' 
          ? values.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0)
          : values.tags,
      };
      if (editingProject) {
        updateProject(editingProject.id, processedValues);
        message.success(t('projectUpdated'));
      } else {
        const maxOrder = Math.max(...projects.map((p) => p.order || 0), -1);
        addProject({
          ...processedValues,
          id: Date.now().toString(),
          order: maxOrder + 1,
          pinned: false,
          hidden: false,
        });
        message.success(t('projectAdded'));
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  // Filter projects based on search and filters
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        !searchText ||
        project.name.toLowerCase().includes(searchText.toLowerCase()) ||
        project.description.toLowerCase().includes(searchText.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchText.toLowerCase())) ||
        project.category.toLowerCase().includes(searchText.toLowerCase());

      const matchesCategory = !categoryFilter || project.category === categoryFilter;
      const matchesFeatured =
        featuredFilter === undefined || project.featured === featuredFilter;

      return matchesSearch && matchesCategory && matchesFeatured;
    });
  }, [projects, searchText, categoryFilter, featuredFilter]);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(projects.map((p) => p.category)));
    return uniqueCategories;
  }, [projects]);

  const handleClearFilters = () => {
    setSearchText('');
    setCategoryFilter(undefined);
    setFeaturedFilter(undefined);
  };

  const hasActiveFilters = searchText || categoryFilter !== undefined || featuredFilter !== undefined;

  return (
    <div className="projects-manager">
      <Card className="manager-filters-card">
        <div className="manager-filters">
          <div className="filters-left">
            <Input
              placeholder={language === 'vi' ? 'Tìm kiếm dự án...' : 'Search projects...'}
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              size="large"
              className="search-input"
            />
            <Select
              placeholder={language === 'vi' ? 'Tất cả danh mục' : 'All categories'}
              value={categoryFilter}
              onChange={setCategoryFilter}
              allowClear
              size="large"
              className="category-select"
              style={{ minWidth: 180 }}
            >
              {categories.map((cat) => (
                <Select.Option key={cat} value={cat}>
                  {cat}
                </Select.Option>
              ))}
            </Select>
            <Select
              placeholder={language === 'vi' ? 'Tất cả' : 'All'}
              value={featuredFilter}
              onChange={setFeaturedFilter}
              allowClear
              size="large"
              className="featured-select"
              style={{ minWidth: 120 }}
            >
              <Select.Option value={true}>
                {language === 'vi' ? 'Nổi bật' : 'Featured'}
              </Select.Option>
              <Select.Option value={false}>
                {language === 'vi' ? 'Không nổi bật' : 'Not Featured'}
              </Select.Option>
            </Select>
            {hasActiveFilters && (
              <Button
                icon={<ClearOutlined />}
                onClick={handleClearFilters}
                size="large"
                className="clear-filters-btn"
              >
                {language === 'vi' ? 'Xóa bộ lọc' : 'Clear filters'}
              </Button>
            )}
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            size="large"
            className="add-project-btn"
          >
            {t('addProject')}
          </Button>
        </div>
        {hasActiveFilters && (
          <div className="filter-results-info">
            {language === 'vi'
              ? `Hiển thị ${filteredProjects.length} / ${projects.length} dự án`
              : `Showing ${filteredProjects.length} / ${projects.length} projects`}
          </div>
        )}
      </Card>
      {filteredProjects.length > 0 ? (
        <ProjectsTable
          data={filteredProjects}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReorder={reorderProjects}
          onTogglePin={togglePinProject}
          onToggleHide={toggleHideProject}
          t={t as (key: string) => string}
          language={language}
        />
      ) : (
        <Card className="empty-state-card">
          <Empty
            description={
              hasActiveFilters
                ? language === 'vi'
                  ? 'Không tìm thấy dự án nào phù hợp với bộ lọc'
                  : 'No projects found matching the filters'
                : language === 'vi'
                ? 'Chưa có dự án nào. Hãy thêm dự án đầu tiên!'
                : 'No projects yet. Add your first project!'
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            {!hasActiveFilters && (
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} size="large">
                {t('addProject')}
              </Button>
            )}
          </Empty>
        </Card>
      )}
      <Modal
        title={editingProject ? t('editProject') : t('addProject')}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        width={700}
        okText={t('save')}
        cancelText={t('cancel')}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label={t('projectName')}
            rules={[{ required: true, message: t('pleaseEnterName') }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="description"
            label={t('description')}
            rules={[{ required: true, message: t('pleaseEnterDescription') }]}
          >
            <Input.TextArea rows={3} size="large" />
          </Form.Item>
          <Form.Item
            name="icon"
            label={t('iconEmoji')}
            rules={[{ required: true, message: t('pleaseEnterIcon') }]}
          >
            <Input placeholder="📅" size="large" />
          </Form.Item>
          <Form.Item
            name="category"
            label={t('category')}
            rules={[{ required: true, message: t('pleaseEnterCategory') }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="tags"
            label={t('tagsPlaceholder')}
            rules={[{ required: true, message: t('pleaseEnterTags') }]}
          >
            <Input placeholder="React, TypeScript, Vite" size="large" />
          </Form.Item>
          <Form.Item name="link" label={t('link')}>
            <Input placeholder="/demngayraquan hoặc https://..." size="large" />
          </Form.Item>
          <Form.Item name="github" label={t('githubUrl')}>
            <Input placeholder="https://github.com/..." size="large" />
          </Form.Item>
          <Form.Item name="featured" valuePropName="checked">
            <Checkbox>{t('featured')}</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default memo(ProjectsManager);
