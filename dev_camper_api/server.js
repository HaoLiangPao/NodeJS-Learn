const express = require("express");
const dotenv = require("dotenv");

// Middleware files
// const logger = require("./middleware/logger"); // custom logger
const morgan = require("morgan");

// Route files
const bootcamps = require("./routes/bootcamps");

// Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

// Dev running middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Get routes defined
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}!`);
});
