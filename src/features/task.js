// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";

const task = createSlice({
  name: "task",
  initialState: {
    id: "",
    date: "",
    time: "",
    title: "",
    details: "",
  },
  reducers: {
    setTask: (_state, action) => ({ ...action.payload }),
  },
});

export const { setTask } = task.actions;
export default task.reducer;
