import { fetchUser, fetchCart } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser()
const cartInfo = fetchCart()

// export const getSubtotal = (cartItems) => {
//     cartItems.reduce((amount, item) => amount + item.price, 0)
// }
//const totalPrice = (cartInfo) => { cartInfo.reduce((total, item) => total + (item.price * item.qty), 0) }
export const initialState =
{
    user: userInfo,
    items: null,
    cartShow: false,
    cartItems: cartInfo,
    search: null
}
console.log(cartInfo);
export const actionType =
{
    SET_USER: "SET_USER",
    SET_ITEMS: "SET_ITEMS",
    SET_CART_SHOW: "SET_CART_SHOW",
    ADD_TO_CART: "ADD_TO_CART",
    REMOVE_FROM_CART: "REMOVE_FROM_CART",
    ADD_QUANTITY: "ADD_QUANTITY",
    SUB_QUANTITY: "SUB_QUANTITY",
    CLEAR_CART: "CLEAR_CART",
    GET_SEARCH: "GET_SEARCH",
    CLEAR_SEARCH: "CLEAR_SEARCH"
}

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        /// SET USER LOGIN
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user
            }
        /// SET ALL ITEMS DISPLAY
        case actionType.SET_ITEMS:
            return {
                ...state,
                items: action.items
            }
        /// TOGGLE CART SHOW
        case actionType.SET_CART_SHOW:
            return {
                ...state,
                cartShow: action.cartShow
            }
        /// ADD TO CART
        case actionType.ADD_TO_CART:
            const addedItem = state.cartItems.find(item => item.id === action.item.id)
            if (addedItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item => item.id === action.item.id ? {
                        ...item, qty: item.qty + 1
                    } : item),
                }
            }
            return {
                ...state,
                cartItems: [...state.cartItems, action.item],
            }
        /// REMOVE FROM CART
        case actionType.REMOVE_FROM_CART:
            const index = state.cartItems.findIndex(cartItem => cartItem.id === action.item.id)
            console.log(index);
            let updatedCart = [...state.cartItems]
            console.log(updatedCart);
            if (index >= 0) {
                updatedCart.splice(index, 1)
            } else {
                alert("Can not remove")
            }
            return {
                ...state,
                cartItems: updatedCart
            }
        /// ADD QTY
        case actionType.ADD_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.item.id
                        ? { ...item, qty: item.qty + 1 }
                        : item,
                ),
            }
        /// SUBSTRACT QTY
        case actionType.SUB_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.item.id
                        ? { ...item, qty: item.qty - 1 }
                        : item,
                ),
            }
        /// EMPTY CART
        case actionType.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }
        /// GET SEARCH RESULTS
        case actionType.GET_SEARCH:
            return {
                ...state,
                search: action.search
            }
        /// CLEAR SEARCH RESULTS
        case actionType.CLEAR_SEARCH:
            return {
                ...state,
                search: null
            }
        default:
            return state
    }
}

export default reducer;