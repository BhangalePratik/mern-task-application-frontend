import { createSlice } from "@reduxjs/toolkit";

const taskAction = createSlice({
  name: "task action",
  initialState: "",
  reducers: {
    setActionToPerform: (_state, action) => action.payload,
  },
});

export const { setActionToPerform } = taskAction.actions;
export default taskAction.reducer;
