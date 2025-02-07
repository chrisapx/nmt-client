import { Sidebar } from "primereact/sidebar";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { getAuthUser, isAuthenticated, logout } from "../utils/AuthCookiesManager";
import { NavLink } from "react-router-dom";
import { Verified } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { Button } from "primereact/button";

const user = getAuthUser();

const SidebarComponent = ({ visible, onHide }) => {

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const showLogoutConfirmation = () => {
    confirmDialog({
        group: 'headless',
        message: 'Are you sure you want to logout?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        reject: () => console.log("canceled logout")
    });
  };

  return (
    <Sidebar visible={visible} 
        onHide={onHide} position="left" 
        className="w-[70vw]"
        content={({}) => (
            <div className="h-[100vh] flex flex-col justify-between">
                <header className="flex justify-between items-center mx-3 my-6 px-3 py-6 bg-white bg-opacity-70 rounded-lg">
                    <div className="flex gap-3 items-center">
                        <p className="font-extrabold text-xl text-red-500">Nalmart</p>
                    </div>
                    <i className="pi pi-window-minimize text-gray-500" onClick={onHide}/>
                </header>

                <section className="flex-1 mx-3">
                    <NavItem to="/orders" icon="pi-th-large" offLabel label="My Orders"/>
                    <NavItem to="/settings" icon="pi-cog" newLabel label="Settings" />
                    <NavItem to="/sell" icon="pi-briefcase" offLabel label="Partner / Sell" />
                    <NavItem to="/ncredit" icon="pi-cog" offLabel label="Nalmart Credit" />
                </section>

                {/* Profile card */}
                <section className="bg-white opacity-80 rounded-xl m-3 border">
                    <div className="flex gap-4 p-[2%] bg-white m-2 rounded-lg relative border">
                        <div className="relative">
                            <Avatar />
                            <p className="w-3 h-3 bg-green-600 absolute rounded-full border-1 -right-1 top-6"></p>
                        </div>
                        <div className="w-[60%]">
                            <p className="text-sm truncate font-bold text-black">{user?.fullName || "--"}</p>
                            <p className="text-xs truncate">{user?.email || "--"}</p>
                        </div>
                        { user?.verified && <Verified fontSize="small" className="text-md text-green-700 rounded-xl justify-right"/>}

                    </div>
                    <p className="bg-red-500 select-none font-bold text-white text-center border border-gray-500 p-[3%] m-2 rounded-lg"
                        onClick={showLogoutConfirmation}
                    >
                        Logout
                    </p>
                </section>
                <ConfirmDialog
                    group="headless"
                    content={({ headerRef, contentRef, footerRef, hide, message }) => (
                        <div className="flex flex-col items-center p-5 surface-overlay rounded-xl bg-white">
                            <div className="rounded-full bg-red-300 inline-flex justify-center items-center h-[4rem] w-[4rem] -mt-16">
                                <i className="pi pi-question text-red-600 text-4xl"></i>
                            </div>
                            <span className="font-bold text-2xl block mb-2 mt-4" ref={headerRef}>
                                {message.header}
                            </span>
                            <p className="mb-0" ref={contentRef}>
                                {message.message}
                            </p>
                            <div className="flex items-center gap-2 mt-4" ref={footerRef}>
                                <Button
                                    label="Logout"
                                    outlined
                                    onClick={(event) => {
                                        hide(event);
                                        handleLogout();;
                                    }}
                                    className="w-[8rem] py-2 border bg-red-400 text-white"
                                ></Button>
                                <Button
                                    label="Cancel"
                                    outlined
                                    onClick={(event) => {
                                        hide(event);
                                        reject();
                                    }}
                                    className="w-[8rem] py-2 border"
                                ></Button>
                            </div>
                        </div>
                    )}
                />
            </div>
        )}
    />
  );
};

const NavItem = ({ to, icon, label, offLabel, newLabel }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center justify-between px-4 py-3 text-sm font-semibold ${
        isActive ? "text-gray-500 bg-gray-100 bg-opacity-70 rounded-lg" : "text-gray-600 hover:text-black"
      }`
    }
  >
    <div className="flex items-center gap-3">
        <i className={`pi ${icon}`}></i>
        <span>{label}</span>
    </div>
    { offLabel && <p className="bg-red-100 text-xs px-4 font-bold text-red-700 rounded-lg">off</p>}
    { newLabel && <p className="bg-green-100 text-xs px-3 font-bold text-green-700 rounded-lg">new</p>}
  </NavLink>
);

export default SidebarComponent;