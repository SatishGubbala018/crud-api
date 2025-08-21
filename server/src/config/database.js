const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { startWorkers } = require("../queue/workers/index");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Database connection established");
    startWorkers();
    console.log("Workers started");
  } catch (error) {
    console.log("Error connecting to mongoDB:", error.message);
  }
};

module.exports = connectDB;
