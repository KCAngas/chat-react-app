// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAid8w-N_5l-5duuWVXMN9dHKMD2BBdPqc",
  authDomain: "chatapp-ae2a9.firebaseapp.com",
  projectId: "chatapp-ae2a9",
  storageBucket: "chatapp-ae2a9.appspot.com",
  messagingSenderId: "555841912003",
  appId: "1:555841912003:web:4b66fd515c6c5c471db676",
  measurementId: "G-900PMMFXLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);