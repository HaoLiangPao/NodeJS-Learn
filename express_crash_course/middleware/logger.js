const moment = require("moment");

// Define a middleware: (request, response, next middleware)
const logger = (req, res, next) => {
  console.log(
    `URL hit: ( ${req.protocol}://${req.get("host")}${
      req.originalUrl
    } ) @ ${moment().format()}`
  );
  next();
};

module.exports = logger;
