const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geoCoder = require("../utils/geocoder");
const BootCamp = require("../models/Bootcamp");
const Bootcamp = require("../models/Bootcamp");

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
// @desc        Get bootcamps within a radius
// @route       GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access      Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geoCoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Cal radius using radius
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi or 6,378 km
  const radius = distance / 6378;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
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
