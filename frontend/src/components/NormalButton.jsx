import React from 'react'

export const NormalButton = ({text, onClick}) => {
  return (
    <button 
      className='
        text-accessible-foreground text-2xl
        bg-accessible-background rounded-xl
        px-4 py-2 font-bold hover:scale-105 
        shadow-xl my-4
      '
      onClick={onClick}
    >
      {text}
    </button>
  )
}