// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
exports.getBootCamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Add a bootcamp" });
};
// @desc        Get a single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public
exports.getBootCamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Gel a single bootcamp ${req.params.id}` });
};
// @desc        Add a bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private
exports.createBootCamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Add a bootcamp" });
};
// @desc        Update a bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      Private
exports.updateBootCamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update a bootcamp ${req.params.id}` });
};
// @desc        Delete a bootcamp
// @route       Get /api/v1/bootcamps/:id
// @access      Public
exports.deleteBootCamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete a bootcamp ${req.params.id}` });
};
