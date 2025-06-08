const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate, authorizeRoles } = require("../middlewares/auth");

// Get all users
router.get("/", authenticate, authorizeRoles("admin"), userController.getUsers);

// Create a new user
router.post("/", authenticate, authorizeRoles("admin"), userController.addUser);

// Get user by ID
router.get("/:id", authenticate, userController.getUser);

// Update user by ID
router.put("/:id", authenticate, authorizeRoles("admin", "user"), userController.updateUser);

// Delete user by ID
router.delete("/:id", authenticate, authorizeRoles("admin"), userController.deleteUser);

module.exports = router;