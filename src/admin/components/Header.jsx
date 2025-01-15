import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAuthUser, isAuthenticated } from '../../components/utils/AuthCookiesManager';
const user = getAuthUser();

const getInitials = (fullName) => {
  if (!fullName) return '';
  const names = fullName.split(' ');
  return names.map((name) => name[0].toUpperCase()).join('');
};

const IconWithBadge = ({ iconClass, badgeCount, ariaLabel }) => (
  <div className="relative flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full cursor-pointer" role="button" aria-label={ariaLabel}>
    <i className={iconClass} />
    {badgeCount > 0 && (
      <span className="absolute top-0 -right-1 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
        {badgeCount}
      </span>
    )}
  </div>
);

const Header = ({ notificationCount = 0 }) => {
  const { dispatchAuth } = useAuth();
  return (
    <div className="flex justify-between items-center h-[8vh] px-6 py-3 bg-gray-100 rounded-3xl shadow-lg">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10">
          <img 
            src="/nmt.png" 
            alt="Nalmart logo" 
            className="w-full h-full object-contain"
            onError={(e) => { e.target.src = "/fallback-logo.png"; }}
          />
        </div>
        <h1 className="text-xl font-bold">
          <span className="text-red-600">Nalmart.com</span>
          <span className="text-gray-400"> | </span>
          <span className="text-gray-600 text-sm">Dashboard</span>
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <Link to=".dashboard/getting-started" className="text-sm font-semibold text-gray-600 hover:text-black">
          Getting Started
        </Link>

        <IconWithBadge iconClass="pi pi-bell text-lg" badgeCount={notificationCount} ariaLabel="Notifications" />

        {isAuthenticated ? (
          <div className="font-bold text-gray-700 bg-gray-200 p-2 rounded-full" title={`Already logged in as ${user?.fullName}`}>
            {getInitials(user?.fullName)}
          </div>
        ) : (
          <button onClick={() => dispatchAuth(true)}>
            <IconWithBadge iconClass="pi pi-user text-lg cursor-pointer" ariaLabel="User Profile" />
          </button>
        )}
        <div className="relative flex items-center gap-2 cursor-pointer">
          <span className="font-semibold text-gray-600 hover:text-black">English</span>
          <i className="pi pi-chevron-down text-gray-400"></i>
        </div>
      </div>
    </div>
  );
};

export default Header;
