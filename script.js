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