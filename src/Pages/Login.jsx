import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { translation } from '../constants/translation/en';
import { UserAuth } from '../context/AuthContext';

function Login() {
    const {
        googleSignIn,
        user,
        logOut,
        emailAndPasswordSignIn,
        handleCreateAccountForm,
    } = UserAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);

    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            await googleSignIn();
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    };

    const handleSignInViaEmail = async () => {
        try {
            await emailAndPasswordSignIn(email, password);
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    };

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
    };

    const handleInputChange = e => {
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
    };

    const handleIsCreatingAccount = () => {
        setIsCreatingAccount(!isCreatingAccount);
    };

    const handleSignOut = () => {
        try {
            logOut();
        } catch (e) {
            console.log(e);
        }
    };

    if (user?.displayName) {
        return (
            <div className="flex flex-col min-h-full border border-gray p-10 max-w-7xl m-auto space-y-10 justify-center items-center">
                <h2 className="text-2xl underline">
                    Welcome {user.displayName}
                </h2>
                <button
                    className="border border-gray-300 rounded-md hover:border-black px-5 py-2"
                    type="button"
                    onClick={handleSignOut}
                >
                    Sign Out
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-full border border-gray p-10 max-w-7xl m-auto space-y-10 justify-center items-center">
            <h2 className="text-2xl">
                {isCreatingAccount ? translation.REGISTER : translation.LOGIN}
            </h2>
            <div>
                <div className="tooltip" data-tip={translation.GOOGLE_LOGIN}>
                    <button
                        className="border border-gray-300 rounded-md hover:border-black px-5 py-2 flex items-center space-x-1"
                        type="button"
                        onClick={handleGoogleLogin}
                    >
                        <FcGoogle />
                        <span>{translation.GOOGLE_LOGIN}</span>
                    </button>
                </div>
                <div className="flex flex-col my-5 space-y-7">
                    {isCreatingAccount && (
                        <input
                            className="border p-1"
                            onChange={handleInputChange}
                            placeholder="display name"
                            type="text"
                            name="displayName"
                            id="displayName"
                        />
                    )}
                    <input
                        className="border p-1"
                        onChange={handleInputChange}
                        placeholder="email"
                        type="email"
                        name="email"
                        id="email"
                    />
                    <input
                        className="border p-1"
                        onChange={handleInputChange}
                        placeholder="password"
                        type="password"
                        name="password"
                        id="password"
                    />
                    {isCreatingAccount ? (
                        <>
                            <input
                                className="border p-1"
                                onChange={handleInputChange}
                                placeholder="confirm password"
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                            />
                            <button
                                className="border border-gray-300 rounded-md hover:border-black px-5 py-2"
                                type="submit"
                                onClick={handleCreateAccount}
                            >
                                Create Account
                            </button>
                            <p className="text-sm font-medium">
                                Already have a account?{' '}
                                <button
                                    onClick={handleIsCreatingAccount}
                                    className="text-sky-700 hover:underline decoration-solid"
                                >
                                    Login
                                </button>
                            </p>
                        </>
                    ) : (
                        <>
                            <button
                                className="border border-gray-300 rounded-md hover:border-black px-5 py-2"
                                type="submit"
                                onClick={handleSignInViaEmail}
                            >
                                Sign In
                            </button>
                            <p className="text-sm font-medium">
                                Do not have a account?{' '}
                                <button
                                    onClick={handleIsCreatingAccount}
                                    className="text-sky-700 hover:underline decoration-solid"
                                >
                                    Register
                                </button>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
