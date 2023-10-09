import React from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { FaRegIdCard } from 'react-icons/fa6'
import { BiMessageSquareDetail, BiBell } from 'react-icons/bi'
import { IconContext } from 'react-icons';
import logo from '../assets/images/formula-flag.png'
import { Link, NavLink, useNavigate  } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';


function Header() {
    const iconStyles = { size: "1.7em", className: "text-gray-500 hover:text-gray-700 m-1 align-middle" };
    const { user } = UserAuth()
    const navigate = useNavigate ()

  return (
    <>
      <header>
        <nav className='flex items-center mx-auto space-around p-2'>
          <div className='cursor-pointer' onClick={() => navigate('/')}>
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
          <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 p-2">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                {user ? 
                  <>
                    <li>
                        <NavLink to='/profile'>Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to='/leagues'>Leagues</NavLink>
                    </li>
                  </>
                : 
                  <li>
                    <NavLink to='/login'>Login / Log out</NavLink>
                  </li>
                }
              </ul>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header