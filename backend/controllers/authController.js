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

  res.status(201).json({
    success: true,
    user,
  });
});
