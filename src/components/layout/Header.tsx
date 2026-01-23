import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { GithubIcon, SearchIcon, SunIcon, MoonIcon, LanguageIcon } from '~alias~/components/icons/icons';
import { useThemeContext } from '~alias~/contexts/ThemeContext';
import { useLanguageContext } from '~alias~/contexts/LanguageContext';
import { getTranslation, translations } from '~alias~/lib/translations';
import { ENV_VARS } from '~alias~/lib/constants';
import SearchModal from '~alias~/components/common/SearchModal';
import './Header.styles.scss';

function Header() {
  // const location = useLocation();
  const { theme, toggleTheme } = useThemeContext();
  const { language, toggleLanguage } = useLanguageContext();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // const isHome = location.pathname === '/';

  const handleSearchToggle = () => {
    setSearchVisible(true);
  };

  const handleSearchClose = () => {
    setSearchVisible(false);
    setSearchValue('');
  };

  const t = (key: keyof typeof translations.vi) => getTranslation(language, key);

  return (
    <header className="app-header" role="banner">
      <div className="header-container">
        <Link to="/" className="header-logo" aria-label="Home">
          <img src="/logo.png" alt="tuanpc logo" className="logo-icon" />
          <span className="logo-text">tuanpc</span>
        </Link>

        {/* <nav className="header-nav" aria-label="Main navigation">
          <Link to="/" className={`nav-link ${isHome ? 'active' : ''}`}>
            {t('home')}
          </Link>
          <Link to="/demngayraquan" className={`nav-link ${!isHome ? 'active' : ''}`}>
            {t('tools')}
          </Link>
        </nav> */}

        <div className="header-actions">
          {/* Search */}
          <button
            className="header-action-btn"
            onClick={handleSearchToggle}
            aria-label={t('search')}
            title={t('search')}
          >
            <SearchIcon className="action-icon" aria-hidden="true" />
          </button>

          {/* Theme Toggle */}
          <button
            className="header-action-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
            title={theme === 'dark' ? t('lightMode') : t('darkMode')}
          >
            {theme === 'dark' ? (
              <SunIcon className="action-icon" aria-hidden="true" />
            ) : (
              <MoonIcon className="action-icon" aria-hidden="true" />
            )}
          </button>

          {/* Language Toggle */}
          <button
            className="header-action-btn"
            onClick={toggleLanguage}
            aria-label={t('language')}
            title={language === 'vi' ? t('english') : t('vietnamese')}
          >
            <LanguageIcon className="action-icon" aria-hidden="true" />
            <span className="language-badge">{language.toUpperCase()}</span>
          </button>

          {/* GitHub */}
          {ENV_VARS.PROFILE_GITHUB_URL && (
            <a
              href={ENV_VARS.PROFILE_GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="header-action-btn"
              aria-label="GitHub"
              title="GitHub"
            >
              <GithubIcon className="action-icon" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
      
      <SearchModal
        visible={searchVisible}
        onClose={handleSearchClose}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />
    </header>
  );
}

export default memo(Header);
