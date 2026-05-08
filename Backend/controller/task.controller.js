const Task = require("../models/task.model");
const User = require("../models/user.model");

// Create
const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    // validation
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "title is required",
      });
    }

    const task = await Task.create({
      title,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "task created successfully",
      task,
    });
  } catch (err) {
    console.log("create task error route : ", err);
    res.status(500).json({
      success: false,
      message: "task not created",
    });
  }
};

//Read
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (err) {
    console.log("getTask Route : ", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch User",
    });
  }
};

const deleteTasks = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      _id: id,
      user: req.user,
    });

    // validation
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "tasks deleted successfully",
    });
  } catch (err) {
    console.log("Delete Task Err", err);

    res.status(500).json({
      success: false,
      message: "Failed to Delete tasks",
    });
  }
};

const toggleTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;

    //we will find task first so we know that which task we're updating
    const task = await Task.findOne({
      _id: id,
      user: req.user,
    });

    //validation
    if (!task) {
      res.status(404).json({
        success: false,
        message: "Task not Found",
      });
    }

    //toggle logic
    task.status = task.status === "pending" ? "completed" : "pending";

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Status Updated",
      task,
    });
  } catch (err) {
    console.log("Toggle route err", err);

    res.status(500).json({
      success: false,
      message: "Failed to Update Task",
    });
  }
};

module.exports = { createTask, getTasks, deleteTasks, toggleTaskStatus };
