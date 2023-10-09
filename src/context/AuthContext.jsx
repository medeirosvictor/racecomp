import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, 
    signInWithRedirect,
    signOut,
    signInWithPopup,
    onAuthStateChanged 
} from "firebase/auth";
import { auth } from '../firebase';

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: "select_account"
        });
        await signInWithPopup(auth, provider)
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
