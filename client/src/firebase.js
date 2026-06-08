// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "webcraft-de5b5.firebaseapp.com",
  projectId: "webcraft-de5b5",
  storageBucket: "webcraft-de5b5.firebasestorage.app",
  messagingSenderId: "870731812441",
  appId: "1:870731812441:web:e63e6e8ba2dc7df54feb48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export  {auth,provider}