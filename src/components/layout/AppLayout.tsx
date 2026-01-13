import { memo } from 'react';
import Header from './Header';
import Footer from './Footer';
import './AppLayout.styles.scss';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Main application layout component
 * Provides consistent layout structure with Header and Footer
 */
const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="app-main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default memo(AppLayout);
