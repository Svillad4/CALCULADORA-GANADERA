import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "calculadora-ganadera-6ede3.firebaseapp.com",
  projectId: "calculadora-ganadera-6ede3",
  storageBucket: "calculadora-ganadera-6ede3.firebasestorage.app",
  messagingSenderId: "52179030466",
  appId: "1:52179030466:web:180953d8018dc0aa3b065b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Servicios
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
