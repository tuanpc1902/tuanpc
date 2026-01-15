import { memo, useMemo, useState } from 'react';
import {
  ViewIcon,
  GithubIcon,
} from '~alias~/components/icons/icons';
import { Tooltip, Image, Input, Select, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import ErrorBoundary from '~alias~/components/ErrorBoundary/ErrorBoundary';
import MetaTags from '~alias~/components/common/MetaTags';
import CVModal from '~alias~/components/common/CVModal';
import { useLanguageContext } from '~alias~/contexts/LanguageContext';
import { useDataContext } from '~alias~/contexts/DataContext';
import type { Project } from '~alias~/lib/projects';
import { AnalyticsEventType, logAnalyticsEvent } from '~alias~/lib/services/analyticsService';
import './Home.styles.scss';
import { ENV_VARS } from '~alias~/lib/constants';

const imageAvatar = {
  src: '/author.webp',
  name: 'tuanpc',
  alt: 'avatar',
} as const;

// CV file will be loaded from constants (managed in admin panel)

const META_DESCRIPTION = 'Portfolio của Phạm Công Tuấn - Full Stack Developer. Các công cụ hữu ích và dự án cá nhân.';
const META_KEYWORDS = 'Phạm Công Tuấn, tuanpc, Full Stack Developer, Portfolio, React, TypeScript, Web Development';

function Home() {
  const { language } = useLanguageContext();
  const { projects, translations: contextTranslations, constants, isLoading } = useDataContext();
  const [cvModalVisible, setCvModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortOption, setSortOption] = useState('default');
  
  const t = (key: keyof typeof contextTranslations.vi) => {
    const translation = contextTranslations[language]?.[key] || contextTranslations.vi[key];
    return translation || '';
  };
  
  // Fallback for viewCV if not in translations
  const viewCVText = t('viewCV' as keyof typeof contextTranslations.vi) || (language === 'vi' ? 'Xem CV' : 'View CV');

  const handleOpenCv = () => {
    setCvModalVisible(true);
    logAnalyticsEvent(AnalyticsEventType.CV_OPEN, {
      source: 'profile',
    });
  };

  // Sort projects: pinned first, then by order, and filter out hidden projects
  const visibleProjects = useMemo(() => {
    return projects.filter((project) => !project.hidden);
  }, [projects]);

  const categories = useMemo(() => {
    const set = new Set(visibleProjects.map((project) => project.category));
    return Array.from(set).sort();
  }, [visibleProjects]);

  const tags = useMemo(() => {
    const set = new Set(visibleProjects.flatMap((project) => project.tags));
    return Array.from(set).sort();
  }, [visibleProjects]);

  const filteredProjects = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const matchesSearch = (project: Project) =>
      !normalizedSearch ||
      project.name.toLowerCase().includes(normalizedSearch) ||
      project.description.toLowerCase().includes(normalizedSearch) ||
      project.category.toLowerCase().includes(normalizedSearch) ||
      project.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

    const matchesCategory = (project: Project) =>
      selectedCategory === 'all' || project.category === selectedCategory;

    const matchesTag = (project: Project) =>
      selectedTag === 'all' || project.tags.includes(selectedTag);

    const base = visibleProjects.filter(
      (project) => matchesSearch(project) && matchesCategory(project) && matchesTag(project)
    );

    const sorters: Record<string, (a: Project, b: Project) => number> = {
      default: (a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return (a.order || 0) - (b.order || 0);
      },
      nameAsc: (a, b) => a.name.localeCompare(b.name),
      nameDesc: (a, b) => b.name.localeCompare(a.name),
      category: (a, b) => a.category.localeCompare(b.category),
    };

    return [...base].sort(sorters[sortOption] || sorters.default);
  }, [visibleProjects, searchQuery, selectedCategory, selectedTag, sortOption]);

  const ogImage = constants.OG_IMAGE_URL || (typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : '/logo.png');

  return (
    <>
      <MetaTags
        title={`tuanpc - ${t('fullName')} | Full Stack Developer`}
        description={META_DESCRIPTION}
        keywords={META_KEYWORDS}
        canonicalUrl={typeof window !== 'undefined' ? window.location.origin : ''}
        ogTitle={`tuanpc - ${t('fullName')}`}
        ogDescription={META_DESCRIPTION}
        ogImage={ogImage}
        ogType="website"
        twitterTitle={`tuanpc - ${t('fullName')}`}
        twitterDescription={META_DESCRIPTION}
        twitterImage={ogImage}
      />
      <ErrorBoundary>
        <main className="home-container" role="main">
          <div className="home-content">
            {/* Profile Card */}
            <section className="profile-card" aria-label="Profile section">
              <div className="profile-header">
                <div className="profile-avatar-wrapper">
                  <Image
                    src={imageAvatar.src}
                    className="profile-avatar"
                    alt={imageAvatar.alt}
                    width={120}
                    height={120}
                    loading="lazy"
                    preview={false}
                  />
                </div>
                <div className="profile-info">
                  <div className="profile-name-section">
                    <h1 className="profile-name">{t('fullName')}</h1>
                    <div className="profile-handle">
                      @tuanpc
                    </div>
                    <div className="profile-badge">
                      <span className="badge-icon">⚡</span>
                      <span>{t('fullStackDeveloper')}</span>
                    </div>
                  </div>
                  <div className="profile-links">
                    {ENV_VARS.PROFILE_GITHUB_URL && (
                      <a
                        href={ENV_VARS.PROFILE_GITHUB_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="profile-link"
                        aria-label="View GitHub profile"
                        onClick={() =>
                          logAnalyticsEvent(AnalyticsEventType.PROFILE_GITHUB_CLICK, {
                            url: ENV_VARS.PROFILE_GITHUB_URL,
                          })
                        }
                      >
                        <GithubIcon className="link-icon" aria-hidden="true" />
                        <span>GitHub</span>
                      </a>
                    )}
                    <Tooltip title={viewCVText} color="#9b59b6">
                      <button
                        className="profile-link"
                        onClick={handleOpenCv}
                        aria-label={viewCVText}
                        type="button"
                      >
                        <ViewIcon className="link-icon" aria-hidden="true" />
                        <span>{viewCVText}</span>
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Grid */}
            <section className="stats-grid" aria-label="Statistics">
              <div className="stat-card">
                <div className="stat-icon">📦</div>
                <div className="stat-value">5+</div>
                <div className="stat-label">{t('projects')}</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💻</div>
                <div className="stat-value">3+</div>
                <div className="stat-label">{t('years')}</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-value">10+</div>
                <div className="stat-label">{t('technologies')}</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🚀</div>
                <div className="stat-value">{t('active')}</div>
                <div className="stat-label">{t('status')}</div>
              </div>
            </section>

            {/* About Section */}
            <section className="about-card" aria-label="About section">
              <h2 className="card-title">{t('about')}</h2>
              <p className="about-text">
                {t('aboutText')}
              </p>
            </section>

            {/* Projects Section */}
            <section className="projects-section" aria-label="Projects">
              <div className="section-header">
                <h2 className="section-title">
                  <span className="title-icon">✨</span>
                  {t('myProjects')}
                </h2>
                <p className="section-subtitle">{t('projectsSubtitle')}</p>
              </div>
              <div className="projects-filters">
                <div className="projects-filters-left">
                  <Input
                    placeholder={t('searchProjects')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    allowClear
                    size="large"
                    className="projects-search"
                  />
                  <Select
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    size="large"
                    className="projects-select"
                  >
                    <Select.Option value="all">{t('allCategories')}</Select.Option>
                    {categories.map((category) => (
                      <Select.Option key={category} value={category}>
                        {category}
                      </Select.Option>
                    ))}
                  </Select>
                  <Select
                    value={selectedTag}
                    onChange={setSelectedTag}
                    size="large"
                    className="projects-select"
                  >
                    <Select.Option value="all">{t('allTags')}</Select.Option>
                    {tags.map((tag) => (
                      <Select.Option key={tag} value={tag}>
                        {tag}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <Select
                  value={sortOption}
                  onChange={setSortOption}
                  size="large"
                  className="projects-sort"
                >
                  <Select.Option value="default">{t('sortDefault')}</Select.Option>
                  <Select.Option value="nameAsc">{t('sortNameAsc')}</Select.Option>
                  <Select.Option value="nameDesc">{t('sortNameDesc')}</Select.Option>
                  <Select.Option value="category">{t('sortCategory')}</Select.Option>
                </Select>
              </div>
              <div className="projects-grid">
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, index) => (
                    <ProjectCardSkeleton key={`skeleton-${index}`} />
                  ))
                ) : filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))
                ) : (
                  <div className="projects-empty">{t('noResultsFound')}</div>
                )}
              </div>
            </section>
          </div>
        </main>
      </ErrorBoundary>
      <CVModal
        visible={cvModalVisible}
        onClose={() => setCvModalVisible(false)}
        cvUrl={constants.CV_URL || '/tuanpc - VMTD 2026.pdf'}
        cvFileName={constants.CV_FILE_NAME || 'tuanpc - VMTD 2026.pdf'}
      />
    </>
  );
}

