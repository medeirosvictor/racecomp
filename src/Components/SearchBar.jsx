import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { HiArrowTrendingUp, HiMagnifyingGlass } from 'react-icons/hi2';
import { searchForMatchesFirebase } from '../firebase';
import { tempState$ } from '../utils/legendState';
import { Memo } from "@legendapp/state/react";
import { observable } from '@legendapp/state';


export const SearchBar = ({iconStyles}) => {
    const usersFound$ = observable([]);
    const leaguesFound$ = observable([]);
    const searchString$ = tempState$.searchString;
    const [isTyping, setIsTyping] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        let typingTimeout;

        const handleKeyUp = () => {
          clearTimeout(typingTimeout);
          typingTimeout = setTimeout(async () => {
            setIsTyping(false);
            debugger
            // Perform any action you want when typing stops
            if (searchString$.get().length > 0) {
                setSearching(true);
                const [u, l] = await searchForMatchesFirebase(searchString$.get());
                if (u.length >= 1 || l.length >= 1) {
                    usersFound$.set(u);
                    leaguesFound$.set(l);
                    console.log(searchString$.get())
                    console.log('Search Results: ', usersFound$.get(), leaguesFound$.get());
                }
            }
            setSearching(false);
          }, 1500); // Adjust the delay as needed
        };

        document.addEventListener('keyup', handleKeyUp);

        return () => {
          document.removeEventListener('keyup', handleKeyUp);
          clearTimeout(typingTimeout);
        };
      }, [isTyping]);

    const handleSearchBarInput = async (e) => {
        const searchValue = e.target.value;
        searchString$.set(searchValue);
        setIsTyping(true);
    }

    return (
        <div>
            <div className="flex bg-slate-200 w-full p-2 items-center mx-3 rounded-full">
                <IconContext.Provider value={iconStyles}>
                    <HiMagnifyingGlass />
                </IconContext.Provider>
                <input
                    className="overflow-ellipsis px-1 bg-transparent outline-none w-full"
                    type="text"
                    placeholder="Search for leagues, pilots and more!"
                    onChange={handleSearchBarInput}
                />
            </div>
            <div className='bg-slate-200 border-2 border-slate-800 p-1'>
                {searching ? (
                    <div>searching...</div>
                    ) : (
                    <div className="">
                        {
                            searchString.length >= 1 ?
                            ( <>   
                                <Memo>
                                    {() => (
                                        <div>
                                        Users Found: {usersFound$.get().map((user) => (
                                            <div key={user.displayName}>{user.displayName}</div>
                                        ))}
                                        </div>
                                    )}
                                </Memo>
                                <Memo>
                                    {() => (
                                        <div>
                                        Leagues Found: {leaguesFound$.get().map((league) => (
                                            <div key={league.displayName}>{league.displayName}</div>
                                        ))}
                                        </div>
                                    )}
                                </Memo></>)
                                : (<div></div>)
                        }
                    </div>
                )}
            </div>
        </div>
    )
}
