/**
 * Health Shark - Firebase Configuration & Initialization
 * 
 * ============================================================================
 * INSTRUCTIONS FOR USER: WHERE TO ADD YOUR FIREBASE CONFIGURATION KEYS
 * ============================================================================
 * 1. Go to Firebase Console (https://console.firebase.google.com/)
 * 2. Create a new Firebase project (or select an existing one) named "healthshark"
 * 3. In Project Settings (gear icon) > General, scroll to "Your apps" and add a Web App (</>)
 * 4. Copy your Firebase SDK configuration object and paste the values into the `firebaseConfig` object below!
 * 5. Enable the following services in Firebase Console:
 *    a) Authentication -> Get Started -> Sign-in method -> Enable "Email/Password"
 *    b) Firestore Database -> Create database -> Start in production or test mode
 *    c) Firebase Storage -> Get Started -> Default bucket
 * 
 * NOTE: If you haven't added your Firebase keys yet, Health Shark will seamlessly
 * run in "Local Fallback Mode" using the preloaded seed data so the website is
 * fully functional out of the box on GitHub Pages!
 */

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Check if actual configuration keys have been provided
function isFirebaseConfigured() {
  return (
    typeof firebase !== "undefined" &&
    firebaseConfig &&
    firebaseConfig.apiKey &&
    !firebaseConfig.apiKey.includes("YOUR_FIREBASE_API_KEY") &&
    firebaseConfig.projectId &&
    !firebaseConfig.projectId.includes("YOUR_PROJECT_ID")
  );
}

// Global Firebase service instances
let firebaseApp = null;
let firestoreDb = null;
let firebaseAuth = null;
let firebaseStorage = null;

try {
  if (isFirebaseConfigured()) {
    if (!firebase.apps.length) {
      firebaseApp = firebase.initializeApp(firebaseConfig);
    } else {
      firebaseApp = firebase.app();
    }
    firestoreDb = firebase.firestore();
    firebaseAuth = firebase.auth();
    firebaseStorage = firebase.storage();
    console.log("✅ Health Shark: Firebase connected successfully!");
  } else {
    console.info("ℹ️ Health Shark: Running in local fallback mode. Add your Firebase keys in assets/js/firebase-config.js to enable live cloud Firestore & Auth.");
  }
} catch (error) {
  console.warn("⚠️ Health Shark: Firebase initialization notice:", error.message);
}

// Export globals
window.HS_FIREBASE = {
  config: firebaseConfig,
  isConfigured: isFirebaseConfigured,
  app: firebaseApp,
  db: firestoreDb,
  auth: firebaseAuth,
  storage: firebaseStorage
};
