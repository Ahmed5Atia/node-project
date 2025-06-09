const Task = require("../models/Task");

// Get all tasks with filtering and searching
const getAllTasks = async (req, res) => {
  try {
    const { category, priority, status, search } = req.query;
    const query = { owner: req.user.id };
    //Pagination part 
    const { pageNumber } = req.query; //Query Parameter
    const taskePerPage = 5;

    // Filtering
    if (category) query.category = category;
    if (priority) query.priority = priority;
    if (status) query.status = status;

    // Searching
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } }
      ];
    }

    const tasks = await Task.find(query)
                            .skip((+pageNumber - 1) * taskePerPage)
                            .limit(taskePerPage); //Pagination strategy
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

//create a new task
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      dueDate,
      priority,
      status,
      category,
      reminder,
    } = req.body;
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status,
      category,
      reminder, // add reminder
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
    const updateData = { ...req.body };
    // Only allow updating reminder if provided
    if (req.body.reminder !== undefined) {
      updateData.reminder = req.body.reminder;
    }
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      updateData,
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
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed To Delete Task" });
  }
};

// Search tasks by query parameter 'q'
// const searchTasks = async (req, res) => {
//   req.query.search = req.query.q;
//   return getAllTasks(req, res);
// };

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  // searchTasks,
};
