import { Suspense, lazy } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Routes } from 'react-router-dom';
import { LoadingProvider } from './context/LoaderContext';
import DesktopMessage from './client/components/DesktopMessage';
import LoadingSpinner from './global/LoadingSpinner';
import ClientRoutes from './layout/ClientRoutes';
import AdminRoutes from './layout/AdminRoutes';
import AuthModel from './components/auth_models/AuthModel';

function App() {
  const hostname = window.location.hostname;
  const isAdminSubdomain = hostname.startsWith('dashboard');

  return (
    <div>
      <DesktopMessage />
      <LoadingProvider>
        <AuthModel />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="*" element={ isAdminSubdomain ? <AdminRoutes/> : <ClientRoutes />} />
          </Routes>
        </Suspense>
      </LoadingProvider>
    </div>
  );
}

export default App;