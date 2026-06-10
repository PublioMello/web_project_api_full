const { requestLogger } = require("../utils/logger");

const logRequests = (req, res, next) => {
  requestLogger.info({
    method: req.method,
    url: req.originalUrl,
    body: req.body,
    timestamp: new Date().toISOString(),
  });

  next();
};

module.exports = logRequests;
