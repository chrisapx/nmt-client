import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-60 bg-gray-100 flex rounded-2xl m-4 text-xs flex-col h-[88vh] shadow-lg justify-between mt-3 py-5 font-[600]">
      <ul className="space-y-4">
        {/* My Products */}
        <li>
          <NavLink
            to="/dashboard/my-products"
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
            {/* <span className="ml-auto bg-gray-200 text-xs p-1 rounded-full">
              6
            </span> */}
          </NavLink>
        </li>

        {/* Product Categories */}
        <li>
          <NavLink
            to="/dashboard/i-categories"
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
            {/* <span className="ml-auto bg-gray-200 text-xs p-1 rounded-full">
              6
            </span> */}
          </NavLink>
        </li>

        {/* My Orders */}
        <li>
          <NavLink
            to="/dashboard/my-orders"
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
            {/* <span className="ml-auto bg-gray-200 text-xs p-1 rounded-full">
              31
            </span> */}
          </NavLink>
        </li>

        {/* Users */}
        <li>
          <NavLink
            to="/dashboard/users"
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
            {/* <span className="ml-auto bg-gray-200 text-xs p-1 rounded-full">
              31
            </span> */}
          </NavLink>
        </li>
      </ul>

      <ul className="space-y-4">
        {/* My Store */}
        <li>
          <NavLink
            to="/dashboard/my-store"
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

        {/* Settings */}
        <li>
          <NavLink
            to="/dashboard/settings"
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
      </ul>
    </div>
  );
};

export default SideBar;