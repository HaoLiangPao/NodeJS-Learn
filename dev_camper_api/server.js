const express = require("express");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

// Create Routes
app.get("/", (req, res) => {
  // res.send can send json objects as well, express will automatically convert it
  res.sendStatus(400);
  res.send("");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}!`);
});
