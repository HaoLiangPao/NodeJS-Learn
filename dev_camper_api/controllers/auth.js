const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const BootCamp = require("../models/Bootcamp");
const User = require("../models/User");

// @desc        Register a user
// @route       POST /api/v1/auth/register
// @access      Public
exports.register = asyncHandler(async (req, res, next) => {
  // Get parameters in request body
  const { name, email, password, role } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(200).json({ success: true });
});
