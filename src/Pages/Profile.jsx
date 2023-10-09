import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext';
import { getStorage } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const storage = getStorage();
// Storage
export async function uploadProfilePicture(file, currentUser, setLoading) {
    const fileRef = ref(storage, currentUser.uid + '.jpg');
    setLoading(true)
    const snapshot = await uploadBytes(fileRef, file)
    setLoading(false)
}
export default function Profile() {
    const { user, logOut } = UserAuth()
    const [newPhoto, setNewPhoto] = useState(null)
    const [loading, setLoading] = useState()
    const navigate = useNavigate()
    const [changingProfilePicture, setChangingProfilePicture] = useState(false)

    const triggerChangeProfilePicture = () => {
        setChangingProfilePicture(true)
        console.log('change profile picture')
    }

    const handleChangeProfilePicture = (e) => {
        setChangingProfilePicture(e.target.files[0])
    }

    const handleUploadPhoto = () => {
        uploadProfilePicture(newPhoto, user, setLoading)
    }

    const handleSignOut = () => {
        try {
          logOut();
        } catch (e) {
          console.log(e);
        }
      }
    
    const handleCancelUpload = () => {
        setChangingProfilePicture(false)
    }

    return (
        <>
            <div className='flex flex-col min-h-full border border-gray p-10 max-w-7xl m-auto space-y-10'>
                <div className='flex items-center justify-start space-x-7 '>
                    <div className='flex items-center justify-center'>
                        <img className='rounded-md' src={user?.photoURL?.replace('=s96-c', '')} width={300} alt={`${user?.displayName} profile picture`}/>
                    </div>
                    <div className='flex flex-col space-y-3'>
                        {
                            changingProfilePicture ?
                            <div>
                                <input onChange={handleChangeProfilePicture} type='file' placeholder='Upload new profile picture'/> 
                                <button className='border border-gray-300 rounded-md hover:border-black px-5 py-2' onClick={handleUploadPhoto}>Upload</button>
                                <button className='ml-2' onClick={handleCancelUpload}>cancel</button>
                            </div>
                            :
                            <button className='border border-gray-300 rounded-md hover:border-black px-5 py-2' onClick={triggerChangeProfilePicture}>Change Profile Picture</button>
                            
                        }
                        <div className='user-name'>
                            Nome: {user?.displayName}
                        </div>
                        <div>
                            Email: {user?.email}
                        </div>
                        <div>
                            Platforms: 
                        </div>
                        <div>
                            Leagues: 
                        </div>
                    </div>
                </div>
                <button  className='border border-gray-300 rounded-md hover:border-black px-5 py-2 text-red-400 max-w-lg m-auto' type='button' onClick={handleSignOut}>Log Out</button>
            </div>
        </>
    )
}
