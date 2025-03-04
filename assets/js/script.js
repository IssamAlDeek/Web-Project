



/**
 * navbar toggle
 */

let navbar = document.querySelector("[data-navbar]");
let navbarLinks = document.querySelectorAll("[data-nav-link]");
let menuToggleBtn = document.querySelector("[data-menu-toggle-btn]");

menuToggleBtn.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    menuToggleBtn.classList.toggle("active");
  });
}



/**
 * header sticky & back to top
 */

let header = document.querySelector("[data-header]");
let backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * search box toggle
 */

let searchBtn = document.querySelector("[data-search-btn]");
let searchContainer = document.querySelector("[data-search-container]");
let searchSubmitBtn = document.querySelector("[data-search-submit-btn]");
let searchCloseBtn = document.querySelector("[data-search-close-btn]");

let searchBoxElems = [searchBtn, searchSubmitBtn, searchCloseBtn];

for (let i = 0; i < searchBoxElems.length; i++) {
  searchBoxElems[i].addEventListener("click", function () {
    searchContainer.classList.toggle("active");
    document.body.classList.toggle("active");
  });
}



/**
 * move cycle on scroll
 */

let deliveryBoy = document.querySelector("[data-delivery-boy]");

let deliveryBoyMove = -80;
let lastScrollPos = 0;

window.addEventListener("scroll", function () {

  let deliveryBoyTopPos = deliveryBoy.getBoundingClientRect().top;

  if (deliveryBoyTopPos < 500 && deliveryBoyTopPos > -250) {
    let activeScrollPos = window.scrollY;

    if (lastScrollPos < activeScrollPos) {
      deliveryBoyMove += 1;
    } else {
      deliveryBoyMove -= 1;
    }

    lastScrollPos = activeScrollPos;
    deliveryBoy.style.transform = `translateX(${deliveryBoyMove}px)`;
  }

});
let itemsPerPage = 3; // Number of items to display per page
let currentPage = 1; // Current page for pagination
let allFoodItems = []; // Store all food items fetched from JSON

// Fetch data from food-menu.json
async function fetchFoodItems() {
  try {
    let response = await fetch('./food-menu.json'); // Path to your JSON file
    let data = await response.json();
    allFoodItems = data.foodItems; // Store the fetched items
    renderFoodItems(paginateItems(allFoodItems, currentPage)); // Initial render
    updatePagination(allFoodItems); // Initialize pagination
  } catch (error) {
    console.error('Error fetching food items:', error);
  }
}

// Render food items
function renderFoodItems(items) {
  let foodMenuList = document.querySelector('.food-menu-list');
  foodMenuList.innerHTML = ''; // Clear existing items

  items.forEach(item => {
    let foodItem = document.createElement('li');
    foodItem.innerHTML = `
      <div class="food-menu-card">
        <div class="card-banner">
          <img src="${item.image}" width="300" height="300" loading="lazy" alt="${item.alt}" class="w-100">
          <div class="badge">${item.discount}</div>
          <button class="btn food-menu-btn">Order Now</button>
        </div>
        <div class="wrapper">
          <p class="category">${item.category}</p>
          <div class="rating-wrapper">
            ${'<ion-icon name="star"></ion-icon>'.repeat(item.rating)}
          </div>
        </div>
        <h3 class="h3 card-title">${item.title}</h3>
        <div class="price-wrapper">
          <p class="price-text">Price:</p>
          <data class="price" value="${item.price}">$${item.price.toFixed(2)}</data>
          <del class="del">$${item.originalPrice.toFixed(2)}</del>
        </div>
      </div>
    `;
    foodMenuList.appendChild(foodItem);
  });
}

// Paginate items
function paginateItems(items, page) {
  let start = (page - 1) * itemsPerPage;
  let end = start + itemsPerPage;
  return items.slice(start, end);
}

// Update pagination buttons
function updatePagination(items) {
  let totalPages = Math.ceil(items.length / itemsPerPage);
  let paginationContainer = document.querySelector('.pagination') || document.createElement('div');
  paginationContainer.className = 'pagination';
  paginationContainer.innerHTML = ''; // Clear existing buttons

  for (let i = 1; i <= totalPages; i++) {
    let pageButton = document.createElement('button');
    pageButton.innerText = i;
    pageButton.addEventListener('click', () => {
      currentPage = i;
      renderFoodItems(paginateItems(items, currentPage));
    });
    paginationContainer.appendChild(pageButton);
  }

  let foodMenuSection = document.querySelector('.food-menu');
  if (!document.querySelector('.pagination')) {
    foodMenuSection.appendChild(paginationContainer);
  }
}

// Filter items by category
function filterByCategory(category) {
  let filteredItems = category === 'All' 
    ? allFoodItems 
    : allFoodItems.filter(item => item.category === category);
  currentPage = 1;
  renderFoodItems(paginateItems(filteredItems, currentPage));
  updatePagination(filteredItems);
}

// Add event listeners to filter buttons
document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    filterByCategory(button.innerText);
  });
});

// Initialize the app
fetchFoodItems();