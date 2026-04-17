const express = require("express");
const app = express();
const taskRoute = require("./routes/task.routes");
const PORT = 6000;
const authRoutes = require("./routes/auth.routes");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/", taskRoute);
app.use("/api/auth", authRoutes);



app.listen(PORT, () => {
  console.log(`backend is running!! ${PORT}`);
});
