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
    res.json(members);
    // When using server.render(view) with templates
    // res.redirect("/");
  }
});
// Update a member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id)); // req.params.id returns strings
  if (found) {
    const updateMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;
        res.json({ msg: "Member updated", member });
      }
    });
    res.json(members); // .json() methods can take care of things like json.stringif()
  } else {
    res.status(400).json({
      msg: `MEMBER NOT FOUND: No members with the id of ${req.params.id}`,
    });
  }
});
// Delete a member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id)); // req.params.id returns strings
  if (found) {
    res.json({
      msg: "Member deleted",
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    }); // .json() methods can take care of things like json.stringif()
  } else {
    res.status(400).json({
      msg: `MEMBER NOT FOUND: No members with the id of ${req.params.id}`,
    });
  }
});

module.exports = router;
