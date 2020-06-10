const express = require("express");
const router = express.Router();

// Get all bootcamps (Version 1)
router.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: "Gel all bootcamps" });
});
// Get a single bootcamp (Version 1)
router.get("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Gel a single bootcamp ${req.params.id}` });
});
// Create a new bootcamp (Version 1)
router.post("/", (req, res) => {
  res.status(200).json({ success: true, msg: "Add a bootcamp" });
});
// Update a bootcamp (Version 1)
router.put("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Update a bootcamp ${req.params.id}` });
});
// Delete a bootcamp (Version 1)
router.delete("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete a bootcamp ${req.params.id}` });
});

module.exports = router;
