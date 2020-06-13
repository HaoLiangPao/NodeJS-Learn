const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const fileupload = require("express-fileupload");
const colors = require("colors");

// Load env vars (Very important! to place it before any thing that will use an environment variable)
dotenv.config({ path: "./config/config.env" });

// Middleware files
// const logger = require("./middleware/logger"); // custom logger
const morgan = require("morgan");
const errorHandler = require("./middleware/error");

// Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");

// --------- App running -----------
const app = express();
connectDB();
// --------- Calling Middleware Functions -----------
// Use body parser
app.use(express.json());
// Dev logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// File uploading
app.use(fileupload());
// Set static folder
app.use(express.static(path.join(__dirname, "public")));
// Get routes defined
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
// Error handler
app.use(errorHandler);

// Listening to the port
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}!`.yellow.bold
  );
});
// Handle unhandle promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // close server and exit process
  server.close(() => process.exit(1));
});
