import React from 'react'

export const Announcement = ({message, setMessage}) => {
  return (
    <div 
      className='
      absolute bottom-10 left-10 bg-accessible-background
      rounded-xl p-7 max-w-xl flex-col flex
    '>
      <button 
        className='text-accessible-foreground 
        text-lg font-medium text-left'
        autoFocus
      >
        {message}
      </button>
      <button 
        className='
        text-accessible-background text-xl
        bg-accessible-foreground rounded-xl
        px-4 py-2 font-bold hover:scale-105 
        shadow-xl self-end'
        onClick={() => setMessage('')}
      >
        Close
      </button>
    </div>
  )
}