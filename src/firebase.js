// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, updateProfile, deleteUser } from 'firebase/auth';
import { getStorage, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { doc, getFirestore, updateDoc, deleteDoc } from "@firebase/firestore";

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
const storage = getStorage();

export const updateUserProfileFirestore = async (user, data) => {
    try {
        await updateDoc(doc(db, "Users", user.uid), data);
    } catch (error) {
        console.log(error);
    }
}

export const deleteCurrentUser = (user) => {
    // removing from firestore
    deleteDoc(doc(db, "Users", user.uid));
    const auth = getAuth();
    const authUser = auth.currentUser;

    // removing profile image from storage
    if (user.photoURL.includes('firebase')) {
        const regex = /([^\/?]+)(?=\?)/g;
        const profilePicFileName = user.photoURL.match(regex)[0].replace('userProfileImages%2F', '');
        console.log(profilePicFileName);
        debugger;
        const profilePic = ref(storage, `userProfileImages/${profilePicFileName}`);

        // Delete the file
        deleteObject(profilePic).then(() => {
            console.log("Profile picture deleted");
        }).catch((error) => {
            console.log("Error deleting profile picture: ", error)
        });
    }

    // removing from Firebase Auth
    deleteUser(authUser).then(() => {
        console.log("User deleted");
    }).catch((error) => {
        console.log("Deleting user: ", error);
    });
}

export const auth = getAuth(app);
