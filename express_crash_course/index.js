const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const logger = require("./middleware/logger");
const members = require("./Members");

/////// Init the server ////////
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));

/////// Init middleware //////// ---- use(): when middlewares are used
// Start running logger
app.use(logger);
// Init body parser
app.use(express.json()); // handle raw json
app.use(express.urlencoded({ extended: false })); // handle url encoded data
// Handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
// Render index.handlebars
app.get("/", (req, res) =>
  res.render("index", {
    title: "Member App",
    members,
  })
);
// // Set static folder
// app.use(express.static(path.join(__dirname, "public")));

/////// Define routes /////////
// Members API routes
app.use("/api/members", require("./routes/api/members"));
