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

const DeleteTasks = async (req, res) => {
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

module.exports = { createTask, getTasks, DeleteTasks };
