import React from 'react'
import { UserAuth } from '../context/AuthContext'
import Card from '../Components/Card';

function Home() {
  const { user } = UserAuth();

  return (
    <div>
        <div className='flex text-3xl font-bold underline justify-center'>
            <span className='mr-1'>
              {user ? `${user?.displayName}, `: "Hi, " } welcome to 
            </span>
            <h1 className='text-3xl'>
              RaceComp
            </h1>
            <span>!</span>
        </div>
        <div className='flex flex-col my-3'>
            <div>
                <h2 className='text-2xl underline my-4'>Upcoming Races</h2>
                <div>
                    <Card />
                </div>
            </div>
            <div>
                <h2 className='text-2xl underline my-4'>Leagues</h2>
                <div>
                    <Card />
                </div>
            </div>
            <div>
                <h2 className='text-2xl underline my-4'>Live</h2>
                <div>
                    <Card />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home