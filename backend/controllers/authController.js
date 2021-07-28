const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

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

  const token = user.getJwtToken();

  res.status(201).json({
    success: true,
    token,
  });
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

  // Checks If Password Is Correct OR Not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password", 401));
  }

  const token = user.getJwtToken();
  res.status(200).json({
    success: true,
    token,
  });
});
