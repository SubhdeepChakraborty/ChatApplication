// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyADgK13Xpj5MrmumHpIYv2pSLpsXRRUuD4",
  authDomain: "chat-1dba9.firebaseapp.com",
  projectId: "chat-1dba9",
  storageBucket: "chat-1dba9.appspot.com",
  messagingSenderId: "583566237740",
  appId: "1:583566237740:web:bcb14730f26aa6fa697189",
  measurementId: "G-M57NC0ZKZ5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
