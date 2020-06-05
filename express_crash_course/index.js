const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");

/////// Init the server ////////
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));

/////// Init middleware //////// ---- use(): when middlewares are used
// Start running logger
app.use(logger);
// Set static folder
app.use(express.static(path.join(__dirname, "public")));
// Init body parser
app.use(express.json()); // handle raw json
app.use(express.urlencoded({ extended: false })); // handle url encoded data

/////// Define routes /////////
// Members API routes
app.use("/api/members", require("./routes/api/members"));
