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

function Home() {
  return (
    <>
      <Helmet>
        <title>tuanpc - Phạm Công Tuấn</title>
        <meta name="description" content="My Profile - Portfolio và các công cụ hữu ích" />
      </Helmet>
      <ErrorBoundary>
        <div className="home-container">
          {/* Animated background particles */}
          <div className="particles">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="particle" style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties} />
            ))}
          </div>

          {/* Main content */}
          <div className="home-content">
            {/* Avatar section with glow effect */}
            <div className="avatar-wrapper">
              <div className="avatar-glow"></div>
              <div className="avatar-ring"></div>
              <Image
                src={imageAvatar.src}
                className="avatar-image"
                alt={imageAvatar.alt}
                width={280}
                height={280}
                loading="lazy"
                preview={false}
              />
            </div>

            {/* Name section */}
            <div className="name-section">
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
                  >
                    <DownloadIcon
                      width="2.8rem"
                      height="2.8rem"
                      className="download-icon"
                    />
                  </a>
                </Tooltip>
              </h1>
              <p className="name-subtitle">Full Stack Developer</p>
            </div>

            {/* Action buttons */}
            <div className="actions-grid">
              <a
                href={ENV_VARS.PROFILE_GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="action-btn action-btn-github"
              >
                <div className="btn-icon">
                  <GithubIcon className="icon" />
                </div>
                <span className="btn-text">View on Github</span>
                <div className="btn-shine"></div>
              </a>

              <a
                href={ENV_VARS.PROFILE_FB_URL}
                target="_blank"
                rel="noreferrer"
                className="action-btn action-btn-contact"
              >
                <div className="btn-icon">
                  <ContactIcon className="icon" />
                </div>
                <span className="btn-text">Contact me</span>
                <div className="btn-shine"></div>
              </a>

              <Link to="/demngayraquan" className="action-btn action-btn-countdown">
                <div className="btn-icon">
                  <CalendarIcon className="icon" />
                </div>
                <span className="btn-text">Đếm ngày ra quân</span>
                <div className="btn-shine"></div>
              </Link>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}

export default memo(Home);
