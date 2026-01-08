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
          <div className="home-content">
            <div className="avatar-section">
              <Image
                src={imageAvatar.src}
                className="avatar-image"
                alt={imageAvatar.alt}
                width={200}
                height={200}
                loading="lazy"
                preview={false}
              />
            </div>

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
                      width="1.5rem"
                      height="1.5rem"
                      className="download-icon"
                    />
                  </a>
                </Tooltip>
              </h1>
              <p className="name-subtitle">Full Stack Developer</p>
            </div>

            <div className="actions-section">
              <a
                href={ENV_VARS.PROFILE_GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="action-btn action-btn-github"
              >
                <GithubIcon className="btn-icon" />
                <span>View on Github</span>
              </a>

              <a
                href={ENV_VARS.PROFILE_FB_URL}
                target="_blank"
                rel="noreferrer"
                className="action-btn action-btn-contact"
              >
                <ContactIcon className="btn-icon" />
                <span>Contact me</span>
              </a>

              <Link to="/demngayraquan" className="action-btn action-btn-countdown">
                <CalendarIcon className="btn-icon" />
                <span>Đếm ngày ra quân</span>
              </Link>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}

export default memo(Home);
