import React from 'react'
import { UserAuth } from '../context/AuthContext'

function Home() {
  const { user } = UserAuth();

  return (
    <div>
      <div className='flex text-3xl font-bold underline'>
          <span className='mr-1'>
            {user ? `${user?.displayName}, `: "Hi, " } welcome to 
          </span>
          <h1 className='text-3xl'>
            RaceComp
          </h1>
          <span>!</span>
        </div>
    </div>
  )
}

export default Home