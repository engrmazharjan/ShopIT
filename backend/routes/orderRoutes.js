const express = require("express");
const router = express.Router();

const { newOrder } = require("../controllers/orderController");

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authProtect");

// Routes
router.route("/order/new").post(isAuthenticatedUser, newOrder);

module.exports = router;
