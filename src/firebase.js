// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFrWVExZq_sxpIPT1KfgrCfNoZUMZ_1o0",
  authDomain: "ecommerce-34747.firebaseapp.com",
  projectId: "ecommerce-34747",
  storageBucket: "ecommerce-34747.appspot.com",
  messagingSenderId: "756839663478",
  appId: "1:756839663478:web:ff7c51c2650a6f76765c57",
  measurementId: "G-VBD52C2TEL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
