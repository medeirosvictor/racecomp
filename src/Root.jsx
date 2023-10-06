import Header from './Components/Header'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { Navigate } from "react-router-dom";

export default function Root() {
  const [loginStatus, setLoginStatus] = useState(false)

  const responseGoogleLogin = (response) => {
    const decoded = jwt_decode(response.credential)
    localStorage.setItem('user', JSON.stringify(decoded))
    const { name, sub, picture } = decoded

    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    }
    setLoginStatus(true)
  }
  return (
    <>
        <div className='App flex flex-col h-screen justify-between'>
            <Header />
            <main className='p-5'>
              <div className='flex text-3xl font-bold underline'>
                <span className='mr-1'>
                  {loginStatus ? `Username, `: "Hi, " } welcome to 
                </span>
                <h1 className='text-3xl'>
                  RaceComp
                </h1>
                <span>!</span>
              </div>

              {loginStatus ? "" :
              <GoogleLogin
                  onSuccess={responseGoogleLogin}
                  onFailure={(e) => {console.log("Login Failure:\n" + e)}}
                  cookiePolicy={'single_host_origin'}
                />
              }
                <Outlet />
            </main>
            <Footer />
        </div>
    </>
  )
}
