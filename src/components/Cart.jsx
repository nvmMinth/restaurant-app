import React, { Suspense } from "react";
import { AiOutlineClear, AiOutlineArrowLeft } from "react-icons/ai";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import emptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const Cart = () => {
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const showCartHandler = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  /// if no user => Login when checkout
  const provider = new GoogleAuthProvider();
  const loginHandler = async () => {
    const {
      user: { providerData, refreshToken },
    } = await signInWithPopup(auth, provider);

    dispatch({
      type: actionType.SET_USER,
      user: providerData[0],
    });
    localStorage.setItem("user", JSON.stringify(providerData[0]));
  };
  /// clear cart
  const clearCart = () => {
    dispatch({
      type: actionType.CLEAR_CART,
    });
  };

  const subtotal = parseFloat(
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
  );

  return (
    <motion.div
      initial={{ opacity: 1, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-[475px] h-screen z-[51] drop-shadow-lg bg-white flex flex-col"
    >
      <div className="w-full flex justify-between items-center p-4">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCartHandler}>
          <AiOutlineArrowLeft className="text-textColor text-2xl cursor-pointer" />
        </motion.div>
        <p className="text-lg font-semibold text-headingColor">Cart</p>
        <motion.p
          onClick={clearCart}
          whileTap={{ scale: 0.75 }}
          className="flex items-center py-1 p-2 my-1 gap-2 bg-gray-100 rounded-md text-textColor text-base hover:shadow-md transition-all duration-100 ease-in-out cursor-pointer"
        >
          Clear <AiOutlineClear />
        </motion.p>
      </div>
      {cartItems?.length > 0 ? (
        <>
          <div className="w-full h-full bg-gray-100 rounded-t-xl flex flex-1 flex-col overflow-auto">
            {/* cart item */}
            <div className="w-full px-6 py-4 flex flex-col gap-3">
              {cartItems?.map((data) => (
                <CartItem data={data} />
              ))}
            </div>
          </div>

          {/* cart total */}
          <div className="w-full flex flex-1 flex-col items-center justify-evenly rounded-xl bg-cardOverlay2 drop-shadow-md px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-textColor ">Subtotal</p>
              <p className="text-headingColor ">$ {subtotal}</p>
            </div>
            <div className="w-full flex items-center justify-between ">
              <p className="text-textColor ">Delivery</p>
              <p className="text-headingColor">$ 1.50</p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>
            <div className="w-full flex items-center justify-between">
              <p className="text-textColor text-lg">Total</p>
              <p className="text-headingColor font-semibold text-lg">
                $ {parseFloat(subtotal + 1.5)}
              </p>
            </div>
            {user ? (
              <button
                type="button"
                className="text-white bg-red-600 px-4 py-2 w-full rounded-lg hover:shadow-lg transition-all duration-100 ease-in-out"
              >
                Check out
              </button>
            ) : (
              <button
                onClick={loginHandler}
                type="button"
                className="text-white bg-red-600 px-4 py-2 w-full rounded-lg hover:shadow-lg transition-all duration-100 ease-in-out"
              >
                Login to check out
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={emptyCart} className="w-300" alt="empty" />
          <p className="text-textColor font-semibold text-xl">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
