const express = require("express");

const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

// Get advanced GET query handler as a middleware function
const Course = require("../models/Course");
const advancedResults = require("../middleware/advancedResults");
// Get authentification middleware function
const { protect } = require("../middleware/auth");

// Take care of redirecting routes from Bootcamp router
const router = express.Router({ mergeParams: true }); // merge url params from both bootcamp and courses

router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(protect, addCourse);
router
  .route("/:id")
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;
