const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Product = require("./models/Product");
const Category = require("./models/Category");

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/fashionhub";

// Sample products
const products = [
  {
    name: "Classic White T-Shirt",
    description: "Premium cotton white t-shirt. Perfect for everyday wear.",
    price: 29.99,
    comparePrice: 39.99,
    category: "Men",
    subCategory: "T-Shirts",
    images: [
      {
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      },
    ],
    brand: "FashionHub",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Navy"],
    stock: 100,
    rating: 5,
    isFeatured: true,
    badge: "NEW",
  },
  {
    name: "Denim Jacket",
    description: "Classic blue denim jacket with modern fit.",
    price: 89.99,
    comparePrice: 119.99,
    category: "Women",
    subCategory: "Jackets",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
      },
    ],
    brand: "FashionHub",
    sizes: ["S", "M", "L"],
    colors: ["Blue", "Black"],
    stock: 50,
    rating: 4,
    isFeatured: true,
    badge: "SALE",
  },
  {
    name: "Summer Dress",
    description: "Light and breezy summer dress perfect for warm weather.",
    price: 59.99,
    category: "Women",
    subCategory: "Dresses",
    images: [
      {
        url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
      },
    ],
    brand: "FashionHub",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Floral", "White", "Pink"],
    stock: 75,
    rating: 5,
    isFeatured: true,
  },
  {
    name: "Leather Boots",
    description: "Premium leather boots with comfortable fit.",
    price: 129.99,
    category: "Shoes",
    subCategory: "Boots",
    images: [
      {
        url: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400",
      },
    ],
    brand: "FashionHub",
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["Brown", "Black"],
    stock: 40,
    rating: 4,
    isFeatured: true,
    badge: "NEW",
  },
  {
    name: "Casual Sneakers",
    description: "Comfortable sneakers for everyday wear.",
    price: 79.99,
    category: "Shoes",
    subCategory: "Sneakers",
    images: [
      {
        url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
      },
    ],
    brand: "FashionHub",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["White", "Black", "Red"],
    stock: 120,
    rating: 5,
    isFeatured: true,
  },
  {
    name: "Designer Handbag",
    description: "Elegant handbag with premium materials.",
    price: 159.99,
    comparePrice: 199.99,
    category: "Accessories",
    subCategory: "Bags",
    images: [
      {
        url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
      },
    ],
    brand: "FashionHub",
    colors: ["Black", "Brown", "Beige"],
    stock: 30,
    rating: 5,
    isFeatured: true,
    badge: "SALE",
  },
  {
    name: "Wool Sweater",
    description: "Warm and cozy wool sweater for cold weather.",
    price: 69.99,
    category: "Men",
    subCategory: "Sweaters",
    images: [
      {
        url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
      },
    ],
    brand: "FashionHub",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Gray", "Navy", "Black"],
    stock: 60,
    rating: 4,
    isFeatured: false,
  },
  {
    name: "Sunglasses",
    description: "Stylish sunglasses with UV protection.",
    price: 49.99,
    category: "Accessories",
    subCategory: "Eyewear",
    images: [
      {
        url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
      },
    ],
    brand: "FashionHub",
    colors: ["Black", "Brown", "Tortoise"],
    stock: 80,
    rating: 4,
    isFeatured: false,
    badge: "NEW",
  },
];

// Sample categories
const categories = [
  { name: "Men", description: "Men's clothing and accessories" },
  { name: "Women", description: "Women's clothing and accessories" },
  { name: "Accessories", description: "Fashion accessories" },
  { name: "Shoes", description: "Footwear for all occasions" },
  { name: "Kids", description: "Children's clothing" },
];

// Sample admin user
const adminUser = {
  name: "Admin User",
  email: "admin@fashionhub.com",
  password: "admin123",
  role: "admin",
  isVerified: true,
};

// Import data
const importData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    console.log("🗑️  Cleared existing data");

    // Insert sample data
    await User.create(adminUser);
    console.log("👤 Admin user created");

    await Category.insertMany(categories);
    console.log("📁 Categories created");

    await Product.insertMany(products);
    console.log("📦 Products created");

    console.log("✅ Data imported successfully!");
    console.log("\n📝 Admin credentials:");
    console.log("   Email: admin@fashionhub.com");
    console.log("   Password: admin123");

    process.exit();
  } catch (error) {
    console.error("❌ Error importing data:", error);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();

    console.log("🗑️  Data deleted successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error deleting data:", error);
    process.exit(1);
  }
};

// Run based on command line argument
if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
