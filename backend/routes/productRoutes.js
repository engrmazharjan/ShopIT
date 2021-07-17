const express = require("express");
const router = express.Router();

const {
  newProduct,
  getProducts,
  getSingleProduct,
} = require("../controllers/productController");

// Routes
router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/product/new").post(newProduct);

module.exports = router;
