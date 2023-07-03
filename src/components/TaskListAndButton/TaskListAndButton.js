import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import filterTask from "../../Helpers/filterTask";
import { setShowForm } from "../../features/showForm";
import { setTasks } from "../../features/tasks";
import { setTask } from "../../features/task";
import { setActionToPerform } from "../../features/taskAction";

function TaskListAndButton() {
  // const { tasks, setShowForm, setTasks, setTask } = props;
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    let backendTasks = [];
    axios
      .get("http://localhost:8080/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        backendTasks = response.data;

        dispatch(
          setTasks(backendTasks.map((backendTask) => filterTask(backendTask)))
        );
      });
  }, []);

  const handleInsertion = () => {
    dispatch(setActionToPerform("insert"));
    dispatch(setShowForm(true));
  };

  const handleUpdate = (task) => {
    dispatch(setActionToPerform("update"));
    dispatch(setTask(task));
    dispatch(setShowForm(true));
  };

  const handleDelete = async (id) => {
    axios
      .delete(`http://localhost:8080/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(setTasks(tasks.filter((task) => task.id !== id)));
        }
      });
  };

  return (
    <>
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <div className=" border m-2 rounded p-2 w-100" key={task.id}>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column">
              <div className="fw-bold">{task.title}</div>
              {task.details}
              {task.date}
              {task.time}
            </div>
            <div className="d-flex flex-column justify-content-around">
              <Button
                variant="primary"
                type="button"
                onClick={() => handleUpdate(task)}
                className="my-1"
              >
                Update
              </Button>
              <Button
                variant="danger"
                type="button"
                onClick={() => handleDelete(task.id)}
                className="my-1"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
      <Button
        variant="primary"
        type="submit"
        onClick={() => handleInsertion()}
        className="rounded-circle position-absolute bottom-50"
      >
        +
      </Button>
    </>
  );
}

export default TaskListAndButton;
