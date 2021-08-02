const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Order = require("../models/orderModel");

const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");

// @desc    Create New Order
// @route   POST /api/v1/order/new
// @access  Public
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    message: "Order Created Successfully",
    order,
  });
});

// @desc    Get Single Order
// @route   GET /api/v1/order/:id
// @access  Public/LoggedInUser
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No Order Found With This ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// @desc    Get LoggedInUser Orders
// @route   GET /api/v1/orders/me
// @access  Public/LoggedInUser
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// @desc    Get All Orders
// @route   GET /api/v1/admin/orders
// @access  Private/Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});
