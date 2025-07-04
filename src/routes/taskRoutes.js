const express = require("express");
const router = express.Router();

// Search and list with filtering, pagination
const taskController = require("../controllers/taskController");
// router.get("/search", taskController.searchTasks);
// router.get("/", taskController.getAllTasks);


// get all tasks
router.get("/", taskController.getAllTasks);

// create a new task
router.post("/", taskController.createTask);

// update task by id
router.put("/:id", taskController.updateTask);

// delete task by id
router.delete("/:id", taskController.deleteTask);

module.exports = router;