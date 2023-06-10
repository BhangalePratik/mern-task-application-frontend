import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

function TaskListAndButton(props) {
  const { tasks, setShowForm, setTasks, setTask } = props;

  const handleUpdate = (task) => {
    setShowForm(true);
    setTask(task);
  };

  const handleDelete = (id) => {
    setTasks(() => tasks.filter((task) => task.id !== id));
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
        onClick={() => setShowForm(true)}
        className="rounded-circle position-absolute bottom-50"
      >
        +
      </Button>
    </>
  );
}

TaskListAndButton.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
    })
  ).isRequired,
  setShowForm: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
  setTask: PropTypes.func.isRequired,
};

export default TaskListAndButton;
