const Product = require("../models/productModel");

// @desc    Create a new product
// @route   POST /api/v1/product/new
// @access  Private/Admin
// Create New Product => /api/v1/product/new
const newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
const getProducts = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "This route will show all products in database",
  });
};

module.exports = {
  newProduct,
  getProducts,
};
