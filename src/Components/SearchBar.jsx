import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { HiArrowTrendingUp, HiMagnifyingGlass } from 'react-icons/hi2';
import { searchForMatchesFirebase } from '../firebase';
import { tempState$ } from '../utils/legendState';
import { Memo, useSelector } from "@legendapp/state/react";
import { observable } from '@legendapp/state';
import SearchResult from './SearchResult';


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
            <div className="flex flex-wrap bg-slate-200 w-full p-2 items-center mx-3 rounded-full relative">
                <div className='flex w-full justify-start'>
                    <input
                        className="overflow-ellipsis px-1 bg-transparent outline-none w-full"
                        type="text"
                        placeholder="Search for leagues, pilots and more!"
                        onChange={handleSearchBarInput}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className={`bg-white min-h-[150px] w-full p-3 absolute top-[40px] rounded-md z-10 shadow-md ${searchString$.get().length > 1 ? '' : 'hidden'}`}>
                    <div className="">
                        {usersFound.map((user) => (
                            <SearchResult result={user} key={user.displayName}>{user.displayName}</SearchResult>
                        ))}
                        {leaguesFound.map((league) => (
                            <SearchResult result={league} key={league.displayName}>{league.displayName}</SearchResult>
                        ))}
                    </div>
                </div>
            </div>

            {/* MAYBE: Implementar um spinner enquanto digitando talvez */}

            
        </div>
    )
}
