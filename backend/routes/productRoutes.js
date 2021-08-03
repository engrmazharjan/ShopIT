const express = require("express");
const router = express.Router();

const {
  getProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteProductReview,
} = require("../controllers/productController");

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authProtect");

// Routes
router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);

// Admin Routes
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

// Reviews Routes
router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(isAuthenticatedUser, getProductReviews);
router.route("/review").delete(isAuthenticatedUser, deleteProductReview);

module.exports = router;
