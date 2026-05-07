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

module.exports = { createTask , getTasks };