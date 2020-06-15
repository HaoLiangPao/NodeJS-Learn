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

//   // Make sure the logged in user is the owner of the bootcamp
//   if (req.user.id !== bootcamp.user.toString() && req.user.role !== "admin") {
//     return next(
//       new ErrorResponse(
//         `User ${req.user.id} is not authorized to add a course to bootcamp ${req.params.bootcampId}`,
//         401
//       )
//     );
//   }

//   const course = await Reviews.create(req.body);

//   res.status(201).json({
//     success: true,
//     data: course,
//   });
// });

// // @desc        Update a course
// // @route       PUT /api/v1/reviews/:id
// // @access      Private
// exports.updateReviews = asyncHandler(async (req, res, next) => {
//   let course = await Reviews.findById(req.params.id);
//   // Reviews id not exists
//   if (!course) {
//     return next(
//       new ErrorResponse(
//         `No course found with the id of ${req.params.id}, please check id`,
//         404
//       )
//     );
//   }
//   // Make sure the logged in user is the owner of the course
//   if (req.user.id !== course.user.toString() && req.user.role !== "admin") {
//     return next(
//       new ErrorResponse(
//         `User ${req.user.id} is not authorized to update course with id of ${req.params.bootcampId}`,
//         401
//       )
//     );
//   }

//   course = await Reviews.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   res.status(200).json({
//     success: true,
//     data: course,
//   });
// });

// // @desc        Delete a course
// // @route       DELETE /api/v1/reviews/:id
// // @access      Private
// exports.deleteReviews = asyncHandler(async (req, res, next) => {
//   let course = await Reviews.findById(req.params.id);
//   // Reviews id not exists
//   if (!course) {
//     return {
//       success: false,
//       data: new ErrorResponse(
//         `No course found with the id of ${req.params.id}, please check id`,
//         404
//       ),
//     };
//   }
//   // Make sure the logged in user is the owner of the course
//   if (req.user.id !== course.user.toString() && req.user.role !== "admin") {
//     return next(
//       new ErrorResponse(
//         `User ${req.user.id} is not authorized to delete course with id of ${req.params.bootcampId}`,
//         401
//       )
//     );
//   }

//   await course.remove();

//   res.status(200).json({
//     success: true,
//     msg: "Reviews deleted",
//     data: {},
//   });
// });
