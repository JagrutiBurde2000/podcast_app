// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvid4662Htbs8kKOtjZuConTGfRi6NAl0",
  authDomain: "podcast-app-196f3.firebaseapp.com",
  projectId: "podcast-app-196f3",
  storageBucket: "podcast-app-196f3.appspot.com",
  messagingSenderId: "728956733594",
  appId: "1:728956733594:web:9772e87231e0aded2fb723",
  measurementId: "G-N7LFR3KJ7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };