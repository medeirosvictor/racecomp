import { IconContext } from 'react-icons';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { BiBell } from 'react-icons/bi';
import { FaRegIdCard } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import { translation } from '../constants/translation/en';

export const User = ({ iconStyles }) => {
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
                        <NavLink to="/leagues">
                            {translation.CREATE_LEAGUE}
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className="dropdown dropdown-end mx-3 cursor-pointer">
                <button tabIndex={0}>
                    <IconContext.Provider value={iconStyles}>
                        <FaRegIdCard />
                    </IconContext.Provider>
                </button>
                <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li>
                        <NavLink to="/profile">{translation.PROFILE}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/leagues">{translation.LEAGUES}</NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default User;
