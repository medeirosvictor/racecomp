// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI3XS8o4NqbrN6qysBTydTuDS8c_1Kiw8",
  authDomain: "race-comp.firebaseapp.com",
  projectId: "race-comp",
  storageBucket: "race-comp.appspot.com",
  messagingSenderId: "70972890749",
  appId: "1:70972890749:web:7dcab426cc33c176acdb14",
  measurementId: "G-T30CJ52T6F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
const analytics = getAnalytics(app);
export const auth = getAuth(app);
