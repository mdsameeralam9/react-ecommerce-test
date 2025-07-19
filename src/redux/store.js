import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import productsReducer from "../redux/features/product/slice";
import cartSlice from "../redux/features/cart/slice";


export const reduxStore = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: true, //process.env.NODE_ENV !== 'production'
})