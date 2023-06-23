// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";

const tasks = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    setTasks: (_state, action) => [...action.payload],
  },
});

export const { setTasks } = tasks.actions;
export default tasks.reducer;
