const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");
const BootCamp = require("../models/Bootcamp");
const Bootcamp = require("../models/Bootcamp");

// @desc        Get all courses
// @route       GET /api/v1/courses
// @route       GET /api/v1/bootcamps/:bootcampId/courses
// @access      Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  // @TODO: add query handler
  let query;

  if (req.params.bootcampId) {
    // Check if bootcamp exists
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `No bootcamp found with the id of ${req.params.bootcampId}, please check id`,
          404
        )
      );
    }
    // Check if any courses related to the bootcamp
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    // Get all courses, populate the reference with document information in certain types
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }

  const courses = await query;

  // Error handler
  if (!courses) {
    return next(
      new ErrorResponse(
        `No courses found with the id of ${req.params.bootcampId}, please check id`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

// @desc        Get a single course
// @route       GET /api/v1/courses/:id
// @route       GET /api/v1/bootcamps/:bootcampId/courses/:id
// @access      Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    //@To-Do: add multiple queries here to get specific course given the bootcamp
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.findById(req.params.id).populate({
      path: "bootcamp",
      select: "name description",
    });
  }

  const courses = await query;

  if (!courses) {
    return next(
      new ErrorResponse(
        `No resources found with id of ${req.params.id}, please check the id`
      )
    );
  }

  res.status(200).json({
    success: true,
    data: courses,
  });
});

// @desc        Add a course
// @route       GET /api/v1/bootcamps/:bootcampId/courses
// @access      Private
exports.addCourse = asyncHandler(async (req, res, next) => {
  // Add to body field
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No bootcamp found with the id of ${req.params.bootcampId}, please check id`,
        404
      )
    );
  }

  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course,
  });
});
