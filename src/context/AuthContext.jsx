import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, 
    signInWithRedirect,
    signOut,
    signInWithPopup,
    onAuthStateChanged 
} from "firebase/auth";

import { auth } from '../firebase';
import { storage, ref, uploadBytes } from "firebase/storage";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }

    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser)
        })
        return () => {
            unsubscribe()
        }
    }, [])
    

    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}

export async function uploadProfilePicture(file, currentUser, setLoading) {
    const fileRef = ref(storage, currentUser.uid + '.jpg');
    setLoading(true)
    const snapshot = await uploadBytes(fileRef, file)
    setLoading(false)
}

