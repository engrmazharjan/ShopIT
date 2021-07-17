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
const getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};

module.exports = {
  newProduct,
  getProducts,
};
