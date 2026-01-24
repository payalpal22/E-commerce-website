const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { protect, admin } = require("../middleware/auth");

// @route   GET /api/products
// @desc    Get all products with filtering, sorting, pagination
// @access  Public
router.get("/", productController.getProducts);

// @route   GET /api/products/featured
// @desc    Get featured products
// @access  Public
router.get("/featured", productController.getFeaturedProducts);

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get("/:id", productController.getProduct);

// @route   POST /api/products
// @desc    Create new product
// @access  Private/Admin
router.post("/", protect, admin, productController.createProduct);

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private/Admin
router.put("/:id", protect, admin, productController.updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private/Admin
router.delete("/:id", protect, admin, productController.deleteProduct);

// @route   POST /api/products/:id/reviews
// @desc    Create product review
// @access  Private
router.post("/:id/reviews", protect, productController.createReview);

// @route   GET /api/products/:id/reviews
// @desc    Get product reviews
// @access  Public
router.get("/:id/reviews", productController.getReviews);

module.exports = router;
