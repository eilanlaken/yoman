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
  gold: false,
  role: "",
  jwt: "",
  loggedIn: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.jwt = action.payload.jwt;
      state.gold = action.payload.gold;
      state.role = action.payload.role;
      state.loggedIn = true;
      localStorage.setItem("user", JSON.stringify(state));
    },
    logout: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.jwt = "";
      state.gold = false;
      state.role = "";
      state.loggedIn = false;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = accountSlice.actions;
export default accountSlice.reducer;
