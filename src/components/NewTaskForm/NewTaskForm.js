/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import filterTask from "../../Helpers/filterTask";
import { setTask } from "../../features/task";
import { setTasks } from "../../features/tasks";
import { setShowForm } from "../../features/showForm";
import { setSubmitForm } from "../../features/submitForm";
import { setActionToPerform } from "../../features/taskAction";

const validationSchema = Yup.object().shape({
  id: Yup.string(),
  date: Yup.date().min(
    new Date(new Date().toDateString()),
    "Please don't put older dates"
  ),
  time: Yup.string(),
  title: Yup.string()
    .max(30, "Title should be less than 30 characters")
    .required("Title is required"),
  details: Yup.string().max(250, "Details should be less than 250 characters"),
});

function NewTaskForm() {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.task);
  const taskAction = useSelector((state) => state.taskAction);
  const tasks = useSelector((state) => state.tasks);
  const submitForm = useSelector((state) => state.submitForm);

  useEffect(() => {
    if (submitForm === true) {
      if (taskAction === "update") {
        // task is already present  in task list so no need to add the task, we just need to update it and push it.
        axios
          .patch("http://localhost:8080/tasks", task, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          })
          .then((response) => {
            const backendTask = response.data;

            const filteredTask = filterTask(backendTask);
            dispatch(setTask(filteredTask));
            const updatedTasks = tasks.map((t) =>
              t.id === task.id ? task : t
            );
            dispatch(setTasks(updatedTasks));
            //   dispatch(
            //     setTask({
            //       id: "",
            //       date: "",
            //       time: "",
            //       title: "",
            //       details: "",
            //     })
            //   );
          });
      } else if (taskAction === "insert") {
        // task is added newly, assign id to it and add in task list
        axios
          .post("http://localhost:8080/tasks", task, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          })
          .then((response) => {
            const backendTask = response.data;

            dispatch(setTask(() => filterTask(backendTask)));
            dispatch(setTasks([...tasks, task]));
            //   dispatch(
            //     setTask({
            //       id: "",
            //       date: "",
            //       time: "",
            //       title: "",
            //       details: "",
            //     })
            //   );
          });
      }
      dispatch(setActionToPerform(""));
      dispatch(setSubmitForm(false));
      dispatch(setShowForm(false));
    }
  }, [task, submitForm]);

  const handleSubmit = async (values) => {
    dispatch(setTask(values));
    dispatch(setSubmitForm(true));
  };

  const handleReset = () => {
    dispatch(setShowForm(false));
  };

  return (
    <>
      <h2>New Task</h2>
      <Formik
        initialValues={
          taskAction === "update"
            ? task
            : {
                id: "",
                date: "",
                time: "",
                title: "",
                details: "",
              }
        }
        validationSchema={validationSchema}
        validateOnChange
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        {(formik) => (
          <Form
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
            className="w-100"
          >
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Date</Form.Label>
              <Field
                type="date"
                name="date"
                as={Form.Control}
                className={formik.errors.date ? "border border-danger" : ""}
              />
              <ErrorMessage
                name="date"
                component={Form.Text}
                className="text-danger"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="time">
              <Form.Label>Time</Form.Label>
              <Field
                type="time"
                name="time"
                as={Form.Control}
                className={formik.errors.time ? "border border-danger" : ""}
                onChange={(event) => {
                  const combinedDateTime = new Date(
                    `${formik.values.date} ${event.target.value}`
                  );
                  const currentDateTime = new Date();
                  if (combinedDateTime < currentDateTime) {
                    formik.setFieldError(
                      "time",
                      "Please set the time to the future time"
                    );
                  } else {
                    formik.setFieldValue("time", event.target.value);
                  }
                }}
              />
              <ErrorMessage
                name="time"
                component={Form.Text}
                className="text-danger"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Field
                type="text"
                name="title"
                as={Form.Control}
                className={
                  formik.errors.title && formik.touched.title
                    ? "border border-danger"
                    : ""
                }
              />
              <ErrorMessage
                name="title"
                component={Form.Text}
                className="text-danger"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="details">
              <Form.Label>Details</Form.Label>
              <Field
                type="textarea"
                name="details"
                as={Form.Control}
                className={formik.errors.details ? "border border-danger" : ""}
              />
              <ErrorMessage
                name="details"
                component={Form.Text}
                className="text-danger"
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!formik.isValid}>
              Submit
            </Button>
            <Button variant="danger" type="reset" className="mx-2">
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default NewTaskForm;
