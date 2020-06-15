const express = require("express");

const { getReviews } = require("../controllers/reviews");
const Review = require("../models/Review");

const router = express.Router({ mergeParams: true });

// Middleware function
const { protect, authorize } = require("../middleware/auth");
const advancedResult = require("../middleware/advancedResults");

router.route("/").get(
  advancedResult(Review, {
    path: "bootcamp",
    select: "name description",
  }),
  getReviews
);

module.exports = router;
