const express = require("express");
const app = express();
app.use(express.json());

// Import All Routes
const productRoutes = require("./routes/productRoutes");

// Use Routes
app.use("/api/v1", productRoutes);

module.exports = app;
