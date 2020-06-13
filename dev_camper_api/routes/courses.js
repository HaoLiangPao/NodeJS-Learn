const express = require("express");

const { getCourses, getCourse, addCourse } = require("../controllers/courses");

const router = express.Router({ mergeParams: true }); // merge url params from both bootcamp and courses

router.route("/").get(getCourses).post(addCourse);
router.route("/:id").get(getCourse);

module.exports = router;
