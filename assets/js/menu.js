/**
 * Health Shark - Menu Page Logic
 * Dynamic categories from Firestore, filtering, search, WhatsApp order linking, View Details routing.
 */

document.addEventListener("DOMContentLoaded", async () => {
  const menuGrid = document.getElementById("menu-grid");
  const topPillsContainer = document.getElementById("category-pills-bar");
  const sidebarContainer = document.getElementById("sidebar-categories-list");
  const searchInput = document.getElementById("menu-search-input");
  const currentCategoryTitle = document.getElementById("current-category-title");
  const itemsCountBadge = document.getElementById("items-count-badge");
  const loadMoreBtn = document.getElementById("load-more-btn");
  const activeFilterInfo = document.getElementById("active-filter-name");

  let allItems = [];
  let allCategories = [];
  let currentCategory = "all";
  let searchQuery = "";
  let visibleCount = 9;
  const itemsPerLoad = 6;

  // Read URL param for category or search (e.g. menu.html?cat=snacks)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("cat")) {
    currentCategory = urlParams.get("cat").toLowerCase();
  }
  if (urlParams.has("q")) {
    searchQuery = urlParams.get("q");
    if (searchInput) searchInput.value = searchQuery;
  }

  // Load categories and items from database
  try {
    const [items, cats] = await Promise.all([
      window.hsDB.getItems(),
      window.hsDB.getCategories()
    ]);
    allItems = items;
    allCategories = cats;

    renderCategoryNavigators();
    updateUI();
  } catch (err) {
    console.error("Failed to load menu data:", err);
    if (menuGrid) {
      menuGrid.innerHTML = `
        <div class="col-span-full py-12 text-center text-gray-500">
          <i class="fa-solid fa-triangle-exclamation text-4xl text-amber-500 mb-3"></i>
          <p class="text-lg font-semibold">Unable to load menu items right now.</p>
          <button onclick="location.reload()" class="mt-4 px-5 py-2 bg-emerald-700 text-white rounded-lg text-sm font-medium">Try Again</button>
        </div>
      `;
    }
  }

  // Render Top Pills & Sidebar Links dynamically
  function renderCategoryNavigators() {
    // Top Pills
    if (topPillsContainer) {
      const allText = window.hsT ? window.hsT("menu.tab_all") : "All Items";
      let pillsHtml = `
        <button 
          data-category-filter="all" 
          class="cat-pill px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${currentCategory === 'all' ? 'bg-emerald-800 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'}"
        >
          <i class="fa-solid fa-utensils"></i> ${allText}
        </button>
      `;

      allCategories.forEach((cat) => {
        const isActive = currentCategory === cat.id;
        pillsHtml += `
          <button 
            data-category-filter="${cat.id}" 
            class="cat-pill px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${isActive ? 'bg-emerald-800 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'}"
          >
            <i class="fa-solid ${cat.icon || 'fa-tag'}"></i> ${cat.name}
          </button>
        `;
      });
      topPillsContainer.innerHTML = pillsHtml;

      // Attach click events
      topPillsContainer.querySelectorAll("[data-category-filter]").forEach((tab) => {
        tab.addEventListener("click", () => {
          setCategory(tab.getAttribute("data-category-filter"));
        });
      });
    }

    // Sidebar Links
    if (sidebarContainer) {
      const allText = window.hsT ? window.hsT("menu.tab_all") : "All Categories";
      let sideHtml = `
        <a href="#" data-sidebar-category="all" class="side-cat-link flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-colors ${currentCategory === 'all' ? 'bg-emerald-800 text-white' : 'text-gray-700 hover:bg-emerald-50'}">
          <i class="fa-solid fa-border-all text-xs w-5 text-center"></i>
          <span>${allText}</span>
        </a>
      `;

      allCategories.forEach((cat) => {
        const isActive = currentCategory === cat.id;
        sideHtml += `
          <a href="#" data-sidebar-category="${cat.id}" class="side-cat-link flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-emerald-800 text-white font-semibold' : 'text-gray-700 hover:bg-emerald-50'}">
            <i class="fa-solid ${cat.icon || 'fa-tag'} text-xs w-5 text-center ${isActive ? 'text-white' : 'text-brand-700'}"></i>
            <span>${cat.name}</span>
          </a>
        `;
      });
      sidebarContainer.innerHTML = sideHtml;

      // Attach click events
      sidebarContainer.querySelectorAll("[data-sidebar-category]").forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          setCategory(link.getAttribute("data-sidebar-category"));
        });
      });
    }
  }

  // Search input typing
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      visibleCount = 9;
      renderItems();
    });
  }

  // Load more button
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      visibleCount += itemsPerLoad;
      renderItems();
    });
  }

  function setCategory(cat) {
    currentCategory = cat;
    visibleCount = 9;

    // Update URL without refreshing page
    const newUrl = new URL(window.location);
    if (cat === "all") {
      newUrl.searchParams.delete("cat");
    } else {
      newUrl.searchParams.set("cat", cat);
    }
    window.history.replaceState({}, "", newUrl);

    updateUI();
  }

  function updateUI() {
    // Update Top Pills Active Style
    const pills = document.querySelectorAll("[data-category-filter]");
    pills.forEach((tab) => {
      const cat = tab.getAttribute("data-category-filter");
      if (cat === currentCategory) {
        tab.className = "cat-pill px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 bg-emerald-800 text-white shadow-md";
      } else {
        tab.className = "cat-pill px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200";
      }
    });

    // Update Sidebar Active Style
    const sideLinks = document.querySelectorAll("[data-sidebar-category]");
    sideLinks.forEach((link) => {
      const cat = link.getAttribute("data-sidebar-category");
      const icon = link.querySelector("i");
      if (cat === currentCategory) {
        link.className = "side-cat-link flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-colors bg-emerald-800 text-white";
        if (icon) icon.className = icon.className.replace("text-brand-700", "text-white");
      } else {
        link.className = "side-cat-link flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-gray-700 hover:bg-emerald-50";
        if (icon) icon.className = icon.className.replace("text-white", "text-brand-700");
      }
    });

    // Category Title Display
    const foundCat = allCategories.find((c) => c.id === currentCategory);
    const allTitle = window.hsT ? window.hsT("menu.tab_all") : "All Items";
    const activeName = currentCategory === "all" ? allTitle : (foundCat ? foundCat.name : "Menu Items");
    if (currentCategoryTitle) currentCategoryTitle.textContent = activeName;
    if (activeFilterInfo) activeFilterInfo.textContent = activeName;

    renderItems();
  }

  function renderItems() {
    if (!menuGrid) return;

    // Filter items
    const filtered = allItems.filter((item) => {
      const matchCat = currentCategory === "all" || item.category === currentCategory;
      const matchSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery) ||
        (item.description && item.description.toLowerCase().includes(searchQuery)) ||
        (item.categoryName && item.categoryName.toLowerCase().includes(searchQuery));
      return matchCat && matchSearch;
    });

    if (itemsCountBadge) {
      const formattedCount = window.hsI18n ? window.hsI18n.formatNumber(filtered.length) : filtered.length;
      const dishesWord = window.hsT ? window.hsT("menu.dishes") : (filtered.length === 1 ? "item" : "items");
      itemsCountBadge.textContent = `${formattedCount} ${dishesWord}`;
    }

    if (filtered.length === 0) {
      const noItemsTitle = window.hsT ? window.hsT("menu.no_items") : "No dishes found in this category.";
      menuGrid.innerHTML = `
        <div class="col-span-full py-16 text-center">
          <div class="w-16 h-16 mx-auto mb-4 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center text-2xl">
            <i class="fa-solid fa-utensils"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-1">${noItemsTitle}</h3>
          <p class="text-sm text-gray-500 mb-4">Try clearing filters or search to view more items.</p>
          <button onclick="document.getElementById('menu-search-input').value=''; window.location.href='menu.html'" class="px-5 py-2.5 bg-emerald-800 text-white rounded-xl text-sm font-medium hover:bg-emerald-900 transition-colors">
            Reset All Filters
          </button>
        </div>
      `;
      if (loadMoreBtn) loadMoreBtn.classList.add("hidden");
      return;
    }

    // Slice for pagination
    const itemsToDisplay = filtered.slice(0, visibleCount);

    const orderNowText = window.hsT ? window.hsT("card.order_now") : "Order Now";
    const viewDetailsText = window.hsT ? window.hsT("card.view_details") : "View Details";
    const priceLabelText = window.hsT ? window.hsT("card.price_label") : "Price";

    menuGrid.innerHTML = itemsToDisplay
      .map((item) => {
        const rawUnit = item.unit || "pc";
        const itemUnit = window.hsI18n ? window.hsI18n.tUnit(rawUnit) : rawUnit;
        const displayPrice = window.hsI18n ? window.hsI18n.formatNumber(item.price) : item.price;
        const waUrl = buildWhatsAppOrderUrl(item.name, item.price, 1, rawUnit);
        return `
          <div class="hs-card bg-white rounded-2xl overflow-hidden border border-gray-100/90 shadow-sm flex flex-col group">
            <!-- Image with Badge -->
            <div class="relative img-zoom-container h-52 w-full bg-gray-100">
              <a href="item-details.html?id=${item.id}" class="block h-full w-full">
                <img 
                  src="${item.image}" 
                  alt="${item.name}" 
                  class="w-full h-full object-cover" 
                  loading="lazy"
                  onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'"
                />
              </a>
              ${
                item.badge
                  ? `<span class="absolute top-3 left-3 px-2.5 py-1 bg-emerald-800/90 backdrop-blur-sm text-white text-[11px] font-semibold tracking-wide rounded-full shadow-sm">
                      ${item.badge}
                     </span>`
                  : ""
              }
              <div class="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-gray-800 shadow">
                <i class="fa-solid fa-star text-amber-500 text-[10px]"></i> ${item.rating || "4.8"}
              </div>
            </div>

            <!-- Content Area -->
            <div class="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  ${item.categoryName || item.category}
                </span>
                <h3 class="font-heading text-lg font-bold text-gray-900 mt-2 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                  <a href="item-details.html?id=${item.id}">${item.name}</a>
                </h3>
                <p class="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                  ${item.description || "Prepared fresh with pure natural ingredients and homemade touch."}
                </p>
              </div>

              <!-- Price & Actions: Strict button rule (Order Now + View Details, NO Add to Cart) -->
              <div class="mt-4 pt-3 border-t border-gray-100">
                <div class="flex items-baseline justify-between mb-3">
                  <span class="text-xs text-gray-400 font-medium">${priceLabelText}</span>
                  <div class="text-xl font-extrabold text-emerald-800">
                    ৳ ${displayPrice} <span class="text-xs font-semibold text-gray-500 font-sans">/ ${itemUnit}</span>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-2">
                  <!-- WhatsApp Order Now button -->
                  <a 
                    href="${waUrl}" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white text-xs font-bold shadow-sm transition-all duration-200"
                    title="Order directly via WhatsApp"
                  >
                    <i class="fa-brands fa-whatsapp text-sm"></i>
                    <span>${orderNowText}</span>
                  </a>

                  <!-- View Details button -->
                  <a 
                    href="item-details.html?id=${item.id}" 
                    class="w-full inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-emerald-50 hover:text-emerald-800 active:scale-[0.98] text-gray-700 text-xs font-semibold border border-transparent hover:border-emerald-200 transition-all duration-200"
                  >
                    <span>${viewDetailsText}</span>
                    <i class="fa-solid fa-arrow-right text-[10px]"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    // Show/Hide Load More
    if (loadMoreBtn) {
      if (visibleCount >= filtered.length) {
        loadMoreBtn.classList.add("hidden");
      } else {
        loadMoreBtn.classList.remove("hidden");
      }
    }
  }

  // Real-time language switcher reaction
  window.addEventListener("hs-language-changed", () => {
    renderCategoryNavigators();
    updateUI();
  });
});
