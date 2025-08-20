const express = require("express");
const cors = require("cors");
const errorHandler = require("../middleware/errorHandler");
const allRoutes = require("../routes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", allRoutes);

module.exports = app;
