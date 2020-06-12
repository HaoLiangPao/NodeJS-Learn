const express = require("express");

const { getCourses } = require("../controllers/courses");

const router = express.Router({ mergeParams: true }); // merge url params from both bootcamp and courses

router.route("/").get(getCourses);

module.exports = router;
