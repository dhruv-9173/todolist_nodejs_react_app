const mongoose = require("mongoose");
const tasks = require("../models/taskModel");

const exists = async (email, taskid) => {
  const id = new mongoose.Types.ObjectId(taskid);
  const x = await tasks.countDocuments({
    email: email,
    _id: id,
  });

  return x;
};
const addTask = async (email, req) => {
  const task = new tasks({
    email: email,
    name: req.name,
    description: req.description,
    priority: req.priority,
    deadline: req.deadline,
    status: "PENDING",
  });
  return await task.save();
};

const deleteTask = async (taskid, email) => {
  return await tasks.deleteOne({ _id: taskid, email: email });
};

const updatetask = async (req) => {
  const task = {
    email: req.email,
    name: req.name,
    description: req.description,
    priority: req.priority,
    deadline: req.deadline,
    status: req.status,
  };
  return await tasks.findByIdAndUpdate(
    { _id: new mongoose.Types.ObjectId(req._id) },
    {
      $set: {
        name: req.name,
        description: req.description,
        priority: req.priority,
        deadline: req.deadline,
        status: req.status,
      },
    }
  );
};

const getAllTasks = async (email) => {
  return await tasks.find({ email: email });
};

module.exports = {
  addTask,
  deleteTask,
  exists,
  getAllTasks,
  updatetask,
};
