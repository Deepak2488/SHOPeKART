import {
  combineReducers
} from "redux";
import handleCart from "./handleCart";
import allProducts from "./allProducts";
import handleWishlist from "./handleWishlist";

const rootReducres = combineReducers({
  handleCart,
  allProducts,
  handleWishlist,
});

export default rootReducres;