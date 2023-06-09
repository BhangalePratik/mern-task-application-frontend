import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

function NewTaskForm(props) {
  const { tasks, setTasks, setShowForm, task, setTask } = props;

  const handleInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // task is already present  in task list so no need to add the task, we just need to update it and push it.
    if (task.id) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      // task is added newly, assign id to it and add in task list
      task.id = uuidv4();
      setTasks([...tasks, task]);
    }

    setTask({
      id: "",
      date: "",
      time: "",
      title: "",
      details: "",
    });
    setShowForm(false);
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
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
    })
  ).isRequired,
  setTasks: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
  }).isRequired,
  setTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
