require('dotenv/config');
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./src/routes/userRoutes.js");
const taskRoutes = require("./src/routes/taskRoutes.js");
const authMiddleware = require("./src/middlewares/auth.js").authenticate;
require('./src/jobs/reminderJob.js');

const app = express();
const PORT = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/NodeProject")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.use(express.json());


app.use("/users", authMiddleware, userRoutes);
app.use("/tasks", authMiddleware, taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});