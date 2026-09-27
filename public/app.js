import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC-tNc4sqO0gAstGxRXAkx4CR1xG2e831o",
  authDomain: "fuel-management-system-7784c.firebaseapp.com",
  projectId: "fuel-management-system-7784c",
  storageBucket: "fuel-management-system-7784c.firebasestorage.app",
  messagingSenderId: "718691738844",
  appId: "1:718691738844:web:a590ae6d2c734ffa1f4019",
  measurementId: "G-Q6N1PWMBDR"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

export function generateCode() {
  const d = new Date();
  const day = String(d.getDate()).padStart(2,'0');
  const month = String(d.getMonth()+1).padStart(2,'0');
  return `PKS-${day}${month}-${Math.floor(Math.random()*90000+10000)}`;
}
