import { Suspense, memo, useEffect, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguageContext } from './contexts/LanguageContext';
import { DataProvider } from './contexts/DataContext';
import { AuthProvider } from './contexts/AuthContext';
import ConfigProviderWrapper from './components/ConfigProviderWrapper';
import AppLayout from './components/layout/AppLayout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Loading from './components/Spinner/Loading';
import dayjs from 'dayjs';

// Lazy load route components for better code splitting
const Home = lazy(() => import('./pages/Home'));
const DemNgayRaQuan = lazy(() => import('./pages/DemNgayRaQuan'));
const Admin = lazy(() => import('./pages/Admin'));
const Login = lazy(() => import('./components/auth/Login'));
const SignUp = lazy(() => import('./components/auth/SignUp'));
const NotFound = lazy(() => import('./pages/NotFound'));

/**
 * Inner app component that uses language context
 */
const AppContent = memo(function AppContent() {
  const { language } = useLanguageContext();

  useEffect(() => {
    dayjs.locale(language);
  }, [language]);

  return (
    <ConfigProviderWrapper>
      <ErrorBoundary>
        <AppLayout>
          <Suspense fallback={<Loading fullScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/demngayraquan" element={<DemNgayRaQuan />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/signup" element={<SignUp />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AppLayout>
      </ErrorBoundary>
    </ConfigProviderWrapper>
  );
});

/**
 * Main App component with routing and error boundaries
 * Optimized with React.memo and Suspense for better performance
 */
const App = memo(function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <DataProvider>
              <AppContent />
            </DataProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
});

export default App;
