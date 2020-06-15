const express = require("express");

const { getReviews, getReview } = require("../controllers/reviews");
const Review = require("../models/Review");

const router = express.Router({ mergeParams: true });

// Middleware function
const { protect, authorize } = require("../middleware/auth");
const advancedResult = require("../middleware/advancedResults");

// Defining the routes
router.route("/").get(
  advancedResult(Review, {
    path: "bootcamp",
    select: "name description",
  }),
  getReviews
);

router.route("/:id").get(getReview);

module.exports = router;
