/**
 * Health Shark - Shared Main JavaScript
 * Business Profile, WhatsApp link generators, Navigation, Search Modal, and Toasts.
 */

const HEALTH_SHARK = {
  name: "Health Shark",
  phone: "+8801789474381",
  displayPhone: "01789-474381",
  whatsappNumber: "8801789474381",
  email: "wahab.farzana@gmail.com",
  address: "House-14, Road-22, Block C, Dhaka, Bangladesh, 1216",
  deliveryNote: "Orders within Dhaka (Free delivery within Mirpur area)",
  hours: "Always open (24/7 Service)",
  facebook: "https://www.facebook.com/healthsharkbd",
  followers: "6.3K+ Followers",
  tagline: "Healthy Food for a Better You",
  motto: "Health is Wealth",
  vision: "To build immunity people need the right food in right amount. As a nutritionist I believe to serve people the secure and safe foods with the most dedicated team."
};

/**
 * Builds direct WhatsApp order URL with prefilled text
 * @param {string} itemName 
 * @param {number|string} price 
 * @param {number} quantity 
 * @param {string} unit 
 * @param {string} extraNotes 
 * @returns {string} wa.me URL
 */
function buildWhatsAppOrderUrl(itemName, price, quantity = 1, unit = "pc", extraNotes = "") {
  const numPrice = typeof price === "number" ? price : parseInt(String(price).replace(/[^\d]/g, ""), 10) || 0;
  const totalPrice = numPrice * quantity;
  const cleanUnit = unit || "pc";
  
  let message = `Hello Health Shark! 👋\nI would like to place an order:\n\n`;
  message += `🍽️ Item: ${itemName}\n`;
  message += `🔢 Quantity: ${quantity} ${cleanUnit}\n`;
  if (numPrice > 0) {
    message += `💵 Price: ৳${numPrice} / ${cleanUnit} (Total: ৳${totalPrice})\n`;
  }
  if (extraNotes) {
    message += `📝 Note: ${extraNotes}\n`;
  }
  message += `\n📍 Delivery: Dhaka (Free delivery in Mirpur area)\n`;
  message += `Please confirm availability and delivery time. Thank you!`;

  return `https://wa.me/${HEALTH_SHARK.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds general WhatsApp contact URL
 */
function buildWhatsAppContactUrl(inquiry = "Hello Health Shark! I have an inquiry about your healthy food and meals.") {
  return `https://wa.me/${HEALTH_SHARK.whatsappNumber}?text=${encodeURIComponent(inquiry)}`;
}

/**
 * Toast Notification
 */
function showToast(message, type = "success") {
  let container = document.getElementById("hs-toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "hs-toast-container";
    container.className = "fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-white text-sm font-medium transition-all duration-300 transform translate-y-3 opacity-0 ${
    type === "success" ? "bg-emerald-800 border border-emerald-600" :
    type === "error" ? "bg-red-800 border border-red-600" :
    "bg-gray-800 border border-gray-700"
  }`;

  const iconClass = type === "success" ? "fa-circle-check text-emerald-300" :
                    type === "error" ? "fa-circle-exclamation text-red-300" : "fa-info-circle text-blue-300";

  toast.innerHTML = `
    <i class="fa-solid ${iconClass} text-lg"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-3", "opacity-0");
  });

  // Remove after 3.5s
  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/**
 * Mobile Navigation Toggle & Search Modal Handling
 */
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu button
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Global search modal open/close
  const searchTriggers = document.querySelectorAll("[data-open-search]");
  const searchModal = document.getElementById("search-modal");
  const searchCloseBtn = document.getElementById("search-close-btn");
  const searchInput = document.getElementById("global-search-input");
  const searchResults = document.getElementById("global-search-results");

  function openSearch() {
    if (searchModal) {
      searchModal.classList.remove("hidden");
      searchModal.classList.add("flex");
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 50);
        renderGlobalSearchResults("");
      }
    }
  }

  function closeSearch() {
    if (searchModal) {
      searchModal.classList.add("hidden");
      searchModal.classList.remove("flex");
    }
  }

  searchTriggers.forEach((btn) => btn.addEventListener("click", openSearch));
  if (searchCloseBtn) searchCloseBtn.addEventListener("click", closeSearch);

  if (searchModal) {
    searchModal.addEventListener("click", (e) => {
      if (e.target === searchModal) closeSearch();
    });
  }

  // Escape key closes search
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchModal && !searchModal.classList.contains("hidden")) {
      closeSearch();
    }
  });

  // Search input typing
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderGlobalSearchResults(e.target.value.trim());
    });
  }

  async function renderGlobalSearchResults(query) {
    if (!searchResults) return;
    const items = await window.hsDB.getItems();
    const filtered = query
      ? items.filter(
          (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            (item.categoryName && item.categoryName.toLowerCase().includes(query.toLowerCase())) ||
            (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
        )
      : items.slice(0, 5); // default top items

    if (filtered.length === 0) {
      searchResults.innerHTML = `
        <div class="py-8 text-center text-gray-500">
          <i class="fa-solid fa-face-frown text-3xl mb-2 text-gray-400"></i>
          <p>No dishes found matching "<span class="font-semibold">${query}</span>"</p>
          <p class="text-xs mt-1 text-gray-400">Try searching for Momos, Samosa, Brownies, Biriani or Noodles</p>
        </div>
      `;
      return;
    }

    searchResults.innerHTML = `
      <div class="space-y-2">
        <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">
          ${query ? `Found ${filtered.length} dishes` : "Popular Dishes"}
        </div>
        ${filtered
          .map(
            (item) => `
          <div class="flex items-center justify-between p-3 rounded-xl hover:bg-emerald-50/80 transition-colors border border-gray-100 group">
            <a href="item-details.html?id=${item.id}" class="flex items-center gap-3 flex-1">
              <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform" onerror="this.src='assets/images/logo.png'">
              <div>
                <h4 class="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors text-sm">${item.name}</h4>
                <p class="text-xs text-gray-500">${item.categoryName || item.category} • <span class="font-bold text-emerald-700">৳ ${item.price} <span class="text-[10px] font-normal text-gray-500">/ ${item.unit || 'pc'}</span></span></p>
              </div>
            </a>
            <div class="flex items-center gap-2">
              <a href="${buildWhatsAppOrderUrl(item.name, item.price, 1, item.unit || 'pc')}" target="_blank" rel="noopener" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium flex items-center gap-1 shadow-sm">
                <i class="fa-brands fa-whatsapp text-sm"></i> Order
              </a>
              <a href="item-details.html?id=${item.id}" class="p-2 text-gray-400 hover:text-emerald-700 rounded-lg hover:bg-white text-xs">
                <i class="fa-solid fa-chevron-right"></i>
              </a>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }
});

