/**
 * Health Shark - Unified Database Layer
 * Automatically switches between Firestore and LocalStorage fallback.
 * Supports both Menu Items and Categories with full CRUD operations.
 */

const DB_COLLECTION = "menu_items";
const DB_CATEGORIES_COLLECTION = "categories";
const STORAGE_KEY = "healthshark_menu_items";
const CATEGORIES_STORAGE_KEY = "healthshark_categories";

class HealthSharkDB {
  constructor() {
    this.initLocalStorage();
  }

  // Ensure default seed data exists in localStorage
  initLocalStorage() {
    try {
      const existingItems = localStorage.getItem(STORAGE_KEY);
      if (!existingItems && typeof SEED_MENU_ITEMS !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_MENU_ITEMS));
      }

      const existingCats = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (!existingCats && typeof SEED_CATEGORIES !== "undefined") {
        localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(SEED_CATEGORIES));
      }
    } catch (e) {
      console.warn("LocalStorage access issue:", e);
    }
  }

  // Check if live Firestore is ready
  isLiveFirestore() {
    return (
      window.HS_FIREBASE &&
      window.HS_FIREBASE.isConfigured() &&
      window.HS_FIREBASE.db !== null
    );
  }

  /* ==========================================================================
     CATEGORIES MANAGEMENT (CRUD)
     ========================================================================== */

  // Get all categories
  async getCategories() {
    if (this.isLiveFirestore()) {
      try {
        const snapshot = await window.HS_FIREBASE.db.collection(DB_CATEGORIES_COLLECTION).get();
        if (!snapshot.empty) {
          const cats = [];
          snapshot.forEach((doc) => {
            cats.push({ id: doc.id, ...doc.data() });
          });
          return cats;
        } else {
          console.log("Firestore categories empty, seeding default categories...");
          await this.seedCategories();
          return this.getLocalCategories();
        }
      } catch (err) {
        console.warn("Firestore categories read failed, using local cache:", err);
        return this.getLocalCategories();
      }
    }
    return this.getLocalCategories();
  }

  // Get single category by ID
  async getCategoryById(id) {
    if (this.isLiveFirestore()) {
      try {
        const doc = await window.HS_FIREBASE.db.collection(DB_CATEGORIES_COLLECTION).doc(id).get();
        if (doc.exists) {
          return { id: doc.id, ...doc.data() };
        }
      } catch (err) {
        console.warn("Firestore getCategoryById error:", err);
      }
    }
    const cats = this.getLocalCategories();
    return cats.find((c) => String(c.id) === String(id)) || null;
  }

  // Add new category
  async addCategory(catData) {
    const id = catData.id || catData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const cleanCat = {
      ...catData,
      id,
      createdAt: new Date().toISOString()
    };

    if (this.isLiveFirestore()) {
      try {
        await window.HS_FIREBASE.db.collection(DB_CATEGORIES_COLLECTION).doc(id).set(cleanCat);
      } catch (err) {
        console.error("Firestore addCategory error:", err);
      }
    }

    const cats = this.getLocalCategories();
    // replace if exists or unshift
    const idx = cats.findIndex((c) => String(c.id) === String(id));
    if (idx !== -1) {
      cats[idx] = cleanCat;
    } else {
      cats.push(cleanCat);
    }
    this.saveLocalCategories(cats);
    return cleanCat;
  }

  // Update category
  async updateCategory(id, catData) {
    const updated = {
      ...catData,
      id,
      updatedAt: new Date().toISOString()
    };

    if (this.isLiveFirestore()) {
      try {
        await window.HS_FIREBASE.db.collection(DB_CATEGORIES_COLLECTION).doc(id).update(updated);
      } catch (err) {
        console.error("Firestore updateCategory error:", err);
      }
    }

    const cats = this.getLocalCategories();
    const index = cats.findIndex((c) => String(c.id) === String(id));
    if (index !== -1) {
      cats[index] = { ...cats[index], ...updated };
      this.saveLocalCategories(cats);
    }
    return updated;
  }

  // Delete category
  async deleteCategory(id) {
    if (this.isLiveFirestore()) {
      try {
        await window.HS_FIREBASE.db.collection(DB_CATEGORIES_COLLECTION).doc(id).delete();
      } catch (err) {
        console.error("Firestore deleteCategory error:", err);
      }
    }

    const cats = this.getLocalCategories().filter((c) => String(c.id) !== String(id));
    this.saveLocalCategories(cats);
    return true;
  }

  // Seed default categories into Firestore
  async seedCategories() {
    if (!this.isLiveFirestore()) {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(SEED_CATEGORIES));
      return { success: true, count: SEED_CATEGORIES.length, mode: "local" };
    }

    const batch = window.HS_FIREBASE.db.batch();
    SEED_CATEGORIES.forEach((cat) => {
      const ref = window.HS_FIREBASE.db.collection(DB_CATEGORIES_COLLECTION).doc(cat.id);
      batch.set(ref, cat, { merge: true });
    });

    await batch.commit();
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(SEED_CATEGORIES));
    return { success: true, count: SEED_CATEGORIES.length, mode: "firestore" };
  }

  getLocalCategories() {
    try {
      const data = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn("getLocalCategories error:", e);
    }
    return typeof SEED_CATEGORIES !== "undefined" ? SEED_CATEGORIES : [];
  }

  saveLocalCategories(cats) {
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(cats));
    } catch (e) {
      console.error("saveLocalCategories error:", e);
    }
  }

  /* ==========================================================================
     MENU ITEMS MANAGEMENT (CRUD)
     ========================================================================== */

  // Get all menu items
  async getItems() {
    if (this.isLiveFirestore()) {
      try {
        const snapshot = await window.HS_FIREBASE.db.collection(DB_COLLECTION).get();
        if (!snapshot.empty) {
          const items = [];
          snapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
          });
          return items;
        } else {
          console.log("Firestore collection empty, seeding initial items...");
          await this.seedFirestore();
          return this.getLocalItems();
        }
      } catch (err) {
        console.warn("Firestore read failed, falling back to local data:", err);
        return this.getLocalItems();
      }
    }
    return this.getLocalItems();
  }

  // Get single item by ID
  async getItemById(id) {
    if (this.isLiveFirestore()) {
      try {
        const doc = await window.HS_FIREBASE.db.collection(DB_COLLECTION).doc(id).get();
        if (doc.exists) {
          return { id: doc.id, ...doc.data() };
        }
      } catch (err) {
        console.warn("Firestore getItemById error:", err);
      }
    }
    const items = this.getLocalItems();
    return items.find((item) => String(item.id) === String(id)) || null;
  }

  // Add new item
  async addItem(itemData) {
    const id = itemData.id || "item-" + Date.now();
    const cleanItem = {
      ...itemData,
      id,
      unit: itemData.unit || "pc",
      createdAt: new Date().toISOString()
    };

    if (this.isLiveFirestore()) {
      try {
        await window.HS_FIREBASE.db.collection(DB_COLLECTION).doc(id).set(cleanItem);
      } catch (err) {
        console.error("Firestore addItem error:", err);
      }
    }

    const items = this.getLocalItems();
    items.unshift(cleanItem);
    this.saveLocalItems(items);
    return cleanItem;
  }

  // Update item
  async updateItem(id, itemData) {
    const updated = {
      ...itemData,
      id,
      unit: itemData.unit || "pc",
      updatedAt: new Date().toISOString()
    };

    if (this.isLiveFirestore()) {
      try {
        await window.HS_FIREBASE.db.collection(DB_COLLECTION).doc(id).update(updated);
      } catch (err) {
        console.error("Firestore updateItem error:", err);
      }
    }

    const items = this.getLocalItems();
    const index = items.findIndex((i) => String(i.id) === String(id));
    if (index !== -1) {
      items[index] = { ...items[index], ...updated };
      this.saveLocalItems(items);
    }
    return updated;
  }

  // Delete item
  async deleteItem(id) {
    if (this.isLiveFirestore()) {
      try {
        await window.HS_FIREBASE.db.collection(DB_COLLECTION).doc(id).delete();
      } catch (err) {
        console.error("Firestore deleteItem error:", err);
      }
    }

    const items = this.getLocalItems().filter((i) => String(i.id) !== String(id));
    this.saveLocalItems(items);
    return true;
  }

  // Seed default items and categories into Firestore
  async seedFirestore() {
    if (!this.isLiveFirestore()) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_MENU_ITEMS));
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(SEED_CATEGORIES));
      return { success: true, count: SEED_MENU_ITEMS.length, mode: "local" };
    }

    // Seed Items
    const batch = window.HS_FIREBASE.db.batch();
    SEED_MENU_ITEMS.forEach((item) => {
      const ref = window.HS_FIREBASE.db.collection(DB_COLLECTION).doc(item.id);
      batch.set(ref, item, { merge: true });
    });

    // Seed Categories
    SEED_CATEGORIES.forEach((cat) => {
      const ref = window.HS_FIREBASE.db.collection(DB_CATEGORIES_COLLECTION).doc(cat.id);
      batch.set(ref, cat, { merge: true });
    });

    await batch.commit();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_MENU_ITEMS));
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(SEED_CATEGORIES));
    return { success: true, count: SEED_MENU_ITEMS.length, mode: "firestore" };
  }

  // Reset to default seed items
  resetToDefaults() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_MENU_ITEMS));
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(SEED_CATEGORIES));
    return { items: SEED_MENU_ITEMS, categories: SEED_CATEGORIES };
  }

  // Local storage helpers
  getLocalItems() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn("getLocalItems parse error:", e);
    }
    return typeof SEED_MENU_ITEMS !== "undefined" ? SEED_MENU_ITEMS : [];
  }

  saveLocalItems(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("saveLocalItems error:", e);
    }
  }
}

// Global DB instance
window.hsDB = new HealthSharkDB();
