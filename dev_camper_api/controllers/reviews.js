const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Review = require("../models/Review");
const BootCamp = require("../models/Bootcamp");
const Bootcamp = require("../models/Bootcamp");

// @desc        Get all reviews
// @route 1     GET /api/v1/reviews
// @route 2     GET /api/v1/bootcamps/:bootcampId/reviews
// @access      Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  // route 1: Get all reviews with the bootcampId given
  if (req.params.bootcampId) {
    const bootcamp = await BootCamp.findById(req.params.bootcampId);
    // Check if bootcamp exists
    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `No bootcamp found with the id of ${req.params.bootcampId}, please check id`,
          404
        )
      );
    }
    // Check if any reviews related to the bootcamp
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });
    return res
      .status(200)
      .json({ success: true, count: reviews.length, data: reviews });
  }
  // route 2: Get all reviews, populate the reference with document information in certain types
  else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc        Get a single review
// @route       GET /api/v1/reviews/:id
// @access      Public
exports.getReview = asyncHandler(async (req, res, next) => {
  // Get the review based on review id
  const review = await Review.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!review) {
    return next(
      new ErrorResponse(
        `No reviews found with id of ${req.params.id}, please check the id`
      )
    );
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc        Add a review
// @route       POST /api/v1/bootcamps/:bootcampId/reviews
// @access      Private
exports.addReview = asyncHandler(async (req, res, next) => {
  // Get user id from middleware function, and bootcampId from params
  req.body.user = req.user.id;
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No bootcamp with id of ${req.params.bootcampId} found in the database, please check id`,
        404
      )
    );
  }

  const review = await Review.create(req.body);

  res.status(201).json({ success: true, data: review });
});

// @desc        Update a review
// @route       PUT /api/v1/reviews/:id
// @access      Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);
  // Reviews id not exists
  if (!review) {
    return next(
      new ErrorResponse(
        `No review found with the id of ${req.params.id}, please check id`,
        404
      )
    );
  }
  // Make sure the logged in user is the owner of the review or the user's role is admin
  if (req.user.id !== review.user.toString() && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update review with id of ${req.params.id}`,
        401
      )
    );
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc        Delete a review
// @route       DELETE /api/v1/reviews/:id
// @access      Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);
  // Review's id does not exist
  if (!review) {
    return {
      success: false,
      data: new ErrorResponse(
        `No review found with the id of ${req.params.id}, please check id`,
        404
      ),
    };
  }
  // Make sure the logged in user is the owner of the review
  if (req.user.id !== review.user.toString() && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete review with id of ${req.params.id}`,
        401
      )
    );
  }

  await review.remove();

  res.status(200).json({
    success: true,
    msg: "Review deleted",
    data: {},
  });
});
