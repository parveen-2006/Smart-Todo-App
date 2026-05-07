const expresss = require("express");
const router = expresss.Router();
const protect = require("../middleware/auth.middleware");
const {createTask , getTasks} = require("../controller/task.controller")


//Create
router.post("/" , protect , createTask , ()=>{
  console.log('task.route.js')
});

//Read
router.get("/" , protect , getTasks , ()=>{
  console.log('task.route.js , getTasks')
});

module.exports = router;
