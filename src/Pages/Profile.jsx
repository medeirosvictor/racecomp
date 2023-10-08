import React, { useState } from 'react'
import { UserAuth } from '../context/AuthContext'

export default function Profile() {
    const { user } = UserAuth()
    const [changingProfilePicture, setChangingProfilePicture] = useState(false)
    console.log(user)

    const handleChangeProfilePicture = () => {
        setChangingProfilePicture(true)
        console.log('change profile picture')
    }
    
    return (
        <>
            <div className='flex flex-col items-center justify-center space-between min-h-full'>
                <div className='flex flex-col items-center justify-center'>
                    <img className='mb-2' src={user?.photoURL} alt={`${user?.displayName} profile picture`}/>
                    {
                        changingProfilePicture ?
                        <input type='file' placeholder='Upload new profile picture'/> :
                        <button className='border border-gray-300 rounded-md hover:border-black px-5 py-2' onClick={handleChangeProfilePicture}>Change Profile Picture</button>
                            
                    }
                </div>
                <div className='user-name'>
                    {user?.displayName}
                </div>
                <div>
                    {user?.email}
                </div>

                 profile page
            </div>
        </>
    )
}
