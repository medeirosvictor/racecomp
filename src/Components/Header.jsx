import React from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { FaRegIdCard } from 'react-icons/fa6'
import { BiMessageSquareDetail, BiBell } from 'react-icons/bi'
import { IconContext } from 'react-icons';
import logo from '../assets/images/formula-flag.png'
import { Link } from 'react-router-dom';


function Header() {
  let iconStyles = { size: "1.7em", className: "text-gray-500 hover:text-gray-700 m-1 align-middle" };

  return (
    <>
      <header>
        <nav className='flex items-center mx-auto space-around p-2'>
          <div className='cursor-pointer'>
            <img src={logo} alt="racecomp flag logo" width={128} />
          </div>

          <div className='flex bg-slate-200 w-full p-2 items-center mx-3 rounded-full'>
            <IconContext.Provider value={iconStyles}>
              <HiMagnifyingGlass />
            </IconContext.Provider>
            <input className='overflow-ellipsis px-1 bg-transparent outline-none w-full' type="text" placeholder='Search for leagues, pilots and more!' />
          </div>
          <div className='mx-3 cursor-pointer'>
            <IconContext.Provider value={iconStyles}>
              <BiBell />
            </IconContext.Provider>
          </div>
          <div className='mx-3 cursor-pointer'>
            <IconContext.Provider value={iconStyles}>
              <BiMessageSquareDetail/>
            </IconContext.Provider>
          </div>
          <button className='mx-3 cursor-pointer' id="dropdownDefaultButton" data-dropdown-toggle="dropdown">
            <IconContext.Provider value={iconStyles}>
              <FaRegIdCard/>
            </IconContext.Provider>
          </button>
          <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  Profile
                </li>
                <li>
                  Leagues
                </li>
                <li>
                  Settings
                </li>
                <li>
                  Login / Log out
                </li>
              </ul>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header