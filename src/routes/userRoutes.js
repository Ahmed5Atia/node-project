const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Get all users (مثال)
router.get("/", userController.getAllusers);

// Get user by ID
router.get("/:id",userController.getOneUser );

// Update user by ID (يمكنك إضافة صلاحيات هنا)
router.put("/:id", userController.updateUser);

// Delete user by ID
router.delete("/:id",userController.deleteUser );

module.exports = router;