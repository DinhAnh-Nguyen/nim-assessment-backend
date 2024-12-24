// Database manager

// Imports
const mongoose = require("mongoose");
const getLogger = require("../logger");

// Gets logger for db
const logger = getLogger("db");

// Connects with the database
const { MONGO_URI, DB_NAME } = process.env;
const connectionString = MONGO_URI || "mongodb://localhost:3001/restaurant";
mongoose
  .connect(`${connectionString}/${DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    logger.log("Connected to MongoDB");
  })
  .catch((error) => logger.error(error.message));

module.exports = mongoose;
