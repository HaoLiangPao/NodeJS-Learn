const express = require("express");

// Get actions from controller
const { register } = require("../controllers/auth");

// Initialize the router
const router = express.Router();

// Define the routes
router.post("/register", register);

// Export router to be used in server.js
module.exports = router;
