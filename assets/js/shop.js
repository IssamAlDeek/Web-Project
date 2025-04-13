// Sample Data
let foodItems = [
    { id: 1, name: "Fried Chicken Unlimited", category: "chicken", price: 49.00, discount: 15, image: "./assets/images/food-menu-1.png", rating: 4.5 },
    { id: 2, name: "Burger King Whopper", category: "burger", price: 29.00, discount: 10, image: "./assets/images/food-menu-2.png", rating: 4.0 },
    { id: 3, name: "White Castle Pizzas", category: "pizza", price: 49.00, discount: 25, image: "./assets/images/food-menu-3.png", rating: 4.7 },
    { id: 4, name: "Bell Burrito Supreme", category: "burrito", price: 59.00, discount: 20, image: "./assets/images/food-menu-4.png", rating: 4.2 },
    { id: 5, name: "Kung Pao Chicken BBQ", category: "nuggets", price: 49.00, discount: 5, image: "./assets/images/food-menu-5.png", rating: 4.8 },
    { id: 6, name: "Wendy's Chicken", category: "chicken", price: 49.00, discount: 15, image: "./assets/images/food-menu-6.png", rating: 4.3 }
];

// Cart Data
let cart = [];
let total = 0;

// DOM Elements
let foodMenuList = document.getElementById("food-menu-list");
let cartItems = document.getElementById("cart-items");
let cartTotal = document.getElementById("cart-total");
let cartCount = document.getElementById("cart-count");
let cartModal = document.getElementById("cart-modal");
let closeModal = document.querySelector(".close");
let viewCartBtn = document.getElementById("view-cart-btn");

// Render Food Items
function renderFoodItems(category = "all") {
    foodMenuList.innerHTML = "";
    let filteredItems = category === "all" ? foodItems : foodItems.filter(item => item.category === category);
    filteredItems.forEach(item => {
        let foodItem = document.createElement("li");
        foodItem.innerHTML = `
            <div class="food-menu-card">
                <div class="card-banner">
                    <img src="${item.image}" width="300" height="300" loading="lazy" alt="${item.name}" class="w-100">
                    <div class="badge">-${item.discount}%</div>
                    <button class="btn food-menu-btn" data-id="${item.id}">Order Now</button>
                </div>
                <div class="wrapper">
                    <p class="category">${item.category}</p>
                    <div class="rating-wrapper">
                        ${renderRating(item.rating)}
                    </div>
                </div>
                <h3 class="h3 card-title">${item.name}</h3>
                <div class="price-wrapper">
                    <p class="price-text">Price:</p>
                    <data class="price" value="${item.price}">$${item.price.toFixed(2)}</data>
                    <del class="del">$${(item.price / (1 - item.discount / 100)).toFixed(2)}</del>
                </div>
            </div>
        `;
        foodMenuList.appendChild(foodItem);
    });
}

// Render Rating Stars
function renderRating(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
        stars += `<ion-icon name="${i <= rating ? 'star' : 'star-outline'}"></ion-icon>`;
    }
    return stars;
}

// Filter by Category
document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        renderFoodItems(button.dataset.category);
    });
});

// Add to Cart
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("food-menu-btn")) {
        let itemId = parseInt(e.target.dataset.id);
        let item = foodItems.find(item => item.id === itemId);
        addToCart(item);
    }
});

function addToCart(item) {
    let existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCart();
}

// Update Cart
function updateCart() {
    cartItems.innerHTML = "";
    total = 0;
    cart.forEach(item => {
        let cartItem = document.createElement("li");
        cartItem.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
            <button class="btn btn-hover" data-id="${item.id}">Remove</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Remove from Cart
cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const itemId = parseInt(e.target.dataset.id);
        cart = cart.filter(item => item.id !== itemId);
        updateCart();
    }
});

// Open Cart Modal
viewCartBtn.addEventListener("click", () => {
    cartModal.style.display = "block";
});

// Close Cart Modal
closeModal.addEventListener("click", () => {
    cartModal.style.display = "none";
});

// Initial Render
renderFoodItems();