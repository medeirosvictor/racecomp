import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { UserAuth } from '../context/AuthContext';
import { setDoc, getDoc, doc , collection, getFirestore } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

function Login() {
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [])

    const { googleSignIn, user, logOut } = UserAuth()
    const navigate = useNavigate()
    const db = getFirestore()

    // const createNewUser = async() => {
        
        // await addDoc(collectionRef, payload);
    // };

    const handleGoogleLogin = async () => {
      try {
        await googleSignIn();
        onAuthStateChanged(auth, async (user) => {
            const docRef = doc(db, 'Users', user?.uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
                console.log("exists");
            } else {
                console.log(user)
                const payload = {
                    displayName: user?.displayName,
                    email: user?.email,
                    photoUrl: user?.photoURL?.replace('=s96-c', ''),
                    memberSince: user?.metadata.creationTime,
                    uid: user?.uid
                };
                setDoc(doc(collection(db, "Users"), user?.uid), payload)
            }
        })
      } catch (e) {
        console.log(e);
      }
    }

    const handleSignOut = () => {
      try {
        logOut();
      } catch (e) {
        console.log(e);
      }
    }

    return (
        <div>
            <h2>Sign Up or Log In!</h2>
            <div>
                {user?.displayName ? 
                    <button  className='border border-gray-300 rounded-md hover:border-black px-5 py-2 text-red-400' type='button' onClick={handleSignOut}>Log Out</button> :
                    <button  className='border border-gray-300 rounded-md hover:border-black px-5 py-2' type='button' onClick={handleGoogleLogin}>Google Login</button>
                }
            </div>
        </div>
    )
}

export default Login