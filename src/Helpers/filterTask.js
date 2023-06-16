const filterTask = (backendTask) => {
  const filteredTask = {};
  filteredTask.title = backendTask.title;
  if (backendTask.details) {
    filteredTask.details = backendTask.details;
  }
  if (backendTask.date) {
    filteredTask.date = backendTask.date;
  }
  if (backendTask.time) {
    filteredTask.time = backendTask.time;
  }
  // eslint-disable-next-line no-underscore-dangle
  filteredTask.id = backendTask._id;

  return filteredTask;
};

export default filterTask;
