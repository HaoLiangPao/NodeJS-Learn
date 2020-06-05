const express = require("express");
const path = require("path");
const members = require("./Members");

const app = express();

// request, response, next middleware
const logger = (req, res, next) => {
  console.log(
    `URL hit: ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
};

//
app.get("/api/members", (req, res) => {
  res.json(members); // .json() methods can take care of things like json.stringif()
});

// Set static folder
app.use(express.static(path.join(__dirname, "public"))); // use(): when middlewares are used

// app.get("/", (req, res) => {
//   // send things to the browser (files, jsons, render templates)
//   res.sendFile(path.join(__dirname, "public", "index.html")); // send files
//   // res.send("<h1>Hello World</h1>"); // simply send a text/html
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
