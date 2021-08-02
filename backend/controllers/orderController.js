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

// @desc    Update / Process Order
// @route   PUT /api/v1/admin/order/:id
// @access  Private/Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You Have Already Delivered This Order", 400));
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
}

// @desc    Delate Order
// @route   DELETE /api/v1/admin/order/:id
// @access  Private/Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order Found With This ID", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
    message: "Order Deleted Successfully",
  });
});
