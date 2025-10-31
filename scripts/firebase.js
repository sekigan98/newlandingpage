import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

// Reemplazá con tu configuración real
const firebaseConfig = {
  apiKey: "AIzaSyB5yNYklLtbjAKEsL7liuHK-o1tasFt7I8",
  authDomain: "landing-4cdb4.firebaseapp.com",
  databaseURL: "landing-4cdb4",
  projectId: "TU_PROJECT_ID",
  storageBucket: "landing-4cdb4.firebasestorage.app",
  messagingSenderId: "791156963903",
  appId: "1:791156963903:web:3a7981a2ba1ad633c7968a"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, ref, push, onChildAdded, auth, signInWithEmailAndPassword, onAuthStateChanged };
