const { errorLogger } = require("../utils/logger");

const logErrors = (err, req, res, next) => {
  errorLogger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    timestamp: new Date().toISOString(),
  });

  next(err);
};

module.exports = logErrors;
