const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide product description"],
  },
  price: {
    type: Number,
    required: [true, "Please provide product price"],
    min: 0,
  },
  comparePrice: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: [true, "Please provide product category"],
    enum: ["Men", "Women", "Accessories", "Shoes", "Kids"],
  },
  subCategory: {
    type: String,
    default: "",
  },
  images: [
    {
      url: String,
      public_id: String,
    },
  ],
  brand: {
    type: String,
    default: "",
  },
  sizes: [
    {
      type: String,
      enum: [
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "XXL",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ],
    },
  ],
  colors: [
    {
      type: String,
    },
  ],
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  reviews: [reviewSchema],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  badge: {
    type: String,
    enum: ["", "NEW", "SALE", "HOT"],
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Calculate average rating
productSchema.methods.calculateAverageRating = function () {
  if (this.reviews.length === 0) {
    this.rating = 0;
    this.numReviews = 0;
  } else {
    const totalRating = this.reviews.reduce(
      (acc, review) => acc + review.rating,
      0,
    );
    this.rating = (totalRating / this.reviews.length).toFixed(1);
    this.numReviews = this.reviews.length;
  }
};

module.exports = mongoose.model("Product", productSchema);
