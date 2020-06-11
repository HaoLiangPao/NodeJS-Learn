const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");

// Middleware files
// const logger = require("./middleware/logger"); // custom logger
const morgan = require("morgan");

// Route files
const bootcamps = require("./routes/bootcamps");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// --------- App running -----------
const app = express();
// Use body parser middleware
app.use(express.json());
connectDB();

// Dev running middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Get routes defined
app.use("/api/v1/bootcamps", bootcamps);

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
