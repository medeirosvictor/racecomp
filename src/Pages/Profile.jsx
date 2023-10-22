import { useState } from 'react';
import { getDownloadURL, getStorage } from 'firebase/storage';
import { updateUserProfileFirestore } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { CountryDropdown } from 'react-country-region-selector';
import { useNavigate } from 'react-router-dom';
import { state$, tempState$ } from '../utils/legendState';
import { logOut, deleteUserAccount } from '../firebase';
import defaultProfilePic from '../assets/images/pilot-profile-img.png';

const storage = getStorage();

export default function Profile() {
    const currentUser = state$.user.get();
    const userChanges = tempState$.userChanges.get();
    const { photoURL } = currentUser;
    const [newPhoto, setNewPhoto] = useState(photoURL);
    const [currentProfilePic, setCurrentProfilePic] = useState(photoURL);
    const [fileType, setFileType] = useState(null);
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    const navigate = useNavigate();

    const uploadProfilePicture = async (file, currentUser) => {
        const fileRef = ref(storage, `userProfileImages/profile${currentUser.uid}pic.${fileType}`);
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
    }

    const handleCancelEditProfile = () => {
        setIsEditingProfile(false);
    }

    const handleSaveEditProfile = async () => {
        if (currentProfilePic !== newPhoto) {
            const url = await uploadProfilePicture(newPhoto, currentUser);
            tempState$.userChanges.photoURL.set(url);
            state$.user.photoURL.set(url);
        }
        state$.user.set((user) => ({...user, ...userChanges}));
        await updateUserProfileFirestore(state$.user.get(), userChanges);
        setIsEditingProfile(false);
    }

    const handlePlatformCheckboxInputChange = (e) => {
        const { value, checked } = e.target;
        const userChangesPlatforms = userChanges.platforms || [];
        if(checked && userChangesPlatforms && !userChangesPlatforms.includes(value)) {
            tempState$.userChanges.platforms.set([...userChangesPlatforms, value]);
           
        } else {
            tempState$.userChanges.platforms.set(userChanges.platforms.filter(platform => platform !== value))
        }
    }

    const handleEquipmentCheckboxInputChange = (e) => {
        const { value, checked } = e.target;
        const userChangesEquipments = userChanges.equipments || [];
        if(checked && userChangesEquipments && !userChangesEquipments.includes(value)) {
            tempState$.userChanges.equipments.set([...userChangesEquipments, value]);
           
        } else {
            tempState$.userChanges.equipments.set(userChanges.equipments.filter(equipment => equipment !== value))
        }
    }

    const handleEditFormInputChange = (e) => {
        if (e.target) {
            const { name, value } = e.target;
            if (name === 'birthday') {
                tempState$.userChanges.birthday.set(value)
            }
        } else {
            tempState$.userChanges.country.set(e)
        }
    }

    const handleSignOut = () => {
        try {
            logOut();
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    };

    const handleDeleteAccount = async () => {
        console.log("deleting account");
        await deleteUserAccount(currentUser);
        navigate('/');
    }

    return (
        <>
            <div className='flex flex-col min-h-full p-5 max-w-7xl m-auto space-y-10'>
                <div className='flex flex-col items-center justify-start lg:space-x-7 space-y-7 lg:flex-row lg:justify-center'>
                    <div className='flex flex-col items-center justify-center space-y-7'>
                        <img className='rounded-md object-cover h-[400px] w-[400px]' src={currentProfilePic.replace('=s96-c', '') || defaultProfilePic} width={400} height={400} alt={`${currentUser?.displayName} profile picture`}/>
                        {
                            isEditingProfile ?
                            <div className='flex flex-col space-y-3'>
                                <label className='font-bold ' htmlFor="inputUpdateProfilePic">Upload a new profile picture: </label>
                                <input onChange={handleChangeProfilePicture} type='file' placeholder='Upload new profile picture' name='inputUpdateProfilePic' id='inputUpdateProfilePic'/> 
                            </div>
                            :
                            ''
                        }
                    </div>
                    <div className='flex flex-col space-y-3 lg:min-w-[500px] min-h-[400px]'> 
                        <div className='user-name'>
                            <span className='font-bold text-md'> Name:</span> {currentUser?.displayName}
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
                                            <input defaultChecked={currentUser?.equipments?.includes('Mouse and Keyboard') ? 'checked' : ''}  type='checkbox' name='Mouse and Keyboard' value='Mouse and Keyboard' id='mouseKeyboard' onChange={handleEquipmentCheckboxInputChange}/>
                                            <label htmlFor='mouseKeyboard'>Mouse / Keyboard</label>
                                        </div>
                                        <div className='flex space-x-2'>
                                            <input defaultChecked={currentUser?.equipments?.includes('Controller') ? 'checked' : ''} type='checkbox' name='Controller' value='Controller' id='Controller' onChange={handleEquipmentCheckboxInputChange}/>
                                            <label htmlFor='Controller'>Controller</label>
                                        </div>
                                        <div className='flex space-x-2'>
                                            <input defaultChecked={currentUser?.equipments?.includes('Steering Wheel') ? 'checked' : ''} type='checkbox' name='Steering Wheel' value='Steering Wheel' id='SteeringWheel' onChange={handleEquipmentCheckboxInputChange}/>
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
                            <span className='font-bold text-md'>Games: </span>
                                {
                                    isEditingProfile ? 
                                    <div className='flex space-x-5'>
                                        <div className='flex space-x-2'>
                                        <input defaultChecked={currentUser?.games?.includes("F1") ? 'checked' : ''} type='checkbox' name='F1' value='F1' id='F1' onChange={handlePlatformCheckboxInputChange}/>
                                        <label htmlFor='PC'>F1</label>
                                    </div>
                                    <div className='flex space-x-2'>
                                        <input defaultChecked={currentUser?.games?.includes("Gran Turismo") ? 'checked' : ''} type='checkbox' name='Gran Turismo' value='Gran Turismo' id='Gran Turismo' onChange={handlePlatformCheckboxInputChange}/>
                                        <label htmlFor='Playstation'>Gran Turismo</label>
                                    </div>
                                    <div className='flex space-x-2'>
                                        <input defaultChecked={currentUser?.games?.includes("iRacing") ? 'checked' : ''} type='checkbox' name='iRacing' value='iRacing' id='iRacing' onChange={handlePlatformCheckboxInputChange}/>
                                        <label htmlFor='Xbox'>iRacing</label>
                                    </div>
                                    </div>
                                    :
                                    currentUser?.games.length > 0 ? 
                                    currentUser?.games?.map((game) => {
                                        return (
                                            <div key={game}>
                                                {game}
                                            </div>
                                        )
                                    }) : "N/A"
                                }
                            
                        </div>
                        <div>
                            <span className='font-bold text-md'> Country:</span> {isEditingProfile ? 
                                <CountryDropdown
                                    className='border'
                                    value={userChanges.country}
                                    onChange={handleEditFormInputChange}
                                    priorityOptions={["BR", "CA"]} />
                            :
                                currentUser?.country || "N/A"
                            }
                        </div>
                        <div>
                            <span className='font-bold text-md'> Birthday: </span> 
                            {isEditingProfile ? 
                                <input className='border' type="date" name="birthday" id="birthdayEditInput" onChange={handleEditFormInputChange} value={currentUser?.birthday || userChanges.birthday || ''} />
                            :
                                currentUser?.birthday || "N/A"
                            }
                        </div>
                    </div>
                </div>
                <div className='action-buttons flex flex-col space-x-7 space-y-5 items-center justify-center'>
                    {
                        isEditingProfile ? 
                        <div className='flex space-x-7 items-center justify-center'>
                            <button  className='border border-gray-300 rounded-md hover:border-green-700 px-5 py-2' type='button' onClick={handleSaveEditProfile}>Save changes</button>
                            <button  className='border border-gray-300 rounded-md hover:border-red-400 px-5 py-2' type='button' onClick={handleCancelEditProfile}>Cancel</button>
                        </div> :
                        <button  className='border border-gray-300 rounded-md hover:border-black px-5 py-2 max-w-lg m-auto' type='button' onClick={handleEditProfile}>Edit Profile</button>
                    }
                    <div className='flex space-x-4 max-w-lg m-auto items-center justify-center'>
                        <button  className='border border-gray-300 rounded-md hover:border-black px-5 py-2 text-red-500' type='button' onClick={handleSignOut}>Log Out</button>
                        <button  className='border border-gray-300 rounded-md hover:border-black px-5 py-2 text-white bg-red-300 hover:bg-red-700' type='button' onClick={handleDeleteAccount}>Delete Account</button>
                    </div>
                </div>

            </div>
        </>
    )
}
