import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  CalendarIcon,
  ContactIcon,
  DownloadIcon,
  GithubIcon,
} from '~alias~/components/icons/icons';
import { Tooltip, Image } from 'antd';
import { Link } from 'react-router-dom';
import ErrorBoundary from '~alias~/components/ErrorBoundary/ErrorBoundary';
import { ENV_VARS } from '~alias~/lib/constants';
import './Home.styles.scss';

const imageAvatar = {
  src: '/author.webp',
  name: 'tuanpc',
  alt: 'avatar',
} as const;

const META_DESCRIPTION = 'Portfolio của Phạm Công Tuấn - Full Stack Developer. Các công cụ hữu ích và dự án cá nhân.';
const META_KEYWORDS = 'Phạm Công Tuấn, tuanpc, Full Stack Developer, Portfolio, React, TypeScript, Web Development';

function Home() {
  return (
    <>
      <Helmet>
        <title>tuanpc - Phạm Công Tuấn | Full Stack Developer</title>
        <meta name="description" content={META_DESCRIPTION} />
        <meta name="keywords" content={META_KEYWORDS} />
        <meta name="author" content="Phạm Công Tuấn" />
        <meta property="og:title" content="tuanpc - Phạm Công Tuấn" />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="tuanpc - Phạm Công Tuấn" />
        <meta name="twitter:description" content={META_DESCRIPTION} />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin : ''} />
      </Helmet>
      <ErrorBoundary>
        <main className="home-container" role="main">
          <div className="home-content">
            <section className="avatar-section" aria-label="Avatar section">
              <Image
                src={imageAvatar.src}
                className="avatar-image"
                alt={imageAvatar.alt}
                width={200}
                height={200}
                loading="lazy"
                preview={false}
              />
            </section>

            <section className="name-section" aria-label="Name and title section">
              <h1 className="name-title">
                Phạm Công Tuấn
                <Tooltip
                  className="download-tooltip"
                  color="#9b59b6"
                  title="Download My CV"
                >
                  <a
                    className="download-link"
                    href={imageAvatar.src}
                    download={imageAvatar.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Download CV"
                  >
                    <DownloadIcon
                      width="1.5rem"
                      height="1.5rem"
                      className="download-icon"
                      aria-hidden="true"
                    />
                  </a>
                </Tooltip>
              </h1>
              <p className="name-subtitle">Full Stack Developer</p>
            </section>

            <nav className="actions-section" aria-label="Navigation links">
              <a
                href={ENV_VARS.PROFILE_GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="action-btn action-btn-github"
                aria-label="View profile on GitHub"
              >
                <GithubIcon className="btn-icon" aria-hidden="true" />
                <span>View on Github</span>
              </a>

              <a
                href={ENV_VARS.PROFILE_FB_URL}
                target="_blank"
                rel="noreferrer"
                className="action-btn action-btn-contact"
                aria-label="Contact me on Facebook"
              >
                <ContactIcon className="btn-icon" aria-hidden="true" />
                <span>Contact me</span>
              </a>

              <Link 
                to="/demngayraquan" 
                className="action-btn action-btn-countdown"
                aria-label="Go to countdown page"
              >
                <CalendarIcon className="btn-icon" aria-hidden="true" />
                <span>Đếm ngày ra quân</span>
              </Link>
            </nav>
          </div>
        </main>
      </ErrorBoundary>
    </>
  );
}

export default memo(Home);
