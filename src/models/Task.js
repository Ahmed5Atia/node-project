const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        required: true
    },
    category: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", required: true
    },
    reminder: {
        type: Date
    },
    reminderSent: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

taskSchema.index({ title: "text", description: "text" });
taskSchema.index({ category: 1 });
taskSchema.index({ priority: 1 });


module.exports = mongoose.model("Task", taskSchema);