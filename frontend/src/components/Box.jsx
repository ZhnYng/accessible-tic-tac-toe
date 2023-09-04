import React from 'react'

export const Box = ({value, onClick, idx, xTurn}) => {
  const [message, setMessage] = React.useState(null)
  
  const boxStatus = (value, idx, xTurn) => {
    let position = ''
    switch(idx){
      case 0: 
        position = 'top left' 
        break;
      case 1: 
        position = 'top center' 
        break;
      case 2: 
        position = 'top right' 
        break;
      case 3: 
        position = 'middle left' 
        break;
      case 4: 
        position = 'center' 
        break;
      case 5: 
        position = 'middle right' 
        break;
      case 6: 
        position = 'bottom left' 
        break;
      case 7: 
        position = 'bottom center' 
        break;
      case 8: 
        position = 'bottom right' 
        break;
    }
    if(value){
      setMessage(`${value} is in this ${position} box`)
    } else {
      setMessage(`Add ${xTurn ? 'X' : 'O'} in this ${position} box`)
    }
  }

  return (
    <button 
      className='
        bg-white border-none rounded-2xl
        shadow-lg w-28 h-28 text-5xl
        font-bold m-2 text-accessible-foreground
        hover:shadow-2xl hover:scale-105 transition
      '
      onClick={() => {
        setMessage(null)
        onClick()
      }}
      onFocus={() => boxStatus(value, idx, xTurn)}
      onBlur={() => setMessage(null)}
    >
      {message ? <p className='text-sm m-2'>{message}</p> : value}
    </button>
  )
}