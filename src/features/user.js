// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user slice",
  initialState: {
    email: "",
    password: "",
    isLoggedIn: false,
    isSignedUp: true,
  },
  reducers: {
    setEmail: (state, action) => {
      return { ...state, email: action.payload };
    },
    setPassword: (state, action) => {
      return { ...state, password: action.payload };
    },
    setIsLoggedIn: (state, action) => {
      return { ...state, isLoggedIn: action.payload };
    },
    setIsSignedUp: (state, action) => {
      return { ...state, isSignedUp: action.payload };
    },
  },
});

export const { setEmail, setPassword, setIsLoggedIn, setIsSignedUp } =
  userSlice.actions;
export default userSlice.reducer;
