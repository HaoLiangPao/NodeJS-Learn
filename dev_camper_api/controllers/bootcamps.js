const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geoCoder = require("../utils/geocoder");
const BootCamp = require("../models/Bootcamp");

// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
exports.getBootCamps = asyncHandler(async (req, res, next) => {
  let query;

  // copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // create query string
  let queryStr = JSON.stringify(reqQuery);

  // create Mongoose operators ($gt, $gte, etc.)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resources
  query = BootCamp.find(JSON.parse(queryStr)).populate("courses");

  // SELECT FIELDS (specific fields needs to be extracted)
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" "); // get all columns to be seleted
    query = query.select(fields);
  }

  // SORT results (sorting order of the output returned)
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" "); // get sorting columns
    query = query.sort(sortBy);
  } else {
    // sort the result in a default order: descending createdAt
    query = query.sort("-createdAt");
  }

  // Pagination (1 page and 1 item per page by default)
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await BootCamp.countDocuments(); // Mongoose method

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const bootCamps = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: bootCamps.length,
    pagination,
    data: bootCamps,
  });
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

  const bootcamps = await BootCamp.find({
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
  // trigger the middleare function before remove the document
  const bootCamp = await BootCamp.findById(req.params.id);
  if (!bootCamp) {
    return next(
      new ErrorResponse(`Bootcamp id: ${req.params.id} is invalid!`, 400)
    ); // Bad request
  }
  bootCamp.remove();
  res
    .status(200)
    .json({ success: true, msg: "BootCamp deleted", data: bootCamp });
});
