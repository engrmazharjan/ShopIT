const express = require("express");
const router = express.Router();

const {
  getProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { isAuthenticatedUser } = require("../middlewares/authProtect");

// Routes
router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);

// Admin Routes
router.route("/admin/product/new").post(isAuthenticatedUser, newProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct);

module.exports = router;
