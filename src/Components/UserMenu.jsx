import { IconContext } from 'react-icons';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { BiBell } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { translation } from '../constants/translation/en';
import { logOut } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { state$ } from '../utils/legendState';
import defaultProfilePic from '../assets/images/pilot-profile-img.png';


export const UserMenu = ({ iconStyles }) => {
    const user = state$.user.get();

    const navigate = useNavigate();

    const handleSignOut = () => {
        try {
            logOut();
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className="dropdown dropdown-end mx-3 cursor-pointer">
                <button tabIndex={0}>
                    <IconContext.Provider value={iconStyles}>
                        <BiBell />
                    </IconContext.Provider>
                </button>
                <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li>{translation.NOTIFICATIONS}</li>
                </ul>
            </div>

            <div className="dropdown dropdown-end mx-3 cursor-pointer">
                <button tabIndex={0}>
                    <IconContext.Provider value={iconStyles}>
                        <AiOutlinePlusSquare />
                    </IconContext.Provider>
                </button>
                <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li>
                        <NavLink to="/create-league">
                            {translation.CREATE_LEAGUE}
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className="dropdown dropdown-end mx-3 cursor-pointer flex-shrink-0 flex-grow-0">
                <button tabIndex={0}>
                    <img className='rounded-full w-[60px] h-[60px] border-2 border-red-700 hover:border-red-950 object-cover' 
                    src={user.photoURL || defaultProfilePic} alt="Current user profile picture" />
                </button>
                <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li>
                        <NavLink to="/leagues">{translation.MY_LEAGUES}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile">{translation.PROFILE}</NavLink>
                    </li>
                    <li>
                    <button
                        className="rounded-md text-red-500 px-5 py-2"
                        type="button"
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </button>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default UserMenu;
