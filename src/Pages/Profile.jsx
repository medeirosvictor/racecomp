import { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { getDownloadURL, getStorage } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import pilotDefaultProfilePic from '../assets/images/pilot-profile-img.png';
import { updateUserProfileFirestore } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';

const storage = getStorage();
// Storage

export default function Profile() {
    const { user, logOut, getLoggedUserFromLocalStorage } = UserAuth();
    const currentUser = getLoggedUserFromLocalStorage();
    const {equipments, platforms, country, birthday, photoURL} = currentUser;
    const [userChanges, setUserChanges] = useState({
        equipments,
        platforms,
        country,
        birthday,
        photoURL
    });
    const [newPhoto, setNewPhoto] = useState(photoURL);
    const [currentProfilePic, setCurrentProfilePic] = useState(photoURL);
    const [fileType, setFileType] = useState(null);

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [loading, setLoading] = useState();

    const triggerChangeProfilePicture = () => {
        setChangingProfilePicture(true);
    }

    const uploadProfilePicture = async (file, currentUser) => {
        const fileRef = ref(storage, `profile${currentUser.uid}pic.${fileType}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        return url;
    }

    const handleChangeProfilePicture = (e) => {
        const file = e.target.files[0];
        setNewPhoto(file);
        setCurrentProfilePic(URL.createObjectURL(file))
        setFileType(file.type.replace('image/', ''));
    }

    const handleEditProfile = () => {
        setIsEditingProfile(true);
        console.log('editing profile');
    }

    const handleCancelEditProfile = () => {
        setIsEditingProfile(false);
    }

    const updateUserLocalStorage = () => {
        let user = getLoggedUserFromLocalStorage()
        user = {...user, ...userChanges}
        localStorage.setItem('user', JSON.stringify(user));
    }

    const handleSaveEditProfile = async (e) => {
        if (currentProfilePic !== newPhoto) {
            const url = await uploadProfilePicture(newPhoto, currentUser, setLoading);
            setUserChanges({...userChanges, photoURL: url});
        }
        debugger
        await updateUserProfileFirestore(user, userChanges);
        updateUserLocalStorage();
        setIsEditingProfile(false);
    }

    const handlePlatformCheckboxInputChange = (e) => {
        const { name, value, checked } = e.target;
        if(checked && userChanges?.platforms && !userChanges.platforms.includes(value)) {
            setUserChanges({
                ...userChanges,
                platforms: [...userChanges.platforms, value]})
        } else {
            setUserChanges({...userChanges, platforms: userChanges.platforms.filter(platform => platform !== value)})
        }
    }

    const handleEquipmentCheckboxInputChange = (e) => {
        const { name, value, checked } = e.target;
        if(checked && userChanges?.equipments && !userChanges.equipments.includes(value)) {
            setUserChanges({
                ...userChanges,
                equipments: [...userChanges.equipments, value]})
        } else {
            setUserChanges({...userChanges, equipments: userChanges.equipments.filter(platform => platform !== value)})
        }
    }

    const handleEditFormInputChange = (e) => {
        const { name, value, checked } = e.target;
        if (name === 'country') {
            setUserChanges({ ...userChanges, country: value })
        } else if (name === 'birthday') {
            setUserChanges({ ...userChanges, birthday: value })
        }
    }

    const handleCancelUpload = () => {
        setChangingProfilePicture(false);
    }

    return (
        <>
            <div className='flex flex-col min-h-full p-10 max-w-7xl m-auto space-y-10'>
                <div className='flex items-center justify-start space-x-7'>
                    <div className='flex flex-col items-center justify-center space-y-7'>
                        <img className='rounded-md' src={currentProfilePic.replace('=s96-c', '')} width={300} alt={`${currentUser?.displayName} profile picture`}/>
                        {
                            isEditingProfile ?
                            <div className='flex flex-col space-y-3'>
                                <label htmlFor="inputUpdateProfilePic">Upload a new profile picture</label>
                                <input onChange={handleChangeProfilePicture} type='file' placeholder='Upload new profile picture' name='inputUpdateProfilePic' id='inputUpdateProfilePic'/> 
                            </div>
                            :
                            ''
                        }
                    </div>
                    <div className='flex flex-col space-y-3'>
                        
                        <div className='user-name'>
                            <span className='font-bold text-md'> Nome:</span> {currentUser?.displayName}
                        </div>
                        <div>
                            <span className='font-bold text-md'> Email:</span> {currentUser?.email}
                        </div>
                        <div>
                            <span className='font-bold text-md'> Leagues:</span> {currentUser?.leagues ? 
                                currentUser?.leagues?.map((league) => {
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
                                isEditingProfile ? 
                                <div className='flex space-x-5'>
                                    <div className='flex space-x-2'>
                                        <input defaultChecked={currentUser?.platforms?.includes("PC") ? 'checked' : ''} type='checkbox' name='PC' value='PC' id='PC' onChange={handlePlatformCheckboxInputChange}/>
                                        <label htmlFor='PC'>PC</label>
                                    </div>
                                    <div className='flex space-x-2'>
                                        <input defaultChecked={currentUser?.platforms?.includes("Playstation") ? 'checked' : ''} type='checkbox' name='Playstation' value='Playstation' id='Playstation' onChange={handlePlatformCheckboxInputChange}/>
                                        <label htmlFor='Playstation'>Playstation</label>
                                    </div>
                                    <div className='flex space-x-2'>
                                        <input defaultChecked={currentUser?.platforms?.includes("Xbox") ? 'checked' : ''} type='checkbox' name='Xbox' value='Xbox' id='Xbox' onChange={handlePlatformCheckboxInputChange}/>
                                        <label htmlFor='Xbox'>Xbox</label>
                                    </div>
                                </div>
                                :     
                                currentUser?.platforms.length > 0 ? 
                                    currentUser?.platforms?.map((platform) => {
                                        console.log('platform: ', platform)
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
                                    isEditingProfile ? 
                                    <div className='flex space-x-5'>
                                        <div className='flex space-x-2'>
                                            <input defaultChecked={currentUser?.equipments?.includes('mouseKeyboard') ? 'checked' : ''}  type='checkbox' name='Mouse and Keyboard' value='Mouse and Keyboard' id='mouseKeyboard' onChange={handleEquipmentCheckboxInputChange}/>
                                            <label htmlFor='mouseKeyboard'>Mouse / Keyboard</label>
                                        </div>
                                        <div className='flex space-x-2'>
                                            <input defaultChecked={currentUser?.equipments?.includes('Controller') ? 'checked' : ''} type='checkbox' name='Controller' value='Controller' id='Controller' onChange={handleEquipmentCheckboxInputChange}/>
                                            <label htmlFor='Controller'>Controller</label>
                                        </div>
                                        <div className='flex space-x-2'>
                                            <input defaultChecked={currentUser?.equipments?.includes('SteeringWheel') ? 'checked' : ''} type='checkbox' name='Steering Wheel' value='Steering Wheel' id='SteeringWheel' onChange={handleEquipmentCheckboxInputChange}/>
                                            <label htmlFor='SteeringWheel'>Steering Wheel</label>
                                        </div>
                                    </div>
                                    :
                                    currentUser?.equipments.length > 0 ? 
                                    currentUser?.equipments?.map((equipment) => {
                                        return (
                                            <div key={equipment}>
                                                {equipment}
                                            </div>
                                        )
                                    }) : "N/A"
                                }
                            
                        </div>
                        <div>
                            <span className='font-bold text-md'> Country:</span> {isEditingProfile ? 
                                <input className='border' type="text" name="country" id="countryEditInput" onChange={handleEditFormInputChange} value={currentUser?.country || ""} />
                            :
                                currentUser?.country || "N/A"
                            }
                        </div>
                        <div>
                            <span className='font-bold text-md'> Birthday:</span> 
                            {isEditingProfile ? 
                                <input className='border' type="date" name="birthday" id="birthdayEditInput" onChange={handleEditFormInputChange} value={currentUser?.birthday || ""} />
                            :
                                currentUser?.birthday || "N/A"
                            }
                        </div>
                    </div>
                </div>
                {
                    isEditingProfile ? 
                    <>
                        <button  className='border border-gray-300 rounded-md hover:border-black px-5 py-2 max-w-lg m-auto' type='button' onClick={handleSaveEditProfile}>Save changes</button>
                        <button  className='border border-gray-300 rounded-md hover:border-black px-5 py-2 max-w-lg m-auto' type='button' onClick={handleCancelEditProfile}>Cancel</button>
                    </> :
                    <button  className='border border-gray-300 rounded-md hover:border-black px-5 py-2 max-w-lg m-auto' type='button' onClick={handleEditProfile}>Edit Profile</button>
                }
                
                <button  className='border border-gray-300 rounded-md hover:border-black px-5 py-2 text-red-400 max-w-lg m-auto' type='button' onClick={logOut}>Log Out</button>
            </div>
        </>
    )
}
