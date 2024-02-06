// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importa getFirestore para usar Firestore
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6VLHt7cLKDIKg_hcLEHNjLPTuh_9qJAw",
  authDomain: "react-firestore-exercise-37272.firebaseapp.com",
  projectId: "react-firestore-exercise-37272",
  storageBucket: "react-firestore-exercise-37272.appspot.com",
  messagingSenderId: "549135976151",
  appId: "1:549135976151:web:e6bbc2d991cf991cd85292",
  measurementId: "G-66QMVBDZFZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// (Opcional) Initialize Analytics
// const analytics = getAnalytics(app);

// Export the database
export { db };

