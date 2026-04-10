const express = require("express");
const app = express();
const taskRoute = require("./routes/task.routes")
const PORT = 6000;


app.use("/" , taskRoute);


app.listen(PORT , ()=>{
    console.log(`backend is running!! ${PORT}`)
});