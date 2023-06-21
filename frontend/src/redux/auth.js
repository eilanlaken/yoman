import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: null,
    jwt: null,
    loggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.jwt = action.payload.jwt;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.email = null;
      state.jwt = null;
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
