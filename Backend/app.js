const express = require("express");
const app = express();
const taskRoute = require("./routes/task.routes");
const PORT = 5000;
const authRoutes = require("./routes/auth.routes");
const cors = require("cors")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())



app.use("/api/tasks", taskRoute);
app.use("/api/auth", authRoutes);



app.listen(PORT, () => {
  console.log(`backend is running!! ${PORT}`);
});
