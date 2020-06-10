const express = require("express");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

// Get all bootcamps (Version 1)
app.get("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, msg: "Gel all bootcamps" });
});
// Get a single bootcamp (Version 1)
app.get("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Gel a single bootcamp ${req.params.id}` });
});
// Create a new bootcamp (Version 1)
app.post("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, msg: "Add a bootcamp" });
});
// Update a bootcamp (Version 1)
app.put("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Update a bootcamp ${req.params.id}` });
});
// Delete a bootcamp (Version 1)
app.delete("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete a bootcamp ${req.params.id}` });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}!`);
});
