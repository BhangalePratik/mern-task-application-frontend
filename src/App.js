import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import NewTaskForm from "./components/NewTaskForm/NewTaskForm";
import TaskListAndButton from "./components/TaskListAndButton/TaskListAndButton";
import LoginForm from "./components/LoginForm/LoginForm";
import { setIsLoggedIn } from "./features/user";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const showForm = useSelector((state) => state.showForm);
  // const [tasks, setTasks] = useState([]);
  // const [showForm, setShowForm] = useState(false);
  // const [task, setTask] = useState({
  //   id: "",
  //   date: "",
  //   time: "",
  //   title: "",
  //   details: "",
  // });

  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      )
      .then(() => {
        localStorage.removeItem("jwtToken");
        dispatch(setIsLoggedIn(false));
      });
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
              {showForm ? <NewTaskForm /> : <TaskListAndButton />}
            </div>
          </div>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default App;
