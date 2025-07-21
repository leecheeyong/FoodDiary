import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "food-diary-9c29f.firebaseapp.com",
  projectId: "food-diary-9c29f",
  storageBucket: "food-diary-9c29f.firebasestorage.app",
  messagingSenderId: "472034696823",
  appId: "1:472034696823:web:e9d2c404db4ad237f57072"
};


const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)