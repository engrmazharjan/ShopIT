const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

// @desc    Register/Create new user
// @route   POST /api/v1/register
// @access  Public
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "avatars/mjjj_wqbseq",
      url: "https://res.cloudinary.com/logic-worms/image/upload/v1627460734/avatars/mjjj_wqbseq.jpg",
    },
  });

  sendToken(user, 200, res);
});

// @desc    Login user
// @route   POST /api/v1/login
// @access  Public
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Checks If Email And Password Is Entered By User
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter And Password", 400));
  }

  // Finding User In DataBase
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password", 401));
  }

  // Checks If Password Is Correct Or Not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password", 401));
  }

  sendToken(user, 200, res);
});

// @desc    Forgot Password
// @route   GET /api/v1/password/forgot
// @access  Public
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User Not Found With This Email", 404));
  }

  // Get Reset Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create Reset Password url
  const resetUrl = `${res.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your Password Reset Token Is As Follow:\n\n${resetUrl}\n\nIf You Have Not Requested This Email, Then Ignore It.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "ShopIT Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email Sent To: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// @desc    Logout user
// @route   GET /api/v1/logout
// @access  Public
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});
