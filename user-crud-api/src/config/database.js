// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI , {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error('Database connection failed:', error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Database connection established");
  } catch (error) {
    console.log("Error connecting to mongoDB:", error.message);
  }
};

module.exports = connectDB;
