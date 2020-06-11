const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const BootCamp = require("../models/Bootcamp");

// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
exports.getBootCamps = asyncHandler(async (req, res, next) => {
  const bootCamps = await BootCamp.find();
  res
    .status(200)
    .json({ success: true, count: bootCamps.length, data: bootCamps });
});
// @desc        Get a single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public
exports.getBootCamp = asyncHandler(async (req, res, next) => {
  const bootCamp = await BootCamp.findById(req.params.id);
  if (!bootCamp) {
    return next(
      new ErrorResponse(`Bootcamp id: ${req.params.id} is invalid!`, 400)
    ); // Bad request
  }
  res.status(200).json({ success: true, data: bootCamp });
});
// @desc        Add a bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private
exports.createBootCamp = asyncHandler(async (req, res, next) => {
  const bootCamp = await BootCamp.create(req.body);
  res.status(201).json({ success: true, data: bootCamp });
});
// @desc        Update a bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private
exports.updateBootCamp = asyncHandler(async (req, res, next) => {
  const bootCamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootCamp) {
    return next(
      new ErrorResponse(`Bootcamp id: ${req.params.id} is invalid!`, 400)
    ); // Bad request
  }
  res.status(200).json({ success: true, data: bootCamp });
});
// @desc        Delete a bootcamp
// @route       Get /api/v1/bootcamps/:id
// @access      Public
exports.deleteBootCamp = asyncHandler(async (req, res, next) => {
  const bootCamp = await BootCamp.findByIdAndDelete(req.params.id);
  if (!bootCamp) {
    return next(
      new ErrorResponse(`Bootcamp id: ${req.params.id} is invalid!`, 400)
    ); // Bad request
  }
  res
    .status(200)
    .json({ success: true, msg: "BootCamp deleted", data: bootCamp });
});
