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
