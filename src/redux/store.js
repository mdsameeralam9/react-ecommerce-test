import { configureStore } from  "@reduxjs/toolkit";
import productsReducer from "../redux/features/product/slice";

export const reduxStore = configureStore({
    reducer: {
      products: productsReducer,
    }
})

