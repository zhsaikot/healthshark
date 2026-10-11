/**
 * Health Shark - Product Details Page Logic
 * Dynamic single item render, gallery switcher, unit-based quantity selector, WhatsApp prefilled link, and recommendations.
 */

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const itemId = urlParams.get("id") || "chicken-momos";

  let currentItem = null;
  let currentQuantity = 1;

  // Elements
  const breadcrumbCategory = document.getElementById("breadcrumb-category");
  const breadcrumbItem = document.getElementById("breadcrumb-item");
  const bannerTitle = document.getElementById("banner-title");
  const bannerCategory = document.getElementById("banner-category");
  const bannerPrice = document.getElementById("banner-price");

  const mainImage = document.getElementById("main-image");
  const imageGallery = document.getElementById("image-gallery");
  const itemTitle = document.getElementById("item-title");
  const itemCategoryBadge = document.getElementById("item-category-badge");
  const itemPrice = document.getElementById("item-price");
  const itemRating = document.getElementById("item-rating");
  const itemReviewsCount = document.getElementById("item-reviews-count");
  const itemDescription = document.getElementById("item-description");
  const featuresList = document.getElementById("features-list");

  const qtyLabel = document.getElementById("qty-label");
  const qtyInput = document.getElementById("qty-input");
  const qtyMinus = document.getElementById("qty-minus");
  const qtyPlus = document.getElementById("qty-plus");
  const totalPriceDisplay = document.getElementById("total-price-display");
  const orderWhatsAppBtn = document.getElementById("order-whatsapp-btn");
  const recommendationsGrid = document.getElementById("recommendations-grid");

  try {
    currentItem = await window.hsDB.getItemById(itemId);
    if (!currentItem) {
      // Fallback to first available seed item
      const all = await window.hsDB.getItems();
      currentItem = all[0];
    }

    renderItemDetails(currentItem);
    renderRecommendations(currentItem);
  } catch (err) {
    console.error("Error loading item details:", err);
  }

  function renderItemDetails(item) {
    document.title = `${item.name} - Health Shark`;
    const rawUnit = item.unit || "pc";
    const itemUnit = window.hsI18n ? window.hsI18n.tUnit(rawUnit) : rawUnit;
    const formattedPrice = window.hsI18n ? window.hsI18n.formatNumber(item.price) : item.price;

    // Breadcrumbs & Top Banner
    if (breadcrumbCategory) {
      breadcrumbCategory.textContent = item.categoryName || item.category;
      breadcrumbCategory.href = `menu.html?cat=${item.category}`;
    }
    if (breadcrumbItem) breadcrumbItem.textContent = item.name;
    if (bannerTitle) bannerTitle.textContent = item.name;
    if (bannerCategory) bannerCategory.textContent = item.categoryName || item.category;
    if (bannerPrice) bannerPrice.innerHTML = `৳ ${formattedPrice} <span class="text-sm font-normal text-brand-300">/ ${itemUnit}</span>`;

    // Item Details
    if (itemTitle) itemTitle.textContent = item.name;
    if (itemCategoryBadge) itemCategoryBadge.textContent = item.categoryName || item.category;
    if (itemPrice) {
      itemPrice.innerHTML = `৳ ${formattedPrice} <span class="text-sm font-semibold text-gray-500 font-sans">/ ${itemUnit}</span>`;
    }
    if (itemRating) itemRating.textContent = item.rating || "4.9";
    if (itemReviewsCount) {
      const revNum = window.hsI18n ? window.hsI18n.formatNumber(item.reviewsCount || 45) : (item.reviewsCount || 45);
      const revText = window.hsT ? window.hsT("details.reviews_label") : "customer reviews";
      itemReviewsCount.textContent = `(${revNum} ${revText})`;
    }
    if (itemDescription) itemDescription.textContent = item.description;

    if (qtyLabel) {
      const qText = window.hsT ? window.hsT("details.qty_label") : "Select Quantity";
      qtyLabel.textContent = `${qText} (${itemUnit})`;
    }

    // Main image
    if (mainImage) {
      mainImage.src = item.image;
      mainImage.alt = item.name;
    }

    // Gallery thumbnails
    if (imageGallery) {
      // Gather all unique valid image URLs, prioritizing main image first
      const rawList = [item.image, ...(Array.isArray(item.gallery) ? item.gallery : [])];
      const uniqueImages = Array.from(new Set(rawList.filter(Boolean)));

      if (uniqueImages.length > 1) {
        imageGallery.classList.remove("hidden");
        imageGallery.innerHTML = uniqueImages
          .map(
            (imgUrl, idx) => `
            <button 
              type="button" 
              class="gallery-thumb-btn w-20 h-20 rounded-2xl overflow-hidden border-2 cursor-pointer ${idx === 0 ? "border-brand-700 ring-2 ring-emerald-300" : "border-gray-200 opacity-70 hover:opacity-100 hover:border-brand-300"} transition-all shrink-0 bg-gray-100 shadow-sm"
              data-img="${imgUrl}"
              title="View image ${idx + 1}"
            >
              <img src="${imgUrl}" alt="${item.name} photo ${idx + 1}" class="w-full h-full object-cover" onerror="this.src='assets/images/logo.png'" />
            </button>
          `
          )
          .join("");

        // Gallery click events with smooth transition
        const thumbBtns = imageGallery.querySelectorAll(".gallery-thumb-btn");
        thumbBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            thumbBtns.forEach((b) => {
              b.classList.remove("border-brand-700", "ring-2", "ring-emerald-300");
              b.classList.add("border-gray-200", "opacity-70");
            });
            btn.classList.add("border-brand-700", "ring-2", "ring-emerald-300");
            btn.classList.remove("border-gray-200", "opacity-70");

            if (mainImage) {
              mainImage.classList.add("opacity-40");
              setTimeout(() => {
                mainImage.src = btn.getAttribute("data-img");
                mainImage.classList.remove("opacity-40");
              }, 120);
            }
          });
        });
      } else {
        // Only 1 photo available, hide gallery bar for cleaner layout
        imageGallery.innerHTML = "";
        imageGallery.classList.add("hidden");
      }
    }

    // Key Features list
    if (featuresList) {
      const defaultFeatures = [
        "100% Fresh ingredients sourced daily",
        "No artificial preservatives, colors or MSG",
        "Crafted with nutrition-conscious homemade recipe",
        "Hygienically prepared & packaged for safe delivery"
      ];
      const feats = item.features && item.features.length > 0 ? item.features : defaultFeatures;
      featuresList.innerHTML = feats
        .map(
          (f) => `
          <li class="flex items-start gap-2.5 text-sm text-gray-700 font-medium">
            <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs">
              <i class="fa-solid fa-check"></i>
            </span>
            <span>${f}</span>
          </li>
        `
        )
        .join("");
    }

    updatePriceAndWhatsAppUrl();
  }

  // Quantity adjustments
  if (qtyMinus) {
    qtyMinus.addEventListener("click", () => {
      if (currentQuantity > 1) {
        currentQuantity--;
        if (qtyInput) qtyInput.value = currentQuantity;
        updatePriceAndWhatsAppUrl();
      }
    });
  }

  if (qtyPlus) {
    qtyPlus.addEventListener("click", () => {
      if (currentQuantity < 50) {
        currentQuantity++;
        if (qtyInput) qtyInput.value = currentQuantity;
        updatePriceAndWhatsAppUrl();
      }
    });
  }

  if (qtyInput) {
    qtyInput.addEventListener("change", (e) => {
      let val = parseInt(e.target.value, 10);
      if (isNaN(val) || val < 1) val = 1;
      if (val > 50) val = 50;
      currentQuantity = val;
      qtyInput.value = currentQuantity;
      updatePriceAndWhatsAppUrl();
    });
  }

  function updatePriceAndWhatsAppUrl() {
    if (!currentItem) return;
    const total = currentItem.price * currentQuantity;
    const rawUnit = currentItem.unit || "pc";
    const itemUnit = window.hsI18n ? window.hsI18n.tUnit(rawUnit) : rawUnit;
    const formattedTotal = window.hsI18n ? window.hsI18n.formatNumber(total) : total;
    const formattedQty = window.hsI18n ? window.hsI18n.formatNumber(currentQuantity) : currentQuantity;

    if (totalPriceDisplay) {
      totalPriceDisplay.innerHTML = `৳ ${formattedTotal} <span class="text-xs font-semibold text-gray-400 font-sans">(${formattedQty} ${itemUnit})</span>`;
    }

    if (orderWhatsAppBtn) {
      const waUrl = buildWhatsAppOrderUrl(currentItem.name, currentItem.price, currentQuantity, rawUnit);
      orderWhatsAppBtn.href = waUrl;
    }
  }

  async function renderRecommendations(current) {
    if (!recommendationsGrid) return;
    const all = await window.hsDB.getItems();

    let related = all.filter((i) => i.id !== current.id && i.category === current.category);
    if (related.length < 4) {
      const remaining = all.filter((i) => i.id !== current.id && i.category !== current.category);
      related = [...related, ...remaining];
    }
    const showcase = related.slice(0, 4);

    const orderText = window.hsT ? window.hsT("card.order_now") : "Order";
    const detailsText = window.hsT ? window.hsT("card.view_details") : "Details";

    recommendationsGrid.innerHTML = showcase
      .map((item) => {
        const rawUnit = item.unit || "pc";
        const itemUnit = window.hsI18n ? window.hsI18n.tUnit(rawUnit) : rawUnit;
        const displayPrice = window.hsI18n ? window.hsI18n.formatNumber(item.price) : item.price;
        const waUrl = buildWhatsAppOrderUrl(item.name, item.price, 1, rawUnit);
        return `
          <div class="hs-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col group">
            <a href="item-details.html?id=${item.id}" class="block h-44 w-full img-zoom-container bg-gray-100 relative">
              <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" loading="lazy" onerror="this.src='assets/images/logo.png'">
              <span class="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-bold text-gray-800 shadow-sm">
                ৳ ${displayPrice} <span class="text-[9px] font-normal text-gray-500">/ ${itemUnit}</span>
              </span>
            </a>
            <div class="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span class="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  ${item.categoryName || item.category}
                </span>
                <h4 class="font-heading text-sm font-bold text-gray-900 mt-1 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                  <a href="item-details.html?id=${item.id}">${item.name}</a>
                </h4>
              </div>
              <div class="grid grid-cols-2 gap-1.5 mt-3 pt-2 border-t border-gray-100">
                <a href="${waUrl}" target="_blank" rel="noopener" class="py-1.5 px-2 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 shadow-sm">
                  <i class="fa-brands fa-whatsapp text-xs"></i> ${orderText}
                </a>
                <a href="item-details.html?id=${item.id}" class="py-1.5 px-2 bg-gray-100 hover:bg-emerald-50 hover:text-emerald-800 text-gray-700 text-[11px] font-medium rounded-lg text-center">
                  ${detailsText}
                </a>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  // React to language changes
  window.addEventListener("hs-language-changed", () => {
    if (currentItem) {
      renderItemDetails(currentItem);
      renderRecommendations(currentItem);
    }
  });
});
