import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { useAuthDialog } from "../../hooks/useAuthDialog";
import { isAuthenticated } from "../utils/AuthCookiesManager";
import { dialog_operations } from "../utils/constansts/DialogOperations";
import SidebarComponent from "../Side_bar/SideBar";
import { showToast } from "../../global/Toast";

const Header = ({ showBack, showMenuIcon, showCart, cartCount }) => {
  const navigate = useNavigate();
  const { openDialog } = useAuthDialog();
  const [toggle, setToggle] = useState(false);

  const handleCartClick = () => {
    if (cartCount > 0) {
      navigate("/cart");
    } else {
      alert("Your cart is empty");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mt-4 bg-white">
        <div className="flex gap-3 items-center">
          {showBack && (
            <i className="pi pi-angle-left text-xl text-gray-500 cursor-pointer" onClick={() => navigate(-1)} />
          )}

          { showMenuIcon && (
            <div className="relative">
              <i className="pi pi-bars text-lg bg-gray-100 rounded-full px-2 py-1 text-gray-500 cursor-pointer" onClick={() => { isAuthenticated() ? setToggle(true) : showToast("Login to access menu")}} />
              <p className={`${ isAuthenticated() && "hidden"} pi pi-lock absolute -right-1 bg-gray-200 rounded-full bottom-0 text-green-600 text-sm`}/>
            </div>
          )}

          <div className="font-semibold text-xl text-red-600 cursor-pointer" onClick={() => navigate("/")}>
            Nalmart
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {!isAuthenticated() && (
            <button onClick={() => openDialog(dialog_operations.login)}>
              <i className="pi pi-user text-lg cursor-pointer" aria-label="User Profile" />
              <p className="text-xs text-green-700">login / signup</p>
            </button>
          )}

          { showCart && (
            <div className="relative cursor-pointer" onClick={ isAuthenticated() ? handleCartClick : () => showToast("Login to access cart")}>
              <ShoppingCartOutlined size={22} />
              <p className={`${ isAuthenticated() && "hidden"} pi pi-lock absolute -right-1 bg-white rounded-full bottom-0 text-green-600 text-sm`}/>
              {cartCount > 0 && (
                <div className="absolute -top-2 -right-1 bg-black text-white text-[10px] font-bold rounded-full px-1">
                  {cartCount}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <SidebarComponent visible={toggle} onHide={() => setToggle(false)} />
    </div>
  );
};

export default Header;