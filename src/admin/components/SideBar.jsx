import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../../components/utils/AuthCookiesManager";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const SideBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    if (!isAuthenticated() || user?.role !== 'ADMIN') {
      navigate('/un-authorised');
    }
  }

  const showLogoutConfirmation = () => {
    confirmDialog({
      message: "Are you sure you want to log out?",
      header: "Confirm Logout",
      icon: "pi pi-exclamation-triangle",
      accept: handleLogout,
      reject: () => console.log("Logout canceled"),
    });
  };

  return (
    <div className="w-60 bg-gray-100 flex rounded-2xl m-4 text-xs flex-col h-[88vh] shadow-lg justify-between mt-3 py-5 font-[600]">
      <ConfirmDialog 
        className=""
        contentClassName="text-red-500"
        acceptIcon="pi pi-accept"
        rejectIcon="pi pi-times"
        acceptClassName="text-sm mx-2 py-1 px-4 bg-blue-500 text-white" 
        rejectClassName="text-sm mx-2 py-1 px-4 border text-black" />
      <ul className="space-y-4">
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 pl-6 ${
                isActive
                  ? "text-red-500 bg-red-50 border-l-4 border-red-500 py-2"
                  : "text-gray-600 hover:teisActivext-black"
              }`
            }
          >
            <i className="pi pi-box"></i>
            <span>My Products</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/i-categories"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 pl-6 ${
                isActive
                  ? "text-red-500 bg-red-50 border-l-4 border-red-500 py-2"
                  : "text-gray-600 hover:text-black"
              }`
            }
          >
            <i className="pi pi-th-large"></i>
            <span>Categories</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/my-orders"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 pl-6 ${
                isActive
                  ? "text-red-500 bg-red-50 border-l-4 border-red-500 py-2"
                  : "text-gray-600 hover:text-black"
              }`
            }
          >
            <i className="pi pi-shopping-cart"></i>
            <span>My Orders</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 pl-6 ${
                isActive
                  ? "text-red-500 bg-red-50 border-l-4 border-red-500 py-2"
                  : "text-gray-600 hover:text-black"
              }`
            }
          >
            <i className="pi pi-users"></i>
            <span>Users</span>
          </NavLink>
        </li>
      </ul>

      <ul className="space-y-4">
        <li className="line-through">
          <NavLink
            to="/my-store"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 pl-6 ${
                isActive
                  ? "text-red-500 bg-red-50 border-l-4 border-red-500 py-2"
                  : "text-gray-600 hover:text-black"
              }`
            }
          >
            <i className="pi pi-home"></i>
            <span>My Store</span>
          </NavLink>
        </li>

        <li className="line-through">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 pl-6 ${
                isActive
                  ? "text-red-500 bg-red-50 border-l-4 border-red-500 py-2"
                  : "text-gray-600 hover:text-black"
              }`
            }
          >
            <i className="pi pi-cog"></i>
            <span>Settings</span>
          </NavLink>
        </li>

        <li className="border-t-2 pt-8">
          <p
            onClick={showLogoutConfirmation}
            className="flex items-center font-bold gap-3 px-4 pl-6 text-red-600 hover:text-red-700 cursor-pointer"
            aria-label="Log out"
          >
            <i className="pi pi-sign-out"></i>
            <span>Log Out</span>
          </p>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;