# 🥗 Health Shark — Healthy Food for a Better You

> **"To build immunity people need the right food in right amount. As a nutritionist I believe to serve people the secure and safe foods with the most dedicated team."**  
> — *Farzana Wahab, Founder & Nutritionist*

Official web application and digital store for **Health Shark** — a Dhaka-based health food brand founded by a certified nutritionist, specializing in 100% fresh, homemade healthy meals, savory snacks, pre-orders, and specialty ingredients with free delivery across the Mirpur area.

Live GitHub Pages URL: **`https://zhsaikot.github.io/healthshark/`**

---

## 🌟 Brand Profile & Quick Details

* **Brand Name:** Health Shark
* **Business Type:** Health Food Store & Homemade Healthy Meals
* **Brand Taglines:** *"Healthy Food for a Better You"* / *"Health is Wealth"*
* **Phone / WhatsApp:** `+8801789474381` / `01789-474381`
* **Email:** `wahab.farzana@gmail.com`
* **Location:** House-14, Road-22, Block C, Dhaka, Bangladesh, 1216
* **Delivery Coverage:** All across Dhaka city (**Free delivery within Mirpur area**)
* **Operating Hours:** Always open (24/7 Service)
* **Facebook Page:** [facebook.com/healthsharkbd](https://www.facebook.com/healthsharkbd) (6.3K+ Followers)

---

## 📱 Pages & Features (Matching Mockup)

1. **Home Page (`index.html`)**:
   - Modern sticky navigation with official Health Shark logo, quick search, and WhatsApp order CTA.
   - Hero section with handwritten *"Good Food Good Mood"* accent, nutritionist badge, and trust indicators.
   - Popular Categories 6-card showcase (Snacks, Burgers, Noodles, Pre-Orders, Baked Goods, Ingredients).
   - *"Health is Wealth"* deep-green feature promotional banner.
   - Dhaka Delivery (Free in Mirpur), 24/7 Service, and Secure & Safe Food trust badges.
   - Rich footer with complete contact info, Facebook follower count, and link to Admin Portal.

2. **Menu Page (`menu.html`)**:
   - Top category pills & desktop sidebar filter tabs.
   - Real-time search by dish name, category, or description.
   - Dynamic food cards loaded from Firebase Firestore (with preloaded offline fallback seed data).
   - **Crucial Rule:** No cart clutter! Direct **"Order Now"** button generating a pre-filled WhatsApp message with item name & price, and **"View Details"** button leading to single product view.
   - Pagination / "Load More" button.
   - Traditional & bulk pre-order callout banner.

3. **Product Details Page (`item-details.html`)**:
   - Breadcrumb navigation and hero title bar with price badge.
   - High-resolution interactive image preview with thumbnail switcher.
   - Nutrition & key features checklist with green tick badges.
   - Interactive quantity counter with live total calculation.
   - Big **"Order Now via WhatsApp"** button sending quantity, item name, and calculated total.
   - *"You May Also Like"* recommendation grid.

4. **About Page (`about.html`)**:
   - Founder's story ("Founded by a Nutritionist") with mission and vision statement.
   - Core Values: Quality, Health, Trust, Community.
   - *"Good Food Builds Stronger People"* visual banner.

5. **Contact Page (`contact.html`)**:
   - Full contact details card (Phone, Email, Mirpur Address, 24/7 Service Hours).
   - Embedded Google Map placeholder for Mirpur 1216.
   - Interactive contact form with one-click **"Send via WhatsApp"** or **"Send via Email"**.

6. **Admin Dashboard (`admin.html`)**:
   - Firebase Auth login with email & password.
   - **One-Click Demo Mode Sign In** to test immediately without setup.
   - Add new dish modal: Dish title, category, price in BDT (৳), description, key features, image URL or file upload.
   - Edit / Delete existing dishes from Firestore in real-time.
   - One-click **"Seed / Restore Default Menu"** button to instantly populate Firestore with all Health Shark default items.

---

## 🛠️ Tech Stack & Architecture

* **Client-side Static Hosting:** 100% compatible with GitHub Pages (Zero backend servers required).
* **Styling:** Tailwind CSS (via CDN) + Custom theme variables in `assets/css/style.css`.
* **Icons & Fonts:** FontAwesome 6 + Google Fonts (`Plus Jakarta Sans`, `Outfit`, `Caveat`).
* **Database & Cloud:** Firebase SDK v10 (Firestore Database, Firebase Storage, Firebase Authentication).
* **Fallback Layer:** Offline-first LocalStorage fallback with 27 preloaded initial seed items matching the exact menu requested.

---

## 🔑 Firebase Configuration Guide (Where to add keys)

The project includes an automatic fallback mode, so it works right away even before adding Firebase keys. To enable live cloud Firestore and Firebase Authentication:

### Step 1 & 2: Configured!
Your Firebase project credentials have been configured in [`assets/js/firebase-config.js`](assets/js/firebase-config.js):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBVnn772269zI5QqHKOQCeOFNOVRn_dVz8",
  authDomain: "health-shark.firebaseapp.com",
  projectId: "health-shark",
  storageBucket: "health-shark.firebasestorage.app",
  messagingSenderId: "282353171783",
  appId: "1:282353171783:web:3262a90cdffb87e982e062",
  measurementId: "G-JMV9FF1R1Y"
};
```

### Step 3: Firebase Console Setup
1. Go to [Firebase Console](https://console.firebase.google.com/) and create a project.
2. In **Authentication** > **Sign-in method**, enable **Email/Password**.
3. Create an admin user under **Authentication** > **Users** (e.g. `admin@healthshark.com`).
4. In **Firestore Database**, click **Create Database** and set rules to allow read/write:
   ```text
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /menu_items/{document=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```
5. In **Storage**, enable Firebase Storage bucket.
6. Open `admin.html` in your browser, log in with your admin credentials, and click **"Seed / Restore Default Menu"** to populate Firestore with all initial dishes in 1 click!

---

## 🚀 How to Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/zhsaikot/healthshark`
2. Click on **Settings** (top tab).
3. In the left sidebar, click **Pages** (under "Code and automation").
4. Under **Build and deployment**:
   - **Source:** Select `Deploy from a branch`
   - **Branch:** Select `main`
   - **Folder:** Select `/ (root)`
5. Click **Save**.
6. Wait 1-2 minutes. Your website will be live at:
   **`https://zhsaikot.github.io/healthshark/`**

---

## 📂 Project Directory Structure

```text
healthshark/
├── index.html                 # Home Page (Mockup 1)
├── menu.html                  # Menu Page (Mockup 2)
├── item-details.html          # Product Details Page (Mockup 3)
├── about.html                 # About Us Page (Mockup 4)
├── contact.html               # Contact & Map Page (Mockup 5)
├── admin.html                 # Admin Dashboard (Auth, CRUD, Seed)
├── 404.html                   # Custom GitHub Pages 404 handler
├── favicon.ico                # Website Favicon
├── assets/
│   ├── css/
│   │   └── style.css          # Theme styles, animations & typography
│   ├── js/
│   │   ├── firebase-config.js # Firebase credentials & connection check
│   │   ├── seed-data.js       # Preloaded 27 menu dishes & categories
│   │   ├── db.js              # Database abstraction (Firestore + LocalStorage)
│   │   ├── main.js            # Shared logic, search modal, toasts, WhatsApp
│   │   ├── menu.js            # Menu filtering, rendering, WhatsApp links
│   │   ├── item-details.js    # Gallery switcher, quantity calculator, WhatsApp
│   │   └── admin.js           # Admin authentication, CRUD modals, seed sync
│   └── images/
│       ├── logo.png           # Official Health Shark transparent logo
│       └── favicon.png        # Favicon image
└── README.md                  # Documentation and setup guide
```

---

## 💖 Credits & License

Designed and developed with care for **Health Shark** Dhaka, Bangladesh.  
*Healthy Food • Happy Life*