/**
 * Health Shark - Admin Dashboard Logic
 * Firebase Authentication & Firestore CRUD operations with seamless Demo Mode fallback.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Elements
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

  const totalItemsCount = document.getElementById("total-items-count");
  const categoriesCount = document.getElementById("categories-count");
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

  // Form Fields
  const formItemId = document.getElementById("form-item-id");
  const formTitle = document.getElementById("form-title");
  const formCategory = document.getElementById("form-category");
  const formPrice = document.getElementById("form-price");
  const formBadge = document.getElementById("form-badge");
  const formDescription = document.getElementById("form-description");
  const formFeatures = document.getElementById("form-features");
  const formImageUrl = document.getElementById("form-image-url");
  const formImageFile = document.getElementById("form-image-file");
  const imagePreview = document.getElementById("image-preview");

  let currentAdminUser = null;
  let allAdminItems = [];

  // Check initial Firebase status
  updateFirebaseStatusIndicator();

  // Authentication State Listener
  if (window.HS_FIREBASE && window.HS_FIREBASE.isConfigured() && window.HS_FIREBASE.auth) {
    window.HS_FIREBASE.auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedInUser({ email: user.email, isFirebase: true });
      } else {
        // Check if demo user is stored in sessionStorage
        const savedDemo = sessionStorage.getItem("hs_admin_demo_user");
        if (savedDemo) {
          setLoggedInUser(JSON.parse(savedDemo));
        } else {
          setLoggedOut();
        }
      }
    });
  } else {
    // Local / Demo mode check
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

      // Try Firebase Auth if configured
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

      // If Firebase is not configured or user wants to demo
      if (password.length >= 6) {
        const demoUser = { email: email, isFirebase: false, isDemo: true };
        sessionStorage.setItem("hs_admin_demo_user", JSON.stringify(demoUser));
        setLoggedInUser(demoUser);
        showToast("Logged in via Demo Mode (Local storage)", "success");
      } else {
        showLoginError("Password must be at least 6 characters in Demo Mode.");
      }
    });
  }

  // One-click Demo Login
  if (demoLoginBtn) {
    demoLoginBtn.addEventListener("click", () => {
      const demoUser = { email: "admin@healthshark.com", isFirebase: false, isDemo: true };
      sessionStorage.setItem("hs_admin_demo_user", JSON.stringify(demoUser));
      setLoggedInUser(demoUser);
      showToast("Signed in as Demo Administrator", "success");
    });
  }

  // Handle Logout
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
          Local Demo Mode (Ready for Firebase)
        </span>
      `;
    }
  }

  // Load items to admin table
  async function loadDashboardData() {
    try {
      allAdminItems = await window.hsDB.getItems();
      renderAdminStats();
      renderAdminTable();
    } catch (err) {
      console.error("Error loading admin data:", err);
    }
  }

  function renderAdminStats() {
    if (totalItemsCount) totalItemsCount.textContent = allAdminItems.length;
    if (categoriesCount) {
      const cats = new Set(allAdminItems.map((i) => i.category));
      categoriesCount.textContent = cats.size;
    }
  }

  function renderAdminTable() {
    if (!adminItemsTable) return;

    const query = adminSearchInput ? adminSearchInput.value.trim().toLowerCase() : "";
    const selectedCat = adminCategoryFilter ? adminCategoryFilter.value : "all";

    const filtered = allAdminItems.filter((item) => {
      const matchSearch = !query || item.name.toLowerCase().includes(query) || (item.categoryName && item.categoryName.toLowerCase().includes(query));
      const matchCat = selectedCat === "all" || item.category === selectedCat;
      return matchSearch && matchCat;
    });

    if (filtered.length === 0) {
      adminItemsTable.innerHTML = `
        <tr>
          <td colspan="5" class="py-12 text-center text-gray-500">
            <i class="fa-solid fa-box-open text-3xl mb-2 text-gray-400"></i>
            <p>No dishes found in the database.</p>
          </td>
        </tr>
      `;
      return;
    }

    adminItemsTable.innerHTML = filtered
      .map(
        (item) => `
      <tr class="hover:bg-emerald-50/40 transition-colors border-b border-gray-100 text-sm">
        <td class="py-3 px-4">
          <div class="flex items-center gap-3">
            <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200 shrink-0" onerror="this.src='assets/images/logo.png'">
            <div>
              <div class="font-bold text-gray-900">${item.name}</div>
              <div class="text-xs text-gray-400">ID: ${item.id}</div>
            </div>
          </div>
        </td>
        <td class="py-3 px-4">
          <span class="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800">
            ${item.categoryName || item.category}
          </span>
        </td>
        <td class="py-3 px-4 font-extrabold text-emerald-800">
          ৳ ${item.price}
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
    `
      )
      .join("");
  }

  // Filter & Search events
  if (adminSearchInput) adminSearchInput.addEventListener("input", renderAdminTable);
  if (adminCategoryFilter) adminCategoryFilter.addEventListener("change", renderAdminTable);

  // Sync / Reset Seed items
  if (seedSyncBtn) {
    seedSyncBtn.addEventListener("click", async () => {
      if (confirm("Are you sure you want to re-seed the menu items? This will refresh your database with all default Health Shark dishes.")) {
        seedSyncBtn.disabled = true;
        seedSyncBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Syncing...`;
        try {
          const res = await window.hsDB.seedFirestore();
          showToast(`Successfully seeded ${res.count} items (${res.mode} mode)!`, "success");
          await loadDashboardData();
        } catch (e) {
          showToast("Failed to seed items: " + e.message, "error");
        } finally {
          seedSyncBtn.disabled = false;
          seedSyncBtn.innerHTML = `<i class="fa-solid fa-cloud-arrow-up"></i> Seed / Restore Default Menu`;
        }
      }
    });
  }

  // Open Modal for Add
  if (openAddModalBtn) {
    openAddModalBtn.addEventListener("click", () => {
      openModal();
    });
  }

  // Close Modal
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener("click", closeModal);
  if (itemModal) {
    itemModal.addEventListener("click", (e) => {
      if (e.target === itemModal) closeModal();
    });
  }

  function openModal(item = null) {
    if (itemModal) {
      itemModal.classList.remove("hidden");
      itemModal.classList.add("flex");
    }

    if (item) {
      if (itemModalTitle) itemModalTitle.textContent = "Edit Menu Item";
      if (formItemId) formItemId.value = item.id;
      if (formTitle) formTitle.value = item.name;
      if (formCategory) formCategory.value = item.category;
      if (formPrice) formPrice.value = item.price;
      if (formBadge) formBadge.value = item.badge || "";
      if (formDescription) formDescription.value = item.description || "";
      if (formFeatures) formFeatures.value = item.features ? item.features.join("\n") : "";
      if (formImageUrl) formImageUrl.value = item.image || "";
      if (imagePreview) {
        imagePreview.src = item.image;
        imagePreview.classList.remove("hidden");
      }
    } else {
      if (itemModalTitle) itemModalTitle.textContent = "Add New Menu Item";
      if (itemForm) itemForm.reset();
      if (formItemId) formItemId.value = "";
      if (imagePreview) {
        imagePreview.src = "";
        imagePreview.classList.add("hidden");
      }
    }
  }

  function closeModal() {
    if (itemModal) {
      itemModal.classList.add("hidden");
      itemModal.classList.remove("flex");
    }
  }

  // Image URL input live preview
  if (formImageUrl) {
    formImageUrl.addEventListener("input", (e) => {
      const url = e.target.value.trim();
      if (url && imagePreview) {
        imagePreview.src = url;
        imagePreview.classList.remove("hidden");
      }
    });
  }

  // Image file input support
  if (formImageFile) {
    formImageFile.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Local preview
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        if (imagePreview) {
          imagePreview.src = loadEvent.target.result;
          imagePreview.classList.remove("hidden");
        }
      };
      reader.readAsDataURL(file);

      // If Firebase Storage is live, upload file
      if (window.HS_FIREBASE && window.HS_FIREBASE.isConfigured() && window.HS_FIREBASE.storage) {
        try {
          showToast("Uploading image to Firebase Storage...", "info");
          const storageRef = window.HS_FIREBASE.storage.ref(`menu_images/${Date.now()}_${file.name}`);
          const snapshot = await storageRef.put(file);
          const downloadUrl = await snapshot.ref.getDownloadURL();
          if (formImageUrl) formImageUrl.value = downloadUrl;
          showToast("Image uploaded to Firebase Storage!", "success");
        } catch (err) {
          console.warn("Storage upload error:", err);
          showToast("Image stored as local preview. Add Firebase Storage rules to persist in cloud.", "info");
        }
      }
    });
  }

  // Handle Form Submit (Add or Edit)
  if (itemForm) {
    itemForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const id = formItemId.value.trim();
      const title = formTitle.value.trim();
      const category = formCategory.value;
      const price = parseFloat(formPrice.value) || 0;
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

      const categoryNames = {
        snacks: "Snacks & Special Bites",
        burgers: "Burgers & Sandwiches",
        noodles: "Noodles & Pasta",
        meals: "Pre-Order Meals & Combos",
        desserts: "Baked Goods & Desserts",
        ingredients: "Raw & Specialty Ingredients"
      };

      const itemPayload = {
        name: title,
        category: category,
        categoryName: categoryNames[category] || category,
        price: price,
        priceDisplay: `৳ ${price}`,
        badge: badge,
        description: description,
        features: features,
        image: imageUrl,
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

        closeModal();
        await loadDashboardData();
      } catch (err) {
        console.error("Save error:", err);
        showToast("Error saving item: " + err.message, "error");
      }
    });
  }

  // Global functions for inline action buttons
  window.editAdminItem = async function (id) {
    const item = await window.hsDB.getItemById(id);
    if (item) {
      openModal(item);
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
});
