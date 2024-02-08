import React, { useEffect } from 'react'
import { getUserById } from '../firebase';
import { tempState$ } from '../utils/legendState';

import {
    useParams
  } from 'react-router-dom';
import { useSelector } from '@legendapp/state/react';

export default function PublicProfile() {
    let urlParams = useParams();
    const useruid = urlParams.useruid;
    console.log(urlParams)
    const user$ = tempState$.publicUserProfile
    const user = useSelector(user$);

    useEffect(() => {

        const fetchData = async() => {

            try {
                user$.set(getUserById(useruid))
                console.log(user)
            } catch(err) {
                console.error(err);
            }
        };

        fetchData();

    }, []);

  return (
    <>
    {user?.displayName ? 
    <div className='flex flex-col min-h-full p-5 max-w-7xl m-auto space-y-10'>
        <div className='flex flex-col items-center justify-start lg:space-x-7 space-y-7 lg:flex-row lg:justify-center'>
            <div className='flex flex-col items-center justify-center space-y-7'>
                <img className='rounded-md object-cover h-[400px] w-[400px]' src={user?.photoURL.replace('=s96-c', '')} width={400} height={400} alt={`${user?.displayName} profile picture`}/>
            </div>
            <div className='flex flex-col space-y-3 lg:min-w-[500px] min-h-[400px]'> 
                <div className='user-name'>
                    <span className='font-bold text-md'> Name:</span> {user?.displayName}
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
                        user?.platforms.length > 0 ? 
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
                            user?.equipments.length > 0 ? 
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
                    <span className='font-bold text-md'>Games: </span>
                        {

                            user?.games.length > 0 ? 
                            user?.games?.map((game) => {
                                return (
                                    <div key={game}>
                                        {game}
                                    </div>
                                )
                            }) : "N/A"
                        }
                    
                </div>
                <div>
                    <span className='font-bold text-md'> Country:</span>
                      {user?.country}
                </div>
                <div>
                    <span className='font-bold text-md'> Birthday: </span> 
                        {user?.birthday}
                </div>
            </div>
        </div>
    </div>
: <div>dale</div>}
</>
  )
}
