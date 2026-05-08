const expresss = require("express");
const router = expresss.Router();
const protect = require("../middleware/auth.middleware");
const {
  createTask,
  getTasks,
  DeleteTasks,
} = require("../controller/task.controller");

//Create
router.post("/", protect, createTask);

//Read
router.get("/", protect, getTasks);

//Delete
router.delete("/:id", protect, DeleteTasks);

module.exports = router;
