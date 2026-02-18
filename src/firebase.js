import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Login ke liye
import { getFirestore } from "firebase/firestore"; // Database ke liye

// Tumhara configuration (Maine sahi jagah set kar diya hai)
const firebaseConfig = {
  apiKey: "AIzaSyDx35usvKy1ZvzJVEUf-Pr4B-He8ssE9Ds",
  authDomain: "ramadan-app-9cdc2.firebaseapp.com",
  projectId: "ramadan-app-9cdc2",
  storageBucket: "ramadan-app-9cdc2.firebasestorage.app",
  messagingSenderId: "272708398052",
  appId: "1:272708398052:web:220797706e6286cf82f5f1",
};

// Firebase initialize karna
const app = initializeApp(firebaseConfig);

// Auth aur Database ko export karna taaki pure app mein use kar sakein
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
