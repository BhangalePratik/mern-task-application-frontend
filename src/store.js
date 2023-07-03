// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from "@reduxjs/toolkit";
import user from "./features/user";
import task from "./features/task";
import tasks from "./features/tasks";
import showForm from "./features/showForm";
import taskAction from "./features/taskAction";
import submitForm from "./features/submitForm";

const store = configureStore({
  reducer: {
    user,
    task,
    tasks,
    showForm,
    taskAction,
    submitForm,
  },
});

export default store;
