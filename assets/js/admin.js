/**
 * Health Shark - Admin Dashboard Logic
 * Complete CRUD for Dishes and Categories with Firebase Auth, Firestore and Storage.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Navigation & Sections
  const authSection = document.getElementById("auth-section");
  const dashboardSection = document.getElementById("dashboard-section");
  const loginForm = document.getElementById("login-form");
  const loginEmailInput = document.getElementById("login-email");
  const loginPasswordInput = document.getElementById("login-password");
  const loginError = document.getElementById("login-error");
  const demoLoginBtn = document.getElementById("demo-login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const currentUserDisplay = document.getElementById("current-user-email");
  const firebaseStatusBadge = document.getElementById("firebase-status-badge");

  // Tab Buttons & Views
  const tabBtnDishes = document.getElementById("tab-btn-dishes");
  const tabBtnCategories = document.getElementById("tab-btn-categories");
  const viewDishesSection = document.getElementById("view-dishes-section");
  const viewCategoriesSection = document.getElementById("view-categories-section");
  const statDishesCard = document.getElementById("stat-dishes-card");
  const statCategoriesCard = document.getElementById("stat-categories-card");

  // Counter Badges
  const totalItemsCount = document.getElementById("total-items-count");
  const categoriesCount = document.getElementById("categories-count");
  const tabDishesBadge = document.getElementById("tab-dishes-badge");
  const tabCatsBadge = document.getElementById("tab-cats-badge");

  // Dishes UI Elements
  const adminItemsTable = document.getElementById("admin-items-table");
  const adminSearchInput = document.getElementById("admin-search-input");
  const adminCategoryFilter = document.getElementById("admin-category-filter");
  const seedSyncBtn = document.getElementById("seed-sync-btn");

  const itemModal = document.getElementById("item-modal");
  const itemModalTitle = document.getElementById("modal-title");
  const itemForm = document.getElementById("item-form");
  const openAddModalBtn = document.getElementById("open-add-modal-btn");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const cancelModalBtn = document.getElementById("cancel-modal-btn");

  // Dish Form Fields
  const formItemId = document.getElementById("form-item-id");
  const formTitle = document.getElementById("form-title");
  const formCategory = document.getElementById("form-category");
  const formPrice = document.getElementById("form-price");
  const formUnit = document.getElementById("form-unit");
  const formBadge = document.getElementById("form-badge");
  const formDescription = document.getElementById("form-description");
  const formFeatures = document.getElementById("form-features");
  const formImageUrl = document.getElementById("form-image-url");
  const formImageFile = document.getElementById("form-image-file");
  const imagePreview = document.getElementById("image-preview");
  const imagePreviewWrapper = document.getElementById("image-preview-wrapper");
  const removeMainImageBtn = document.getElementById("remove-main-image-btn");

  // Gallery Controls
  const formGalleryFiles = document.getElementById("form-gallery-files");
  const formGalleryUrlInput = document.getElementById("form-gallery-url-input");
  const formAddGalleryUrlBtn = document.getElementById("form-add-gallery-url-btn");
  const galleryCountBadge = document.getElementById("gallery-count-badge");
  const galleryUploadStatus = document.getElementById("gallery-upload-status");
  const galleryUploadText = document.getElementById("gallery-upload-text");
  const galleryPreviewContainer = document.getElementById("gallery-preview-container");

  let currentFormGallery = [];

  // Categories UI Elements
  const adminCategoriesGrid = document.getElementById("admin-categories-grid");
  const categoryModal = document.getElementById("category-modal");
  const categoryModalTitle = document.getElementById("category-modal-title");
  const categoryForm = document.getElementById("category-form");
  const openAddCategoryModalBtn = document.getElementById("open-add-category-modal-btn");
  const closeCategoryModalBtn = document.getElementById("close-category-modal-btn");
  const cancelCategoryModalBtn = document.getElementById("cancel-category-modal-btn");

  // Category Form Fields
  const formCatId = document.getElementById("form-cat-id");
  const formCatName = document.getElementById("form-cat-name");
  const formCatSlug = document.getElementById("form-cat-slug");
  const formCatBadge = document.getElementById("form-cat-badge");
  const formCatSubtitle = document.getElementById("form-cat-subtitle");
  const formCatIcon = document.getElementById("form-cat-icon");
  const formCatImageUrl = document.getElementById("form-cat-image-url");
  const formCatImageFile = document.getElementById("form-cat-image-file");
  const catImagePreview = document.getElementById("cat-image-preview");

  let currentAdminUser = null;
  let allAdminItems = [];
  let allAdminCategories = [];

  // Check initial Firebase status
  updateFirebaseStatusIndicator();

  // Authentication State Listener
  if (window.HS_FIREBASE && window.HS_FIREBASE.isConfigured() && window.HS_FIREBASE.auth) {
    window.HS_FIREBASE.auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedInUser({ email: user.email, isFirebase: true });
      } else {
        const savedDemo = sessionStorage.getItem("hs_admin_demo_user");
        if (savedDemo) {
          setLoggedInUser(JSON.parse(savedDemo));
        } else {
          setLoggedOut();
        }
      }
    });
  } else {
    const savedDemo = sessionStorage.getItem("hs_admin_demo_user");
    if (savedDemo) {
      setLoggedInUser(JSON.parse(savedDemo));
    } else {
      setLoggedOut();
    }
  }

  // Handle Login Submission
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      loginError.classList.add("hidden");
      const email = loginEmailInput.value.trim();
      const password = loginPasswordInput.value.trim();

      if (!email || !password) {
        showLoginError("Please enter both email and password.");
        return;
      }

      if (window.HS_FIREBASE && window.HS_FIREBASE.isConfigured() && window.HS_FIREBASE.auth) {
        try {
          const cred = await window.HS_FIREBASE.auth.signInWithEmailAndPassword(email, password);
          setLoggedInUser({ email: cred.user.email, isFirebase: true });
          showToast("Welcome back, Admin!", "success");
          return;
        } catch (err) {
          console.warn("Firebase Auth failed:", err.message);
          showLoginError(`Firebase Auth Error: ${err.message}`);
          return;
        }
      }

      if (password.length >= 6) {
        const demoUser = { email: email, isFirebase: false, isDemo: true };
        sessionStorage.setItem("hs_admin_demo_user", JSON.stringify(demoUser));
        setLoggedInUser(demoUser);
        showToast("Logged in via Demo Mode", "success");
      } else {
        showLoginError("Password must be at least 6 characters in Demo Mode.");
      }
    });
  }

  // Demo Login
  if (demoLoginBtn) {
    demoLoginBtn.addEventListener("click", () => {
      const demoUser = { email: "admin@healthshark.com", isFirebase: false, isDemo: true };
      sessionStorage.setItem("hs_admin_demo_user", JSON.stringify(demoUser));
      setLoggedInUser(demoUser);
      showToast("Signed in as Demo Administrator", "success");
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      if (window.HS_FIREBASE && window.HS_FIREBASE.auth) {
        try {
          await window.HS_FIREBASE.auth.signOut();
        } catch (e) {}
      }
      sessionStorage.removeItem("hs_admin_demo_user");
      setLoggedOut();
      showToast("Logged out successfully", "info");
    });
  }

  function setLoggedInUser(user) {
    currentAdminUser = user;
    if (authSection) authSection.classList.add("hidden");
    if (dashboardSection) dashboardSection.classList.remove("hidden");
    if (currentUserDisplay) currentUserDisplay.textContent = user.email;
    loadDashboardData();
  }

  function setLoggedOut() {
    currentAdminUser = null;
    if (authSection) authSection.classList.remove("hidden");
    if (dashboardSection) dashboardSection.classList.add("hidden");
  }

  function showLoginError(msg) {
    if (loginError) {
      loginError.textContent = msg;
      loginError.classList.remove("hidden");
    }
  }

  function updateFirebaseStatusIndicator() {
    if (!firebaseStatusBadge) return;
    if (window.HS_FIREBASE && window.HS_FIREBASE.isConfigured()) {
      firebaseStatusBadge.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          Firebase Live Connected
        </span>
      `;
    } else {
      firebaseStatusBadge.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800" title="Add Firebase keys in assets/js/firebase-config.js">
          <span class="w-2 h-2 rounded-full bg-amber-500"></span>
          Local Demo Mode
        </span>
      `;
    }
  }

  // TAB SWITCHING (Dishes vs Categories)
  function switchTab(tab) {
    if (tab === "dishes") {
      tabBtnDishes.className = "px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all bg-brand-800 text-white shadow-sm";
      tabBtnCategories.className = "px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all bg-white text-gray-600 hover:bg-gray-100 border border-gray-200";
      viewDishesSection.classList.remove("hidden");
      viewCategoriesSection.classList.add("hidden");
    } else {
      tabBtnCategories.className = "px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all bg-brand-800 text-white shadow-sm";
      tabBtnDishes.className = "px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all bg-white text-gray-600 hover:bg-gray-100 border border-gray-200";
      viewCategoriesSection.classList.remove("hidden");
      viewDishesSection.classList.add("hidden");
    }
  }

  if (tabBtnDishes) tabBtnDishes.addEventListener("click", () => switchTab("dishes"));
  if (tabBtnCategories) tabBtnCategories.addEventListener("click", () => switchTab("categories"));
  if (statDishesCard) statDishesCard.addEventListener("click", () => switchTab("dishes"));
  if (statCategoriesCard) statCategoriesCard.addEventListener("click", () => switchTab("categories"));

  // Load All Data (Items & Categories)
  async function loadDashboardData() {
    try {
      const [items, cats] = await Promise.all([
        window.hsDB.getItems(),
        window.hsDB.getCategories()
      ]);
      allAdminItems = items;
      allAdminCategories = cats;

      updateCategoryDropdowns();
      renderAdminStats();
      renderAdminTable();
      renderAdminCategoriesGrid();
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    }
  }

  function updateCategoryDropdowns() {
    // 1. Dish Filter Select
    if (adminCategoryFilter) {
      const currentVal = adminCategoryFilter.value;
      let opts = `<option value="all">All Categories</option>`;
      allAdminCategories.forEach((cat) => {
        opts += `<option value="${cat.id}">${cat.name}</option>`;
      });
      adminCategoryFilter.innerHTML = opts;
      if (currentVal) adminCategoryFilter.value = currentVal;
    }

    // 2. Dish Form Category Select
    if (formCategory) {
      let formOpts = "";
      allAdminCategories.forEach((cat) => {
        formOpts += `<option value="${cat.id}">${cat.name}</option>`;
      });
      formCategory.innerHTML = formOpts;
    }
  }

  function renderAdminStats() {
    if (totalItemsCount) totalItemsCount.textContent = allAdminItems.length;
    if (categoriesCount) categoriesCount.textContent = allAdminCategories.length;
    if (tabDishesBadge) tabDishesBadge.textContent = allAdminItems.length;
    if (tabCatsBadge) tabCatsBadge.textContent = allAdminCategories.length;
  }

  /* ==========================================================================
     DISHES TABLE & FORM LOGIC
     ========================================================================== */

  function renderAdminTable() {
    if (!adminItemsTable) return;

    const query = adminSearchInput ? adminSearchInput.value.trim().toLowerCase() : "";
    const selectedCat = adminCategoryFilter ? adminCategoryFilter.value : "all";

    const filtered = allAdminItems.filter((item) => {
      const matchSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        (item.categoryName && item.categoryName.toLowerCase().includes(query));
      const matchCat = selectedCat === "all" || item.category === selectedCat;
      return matchSearch && matchCat;
    });

    if (filtered.length === 0) {
      adminItemsTable.innerHTML = `
        <tr>
          <td colspan="5" class="py-12 text-center text-gray-500">
            <i class="fa-solid fa-box-open text-3xl mb-2 text-gray-400"></i>
            <p>No dishes found matching your filter.</p>
          </td>
        </tr>
      `;
      return;
    }

    adminItemsTable.innerHTML = filtered
      .map((item) => {
        const itemUnit = item.unit || "pc";
        return `
          <tr class="hover:bg-emerald-50/40 transition-colors border-b border-gray-100 text-sm">
            <td class="py-3 px-4">
              <div class="flex items-center gap-3">
                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200 shrink-0" onerror="this.src='assets/images/logo.png'">
                <div>
                  <div class="font-bold text-gray-900">${item.name}</div>
                  <div class="text-[11px] text-gray-400">ID: ${item.id}</div>
                </div>
              </div>
            </td>
            <td class="py-3 px-4">
              <span class="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800">
                ${item.categoryName || item.category}
              </span>
            </td>
            <td class="py-3 px-4">
              <span class="font-extrabold text-emerald-800 text-base">৳ ${item.price}</span>
              <span class="text-xs text-gray-500 font-medium">/ ${itemUnit}</span>
            </td>
            <td class="py-3 px-4">
              ${item.badge ? `<span class="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">${item.badge}</span>` : `<span class="text-xs text-gray-400">-</span>`}
            </td>
            <td class="py-3 px-4 text-right">
              <div class="inline-flex items-center gap-1.5">
                <a href="item-details.html?id=${item.id}" target="_blank" class="p-2 text-gray-400 hover:text-emerald-700 rounded-lg hover:bg-gray-100" title="View in store">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
                <button onclick="editAdminItem('${item.id}')" class="p-2 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50" title="Edit Item">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button onclick="deleteAdminItem('${item.id}', '${item.name.replace(/'/g, "\\'")}')" class="p-2 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50" title="Delete Item">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  if (adminSearchInput) adminSearchInput.addEventListener("input", renderAdminTable);
  if (adminCategoryFilter) adminCategoryFilter.addEventListener("change", renderAdminTable);

  // Sync / Reset Seed items & categories
  if (seedSyncBtn) {
    seedSyncBtn.addEventListener("click", async () => {
      if (confirm("Are you sure you want to restore default items & categories? This will refresh your database with all default Health Shark dishes.")) {
        seedSyncBtn.disabled = true;
        seedSyncBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Syncing...`;
        try {
          const res = await window.hsDB.seedFirestore();
          showToast(`Successfully seeded default data (${res.mode} mode)!`, "success");
          await loadDashboardData();
        } catch (e) {
          showToast("Failed to seed data: " + e.message, "error");
        } finally {
          seedSyncBtn.disabled = false;
          seedSyncBtn.innerHTML = `<i class="fa-solid fa-cloud-arrow-up text-brand-700"></i> Seed / Restore Default Data`;
        }
      }
    });
  }

  // Open / Close Dish Modal
  if (openAddModalBtn) openAddModalBtn.addEventListener("click", () => openDishModal());
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeDishModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener("click", closeDishModal);
  if (itemModal) {
    itemModal.addEventListener("click", (e) => {
      if (e.target === itemModal) closeDishModal();
    });
  }

  function openDishModal(item = null) {
    if (itemModal) {
      itemModal.classList.remove("hidden");
      itemModal.classList.add("flex");
    }

    if (item) {
      if (itemModalTitle) itemModalTitle.textContent = "Edit Food Dish";
      if (formItemId) formItemId.value = item.id;
      if (formTitle) formTitle.value = item.name;
      if (formCategory) formCategory.value = item.category;
      if (formPrice) formPrice.value = item.price;
      if (formUnit) formUnit.value = item.unit || "pc";
      if (formBadge) formBadge.value = item.badge || "";
      if (formDescription) formDescription.value = item.description || "";
      if (formFeatures) formFeatures.value = item.features ? item.features.join("\n") : "";
      if (formImageUrl) formImageUrl.value = item.image || "";
      if (imagePreview) {
        imagePreview.src = item.image || "";
        if (item.image) {
          imagePreview.classList.remove("hidden");
          if (imagePreviewWrapper) imagePreviewWrapper.classList.remove("hidden");
        } else {
          imagePreview.classList.add("hidden");
          if (imagePreviewWrapper) imagePreviewWrapper.classList.add("hidden");
        }
      }

      // Populate gallery (filter out exact duplicate of main image)
      const rawGallery = Array.isArray(item.gallery) ? item.gallery : [];
      currentFormGallery = rawGallery.filter((url) => url && url !== item.image);
      renderGalleryPreview();
    } else {
      if (itemModalTitle) itemModalTitle.textContent = "Add New Food Dish";
      if (itemForm) itemForm.reset();
      if (formItemId) formItemId.value = "";
      if (formUnit) formUnit.value = "pc";
      if (formImageUrl) formImageUrl.value = "";
      if (imagePreview) {
        imagePreview.src = "";
        imagePreview.classList.add("hidden");
      }
      if (imagePreviewWrapper) imagePreviewWrapper.classList.add("hidden");

      currentFormGallery = [];
      renderGalleryPreview();
    }
  }

  function closeDishModal() {
    if (itemModal) {
      itemModal.classList.add("hidden");
      itemModal.classList.remove("flex");
    }
    currentFormGallery = [];
  }

  // Dish Main Image URL live preview
  if (formImageUrl) {
    formImageUrl.addEventListener("input", (e) => {
      const url = e.target.value.trim();
      if (url && imagePreview) {
        imagePreview.src = url;
        imagePreview.classList.remove("hidden");
        if (imagePreviewWrapper) imagePreviewWrapper.classList.remove("hidden");
      } else if (!url) {
        if (imagePreviewWrapper) imagePreviewWrapper.classList.add("hidden");
      }
    });
  }

  // Clear / Remove Main Image
  if (removeMainImageBtn) {
    removeMainImageBtn.addEventListener("click", () => {
      if (formImageUrl) formImageUrl.value = "";
      if (formImageFile) formImageFile.value = "";
      if (imagePreview) imagePreview.src = "";
      if (imagePreviewWrapper) imagePreviewWrapper.classList.add("hidden");
      showToast("Featured image cleared", "info");
    });
  }

  // Dish Main File Upload to Firebase Storage
  if (formImageFile) {
    formImageFile.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        if (imagePreview) {
          imagePreview.src = loadEvent.target.result;
          imagePreview.classList.remove("hidden");
          if (imagePreviewWrapper) imagePreviewWrapper.classList.remove("hidden");
        }
      };
      reader.readAsDataURL(file);

      if (window.HS_FIREBASE && window.HS_FIREBASE.isConfigured() && window.HS_FIREBASE.storage) {
        try {
          showToast("Uploading main image to Firebase Storage...", "info");
          const storageRef = window.HS_FIREBASE.storage.ref(`menu_images/main_${Date.now()}_${file.name}`);
          const snapshot = await storageRef.put(file);
          const downloadUrl = await snapshot.ref.getDownloadURL();
          if (formImageUrl) formImageUrl.value = downloadUrl;
          showToast("Main image uploaded to Firebase Storage!", "success");
        } catch (err) {
          console.warn("Storage upload error:", err);
          showToast("Image stored as local preview.", "info");
        }
      }
    });
  }

  /* ==========================================================================
     ADDITIONAL GALLERY IMAGES LOGIC
     ========================================================================== */

  function renderGalleryPreview() {
    if (galleryCountBadge) {
      galleryCountBadge.textContent = `${currentFormGallery.length} Extra Photos`;
    }

    if (!galleryPreviewContainer) return;

    if (currentFormGallery.length === 0) {
      galleryPreviewContainer.innerHTML = `
        <div class="p-4 border-2 border-dashed border-gray-200 rounded-2xl text-center text-gray-400 text-xs py-5">
          <i class="fa-solid fa-photo-film text-xl mb-1 text-gray-300 block"></i>
          <span>No extra gallery images added yet. Upload files or paste image URLs above.</span>
        </div>
      `;
      return;
    }

    galleryPreviewContainer.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${currentFormGallery
          .map(
            (imgUrl, idx) => `
          <div class="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shadow-sm h-24">
            <img 
              src="${imgUrl}" 
              alt="Gallery photo ${idx + 1}" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onerror="this.src='assets/images/logo.png'"
            />
            <!-- Delete Button -->
            <button 
              type="button" 
              onclick="removeAdminGalleryImage(${idx})" 
              class="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow transition-all cursor-pointer"
              title="Remove this photo"
            >
              <i class="fa-solid fa-xmark text-xs"></i>
            </button>
            <!-- Set as Main Button -->
            <button 
              type="button" 
              onclick="setAsMainFeaturedImage(${idx})" 
              class="absolute bottom-1.5 left-1.5 right-1.5 py-1 px-1.5 rounded-lg bg-black/75 hover:bg-brand-800 text-[10px] font-bold text-white text-center backdrop-blur-sm transition-all cursor-pointer opacity-90 hover:opacity-100"
              title="Make this photo the main featured cover image"
            >
              <i class="fa-solid fa-star text-[9px] text-amber-400 mr-0.5"></i> Set as Main
            </button>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  // Global functions for inline onclick handlers
  window.removeAdminGalleryImage = function (index) {
    if (index >= 0 && index < currentFormGallery.length) {
      currentFormGallery.splice(index, 1);
      renderGalleryPreview();
      showToast("Gallery image removed", "info");
    }
  };

  window.setAsMainFeaturedImage = function (index) {
    if (index >= 0 && index < currentFormGallery.length) {
      const selectedImg = currentFormGallery[index];
      const oldMain = formImageUrl ? formImageUrl.value.trim() : "";

      if (formImageUrl) formImageUrl.value = selectedImg;
      if (imagePreview) {
        imagePreview.src = selectedImg;
        imagePreview.classList.remove("hidden");
        if (imagePreviewWrapper) imagePreviewWrapper.classList.remove("hidden");
      }

      if (oldMain && oldMain !== selectedImg) {
        currentFormGallery[index] = oldMain;
      } else {
        currentFormGallery.splice(index, 1);
      }

      renderGalleryPreview();
      showToast("Updated main featured image!", "success");
    }
  };

  // Gallery: Add Image by URL
  if (formAddGalleryUrlBtn && formGalleryUrlInput) {
    const handleAddGalleryUrl = () => {
      const url = formGalleryUrlInput.value.trim();
      if (!url) {
        showToast("Please enter an image URL", "warning");
        return;
      }
      currentFormGallery.push(url);
      formGalleryUrlInput.value = "";
      renderGalleryPreview();
      showToast("Added image to gallery!", "success");
    };

    formAddGalleryUrlBtn.addEventListener("click", handleAddGalleryUrl);
    formGalleryUrlInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddGalleryUrl();
      }
    });
  }

  // Gallery: Multi-file Upload
  if (formGalleryFiles) {
    formGalleryFiles.addEventListener("change", async (e) => {
      const files = Array.from(e.target.files);
      if (!files || files.length === 0) return;

      if (galleryUploadStatus) {
        galleryUploadStatus.classList.remove("hidden");
        galleryUploadStatus.classList.add("flex");
        if (galleryUploadText) galleryUploadText.textContent = `Processing ${files.length} images...`;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (galleryUploadText) {
          galleryUploadText.textContent = `Uploading image ${i + 1} of ${files.length}...`;
        }

        if (window.HS_FIREBASE && window.HS_FIREBASE.isConfigured() && window.HS_FIREBASE.storage) {
          try {
            const storageRef = window.HS_FIREBASE.storage.ref(`menu_images/gallery_${Date.now()}_${file.name}`);
            const snapshot = await storageRef.put(file);
            const downloadUrl = await snapshot.ref.getDownloadURL();
            currentFormGallery.push(downloadUrl);
          } catch (err) {
            console.warn("Storage upload error for gallery:", err);
            const dataUrl = await readFileAsDataUrl(file);
            currentFormGallery.push(dataUrl);
          }
        } else {
          // Local demo preview
          const dataUrl = await readFileAsDataUrl(file);
          currentFormGallery.push(dataUrl);
        }
      }

      if (galleryUploadStatus) {
        galleryUploadStatus.classList.add("hidden");
        galleryUploadStatus.classList.remove("flex");
      }

      formGalleryFiles.value = "";
      renderGalleryPreview();
      showToast(`Added ${files.length} photos to gallery!`, "success");
    });
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  }

  // Dish Form Submit
  if (itemForm) {
    itemForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const id = formItemId.value.trim();
      const title = formTitle.value.trim();
      const category = formCategory.value;
      const price = parseFloat(formPrice.value) || 0;
      const unit = formUnit.value || "pc";
      const badge = formBadge.value.trim();
      const description = formDescription.value.trim();
      const featuresRaw = formFeatures.value.trim();
      const features = featuresRaw ? featuresRaw.split("\n").map((f) => f.trim()).filter(Boolean) : [];
      let imageUrl = formImageUrl.value.trim();

      if (!imageUrl && imagePreview && imagePreview.src && !imagePreview.src.includes("data:text")) {
        imageUrl = imagePreview.src;
      }

      if (!imageUrl) {
        imageUrl = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
      }

      const matchedCat = allAdminCategories.find((c) => c.id === category);
      const catName = matchedCat ? matchedCat.name : category;

      // Final gallery contains main image as first, followed by extra gallery photos
      const finalGallery = [
        imageUrl,
        ...currentFormGallery.filter((u) => u && u !== imageUrl)
      ];

      const itemPayload = {
        name: title,
        category: category,
        categoryName: catName,
        price: price,
        unit: unit,
        priceDisplay: `৳ ${price}`,
        badge: badge,
        description: description,
        features: features,
        image: imageUrl,
        gallery: finalGallery,
        rating: 4.9,
        reviewsCount: 20
      };

      try {
        if (id) {
          await window.hsDB.updateItem(id, itemPayload);
          showToast(`"${title}" updated successfully!`, "success");
        } else {
          const newSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          itemPayload.id = newSlug || "item-" + Date.now();
          await window.hsDB.addItem(itemPayload);
          showToast(`"${title}" added to menu!`, "success");
        }

        closeDishModal();
        await loadDashboardData();
      } catch (err) {
        console.error("Save error:", err);
        showToast("Error saving dish: " + err.message, "error");
      }
    });
  }

  // Global functions for inline action buttons on Dishes
  window.editAdminItem = async function (id) {
    const item = await window.hsDB.getItemById(id);
    if (item) {
      openDishModal(item);
    }
  };

  window.deleteAdminItem = async function (id, name) {
    if (confirm(`Are you sure you want to delete "${name}" from the menu?`)) {
      try {
        await window.hsDB.deleteItem(id);
        showToast(`"${name}" was deleted.`, "info");
        await loadDashboardData();
      } catch (err) {
        showToast("Failed to delete item: " + err.message, "error");
      }
    }
  };

  /* ==========================================================================
     CATEGORIES MANAGER (NEW!)
     ========================================================================== */

  function renderAdminCategoriesGrid() {
    if (!adminCategoriesGrid) return;

    if (allAdminCategories.length === 0) {
      adminCategoriesGrid.innerHTML = `
        <div class="col-span-full py-12 text-center text-gray-500">
          <i class="fa-solid fa-layer-group text-3xl mb-2 text-gray-400"></i>
          <p>No categories found.</p>
        </div>
      `;
      return;
    }

    adminCategoriesGrid.innerHTML = allAdminCategories
      .map((cat) => {
        return `
          <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col group hover:shadow-md transition-shadow">
            <div class="h-44 w-full bg-gray-100 relative overflow-hidden">
              <img src="${cat.image}" alt="${cat.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='assets/images/logo.png'">
              ${cat.badge ? `<span class="absolute top-3 left-3 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-white/90 text-brand-900 shadow">${cat.badge}</span>` : ""}
              <span class="absolute bottom-3 right-3 px-2 py-1 rounded-lg text-xs font-bold bg-brand-950/80 text-white backdrop-blur-sm">
                <i class="fa-solid ${cat.icon || 'fa-tag'} mr-1"></i> ${cat.id}
              </span>
            </div>

            <div class="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 class="font-heading font-extrabold text-base text-gray-900">${cat.name}</h4>
                <p class="text-xs text-gray-500 mt-1 line-clamp-2">${cat.subtitle || "Category for wholesome delicious items"}</p>
              </div>

              <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <a href="menu.html?cat=${cat.id}" target="_blank" class="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1">
                  <span>View in Menu</span>
                  <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                </a>

                <div class="flex items-center gap-1.5">
                  <button onclick="editAdminCategory('${cat.id}')" class="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition-colors">
                    <i class="fa-solid fa-pen-to-square"></i> Edit
                  </button>
                  <button onclick="deleteAdminCategory('${cat.id}', '${cat.name.replace(/'/g, "\\'")}')" class="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-bold transition-colors">
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  // Open / Close Category Modal
  if (openAddCategoryModalBtn) openAddCategoryModalBtn.addEventListener("click", () => openCategoryModal());
  if (closeCategoryModalBtn) closeCategoryModalBtn.addEventListener("click", closeCategoryModal);
  if (cancelCategoryModalBtn) cancelCategoryModalBtn.addEventListener("click", closeCategoryModal);
  if (categoryModal) {
    categoryModal.addEventListener("click", (e) => {
      if (e.target === categoryModal) closeCategoryModal();
    });
  }

  function openCategoryModal(cat = null) {
    if (categoryModal) {
      categoryModal.classList.remove("hidden");
      categoryModal.classList.add("flex");
    }

    if (cat) {
      if (categoryModalTitle) categoryModalTitle.textContent = "Edit Category";
      if (formCatId) formCatId.value = cat.id;
      if (formCatName) formCatName.value = cat.name;
      if (formCatSlug) {
        formCatSlug.value = cat.id;
        formCatSlug.disabled = true;
      }
      if (formCatBadge) formCatBadge.value = cat.badge || "";
      if (formCatSubtitle) formCatSubtitle.value = cat.subtitle || "";
      if (formCatIcon) formCatIcon.value = cat.icon || "fa-tag";
      if (formCatImageUrl) formCatImageUrl.value = cat.image || "";
      if (catImagePreview) {
        catImagePreview.src = cat.image;
        catImagePreview.classList.remove("hidden");
      }
    } else {
      if (categoryModalTitle) categoryModalTitle.textContent = "Add New Category";
      if (categoryForm) categoryForm.reset();
      if (formCatId) formCatId.value = "";
      if (formCatSlug) {
        formCatSlug.value = "";
        formCatSlug.disabled = false;
      }
      if (formCatIcon) formCatIcon.value = "fa-tag";
      if (catImagePreview) {
        catImagePreview.src = "";
        catImagePreview.classList.add("hidden");
      }
    }
  }

  function closeCategoryModal() {
    if (categoryModal) {
      categoryModal.classList.add("hidden");
      categoryModal.classList.remove("flex");
    }
  }

  // Auto-slugify when typing category name
  if (formCatName && formCatSlug) {
    formCatName.addEventListener("input", () => {
      if (!formCatId.value) {
        formCatSlug.value = formCatName.value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }
    });
  }

  // Category Image URL live preview
  if (formCatImageUrl) {
    formCatImageUrl.addEventListener("input", (e) => {
      const url = e.target.value.trim();
      if (url && catImagePreview) {
        catImagePreview.src = url;
        catImagePreview.classList.remove("hidden");
      }
    });
  }

  // Category File upload to Firebase Storage
  if (formCatImageFile) {
    formCatImageFile.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        if (catImagePreview) {
          catImagePreview.src = loadEvent.target.result;
          catImagePreview.classList.remove("hidden");
        }
      };
      reader.readAsDataURL(file);

      if (window.HS_FIREBASE && window.HS_FIREBASE.isConfigured() && window.HS_FIREBASE.storage) {
        try {
          showToast("Uploading category image to Firebase Storage...", "info");
          const storageRef = window.HS_FIREBASE.storage.ref(`category_images/${Date.now()}_${file.name}`);
          const snapshot = await storageRef.put(file);
          const downloadUrl = await snapshot.ref.getDownloadURL();
          if (formCatImageUrl) formCatImageUrl.value = downloadUrl;
          showToast("Category image uploaded!", "success");
        } catch (err) {
          console.warn("Category storage upload error:", err);
        }
      }
    });
  }

  // Category Form Submit
  if (categoryForm) {
    categoryForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const existingId = formCatId.value.trim();
      const name = formCatName.value.trim();
      let slug = formCatSlug.value.trim();
      if (!slug) {
        slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      }
      const badge = formCatBadge.value.trim();
      const subtitle = formCatSubtitle.value.trim();
      const icon = formCatIcon.value.trim() || "fa-tag";
      let imageUrl = formCatImageUrl.value.trim();

      if (!imageUrl && catImagePreview && catImagePreview.src && !catImagePreview.src.includes("data:text")) {
        imageUrl = catImagePreview.src;
      }
      if (!imageUrl) {
        imageUrl = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80";
      }

      const catPayload = {
        name,
        badge,
        subtitle,
        icon,
        image: imageUrl
      };

      try {
        if (existingId) {
          await window.hsDB.updateCategory(existingId, catPayload);
          showToast(`Category "${name}" updated!`, "success");
        } else {
          catPayload.id = slug;
          await window.hsDB.addCategory(catPayload);
          showToast(`Category "${name}" created!`, "success");
        }

        closeCategoryModal();
        await loadDashboardData();
      } catch (err) {
        console.error("Save category error:", err);
        showToast("Error saving category: " + err.message, "error");
      }
    });
  }

  // Global functions for inline action buttons on Categories
  window.editAdminCategory = async function (id) {
    const cat = await window.hsDB.getCategoryById(id);
    if (cat) {
      openCategoryModal(cat);
    }
  };

  window.deleteAdminCategory = async function (id, name) {
    if (confirm(`Are you sure you want to delete category "${name}"? Dishes in this category will still remain, but the category card and filter will be removed.`)) {
      try {
        await window.hsDB.deleteCategory(id);
        showToast(`Category "${name}" was deleted.`, "info");
        await loadDashboardData();
      } catch (err) {
        showToast("Failed to delete category: " + err.message, "error");
      }
    }
  };
});
