import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported, logEvent, type Analytics } from "firebase/analytics";

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

let analytics: Analytics | null = null;

/** Analytics is optional so ad blockers and non-browser previews never interrupt the site. */
export async function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  try {
    if (typeof window === "undefined" || !(await isSupported())) return;
    analytics ??= getAnalytics(app);
    logEvent(analytics, name, params);
  } catch {
    // Measurement should never block estimates, navigation, or page rendering.
  }
}

export default app;
