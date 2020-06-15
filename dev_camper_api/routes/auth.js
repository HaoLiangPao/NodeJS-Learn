const express = require("express");

// Get actions from controller
const {
  register,
  login,
  getMe,
  forgotPassword,
} = require("../controllers/auth");
// Get authorized middleware function
const { protect } = require("../middleware/auth");

// Initialize the router
const router = express.Router();

// Define the routes
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/forgotpassword", forgotPassword);

// Export router to be used in server.js
module.exports = router;
