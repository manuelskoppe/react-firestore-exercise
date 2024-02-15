// Importa las funciones que necesitas de los SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Para usar Firestore
import { getStorage } from "firebase/storage"; // Para usar Firebase Storage
// import { getAnalytics } from "firebase/analytics"; // Opcional, para Analytics

// La configuración de tu aplicación web Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC6VLHt7cLKDIKg_hcLEHNjLPTuh_9qJAw",
  authDomain: "react-firestore-exercise-37272.firebaseapp.com",
  projectId: "react-firestore-exercise-37272",
  storageBucket: "gs://react-firestore-exercise-37272.appspot.com",
  messagingSenderId: "549135976151",
  appId: "1:549135976151:web:e6bbc2d991cf991cd85292",
  measurementId: "G-66QMVBDZFZ"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

// Inicializa Firebase Storage
const storage = getStorage(app);

// (Opcional) Inicializa Analytics
// const analytics = getAnalytics(app);

// Exporta la base de datos, storage y app
export { db, storage, app };
