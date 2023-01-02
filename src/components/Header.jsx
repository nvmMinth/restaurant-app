import React, { useState } from "react";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { BsFillBasketFill } from "react-icons/bs";
import { MdOutlineFoodBank } from "react-icons/md";
import { AiOutlineFileAdd, AiOutlineLogout } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const provider = new GoogleAuthProvider();

  const loginHandler = async () => {
    if (!user) {
      const {
        user: { providerData, refreshToken },
      } = await signInWithPopup(auth, provider);

      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setOpenMenu(!openMenu);
    }
  };

  const logoutHandler = () => {
    if (user) {
      dispatch({
        type: actionType.SET_USER,
        user: null,
      });
      localStorage.clear();
      setOpenMenu(false);
    }
  };

  const showCartHandler = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
  console.log(cartItems);

  const NavLinkStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      color: isActive && "#DC2626",
    };
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-4 md:px-16 bg-cardOverlay2 shadow-lg">
      {/*////////////////////////////// desktop & tablet */}
      <div className="hidden md:flex w-full h-full justify-between">
        <NavLink to="/" className="flex items-center gap-1">
          <img src="favicon.ico" alt="icon" className="w-9" />
          <p className="text-headingColor text-xl font-bold">fuddy</p>
        </NavLink>

        <ul className="flex items-center gap-8 ">
          <NavLink
            to="/"
            style={NavLinkStyle}
            className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            style={NavLinkStyle}
            className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
          >
            Menu
          </NavLink>
        </ul>

        <div className="flex justify-center items-center gap-8">
          <div
            onClick={showCartHandler}
            className="relative flex justify-center items-center cursor-pointer"
          >
            <BsFillBasketFill className="text-textColor text-2xl ml-8 cursor-poiter" />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-3 w-6 h-6 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold ">{totalQty}</p>
              </div>
            )}
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              alt="avatar"
              className="w-10 min-h-[40px] cursor-pointer rounded-full"
              onClick={loginHandler}
            />
            {openMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.3 }}
                className="absolute top-12 right-0 w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col"
              >
                {user && user.email === "nvmthu2911@gmail.com" && (
                  <Link to={"/create"}>
                    <p className="py-2 px-4 gap-3 text-textColor text-base flex items-center cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out rounded-t-lg">
                      Add Item <AiOutlineFileAdd />
                    </p>
                  </Link>
                )}
                <p
                  onClick={logoutHandler}
                  className="py-2 px-4 gap-3 text-textColor text-base flex items-center cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out rounded-b-lg"
                >
                  Log out <AiOutlineLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/*////////////////////////////// mobile */}
      <div className="flex md:hidden w-full h-full items-center justify-between px-3">
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            alt="avatar"
            className="w-10 min-h-[40px] cursor-pointer rounded-full"
            onClick={loginHandler}
          />
          {openMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.3 }}
              className="absolute top-12 left-0 w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col"
            >
              {user && user.email === "nvmthu2911@gmail.com" && (
                <ul className="flex flex-col">
                  <Link to={"/create"}>
                    <p className="py-2 px-4 gap-3 text-textColor text-base flex items-center cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out rounded-t-lg">
                      Add Item <AiOutlineFileAdd />
                    </p>
                  </Link>
                  <li className="py-2 px-4 gap-3 text-textColor text-base flex items-center cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out">
                    Home
                  </li>
                  <Link to={"/menu"}>
                    <li className="py-2 px-4 gap-3 text-textColor text-base flex items-center cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out">
                      Menu
                    </li>
                  </Link>
                  <li className="py-2 px-4 gap-3 text-textColor text-base flex items-center cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out">
                    About us
                  </li>
                  <li className="py-2 px-4 gap-3 text-textColor text-base flex items-center cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out">
                    Services
                  </li>
                </ul>
              )}
              <p
                onClick={logoutHandler}
                className="py-2 px-4 gap-3 text-textColor text-base flex items-center cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out rounded-b-lg"
              >
                Log out <AiOutlineLogout />
              </p>
            </motion.div>
          )}
        </div>

        <Link to="/" className="flex items-center gap-2">
          <MdOutlineFoodBank className="text-[34px] text-orange-600" />
          <p className="text-headingColor text-xl font-bold">fuddy</p>
        </Link>

        <div
          onClick={showCartHandler}
          className="relative flex justify-center items-center cursor-pointer"
        >
          <BsFillBasketFill className="text-textColor text-2xl ml-8 cursor-poiter" />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-2 -right-3 w-6 h-6 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold ">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
