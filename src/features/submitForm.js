// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";

const submitForm = createSlice({
  name: "submitted form",
  initialState: false,
  reducers: {
    setSubmitForm: (_state, action) => action.payload,
  },
});

export const { setSubmitForm } = submitForm.actions;
export default submitForm.reducer;
