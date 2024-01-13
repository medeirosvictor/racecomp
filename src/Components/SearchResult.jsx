import React from 'react'
import { NavLink } from 'react-router-dom'

function SearchResult({result}) {
    console.log(result)
  return (
    // Make link to public profile page
    <div>
        <NavLink to={`/profile/${result.uid}`}>
            {result.displayName}
        </NavLink>
    </div>
  )
}

export default SearchResult