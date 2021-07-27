const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/errors");

app.use(express.json());

// Import All Routes
const productRoutes = require("./routes/productRoutes");

// Use Routes
app.use("/api/v1", productRoutes);

// Middleware to Handle errors
app.use(errorMiddleware);

module.exports = app;
