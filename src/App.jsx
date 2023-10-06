import './App.css'
import Home from './Pages/Home'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'

function App() {
  
  return (
    <>
      <div className='flex flex-col h-screen justify-between'>
        <Header />
        <h1 className='text-3xl font-bold underline'>
          Welcome to RaceComp!
          <Home />
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decodedCredentialResponse = jwt_decode(credentialResponse.credential)
              console.log(decodedCredentialResponse)
              
            }}
            onFailure={(e) => {console.log("Login Failure:\n" + e)}}
            cookiePolicy={'single_host_origin'}
          />
        </h1>
        <Footer />
      </div>
    </>
  )
}

export default App
