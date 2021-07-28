const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Checks If User Is Authenticated Or Not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  //   console.log(token);

  if (!token) {
    return next(
      new ErrorHandler("You Need To Login First To Access These Resources", 401)
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  res.user = await User.findById(decoded.id);
  next();
});
