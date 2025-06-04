const cron = require('node-cron');
const Task = require('../models/Task');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// Runs every minute
cron.schedule('* * * * *', async () => {
    const now = new Date();
    // Find tasks with a reminder due and not sent
    const tasks = await Task.find({
        reminder: { $lte: now },
        reminderSent: false
    }).populate('owner');

    for (const task of tasks) {
        if (task.owner && task.owner.email) {
            await sendEmail(
                task.owner.email,
                'Task Reminder',
                `Reminder: ${task.title}\nDescription: ${task.description}\nDue: ${task.dueDate}`
            );
            task.reminderSent = true;
            await task.save();
        }
    }
});
