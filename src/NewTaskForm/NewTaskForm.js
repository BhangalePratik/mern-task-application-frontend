import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import axios from "axios";
import filterTask from "../Helpers/filterTask";

function NewTaskForm(props) {
  const { tasks, setTasks, setShowForm, task, setTask } = props;

  const handleInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // task is already present  in task list so no need to add the task, we just need to update it and push it.
    if (task.id) {
      axios
        .patch("http://localhost:8080/tasks", task, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        })
        .then((response) => {
          const backendTask = response.data;

          setTask(() => filterTask(backendTask));
          setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
          setTask({
            id: "",
            date: "",
            time: "",
            title: "",
            details: "",
          });
          setShowForm(false);
        });
    } else {
      // task is added newly, assign id to it and add in task list
      axios
        .post("http://localhost:8080/tasks", task, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        })
        .then((response) => {
          const backendTask = response.data;

          setTask(() => filterTask(backendTask));
          setTasks([...tasks, task]);
          setTask({
            id: "",
            date: "",
            time: "",
            title: "",
            details: "",
          });
          setShowForm(false);
        });
    }
  };

  const handleReset = () => {
    setShowForm(false);
  };

  return (
    <>
      <h2>New Task</h2>
      <Form onSubmit={handleSubmit} onReset={handleReset} className="w-100">
        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={task.date}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Time">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            value={task.time}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={task.title}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Details">
          <Form.Label>Details</Form.Label>
          <Form.Control
            type="textarea"
            name="details"
            value={task.details}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="danger" type="reset" className="mx-2">
          Cancel
        </Button>
      </Form>
    </>
  );
}
NewTaskForm.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.string,
      time: PropTypes.string,
      title: PropTypes.string.isRequired,
      details: PropTypes.string,
    })
  ).isRequired,
  setTasks: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    title: PropTypes.string.isRequired,
    details: PropTypes.string,
  }).isRequired,
  setTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
