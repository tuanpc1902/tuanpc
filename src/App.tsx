import { Suspense, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AppLayout from './components/layout/AppLayout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Loading from './components/Spinner/Loading';
import Home from './pages/Home';
import DemNgayRaQuan from './pages/DemNgayRaQuan';

/**
 * Main App component with routing and error boundaries
 * Optimized with React.memo and Suspense for better performance
 */
function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <AppLayout>
          <Suspense fallback={<Loading fullScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/demngayraquan" element={<DemNgayRaQuan />} />
            </Routes>
          </Suspense>
        </AppLayout>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default memo(App);
