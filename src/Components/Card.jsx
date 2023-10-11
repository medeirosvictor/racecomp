import React from 'react'

const  Card = () => {

  return (
    <div style={{ backgroundImage: "url('src/assets/images/track-placeholder.jpg')" }} className=' flex flex-col border border-gray p-3 rounded-md max-w-md min-h-[200px] justify-start bg-cover'>
      <div className='backdrop-blur-md backdrop-grayscale-0 bg-white/30 p-2 rounded w-80 h-28'>
        <p className='text-2xl'>card title</p>
        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate fuga incidunt!</p>
      </div>
        {/* background image with info on the left or right */}
    </div>
  )
}
export default Card