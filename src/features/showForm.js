// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";

const showForm = createSlice({
  name: "show form",
  initialState: false,
  reducers: {
    setShowForm: (_state, action) => action.payload,
  },
});

export const { setShowForm } = showForm.actions;
export default showForm.reducer;
