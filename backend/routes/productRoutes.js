const express = require("express");
const router = express.Router();

const {
  getProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Routes
router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);

// Admin Routes
router.route("/admin/product/new").post(newProduct);
router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;
