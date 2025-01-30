// Cart System
let cart = [];

// Function to update the cart count in the navbar
function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  cartCount.textContent = cart.length;
}

// Function to add an item to the cart
function addToCart(product) {
  const existingItem = cart.find((item) => item.title === product.title);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartCount();
  renderCartItems();
}

// Function to render cart items in the dropdown
function renderCartItems() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = '<li class="text-center">Your cart is empty.</li>';
    return;
  }

  cart.forEach((item) => {
    const cartItem = document.createElement("li");
    cartItem.classList.add("dropdown-item");
    cartItem.innerHTML = `
           <div class="d-flex justify-content-between align-items-center">
             <span>${item.title} (x${item.quantity})</span>
             <span>${item.price}</span>
           </div>
         `;
    cartItems.appendChild(cartItem);
  });
}

// Add event listener to "Add to Cart" button
document.querySelector(".cart-btn").addEventListener("click", () => {
  const product = {
    title: document.getElementById("product-title").textContent,
    price: document.getElementById("product-price").textContent,
  };
  addToCart(product);
});

// Initialize cart
updateCartCount();
renderCartItems();

// Swiper Initialization
const swiper = new Swiper(".swiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Fetch product details based on the product name
const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get("product");

const products = {
  DarkFlorishOnepiece1: {
    images: ["images/pic2.jpg", "images/pic3.jpg", "images/pic4.jpg"],
    title: "Dark Florish Onepiece",
    price: "$95.00",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.",
  },
  DarkFlorishOnepiece2: {
    images: ["images/pic3.jpg", "images/pic2.jpg", "images/pic5.jpg"],
    title: "Dark Florish Onepiece",
    price: "$95.00",
    description: "Another beautiful onepiece for your wardrobe.",
  },
  // Add more products here
};

const product = products[productName];

if (product) {
  // Set product details
  document.getElementById("product-title").textContent = product.title;
  document.getElementById("product-price").textContent = product.price;
  document.getElementById("product-description").textContent =
    product.description;

  // Add images to Swiper
  const swiperWrapper = document.getElementById("swiper-wrapper");
  product.images.forEach((image) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    slide.innerHTML = `<img src="${image}" alt="Product Image" />`;
    swiperWrapper.appendChild(slide);
  });

  // Reinitialize Swiper after adding images
  swiper.update();
} else {
  document.getElementById("product-details").innerHTML =
    "<p>Product not found.</p>";
}
