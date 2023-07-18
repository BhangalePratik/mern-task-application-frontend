// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";

const apiErrors = createSlice({
  name: "API Errors",
  initialState: {
    isLoginError: false,
    isSignUpError: false,
    isLogoutError: false,
    isTaskAdditionError: false,
    isTaskUpdateError: false,
    isTaskDeletionError: false,
    isTaskViewError: false,
  },
  reducers: {
    setLoggingError: (state, action) => {
      return { ...state, isLoginError: action.payload };
    },
    setSigningUpError: (state, action) => {
      return { ...state, isSignUpError: action.payload };
    },
    setLoggingOutError: (state, action) => {
      return { ...state, isLogoutError: action.payload };
    },
    setTaskAdditionError: (state, action) => {
      return { ...state, isTaskAdditionError: action.payload };
    },
    setTaskUpdateError: (state, action) => {
      return { ...state, isTaskUpdateError: action.payload };
    },
    setTaskDeletionError: (state, action) => {
      return { ...state, isTaskDeletionError: action.payload };
    },
    setTaskViewError: (state, action) => {
      return { ...state, isTaskViewError: action.payload };
    },
  },
});

export const {
  setLoggingError,
  setSigningUpError,
  setLoggingOutError,
  setTaskAdditionError,
  setTaskDeletionError,
  setTaskUpdateError,
  setTaskViewError,
} = apiErrors.actions;
export default apiErrors.reducer;
