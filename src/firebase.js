// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { doc, getFirestore, updateDoc } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyARlC9opawE15cMFxi6RUfFWgs0bBH0QMw",
    authDomain: "race-comp-db.firebaseapp.com",
    projectId: "race-comp-db",
    storageBucket: "race-comp-db.appspot.com",
    messagingSenderId: "797743328322",
    appId: "1:797743328322:web:f03582079b79a478d611db",
    measurementId: "G-YE6EC8HKY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

export const updateUserProfileFirestore = async (user, data) => {
    debugger
    try {
        await updateDoc(doc(db, "Users", user.uid), data);
    } catch (error) {
        console.log(error);
    }
}

export const auth = getAuth(app);
