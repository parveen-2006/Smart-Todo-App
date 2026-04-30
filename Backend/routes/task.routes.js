const expresss = require("express");
const router = expresss.Router();
const protect = require("../middleware/auth.middleware");
const {createTask} = require("../controller/task.controller")

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Success",
  });
});

router.post("/" , protect , createTask , ()=>{
  console.log('task.route.js')
});

module.exports = router;
