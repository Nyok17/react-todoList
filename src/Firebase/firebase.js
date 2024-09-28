import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyANcc9H4S3Xe3YXP8iWQq7RrRW6FE53nNI",
  authDomain: "todo-369ea.firebaseapp.com",
  projectId: "todo-369ea",
  storageBucket: "todo-369ea.appspot.com",
  messagingSenderId: "271820358398",
  appId: "1:271820358398:web:fb598e23f39f8a6947dbaf",
  measurementId: "G-KQVPNYW969"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getDatabase(app);
export const auth= getAuth(app);
export const provider= new GoogleAuthProvider();
export {signInWithPopup, signOut};

