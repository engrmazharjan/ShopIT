const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/errors");

app.use(express.json());

// Import All Routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

// Use Routes
app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);

// Middleware to Handle errors
app.use(errorMiddleware);

module.exports = app;
