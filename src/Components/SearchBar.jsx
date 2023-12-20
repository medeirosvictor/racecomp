import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { HiArrowTrendingUp, HiMagnifyingGlass } from 'react-icons/hi2';
import { searchForMatchesFirebase } from '../firebase';
import { tempState$ } from '../utils/legendState';
import { Memo, useSelector } from "@legendapp/state/react";
import { observable } from '@legendapp/state';


export const SearchBar = ({iconStyles}) => {
    const usersFound$ = tempState$.usersFound;
    const leaguesFound$ = tempState$.leaguesFound;
    const searchString$ = tempState$.searchString;

    const usersFound = useSelector(usersFound$);
    const leaguesFound = useSelector(leaguesFound$);

    const handleSearchBarInput = async (e) => {
        const searchValue = e.target.value;
        searchString$.set(searchValue);
        if (searchString$.get().length > 1) {
            const [u, l] = await searchForMatchesFirebase(searchString$.get());
            if (u.length >= 1 || l.length >= 1) {
                usersFound$.set(u);
                leaguesFound$.set(l);
                console.log(searchString$.get())
                console.log('Search Results: ', usersFound$.get(), leaguesFound$.get());
            }
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace' && searchString$.get().length === 0) {
            console.log('Backspace pressed');
            usersFound$.set([]);
            leaguesFound$.set([]);
        }
    }

    return (
        <div className='md:min-w-[80%]'>
            <div className="flex bg-slate-200 w-full p-2 items-center mx-3 rounded-full">
                <IconContext.Provider value={iconStyles}>
                    <HiMagnifyingGlass />
                </IconContext.Provider>
                <input
                    className="overflow-ellipsis px-1 bg-transparent outline-none w-full"
                    type="text"
                    placeholder="Search for leagues, pilots and more!"
                    onChange={handleSearchBarInput}
                    onKeyDown={handleKeyDown}
                />
            </div>

            {/* Implementar um spinner enquanto digitando */}

            <div className={`bg-slate-200 border-2 border-slate-800 p-1 `}>
                    <div className="">
                        {usersFound.map((user) => (
                                        <div key={user.displayName}>{user.displayName}</div>
                        ))}
                        {leaguesFound.map((league) => (
                            <div key={league.displayName}>{league.displayName}</div>
                        ))}
                    </div>
            </div>
        </div>
    )
}