// Project Card Component
interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const handleGithubClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Ngăn event bubbling để không trigger click vào project card
    e.stopPropagation();
    logAnalyticsEvent(AnalyticsEventType.PROJECT_GITHUB_CLICK, {
      projectId: project.id,
      projectName: project.name,
      url: project.github,
    });
  };

  const handleProjectClick = () => {
    if (!project.link) return;
    logAnalyticsEvent(AnalyticsEventType.PROJECT_CLICK, {
      projectId: project.id,
      projectName: project.name,
      url: project.link,
    });
  };

  const CardContent = (
    <div className="project-card">
      <div className="project-header">
        <div className="project-icon">{project.icon}</div>
        <div className="project-actions">
          {project.github && project.github.trim() && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              className="project-github-link"
              onClick={handleGithubClick}
              aria-label={`View ${project.name} on GitHub`}
              title={`View ${project.name} on GitHub`}
            >
              <GithubIcon className="github-icon" width="1.25rem" height="1.25rem" />
            </a>
          )}
        </div>
      </div>
      <div className="project-body">
        <h3 className="project-name">{project.name}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tags">
          <span className="tag tag-category">{project.category}</span>
          {project.tags.map((tag, index) => (
            <span key={index} className="tag tag-tech">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (project.link && project.link.startsWith('/')) {
    return (
      <Link to={project.link} className="project-link" onClick={handleProjectClick}>
        {CardContent}
      </Link>
    );
  }

  if (project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="project-link"
        onClick={handleProjectClick}
      >
        {CardContent}
      </a>
    );
  }

  return <div className="project-link">{CardContent}</div>;
}

function ProjectCardSkeleton() {
  return (
    <div className="project-card project-skeleton-card">
      <div className="project-header">
        <Skeleton.Avatar active size={64} shape="square" />
        <Skeleton.Button active size="small" />
      </div>
      <div className="project-body">
        <Skeleton active paragraph={{ rows: 2 }} />
        <div className="project-tags">
          <Skeleton.Button active size="small" />
          <Skeleton.Button active size="small" />
          <Skeleton.Button active size="small" />
        </div>
      </div>
    </div>
  );
}

export default memo(Home);
