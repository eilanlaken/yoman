import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice_old";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
