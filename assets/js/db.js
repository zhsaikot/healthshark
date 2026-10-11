/**
 * Health Shark - Unified Database Layer
 * Automatically switches between Firestore and LocalStorage fallback.
 */

const DB_COLLECTION = "menu_items";
const STORAGE_KEY = "healthshark_menu_items";

class HealthSharkDB {
  constructor() {
    this.initLocalStorage();
  }

  // Ensure default seed data exists in localStorage
  initLocalStorage() {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (!existing && typeof SEED_MENU_ITEMS !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_MENU_ITEMS));
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
          // If Firestore is empty, auto-seed with initial items so visitors immediately see the menu
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
    // Generate slug ID if not provided
    const id = itemData.id || "item-" + Date.now();
    const cleanItem = {
      ...itemData,
      id,
      createdAt: new Date().toISOString()
    };

    if (this.isLiveFirestore()) {
      try {
        await window.HS_FIREBASE.db.collection(DB_COLLECTION).doc(id).set(cleanItem);
      } catch (err) {
        console.error("Firestore addItem error:", err);
      }
    }

    // Always update local cache as well
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

  // Seed default items into Firestore
  async seedFirestore() {
    if (!this.isLiveFirestore()) {
      // Just reset local storage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_MENU_ITEMS));
      return { success: true, count: SEED_MENU_ITEMS.length, mode: "local" };
    }

    const batch = window.HS_FIREBASE.db.batch();
    SEED_MENU_ITEMS.forEach((item) => {
      const ref = window.HS_FIREBASE.db.collection(DB_COLLECTION).doc(item.id);
      batch.set(ref, item, { merge: true });
    });

    await batch.commit();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_MENU_ITEMS));
    return { success: true, count: SEED_MENU_ITEMS.length, mode: "firestore" };
  }

  // Reset to default seed items
  resetToDefaults() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_MENU_ITEMS));
    return SEED_MENU_ITEMS;
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

