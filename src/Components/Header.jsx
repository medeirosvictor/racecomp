import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/images/formula-flag.png';
import { translation } from '../constants/translation/en';
import UserMenu from './UserMenu';
import { state$ } from '../utils/legendState';
import { SearchBar } from './SearchBar';

const Header = () => {
    const iconStyles = {
        size: '1.7em',
        className: 'text-gray-500 hover:text-gray-700 m-1 align-middle',
    };
    const user = state$.user.get();
    const navigate = useNavigate();

    return (
        <header>
            <nav className="flex items-center flex-1 p-2">
                <div className="cursor-pointer" onClick={() => navigate('/')}>
                    <img src={logo} alt="racecomp flag logo" width={128} />
                </div>
                <SearchBar iconStyles={iconStyles} />
                
                {user?.displayName ? (
                    <UserMenu iconStyles={iconStyles} />
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
