import { useContext, createContext, useEffect, useState } from "react";
import { setDoc, getDoc, doc , collection, getFirestore} from 'firebase/firestore';
import { GoogleAuthProvider,
    signOut,
    signInWithPopup,
    onAuthStateChanged ,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { auth, deleteCurrentUser } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    
    const db = getFirestore()
    
    const addLoggedUserToLocalStorage = (user) => {
        localStorage.setItem('user', JSON.stringify(user))
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user');
    }
    
    const getUserFromFirestore = async (user) => {
        const docRef = doc(db, 'Users', user?.uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            
            return docSnap.data()
        } else {
            return null
        }
    }
    
    /**
     * googleSignIn
     * 
     * @description Signs in a user with Google authentication
    */
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: "select_account"
        });
        await signInWithPopup(auth, provider);
        const isExistingUser = await isUserOnFirestore(auth.currentUser)
        if (!isExistingUser) {
            await handleAddUserToFirestore(auth.currentUser);
        } else {
            const userFromFireStore = await getUserFromFirestore(auth.currentUser)
            addLoggedUserToLocalStorage(userFromFireStore);
            console.log("googleSignIn: ", userFromFireStore);
        }
    }


    const emailAndPasswordSignIn = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
        addLoggedUserToLocalStorage(getUserFromFirestore(auth.currentUser))
    }

    const handleCreateAccountForm = async (displayName, email, password) => {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {
            displayName
        });
        await handleAddUserToFirestore(auth.currentUser);
    }

    const logOut = async () => {
        try {
            await signOut(auth);
            removeUserFromLocalStorage();
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddUserToFirestore = async (user) => {
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
        addLoggedUserToLocalStorage(payload);
    }

    const getLoggedUserFromLocalStorage = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user) {
            return user
        } else {
            return null
        }
    }

    const isUserOnFirestore = async (user) => {
        const docRef = doc(db, 'Users', user?.uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            return true
        } else {
            return false
        }
    }

    const deleteUserAccount = (user) => {
        // remove user from localstorage
        removeUserFromLocalStorage();
        // remove user
        deleteCurrentUser(user);
        // logout? 
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(!user) {
                return;
            }
            const userOnFirestore = isUserOnFirestore(user)
            if(!userOnFirestore) {
                handleAddUserToFirestore(user);
            }
            setUser(user);
        })
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ handleCreateAccountForm, googleSignIn, emailAndPasswordSignIn, logOut, getLoggedUserFromLocalStorage, deleteUserAccount, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}
