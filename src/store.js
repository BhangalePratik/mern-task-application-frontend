// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from "@reduxjs/toolkit";
import user from "./features/user";
import task from "./features/task";
import tasks from "./features/tasks";
import showForm from "./features/showForm";

const store = configureStore({
  reducer: {
    user,
    task,
    tasks,
    showForm,
  },
});

export default store;
