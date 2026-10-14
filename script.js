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