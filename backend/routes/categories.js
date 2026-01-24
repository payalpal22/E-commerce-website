const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { protect, admin } = require("../middleware/auth");

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get("/", categoryController.getCategories);

// @route   GET /api/categories/:id
// @desc    Get single category
// @access  Public
router.get("/:id", categoryController.getCategory);

// @route   POST /api/categories
// @desc    Create new category
// @access  Private/Admin
router.post("/", protect, admin, categoryController.createCategory);

// @route   PUT /api/categories/:id
// @desc    Update category
// @access  Private/Admin
router.put("/:id", protect, admin, categoryController.updateCategory);

// @route   DELETE /api/categories/:id
// @desc    Delete category
// @access  Private/Admin
router.delete("/:id", protect, admin, categoryController.deleteCategory);

module.exports = router;
