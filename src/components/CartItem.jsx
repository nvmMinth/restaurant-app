import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const CartItem = ({ data }) => {
  const [{}, dispatch] = useStateValue();
  console.log(data.qty);

  const addQty = (id) => {
    dispatch({
      type: actionType.ADD_QUANTITY,
      item: {
        id: id,
      },
    });
  };
  const subQty = (id) => {
    if (data.qty !== 1) {
      dispatch({
        type: actionType.SUB_QUANTITY,
        item: {
          id: id,
        },
      });
    } else {
      dispatch({
        type: actionType.REMOVE_FROM_CART,
        item: {
          id: id,
        },
      });
    }
  };

  return (
    <div className="w-full px-2  bg-cardOverlay2 shadow-md rounded-md flex items-center gap-2">
      <img
        className="w-20 h-20 object-contain rounded-full"
        src={data.imgAsset}
        alt={data.name}
      />
      <div className="flex flex-col">
        <p className="text-headingColor">{data.name}</p>
        <p className="text-textColor font-semibold">
          $ {data.price * data.qty}
        </p>
      </div>
      {/* button */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.button
          whileTap={{ scale: 0.75 }}
          onClick={() => subQty(data.id)}
        >
          <AiOutlineMinusCircle className="text-lg" />
        </motion.button>
        <p>{data.qty}</p>
        <motion.div whileTap={{ scale: 0.75 }} onClick={() => addQty(data.id)}>
          <AiOutlinePlusCircle className="text-lg " />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
