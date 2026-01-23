// Products Data
const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    category: "Men",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    rating: 5,
    badge: "NEW",
  },
  {
    id: 2,
    name: "Denim Jacket",
    category: "Women",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    rating: 4,
    badge: "SALE",
  },
  {
    id: 3,
    name: "Summer Dress",
    category: "Women",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
    rating: 5,
    badge: "",
  },
  {
    id: 4,
    name: "Leather Boots",
    category: "Shoes",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400",
    rating: 4,
    badge: "NEW",
  },
  {
    id: 5,
    name: "Casual Sneakers",
    category: "Shoes",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    rating: 5,
    badge: "",
  },
  {
    id: 6,
    name: "Designer Handbag",
    category: "Accessories",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
    rating: 5,
    badge: "SALE",
  },
  {
    id: 7,
    name: "Wool Sweater",
    category: "Men",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
    rating: 4,
    badge: "",
  },
  {
    id: 8,
    name: "Sunglasses",
    category: "Accessories",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
    rating: 4,
    badge: "NEW",
  },
];

// Cart Management
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Load Featured Products on Home Page
function loadFeaturedProducts() {
  const container = document.getElementById("featuredProducts");
  if (!container) return;

  container.innerHTML = products
    .slice(0, 4)
    .map(
      (product) => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    ${"★".repeat(product.rating)}${"☆".repeat(5 - product.rating)}
                </div>
                <p class="product-price">$${product.price}</p>
                <button class="btn btn-primary add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `,
    )
    .join("");
}

// Load All Products on Shop Page
function loadAllProducts() {
  const container = document.getElementById("allProducts");
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");

  let filteredProducts = products;
  if (category) {
    filteredProducts = products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase(),
    );
  }

  container.innerHTML = filteredProducts
    .map(
      (product) => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    ${"★".repeat(product.rating)}${"☆".repeat(5 - product.rating)}
                </div>
                <p class="product-price">$${product.price}</p>
                <button class="btn btn-primary add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `,
    )
    .join("");
}

// Add to Cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showNotification("Product added to cart!");
}

// Update Cart Count
function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = total;
  }
}

// Load Cart Page
function loadCart() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartSummary = document.getElementById("cartSummary");

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <i class="fas fa-shopping-cart" style="font-size: 4rem; color: #ccc;"></i>
                <h2>Your cart is empty</h2>
                <p>Add some products to get started!</p>
                <a href="../pages/shop.html" class="btn btn-primary" style="margin-top: 1rem;">Shop Now</a>
            </div>
        `;
    if (cartSummary) cartSummary.style.display = "none";
    return;
  }

  cartItemsContainer.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="product-category">${item.category}</p>
                <p class="cart-item-price">$${item.price}</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <div class="cart-item-actions">
                <button onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `,
    )
    .join("");

  updateCartSummary();
}

// Update Quantity
function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

// Remove from Cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
  showNotification("Product removed from cart");
}

// Update Cart Summary
function updateCartSummary() {
  const summaryContainer = document.getElementById("cartSummary");
  if (!summaryContainer) return;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + shipping;

  summaryContainer.innerHTML = `
        <h3>Order Summary</h3>
        <div class="summary-row">
            <span>Subtotal:</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Shipping:</span>
            <span>${shipping === 0 ? "FREE" : "$" + shipping.toFixed(2)}</span>
        </div>
        <div class="summary-row summary-total">
            <span>Total:</span>
            <span>$${total.toFixed(2)}</span>
        </div>
        <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;" onclick="checkout()">
            Proceed to Checkout
        </button>
    `;
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    showNotification("Your cart is empty!");
    return;
  }
  showNotification("Checkout feature coming soon!");
}

// Newsletter Form
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showNotification("Thank you for subscribing!");
    newsletterForm.reset();
  });
}

// Contact Form
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showNotification("Message sent successfully!");
    contactForm.reset();
  });
}

// Show Notification
function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #2c3e50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
  notification.textContent = message;

  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
  document.head.appendChild(style);

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideIn 0.3s ease reverse";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  loadFeaturedProducts();
  loadAllProducts();
  loadCart();
});
