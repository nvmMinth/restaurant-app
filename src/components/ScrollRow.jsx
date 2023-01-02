import React, { useRef } from "react";
import { BsFillBasketFill } from "react-icons/bs";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const ScrollRow = ({ scroll, items }) => {
  const scrollRowRef = useRef();
  const scrollHandler = (scrollOffset) => {
    scrollRowRef.current.scrollLeft += scrollOffset;
  };

  const [{ cartItems }, dispatch] = useStateValue();

  const addToCart = (item) => {
    dispatch({
      type: actionType.ADD_TO_CART,
      item: item,
    });
  };
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  return (
    <div className="w-full">
      {/* Button Scroll Left & Right */}
      {scroll && (
        <div className=" gap-3 flex justify-end items-center w-full">
          <motion.div
            whileTap={{ scale: 0.75 }}
            onClick={() => scrollHandler(-280)}
            className="w-8 h-8 bg-orange-300 rounded-lg hover:shadow-xl hover:bg-orange-400 transition-all duration-100 ease-in-out flex justify-center items-center cursor-pointer"
          >
            <MdArrowLeft className="text-white text-2xl" />
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.75 }}
            onClick={() => scrollHandler(280)}
            className="w-8 h-8 bg-orange-300 rounded-lg hover:shadow-xl hover:bg-orange-400 transition-all duration-100 ease-in-out flex justify-center items-center cursor-pointer"
          >
            <MdArrowRight className="text-white text-2xl" />
          </motion.div>
        </div>
      )}
      {/* Products Row */}
      <div
        ref={scrollRowRef}
        className={` flex
       items-center gap-3 ${
         scroll
           ? "overflow-x-scroll scrollbar-none"
           : "overflow-x-hidden flex-wrap justify-center"
       }`}
      >
        {items?.length != 0 &&
          items?.map((item) => (
            <div
              key={item.id}
              className="h-[220px] w-[400px] sm:w-[300px] bg-cardOverlay rounded-lg py-2 px-4 mt-12 mb-8 backdrop-blur-lg shadow-lg hover:drop-shadow-xl flex flex-col items-center justify-evenly relative cursor-pointer"
            >
              <div className="w-full flex items-center justify-between">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-40 h-40 -mt-8 drop-shadow-2xl"
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={item.imgAsset}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <motion.div
                  onClick={() => addToCart(item)}
                  whileTap={{ scale: 0.75 }}
                  className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-lg hover:drop-shadow-lg"
                >
                  <BsFillBasketFill className="text-white" />
                </motion.div>
              </div>

              <div className="w-full flex flex-col items-end justify-end mb-2">
                <p className="text-headingColor font-bold text-base  capitalize  ">
                  {item.name}
                </p>
                <p className="mt-1 text-sm text-textColor">{item.weight}</p>
                <div className="flex items-center gap-8">
                  <p className="text-lg text-headingColor font-semibold">
                    <span className="text-red-500 text-sm">$ </span>
                    {item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ScrollRow;
