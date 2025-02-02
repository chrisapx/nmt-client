import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { CgMenu } from "react-icons/cg";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { Sidebar } from 'primereact/sidebar';
import { useAuth } from "../../context/AuthContext";
import { getAuthUser, isAuthenticated, logout } from "../utils/AuthCookiesManager";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

const user = getAuthUser();
const getInitials = (fullName) => {
  if (!fullName) return '';
  const names = fullName.split(' ');
  return names.map((name) => name[0].toUpperCase()).join('');
};

const Header = ({ showBack, showMenuIcon, showUser, showCart, cartCount }) => {
  const navigate = useNavigate();
  const { dispatchAuth } = useAuth();
  const [toggle, setToggle] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
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

  const handleCartClick = () => {
    if(cartCount> 0){
      navigate("/cart")
    } else {
      alert("Your cart is empty");
    }
  }


  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mt-4 bg-white">
        <div className="flex items-center">
          {showBack && (
            <div className="mr-2 cursor-pointer">
              <FaAngleLeft size={22} className="text-gray-500" onClick={() => navigate(-1)} />
            </div>
          )}

          { showMenuIcon && <CgMenu className='text-2xl text-gray-500 mr-2' onClick={() => setToggle(!toggle)}/> }
          <div
            className="font-semibold text-2xl text-red-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Nalmart
          </div>
        </div>

        <div className="flex items-center space-x-4">
          { isAuthenticated() ? (
            <div className="font-bold text-gray-700 bg-gray-200 p-2 rounded-full" title={`Already logged in as ${user?.fullName || "--"}`}>
              {getInitials(user?.fullName)}
            </div>
          ) : (
            <button onClick={() => dispatchAuth(true)}>
              <i className="pi pi-user text-lg cursor-pointer" aria-label="User Profile" />
            </button>
          )}
          { isAuthenticated() && showCart && <div className="relative cursor-pointer" onClick={handleCartClick}>
            <ShoppingCartOutlined size={22} />
            {cartCount > 0 && (
              <div className="absolute -top-2 -right-1 bg-black text-white text-[10px] font-bold rounded-full px-1">
                {cartCount || "--"}
              </div>
            )}
          </div>}
        </div>
      </div>

      {/* Drawer */}
      {isAuthenticated() ? (
        <Sidebar
          visible={toggle}
          onHide={() => setToggle(false)}
          position="left"
          contentClassName="h-[90vh] flex flex-col justify-between"
          content={({ hide }) => (
            <div className="h-[100vh] flex flex-col justify-between">
              <section >
                <header className="p-4 bg-gray-100 border-b">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full font-bold text-gray-700"
                      title={`Logged in as ${user?.fullName || "User"}`}
                    >
                      {getInitials(user?.fullName || "User")}
                    </div>
                    <div>
                      <div className="truncate font-bold text-gray-800">
                        {user?.fullName || "Guest User"}
                      </div>
                      <p className="truncate text-xs text-gray-500">
                        {user?.email || "No email available"}
                      </p>
                    </div>
                  </div>
                </header>
                <section className="flex-1 p-4 space-y-4 line-through">
                  <NavItem icon="pi-home" label="My Orders" />
                  <NavItem icon="pi-cog" label="Settings" />
                </section>
              </section>
              <footer className="p-4 border-t bg-gray-50">
                <button
                  onClick={showLogoutConfirmation}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 font-bold text-sm rounded-md transition"
                  aria-label="Log out"
                >
                  <i className="pi pi-sign-out"></i>
                  Log Out
                </button>
              </footer>
            </div>
          )}
        />
      ) : (
        <Sidebar
          visible={toggle}
          onHide={() => setToggle(false)}
          position="left"
          contentClassName="bg-white shadow-lg "
          content={({ hide }) => (
            <div className="h-[100vh] flex flex-col justify-between">
              <header className="p-4 bg-gray-100 border-b">
                <div className="text">
                  <p className="text-gray-700 font-bold">Welcome, our boss😊!</p>
                  <p className="text-xs text-gray-500">Sign in to access more features</p>
                </div>
              </header>

              <footer className="p-4 border-t bg-gray-50">
                <p
                  onClick={() => dispatchAuth(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-bold text-sm rounded-md transition"
                  aria-label="Log in"
                >
                  <i className="pi pi-sign-in"></i>
                  Log In
                </p>
              </footer>
            </div>
          )
          }
        />
      )}

      <ConfirmDialog 
        className=""
        contentClassName="text-red-500"
        acceptIcon="pi pi-accept"
        rejectIcon="pi pi-times"
        acceptClassName="text-sm mx-2 py-1 px-4 bg-blue-500 text-white" 
        rejectClassName="text-sm mx-2 py-1 px-4 border text-black" />
    </div>
  );
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

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 ${
          isActive
            ? "text-red-500 bg-red-50 border-l-4 border-red-500"
            : "text-gray-600 hover:text-black"
        }`
      }
    >
      <i className={`pi ${icon}`}></i>
      <span>{label}</span>
    </NavLink>
  );
}

export default Header;