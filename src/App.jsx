import { Suspense, lazy } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { LoadingProvider } from './context/LoaderContext';
import Notification from './components/Notification';
import Loading from './actions/utils/Loader';
import PhotosAction from './actions/PhotosAction';
import DesktopMessage from './client/components/DesktopMessage';
import LoadingSpinner from './global/LoadingSpinner';
import ClientRoutes from './layout/ClientRoutes';
import AdminRoutes from './layout/AdminRoutes';
import AuthModel from './components/model_content/AuthModel';

function App() {
  return (
    <div>
      <Notification />
      <Loading />
      <PhotosAction />
      <DesktopMessage />
      <LoadingProvider>
        <CartProvider>
            <AuthModel />
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/*" element={<ClientRoutes />} />
                <Route path="/dashboard/*" element={<AdminRoutes />} />
              </Routes>
            </Suspense>
        </CartProvider>
      </LoadingProvider>
    </div>
  );
}

export default App;