const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./src/middleware/errorHandler");
const allRoutes = require("./src/routes");
require("dotenv").config();
const connectDB = require("./src/config/database");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", allRoutes);

// Connect to database
connectDB();

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
