import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AppLayout from './components/layout/AppLayout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Loading from './components/Spinner/Loading';
import Home from './pages/Home';
import DemNgayRaQuan from './pages/DemNgayRaQuan';

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

export default App;
