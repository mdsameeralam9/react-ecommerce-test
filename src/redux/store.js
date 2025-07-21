import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import productsReducer from "../redux/features/product/slice";
import cartSlice from "../redux/features/cart/slice";
import wishListSlice from "../redux/features/wishlist/slice";


export const reduxStore = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartSlice,
    wishlist: wishListSlice
  },
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: true, //process.env.NODE_ENV !== 'production'
})