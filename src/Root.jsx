import Header from './Components/Header'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { Navigate } from "react-router-dom";
import { UserAuth } from './context/AuthContext';

export default function Root() {
  const { googleSignIn, user, logOut } = UserAuth()

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
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
    <>
        <div className='App flex flex-col h-screen justify-between'>
            <Header />
            <main className='p-5'>
              {user?.displayName ? 
              <button  className='border border-gray-300 rounded-md hover:border-black px-5 py-2 text-red-400' type='button' onClick={handleSignOut}>Log Out</button> :
              <button  className='border border-gray-300 rounded-md hover:border-black px-5 py-2' type='button' onClick={handleGoogleLogin}>Google Login</button>
              }
                <Outlet />
            </main>
            <Footer />
        </div>
    </>
  )
}
