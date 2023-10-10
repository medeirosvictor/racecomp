import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserAuth } from '../context/AuthContext';

function Login() {
    const { googleSignIn, user, logOut, emailAndPasswordSignIn, handleCreateAccountForm } = UserAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate()

    const handleGoogleLogin = async () => {
      try {
        await googleSignIn();        
        navigate('/');
      } catch (e) {
        console.log(e);
      }
    }

    const handleSignInViaEmail = async () => {
      try {
        await emailAndPasswordSignIn(email, password);
        navigate('/');
      } catch (e) {
        console.log(e);
      }
    }

    const handleCreateAccount = async () => {
      try {
        if (password !== confirmPassword) {
            console.log('passwords do not match');
            return;
        }
        await handleCreateAccountForm(displayName, email, password);
        navigate('/');
      } catch (e) {
        console.log(e);
      }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'displayName') {
            setDisplayName(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
            if (password !== confirmPassword) {
                console.log('passwords do not match');
            }
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
        <div className='flex flex-col min-h-full border border-gray p-10 max-w-7xl m-auto space-y-10 justify-center items-center'>
            <h2 className='text-2xl underline'> Sign Up or Log In!</h2>
            <div>
                {user?.displayName ? 
                    <button  className='border border-gray-300 rounded-md hover:border-black px-5 py-2 text-red-400' type='button' onClick={handleSignOut}>Log Out</button> :
                    <button  className='border border-gray-300 rounded-md hover:border-black px-5 py-2' type='button' onClick={handleGoogleLogin}>Google Login</button>
                }
                <button  className='border border-gray-300 rounded-md hover:border-black px-5 py-2 text-red-400' type='button' onClick={handleSignOut}>Log Out</button>

                <div className='flex flex-col my-5 space-y-7'>
                    <h2 className='text-2xl underline'>Create Account or Login via Email</h2>
                    <input className='border p-1' onChange={handleInputChange} placeholder='display name' type="text" name="displayName" id="displayName" />
                    <input className='border p-1' onChange={handleInputChange} placeholder='email' type="email" name="email" id="email" />
                    <input className='border p-1' onChange={handleInputChange} placeholder='password' type="password" name="password" id='password'/>
                    <input className='border p-1' onChange={handleInputChange} placeholder='confirm password' type="password" name="confirmPassword" id='confirmPassword'/>
                    <button className='border border-gray-300 rounded-md hover:border-black px-5 py-2' type="submit" onClick={handleCreateAccount}>Create Account</button>
                    <button className='border border-gray-300 rounded-md hover:border-black px-5 py-2' type="submit" onClick={handleSignInViaEmail}>Sign In</button>
                </div>
            </div>
        </div>
    )
}

export default Login