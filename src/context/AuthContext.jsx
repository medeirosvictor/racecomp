import { useContext, createContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { auth, isUserOnFirestore, handleAddUserToFirestore, getUserFromFirestore } from '../firebase';
import { state$ } from "../utils/legendState";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const user = state$.user.get();
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(!user) {
                return;
            }
            const userOnFirestore = isUserOnFirestore(user);
            if(!userOnFirestore) {
                handleAddUserToFirestore(user);
            }
            const userFromFireStore = await getUserFromFirestore(user, db);
            state$.user.set(userFromFireStore);
            console.log('logged in: ', userFromFireStore);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}
