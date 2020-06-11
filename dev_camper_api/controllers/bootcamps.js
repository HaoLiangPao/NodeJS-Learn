const ErrorResponse = require("../utils/errorResponse");
const BootCamp = require("../models/Bootcamp");

// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
exports.getBootCamps = async (req, res, next) => {
  try {
    const bootCamps = await BootCamp.find();
    res
      .status(200)
      .json({ success: true, count: bootCamps.length, data: bootCamps });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
// @desc        Get a single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public
exports.getBootCamp = async (req, res, next) => {
  try {
    const bootCamp = await BootCamp.findById(req.params.id);
    if (!bootCamp) {
      return next(
        new ErrorResponse(`Bootcamp id: ${req.params.id} is invalid!`, 400)
      ); // Bad request
    }
    res.status(200).json({ success: true, data: bootCamp });
  } catch (error) {
    next(error);
  }
};
// @desc        Add a bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private
exports.createBootCamp = async (req, res, next) => {
  try {
    const bootCamp = await BootCamp.create(req.body);
    res.status(201).json({ success: true, data: bootCamp });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
// @desc        Update a bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private
exports.updateBootCamp = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
// @desc        Delete a bootcamp
// @route       Get /api/v1/bootcamps/:id
// @access      Public
exports.deleteBootCamp = async (req, res, next) => {
  try {
    const bootCamp = await BootCamp.findByIdAndDelete(req.params.id);
    if (!bootCamp) {
      return next(
        new ErrorResponse(`Bootcamp id: ${req.params.id} is invalid!`, 400)
      ); // Bad request
    }
    res
      .status(200)
      .json({ success: true, msg: "BootCamp deleted", data: bootCamp });
  } catch (error) {
    next(error);
  }
};
