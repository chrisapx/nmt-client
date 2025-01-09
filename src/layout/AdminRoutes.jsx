import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../admin/pages/Dashboard';
import { getAuthUser, isAuthenticated } from '../components/utils/AuthCookiesManager';
import UnauthorisedPage from '../admin/pages/UnAuthorisedPage';
const user = getAuthUser();

const AdminRoutes = () => {
    if(!isAuthenticated && user.role !== ADMIN) {
        window.location.href = '/dashboard/un-authorised';
    }
  return (
    <Routes>
      <Route path="/*" element={<Dashboard />} />
      <Route path="/un-authorised" element={<UnauthorisedPage />} />
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default AdminRoutes;