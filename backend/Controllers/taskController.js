const taskService = require("../Service/taskService");
const { exists } = require("../Service/userService");
const jwt = require("jsonwebtoken");
const getEmail = (req) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  const decodedPayload = jwt.decode(token);
  return decodedPayload.email;
};
const handleAddTask = (req, res) => {
  const email = getEmail(req);
  if (exists(email) > 0) {
    return res.status(404).json({ status: "Email Not Found" });
  }
  const task = req.body;
  try {
    if (!task.name || !task.description || !task.priority || !task.deadline)
      return res.status(400).json({ message: "All fields are required" });
    else {
      taskService
        .addTask(email, task)
        .then((response) => {
          return res
            .status(201)
            .json({ message: "Task Successfully Added", data: response });
        })
        .catch((err) => {
          return res.status(400).json({ error: err });
        });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const handleDeleteTask = (req, res) => {
  const email = getEmail(req);
  const taskid = req.params.id;
  try {
    if (taskService.exists(email, taskid) > 0) {
      return res.status(404).json({ status: "Invalid Email Or Taskid" });
    }
    taskService
      .deleteTask(taskid, email)
      .then(() => {
        return res.status(200).json({ status: "Task Deleted Scuccessfully" });
      })
      .catch((err) => {
        return res.status(400).json({ "Error Occured": err });
      });
  } catch (err) {
    return res.status(500).json({ "Error Occured": err });
  }
};

const handleUpdateTask = (req, res) => {
  const task = req.body;
  try {
    taskService
      .updatetask(task)
      .then(() => {
        return res.status(200).json({ status: "Task updated successfully" });
      })
      .catch((err) => {
        return res.status(400).json({ "Error Occured": err });
      });
  } catch (err) {
    return res.status(500).json({ "Error Occured": err });
  }
};

const handleGetAllTasks = (req, res) => {
  const email = getEmail(req);
  try {
    taskService
      .getAllTasks(email)
      .then((data) => {
        return res.status(200).json({ status: data });
      })
      .catch((err) => {
        return res.status(404).json({ "Error Occured": err });
      });
  } catch (err) {
    return res.status(500).json({ "Error Occured": err });
  }
};
module.exports = {
  handleAddTask,
  handleDeleteTask,
  handleUpdateTask,
  handleGetAllTasks,
};
