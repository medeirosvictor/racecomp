// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, updateProfile, deleteUser } from 'firebase/auth';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { setDoc, getDoc ,getDocs, collection, doc, getFirestore, updateDoc, deleteDoc, query, where  } from "@firebase/firestore";
import { GoogleAuthProvider,
    signOut,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { getLoggedUserFromLocalStorage, removeUserFromLocalStorage } from "./utils/localStorageHelpers";
import { state$ } from './utils/legendState'
import { fromLeaguesService } from "./utils/fireBaseUtil";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyARlC9opawE15cMFxi6RUfFWgs0bBH0QMw",
    authDomain: "race-comp-db.firebaseapp.com",
    databaseURL: "https://race-comp-db-default-rtdb.firebaseio.com",
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

export const searchForUsers = async (searchQuery) => {
    const querySnapshot = await getDocs(collection(db, "Users"));
    const users = [];
    querySnapshot.forEach((doc) => {
        const user = doc.data();
        if (user.displayName?.toLowerCase().includes(searchQuery.toLowerCase())) {
            users.push(user);
        }
    });
    return users;
}

export const searchForLeagues = async (searchQuery) => {
    const querySnapshot = await getDocs(collection(db, "Leagues"));
    const leagues = [];
    querySnapshot.forEach((doc) => {
        const league = doc.data();
        if (league.name?.toLowerCase().includes(searchQuery.toLowerCase())) {
            leagues.push(league);
        }
    });
    return leagues;
}

export const searchForMatchesFirebase = async (searchQuery) => {
    const usersFound = await searchForUsers(searchQuery);
    const leaguesFound = await searchForLeagues(searchQuery);
    return [usersFound, leaguesFound];
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

export const handleCreateAccountForm = async (displayName, email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
        displayName
    });
   await handleAddUserToFirestore(auth.currentUser);
}

export const emailAndPasswordSignIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
}

export const getUserFromFirestore = async (user, db) => {
    const docRef = doc(db, 'Users', user?.uid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

export const isUserOnFirestore = async (user) => {
    const docRef = doc(db, 'Users', user?.uid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        return true;
    } else {
        return false;
    }
}

export const handleAddUserToFirestore = async (user) => {
    const payload = {
        displayName: user?.displayName || "",
        email: user?.email || "",
        photoURL: user?.photoURL?.replace('=s96-c', '') || "",
        memberSince: user?.metadata.creationTime || Date(),
        platforms: [],
        equipments: [],
        games: [],
        birthday: '',
        country: '',
        uid: user?.uid
    };
    await setDoc(doc(collection(db, "Users"), user?.uid), payload);
    console.log("handleAddUserToFirestore: ", auth.currentUser);
    // addLoggedUserToLocalStorage(payload);
    state$.user.set(payload);
}


export const handleAddLeagueToFirestore = async (leagueFormData) => {
    const {selectedPlatforms,pilots,races,title,game,startDate} = leagueFormData;
    const user = getLoggedUserFromLocalStorage();
    const userRef = doc(collection(db, "Users"), user?.uid)

    const payload = {
        leagueName : title,
        ownerUid: user?.uid,
        startDate,
        game,
        platform: [...selectedPlatforms],
        pilots: [ ...pilots,userRef ],
        races,
    };

    await setDoc(doc(collection(db, "Leagues")), payload);
}

export const getOwnedLeagues  = async () =>{
    var ownedLeagues =[];
    const loggedUserId = getLoggedUserFromLocalStorage()?.uid;

    // Create a reference to the cities collection
    const leaguesRef = collection(db, "Leagues");

    // Create a query against the collection.
    const q = query(leaguesRef, where("ownerUid", "==", loggedUserId));
    const ownedLeaguesQuery = await getDocs(q);
    ownedLeaguesQuery.forEach( league => ownedLeagues.push(fromLeaguesService(league)));

    return ownedLeagues;
}

export const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: "select_account"
    });
    await signInWithPopup(auth, provider);
    const userExists = await isUserOnFirestore(auth.currentUser)
    if (!userExists) {
        await handleAddUserToFirestore(auth.currentUser);
    } else {
        const userFromFireStore = await getUserFromFirestore(auth.currentUser, db)
        // addLoggedUserToLocalStorage(userFromFireStore);
        console.log("googleSignIn: ", userFromFireStore);
        state$.user.set(userFromFireStore);
    }
}

export const logOut = async () => {
    try {
        await signOut(auth);
        removeUserFromLocalStorage();
    } catch (error) {
        console.log(error);
    }
}

export const deleteUserAccount = (user) => {
    removeUserFromLocalStorage();
    deleteCurrentUser(user);
}

export const auth = getAuth(app);
