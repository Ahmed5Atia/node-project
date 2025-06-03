const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// get all tasks
router.get("/", taskController.getAllTasks);

// create a new task
router.post("/", taskController.createTask);

// update task by id
router.put("/:id", taskController.updateTask);

// delete task by id
router.delete("/:id", taskController.deleteTask);

module.exports = router;