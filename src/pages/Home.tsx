import { memo, useMemo, useState } from 'react';
import {
  ViewIcon,
  GithubIcon,
} from '~alias~/components/icons/icons';
import { Tooltip, Image } from 'antd';
import { Link } from 'react-router-dom';
import ErrorBoundary from '~alias~/components/ErrorBoundary/ErrorBoundary';
import MetaTags from '~alias~/components/common/MetaTags';
import CVModal from '~alias~/components/common/CVModal';
import { useLanguageContext } from '~alias~/contexts/LanguageContext';
import { useDataContext } from '~alias~/contexts/DataContext';
import type { Project } from '~alias~/lib/projects';
import './Home.styles.scss';

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
  const { projects, translations: contextTranslations, constants } = useDataContext();
  const [cvModalVisible, setCvModalVisible] = useState(false);
  
  const t = (key: keyof typeof contextTranslations.vi) => {
    const translation = contextTranslations[language]?.[key] || contextTranslations.vi[key];
    return translation || '';
  };
  
  // Fallback for viewCV if not in translations
  const viewCVText = t('viewCV' as keyof typeof contextTranslations.vi) || (language === 'vi' ? 'Xem CV' : 'View CV');

  // Sort projects: pinned first, then by order, and filter out hidden projects
  const sortedProjects = useMemo(() => {
    return [...projects]
      .filter((project) => !project.hidden) // Filter out hidden projects
      .sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return (a.order || 0) - (b.order || 0);
      });
  }, [projects]);

  return (
    <>
      <MetaTags
        title={`tuanpc - ${t('fullName')} | Full Stack Developer`}
        description={META_DESCRIPTION}
        keywords={META_KEYWORDS}
        canonicalUrl={typeof window !== 'undefined' ? window.location.origin : ''}
        ogTitle={`tuanpc - ${t('fullName')}`}
        ogDescription={META_DESCRIPTION}
        ogType="website"
        twitterTitle={`tuanpc - ${t('fullName')}`}
        twitterDescription={META_DESCRIPTION}
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
                    {constants.PROFILE_GITHUB_URL && (
                      <a
                        href={constants.PROFILE_GITHUB_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="profile-link"
                        aria-label="View GitHub profile"
                      >
                        <GithubIcon className="link-icon" aria-hidden="true" />
                        <span>GitHub</span>
                      </a>
                    )}
                    <Tooltip title={viewCVText} color="#9b59b6">
                      <button
                        className="profile-link"
                        onClick={() => setCvModalVisible(true)}
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
              <div className="projects-grid">
                {sortedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
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
      <Link to={project.link} className="project-link">
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
      >
        {CardContent}
      </a>
    );
  }

  return <div className="project-link">{CardContent}</div>;
}

export default memo(Home);
