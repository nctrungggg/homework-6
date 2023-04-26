import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/redux/AuthSlice";
import productReducer from "../modules/products/redux/ProductSlice";

const rootReducer = {
  auth: authReducer,
  product: productReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type AppDispatch = typeof store.dispatch;
