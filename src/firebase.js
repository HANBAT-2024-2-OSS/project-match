import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5_Od-qQAK1moiGMKillBWQ8yzOku9Wkg",
  authDomain: "match-3a560.firebaseapp.com",
  projectId: "match-3a560",
  storageBucket: "match-3a560.firebasestorage.app",
  messagingSenderId: "56457919521",
  appId: "1:56457919521:web:972b12f8072795eba2f760",
  measurementId: "G-WLHKGMQ16L",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);