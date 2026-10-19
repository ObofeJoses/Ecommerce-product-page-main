document.addEventListener('DOMContentLoaded', () => {

  // --- DOM Elements: Navigation ---
  const menuToggleBtn = document.getElementById('menu-toggle');
  const menuCloseBtn = document.getElementById('menu-close');
  const mobileNav = document.getElementById('mobile-nav');
  const backdrop = document.getElementById('backdrop');

  // --- Mobile Navigation Handlers ---
  function openMobileNav() {
    mobileNav?.classList.add('open');
    backdrop?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav?.classList.remove('open');
    backdrop?.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  menuToggleBtn?.addEventListener('click', openMobileNav);
  menuCloseBtn?.addEventListener('click', closeMobileNav);
  backdrop?.addEventListener('click', closeMobileNav);

  // --- DOM Elements: Quantity Selector ---
  const quantityDecrementBtn = document.getElementById('quantity-decrement');
  const quantityIncrementBtn = document.getElementById('quantity-increment');
  const quantityValueDisplay = document.getElementById('quantity-value');

  let selectedQuantity = 0;

  quantityIncrementBtn?.addEventListener('click', () => {
    selectedQuantity++;
    if (quantityValueDisplay) quantityValueDisplay.textContent = selectedQuantity;
  });

  quantityDecrementBtn?.addEventListener('click', () => {
    if (selectedQuantity > 0) {
      selectedQuantity--;
      if (quantityValueDisplay) quantityValueDisplay.textContent = selectedQuantity;
    }
  });

  // --- DOM Elements: Cart ---
  const cartToggleBtn = document.getElementById('cart-toggle');
  const cartDropdown = document.getElementById('cart-dropdown');
  const cartDropdownBody = document.getElementById('cart-dropdown-body');
  const cartBadge = document.getElementById('cart-badge');
  const addToCartBtn = document.getElementById('add-to-cart-btn');

  const PRODUCT_PRICE = 125.00;
  const PRODUCT_TITLE = "Fall Limited Edition Sneakers";
  let totalCartItems = 0;

  cartToggleBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    cartDropdown?.classList.toggle('hidden');
  });

  // Dismiss Cart when clicking outside
  document.addEventListener('click', (e) => {
    if (cartDropdown && !cartDropdown.contains(e.target) && !cartToggleBtn?.contains(e.target)) {
      cartDropdown.classList.add('hidden');
    }
  });

  function renderCartUI() {
    if (!cartDropdownBody || !cartBadge) return;

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

      document.getElementById('cart-delete-btn')?.addEventListener('click', () => {
        totalCartItems = 0;
        renderCartUI();
      });
    } else {
      cartBadge.classList.add('hidden');
      cartDropdownBody.innerHTML = `<p class="empty-cart-msg">Your cart is empty.</p>`;
    }
  }

  addToCartBtn?.addEventListener('click', () => {
    if (selectedQuantity === 0) return;

    totalCartItems += selectedQuantity;
    renderCartUI();

    selectedQuantity = 0;
    if (quantityValueDisplay) quantityValueDisplay.textContent = selectedQuantity;
  });

  // --- DOM Elements: Gallery & Carousel ---
  const mainProductImage = document.getElementById('main-product-image');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const thumbnailBtns = document.querySelectorAll('.product-gallery .thumbnail-btn');

  const productImages = [
    './images/image-product-1.jpg',
    './images/image-product-2.jpg',
    './images/image-product-3.jpg',
    './images/image-product-4.jpg'
  ];

  let activeImageIndex = 0;

  function setActiveImage(index) {
    activeImageIndex = index;
    if (mainProductImage) mainProductImage.src = productImages[activeImageIndex];

    thumbnailBtns.forEach((btn, idx) => {
      btn.classList.toggle('active', idx === activeImageIndex);
    });
  }

  thumbnailBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.currentTarget.dataset.index);
      setActiveImage(index);
    });
  });

  prevBtn?.addEventListener('click', () => {
    const newIndex = (activeImageIndex - 1 + productImages.length) % productImages.length;
    setActiveImage(newIndex);
  });

  nextBtn?.addEventListener('click', () => {
    const newIndex = (activeImageIndex + 1) % productImages.length;
    setActiveImage(newIndex);
  });

  // --- DOM Elements: Lightbox Modal ---
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxCloseBtn = document.getElementById('lightbox-close');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxPrevBtn = document.getElementById('lightbox-prev');
  const lightboxNextBtn = document.getElementById('lightbox-next');
  const lightboxThumbnailBtns = document.querySelectorAll('.lightbox-thumbnails .thumbnail-btn');

  let lightboxIndex = 0;

  function updateLightboxImage(index) {
    lightboxIndex = index;
    if (lightboxImage) lightboxImage.src = productImages[lightboxIndex];

    lightboxThumbnailBtns.forEach((btn, idx) => {
      btn.classList.toggle('active', idx === lightboxIndex);
    });
  }

  mainProductImage?.addEventListener('click', () => {
    if (window.innerWidth >= 900 && lightboxModal) {
      lightboxModal.classList.remove('hidden');
      updateLightboxImage(activeImageIndex);
    }
  });

  lightboxCloseBtn?.addEventListener('click', () => {
    lightboxModal?.classList.add('hidden');
  });

  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      lightboxModal.classList.add('hidden');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && !lightboxModal.classList.contains('hidden')) {
      lightboxModal.classList.add('hidden');
    }
  });

  lightboxPrevBtn?.addEventListener('click', () => {
    const newIndex = (lightboxIndex - 1 + productImages.length) % productImages.length;
    updateLightboxImage(newIndex);
  });

  lightboxNextBtn?.addEventListener('click', () => {
    const newIndex = (lightboxIndex + 1) % productImages.length;
    updateLightboxImage(newIndex);
  });

  lightboxThumbnailBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.currentTarget.dataset.index);
      updateLightboxImage(index);
    });
  });

});