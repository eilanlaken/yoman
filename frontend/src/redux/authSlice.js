import { createSlice } from "@reduxjs/toolkit";

const loadUser = () => {
  const user = localStorage.getItem("user");
  if (user == null) return undefined;
  return JSON.parse(user);
};

const initialState = loadUser() || {
  firstName: "",
  lastName: "",
  email: "",
  jwt: "",
  loggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.jwt = action.payload.jwt;
      state.loggedIn = true;
      localStorage.setItem("user", JSON.stringify(state));
    },
    logout: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.jwt = "";
      state.loggedIn = false;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
