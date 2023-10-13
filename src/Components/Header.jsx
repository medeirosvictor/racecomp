import { IconContext } from 'react-icons';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/images/formula-flag.png';
import { translation } from '../constants/translation/en';
import { UserAuth } from '../context/AuthContext';
import UserMenu from './UserMenu';

const Header = () => {
    const iconStyles = {
        size: '1.7em',
        className: 'text-gray-500 hover:text-gray-700 m-1 align-middle',
    };
    const { getLoggedUserFromLocalStorage } = UserAuth();
    const currentUser = getLoggedUserFromLocalStorage();

    const navigate = useNavigate();

    return (
        <header>
            <nav className="flex items-center mx-auto space-around p-2">
                <div className="cursor-pointer" onClick={() => navigate('/')}>
                    <img src={logo} alt="racecomp flag logo" width={128} />
                </div>
                <div className="flex bg-slate-200 w-full p-2 items-center mx-3 rounded-full">
                    <IconContext.Provider value={iconStyles}>
                        <HiMagnifyingGlass />
                    </IconContext.Provider>
                    <input
                        className="overflow-ellipsis px-1 bg-transparent outline-none w-full"
                        type="text"
                        placeholder="Search for leagues, pilots and more!"
                    />
                </div>
                {currentUser ? (
                    <UserMenu iconStyles />
                ) : (
                    <div>
                        <NavLink to="/login"> {translation.LOGIN} </NavLink>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
