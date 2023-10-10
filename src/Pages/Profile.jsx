import { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { getStorage } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import pilotDefaultProfilePic from '../assets/images/pilot-profile-img.png';

const storage = getStorage();
// Storage
export async function uploadProfilePicture(file, currentUser, setLoading) {
    const fileRef = ref(storage, currentUser.uid + '.jpg');
    setLoading(true);
    const snapshot = await uploadBytes(fileRef, file);
    setLoading(false);
}

export default function Profile() {
    const { user, logOut } = UserAuth();
    const [ userChanges, setUserChanges ] = useState({});
    const [newPhoto, setNewPhoto] = useState(null);
    const [editingProfile, setEditingProfile] = useState(false);
    const [loading, setLoading] = useState();
    const navigate = useNavigate();
    const [changingProfilePicture, setChangingProfilePicture] = useState(false);

    const triggerChangeProfilePicture = () => {
        setChangingProfilePicture(true);
        console.log('change profile picture');
    }

    const handleChangeProfilePicture = (e) => {
        setChangingProfilePicture(e.target.files[0]);
    }

    const handleUploadPhoto = () => {
        uploadProfilePicture(newPhoto, user, setLoading);
    }

    const handleEditProfile = () => {
        setEditingProfile(true);
        console.log('editing profile');
    }

    const handleCancelEditProfile = () => {
        setEditingProfile(false);
    }

    const handleSaveEditProfile = () => {
        //send update to firestore
        console.log('save editing profile');
        setEditingProfile(false);
    }

    const handleSignOut = () => {
        try {
          logOut();
        } catch (e) {
          console.log(e);
        }
      }
    
    const handleCancelUpload = () => {
        setChangingProfilePicture(false);
    }

    return (
        <>
            <div className='flex flex-col min-h-full p-10 max-w-7xl m-auto space-y-10'>
                <div className='flex items-center justify-start space-x-7 '>
                    <div className='flex items-center justify-center'>
                        <img className='rounded-md' src={user?.photoURL?.replace('=s96-c', '') || pilotDefaultProfilePic} width={300} alt={`${user?.displayName} profile picture`}/>
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
                            <span className='font-bold text-md'> Nome:</span> {user?.displayName}
                        </div>
                        <div>
                            <span className='font-bold text-md'> Email:</span> {user?.email}
                        </div>
                        <div>
                            <span className='font-bold text-md'> Leagues:</span> {user?.leagues ? 
                                user?.leagues?.map((league) => {
                                    return (
                                        <div key={league}>
                                            {league}
                                        </div>
                                    )
                                }):
                                "Not registered in any leagues." }
                        </div>
                        <div>
                            <span className='font-bold text-md'>Platforms: </span> 
                            {
                                editingProfile ? 
                                <div className='flex space-x-5'>
                                    <div className='flex space-x-2'>
                                        <input type='checkbox' name='platforms' value='PC' id='PC'/>
                                        <label htmlFor='PC'>PC</label>
                                    </div>
                                    <div className='flex space-x-2'>
                                        <input type='checkbox' name='platforms' value='PS4' id='PS4'/>
                                        <label htmlFor='PS4'>PS4</label>
                                    </div>
                                    <div className='flex space-x-2'>
                                        <input type='checkbox' name='platforms' value='XBOX' id='XBOX'/>
                                        <label htmlFor='XBOX'>XBOX</label>
                                    </div>
                                </div>
                                :     
                                user?.platforms ? 
                                    user?.platforms?.map((platform) => {
                                        return (
                                            <div key={platform}>
                                                {platform}
                                            </div>
                                        )
                                    })
                                    : 
                                    "N/A"
                            }
                            
                        </div>
                        <div>
                            <span className='font-bold text-md'>Equipments: </span>
                                {
                                    editingProfile ? 
                                    <div className='flex space-x-5'>
                                        <div className='flex space-x-2'>
                                            <input type='checkbox' name='equipments' value='mouseKeyboard' id='mouseKeyboard'/>
                                            <label htmlFor='mouseKeyboard'>Mouse / Keyboard</label>
                                        </div>
                                        <div className='flex space-x-2'>
                                            <input type='checkbox' name='equipments' value='Controller' id='Controller'/>
                                            <label htmlFor='Controller'>Controller</label>
                                        </div>
                                        <div className='flex space-x-2'>
                                            <input type='checkbox' name='equipments' value='SteeringWheel' id='SteeringWheel'/>
                                            <label htmlFor='SteeringWheel'>Steering Wheel</label>
                                        </div>
                                    </div>
                                    :
                                    user?.equipments ? 
                                    user?.equipments?.map((equipment) => {
                                        return (
                                            <div key={equipment}>
                                                {equipment}
                                            </div>
                                        )
                                    }) : "N/A"
                                }
                            
                        </div>
                        <div>
                            <span className='font-bold text-md'> Country:</span> {editingProfile ? 
                                <input type="text" name="country" id="countryEditInput" />
                            :
                                user?.country || "N/A"
                            }
                        </div>
                        <div>
                            <span className='font-bold text-md'> Age:</span> 
                            {editingProfile ? 
                                <input type="date" name="birthday" id="birthdayEditInput" onChange={(e) => setUserChanges({...userChanges, age: e.target.value})} />
                            :
                                user?.age || "N/A"
                            }
                        </div>                       
                    </div>
                </div>
                {
                    editingProfile ? 
                    <>
                        <button  className='border border-gray-300 rounded-md hover:border-black px-5 py-2 max-w-lg m-auto' type='button' onClick={handleSaveEditProfile}>Save changes</button>
                        <button  className='border border-gray-300 rounded-md hover:border-black px-5 py-2 max-w-lg m-auto' type='button' onClick={handleCancelEditProfile}>Cancel</button>
                    </> :
                    <button  className='border border-gray-300 rounded-md hover:border-black px-5 py-2 max-w-lg m-auto' type='button' onClick={handleEditProfile}>Edit Profile</button>
                }
                
                <button  className='border border-gray-300 rounded-md hover:border-black px-5 py-2 text-red-400 max-w-lg m-auto' type='button' onClick={handleSignOut}>Log Out</button>
            </div>
        </>
    )
}
