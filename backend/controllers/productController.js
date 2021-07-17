const Product = require("../models/productModel");

// @desc    Create a new product
// @route   POST /api/v1/admin/product/new
// @access  Private/Admin
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

// @desc    Update a product
// @route   PUT /api/v1/admin/product/:id
// @access  Private/Admin
const updateProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product Not Found",
    });
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    updatedProduct,
  });
};

module.exports = {
  newProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
};
