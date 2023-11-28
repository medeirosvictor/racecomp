import React from 'react';
import { IconContext } from 'react-icons';
import { HiArrowTrendingUp, HiMagnifyingGlass } from 'react-icons/hi2';
import { searchForMatchesFirebase } from '../firebase';
import { tempState$ } from '../utils/legendState';
import { Memo } from "@legendapp/state/react";
import { observable } from '@legendapp/state';


export const SearchBar = ({iconStyles}) => {
    const usersFound$ = observable([]);
    const leaguesFound$ = observable([]);
    const searching$ = observable(false);
    const searchDone$ = observable(false);

    console.log(usersFound$.get().length >= 1 || leaguesFound$.get().length >= 1)
    const handleSearchBarInput = async (e) => {
        const searchValue = e.target.value;
        if (searchValue.length > 1) {
            if (!searching$.get()) {
                searching$.set(true);
            }
            const [u, l] = await searchForMatchesFirebase(searchValue);
            if (u.length >= 1 || l.length >= 1) {
                usersFound$.set(u);
                leaguesFound$.set(l);
                console.log('Search Results: ', usersFound$.get(), leaguesFound$.get());
            }
        }
    }

    return (
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

            {
                searching$.get() ?
                <div>
                    searching... </div>
                    :
                <div>

                    <Memo>
                    {
                        () => <div>Users Found: {usersFound$.get().map((user) => {

                            return (
                                <div key={user.displayName}>
                                    {user.displayName}
                                </div>
                            )
                        })}</div>
                        
                    }
                    </Memo>
                    <Memo>
                    {
                        () => <div>Leagues Found: {leaguesFound$.get().map((league) => {

                            return (
                                <div key={league.displayName}>
                                    {league.displayName}
                                </div>
                            )
                        })}</div>
                        
                    }
                    </Memo>
                </div>
            }
        </div>
    )
}
