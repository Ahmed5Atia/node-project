const Task = require("../models/Task");


//get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

//create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, category } = req.body;
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status,
      category,
      owner: req.user.id
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

//update one task by id
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

//delate one task by id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed To Delete Task" });
  }
};

module.exports = { getAllTasks, createTask, updateTask,deleteTask };