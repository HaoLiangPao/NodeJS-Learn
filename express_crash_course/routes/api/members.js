const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid");

// Get all members API
router.get("/", (req, res) => {
  res.json(members);
});
// Get single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id)); // req.params.id returns strings
  if (found) {
    res.json(members); // .json() methods can take care of things like json.stringif()
  } else {
    res.status(400).json({
      msg: `MEMBER NOT FOUND: No members with the id of ${req.params.id}`,
    });
  }
});
// Create a member
router.post("/", (req, res) => {
  const { name, email } = req.body;
  const newMember = {
    id: uuid.v4(),
    name,
    email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    res.status(400).json({ msg: "Please include a name and email" });
  } else {
    members.push(newMember);
    res.send(members);
  }
});

module.exports = router;
