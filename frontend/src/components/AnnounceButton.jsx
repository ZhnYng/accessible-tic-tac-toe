import React from 'react'

export const AnnounceButton = ({board, score, setMessage}) => {
  const announce = (board) => {
    let message = board.map((value, idx) => {
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
        return (` ${value} is in the ${position} box`)
      } else {
        return (` Nothing is in the ${position} box`)
      }
    })
    message += `. The score is X - ${score.xScore} and O - ${score.oScore}`
    setMessage(message)
  }

  return (
    <button 
      className='
      text-accessible-foreground text-2xl
      bg-accessible-background rounded-xl
      px-4 py-2 font-bold hover:scale-105 
      shadow-xl my-4'
      onClick={() => announce(board)}
    >
      Announce
    </button>
  )
}