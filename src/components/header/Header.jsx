import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FaAngleLeft, FaX } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { CgMenu } from "react-icons/cg";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

const Header = ({ showBack, showMenuIcon, showUser, showCart }) => {

  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(1);
  const [toggle, setToggle] = useState(false);
  const { dispatchAuth } = useAuth();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mt-4 bg-white">
        <div className="flex items-center">
          {showBack && (
            <div className="mr-4 cursor-pointer">
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
          { showUser && <div className="cursor-pointer" onClick={() => dispatchAuth(true) }>
            <FaRegUser size={22} />
          </div>}
          { showCart && <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <ShoppingCartOutlined size={22} />
            {cartCount > 0 && (
              <div className="absolute -top-2 -right-1 bg-black text-white text-[10px] font-bold rounded-full px-1">
                {cartCount}
              </div>
            )}
          </div>}
        </div>
      </div>

      {/* Drawer */}
      {toggle && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-70 z-50">
          <div className="fixed top-0 left-0 h-full w-64 bg-white p-4 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <FaX size={20} className="cursor-pointer" onClick={() => setToggle(false)} />
              <img src="/src/assets/cwift.png" alt="Logo" className="h-6" />
            </div>
            {/* Drawer Content */}
            <div>
              <p className="text-sm text-gray-700 font-semibold cursor-pointer">NEED HELP?</p>
              <p
                className="text-sm text-gray-700 font-semibold cursor-pointer mt-2"
                onClick={() => navigate("/account")}
              >
                MY CWIFT ACCOUNT
              </p>
              {/* Add other drawer items here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;