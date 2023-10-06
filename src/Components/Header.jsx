import React from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { FaRegIdCard } from 'react-icons/fa6'
import { BiMessageSquareDetail, BiBell } from 'react-icons/bi'
import { IconContext } from 'react-icons';

function Header() {
  let iconStyles = { size: "1.7em", className: "text-gray-500 hover:text-gray-700 m-1 align-middle" };

  return (
    <>
      <header>
        <nav className='flex items-center mx-auto space-around p-2'>
          <div className=''>Logo?</div>
          <div className='flex bg-slate-200 w-full p-2 items-center mx-5 rounded-full'>
            <IconContext.Provider value={iconStyles}>
              <HiMagnifyingGlass />
            </IconContext.Provider>
            <input className='bg-transparent outline-none w-full' type="text" placeholder='Search for leagues, pilots and more!' />
          </div>
          <div className='mx-3'>
            <IconContext.Provider value={iconStyles}>
              <BiBell />
            </IconContext.Provider>
          </div>
          <div className='mx-3'>
            <IconContext.Provider value={iconStyles}>
              <BiMessageSquareDetail/>
            </IconContext.Provider>
          </div>
          <div className='mx-3'>
            <IconContext.Provider value={iconStyles}>
              <FaRegIdCard/>
            </IconContext.Provider>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header