import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import NewTaskForm from "./NewTaskForm/NewTaskForm";
import TaskListAndButton from "./TaskListAndButton/TaskListAndButton";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [task, setTask] = useState({
    id: "",
    date: "",
    time: "",
    title: "",
    details: "",
  });

  return (
    <div className="d-flex justify-content-center vh-100 position-relative">
      <div className="d-flex flex-column align-items-center w-50 position-relative">
        {showForm ? (
          <NewTaskForm
            tasks={tasks}
            setTasks={setTasks}
            setShowForm={setShowForm}
            task={task}
            setTask={setTask}
          />
        ) : (
          <TaskListAndButton
            tasks={tasks}
            setShowForm={setShowForm}
            setTasks={setTasks}
            setTask={setTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;
