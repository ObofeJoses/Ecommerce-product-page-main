// --- DOM Elements: Navigation ---
const menuToggleBtn = document.getElementById('menu-toggle');
const menuCloseBtn = document.getElementById('menu-close');
const mobileNav = document.getElementById('mobile-nav');
const backdrop = document.getElementById('backdrop');

// --- Mobile Navigation Handlers ---
function openMobileNav() {
  mobileNav.classList.add('open');
  backdrop.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeMobileNav() {
  mobileNav.classList.remove('open');
  backdrop.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

menuToggleBtn.addEventListener('click', openMobileNav);
menuCloseBtn.addEventListener('click', closeMobileNav);
backdrop.addEventListener('click', closeMobileNav);

// --- DOM Elements: Quantity Selector ---
const quantityDecrementBtn = document.getElementById('quantity-decrement');
const quantityIncrementBtn = document.getElementById('quantity-increment');
const quantityValueDisplay = document.getElementById('quantity-value');

// --- State Variables ---
let selectedQuantity = 0;

// --- Quantity Handlers ---
quantityIncrementBtn.addEventListener('click', () => {
  selectedQuantity++;
  quantityValueDisplay.textContent = selectedQuantity;
});

quantityDecrementBtn.addEventListener('click', () => {
  if (selectedQuantity > 0) {
    selectedQuantity--;
    quantityValueDisplay.textContent = selectedQuantity;
  }
});

// --- DOM Elements: Cart ---
const cartToggleBtn = document.getElementById('cart-toggle');
const cartDropdown = document.getElementById('cart-dropdown');
const cartDropdownBody = document.getElementById('cart-dropdown-body');
const cartBadge = document.getElementById('cart-badge');
const addToCartBtn = document.getElementById('add-to-cart-btn');

// --- Product Data ---
const PRODUCT_PRICE = 125.00;
const PRODUCT_TITLE = "Fall Limited Edition Sneakers";
let totalCartItems = 0;

// --- Cart Toggle ---
cartToggleBtn.addEventListener('click', () => {
  cartDropdown.classList.toggle('hidden');
});

// --- Render Cart Function ---
function renderCartUI() {
  if (totalCartItems > 0) {
    cartBadge.textContent = totalCartItems;
    cartBadge.classList.remove('hidden');

    const totalPrice = (PRODUCT_PRICE * totalCartItems).toFixed(2);

    cartDropdownBody.innerHTML = `
      <div style="width: 100%;">
        <div class="cart-item-details">
          <img src="./images/image-product-1-thumbnail.jpg" alt="Product Thumbnail" class="cart-item-thumb">
          <div class="cart-item-info">
            <p>${PRODUCT_TITLE}</p>
            <p>$${PRODUCT_PRICE.toFixed(2)} x ${totalCartItems} <span class="cart-item-total">$${totalPrice}</span></p>
          </div>
          <button id="cart-delete-btn" aria-label="Delete item">
            <img src="./images/icon-delete.svg" alt="Delete">
          </button>
        </div>
        <button class="checkout-btn">Checkout</button>
      </div>
    `;

    document.getElementById('cart-delete-btn').addEventListener('click', () => {
      totalCartItems = 0;
      renderCartUI();
    });
  } else {
    cartBadge.classList.add('hidden');
    cartDropdownBody.innerHTML = `<p class="empty-cart-msg">Your cart is empty.</p>`;
  }
}

// --- Add To Cart Handler ---
addToCartBtn.addEventListener('click', () => {
  if (selectedQuantity === 0) return;

  totalCartItems += selectedQuantity;
  renderCartUI();

  // Reset quantity selector
  selectedQuantity = 0;
  quantityValueDisplay.textContent = selectedQuantity;
});