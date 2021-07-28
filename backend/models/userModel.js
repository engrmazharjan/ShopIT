const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Your Name Cannot Exceed 30 Characters"],
  },

  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter Valid Email Address"],
  },

  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minlength: [8, "Your Password Must Be 8 Characters Long Or More"],
    select: false,
  },

  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  role: {
    type: String,
    default: "user",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,

  resetPasswordExpire: Date,
});

// Encrypting Password Before Saving User To DataBase
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Return JSONWEBTOKEN (JWT)
UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

module.exports = mongoose.model("User", UserSchema);
