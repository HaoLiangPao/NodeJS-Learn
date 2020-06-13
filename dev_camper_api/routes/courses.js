const express = require("express");

const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

const router = express.Router({ mergeParams: true }); // merge url params from both bootcamp and courses

router.route("/").get(getCourses).post(addCourse);
router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
