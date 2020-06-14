const express = require("express");

// Get actions from controller
const { register, login } = require("../controllers/auth");

// Initialize the router
const router = express.Router();

// Define the routes
router.post("/register", register);
router.post("/login", login);

// Export router to be used in server.js
module.exports = router;
