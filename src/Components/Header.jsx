import { HiMagnifyingGlass } from 'react-icons/hi2';
import { FaRegIdCard } from 'react-icons/fa6';
import { BiBell } from 'react-icons/bi';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import logo from '../assets/images/formula-flag.png'
import { NavLink, useNavigate  } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { translation } from '../constants/translation/en';



const Header = () => {
    const iconStyles = { size: "1.7em", className: "text-gray-500 hover:text-gray-700 m-1 align-middle" };
    const { user } = UserAuth();
    const navigate = useNavigate ();

  return (
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
        {
            user ? 
            <>
                <div className="dropdown dropdown-end mx-3 cursor-pointer">
                    <button tabIndex={0}>
                        <IconContext.Provider value={iconStyles}>
                            <BiBell />
                        </IconContext.Provider>
                    </button>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            {translation.NOTIFICATIONS}
                        </li>
                    </ul>
                </div>

                <div className="dropdown dropdown-end mx-3 cursor-pointer">
                    <button tabIndex={0}>
                        <IconContext.Provider value={iconStyles}>
                            <AiOutlinePlusSquare/>
                        </IconContext.Provider>
                    </button>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                        <NavLink to='/leagues'>{translation.CREATE_LEAGUE}</NavLink>
                        </li>
                    </ul>
                </div>

                <div className="dropdown dropdown-end mx-3 cursor-pointer">
                    <button tabIndex={0}>
                        <IconContext.Provider value={iconStyles}>
                            <FaRegIdCard/>
                        </IconContext.Provider>
                    </button>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <NavLink to='/profile'>{translation.PROFILE}</NavLink>
                        </li>
                        <li>
                            <NavLink to='/leagues'>{translation.LEAGUES}</NavLink>
                        </li>
                    </ul>
                </div>
            </>
            :
            <div>
                <NavLink to='/login'> {translation.LOGIN} </NavLink>
            </div>
        }
          
        </nav>
      </header>
  )
}

export default Header