import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { UserAuth } from '../context/AuthContext';

function Login() {
    const { googleSignIn, user, logOut } = UserAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [])

    const handleGoogleLogin = async () => {
      try {
        await googleSignIn();
        navigate('/')
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