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

// @desc    Get single product
// @route   GET /api/v1/product/:id
// @access  Public
const getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product Not Found",
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
};

module.exports = {
  newProduct,
  getProducts,
  getSingleProduct,
};
