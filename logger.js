// For debugging

// Imports the debug module
// Debug module: used for logging messages in a structured and filtered manner.
const createDebug = require("debug");

// Creates a function that gives out logs, errors, and warnings
// namespace: A string used to group related logs.
//            Helps identify which part of the application the logs are coming from.
const getLogger = (namespace) => {
  const log = createDebug(`${namespace}:log`);
  const error = createDebug(`${namespace}:err`);
  const warn = createDebug(`${namespace}:warn`);

  // Provides color for each type of logger
  log.color = 2;
  error.color = 1;
  warn.color = 3;

  return { log, error, warn };
};

module.exports = getLogger;
