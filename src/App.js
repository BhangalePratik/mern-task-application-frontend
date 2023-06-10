import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar } from "react-bootstrap";

import "./App.css";
import NewTaskForm from "./NewTaskForm/NewTaskForm";
import TaskListAndButton from "./TaskListAndButton/TaskListAndButton";
import LoginForm from "./LoginForm/LoginForm";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [task, setTask] = useState({
    id: "",
    date: "",
    time: "",
    title: "",
    details: "",
  });

  const handleLogout = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Navbar
            bg="light"
            expand="lg"
            className="d-flex justify-content-between"
          >
            <Navbar.Brand href="/" className="mx-2">
              Task Manager
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              <Button
                variant="outline-primary"
                onClick={handleLogout}
                className="mx-2"
              >
                Logout
              </Button>
            </Navbar.Collapse>
          </Navbar>
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
                  setIsLoggedIn={setIsLoggedIn}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </div>
  );
}

export default App;
