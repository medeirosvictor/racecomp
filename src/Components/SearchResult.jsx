import React from 'react'

function SearchResult({result}) {
  return (
    // Make link to public profile page
    <div>
        {result.displayName}
    </div>
  )
}

export default SearchResult