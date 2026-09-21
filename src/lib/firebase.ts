import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase web configuration is intentionally safe to ship to the browser.
// Environment values can override these defaults for previews or another project.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "AIzaSyAg4j9ZgVlu6xbjUYoawCAnAMOIRvTaGDs",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "lovemeafter-38639.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "lovemeafter-38639",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "lovemeafter-38639.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "1084855632777",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "1:1084855632777:web:122c7e62c7cbc2c7a9d758",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
