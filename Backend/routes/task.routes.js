const expresss = require("express");
const router = expresss.Router();
const protect = require("../middleware/auth.middleware");
const {
  createTask,
  getTasks,
  deleteTasks,
  toggleTaskStatus,
} = require("../controller/task.controller");

//Create
router.post("/", protect, createTask);

//Read
router.get("/", protect, getTasks);

//Delete
router.delete("/:id", protect, deleteTasks);

// toggle status updation
router.patch("/:id" , protect , toggleTaskStatus)

module.exports = router;
