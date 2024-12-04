// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "petadopt-729b1.firebaseapp.com",
  projectId: "petadopt-729b1",
  storageBucket: "petadopt-729b1.firebasestorage.app",
  messagingSenderId: "513452963664",
  appId: "1:513452963664:web:bff3070d466a4cd01f1e55",
  measurementId: "G-MBMTEBD766",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
