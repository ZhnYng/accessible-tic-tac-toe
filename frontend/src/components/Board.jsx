import React from 'react'
import { Box } from './Box'

export const Board = ({board, onClick, gameOver, xTurn}) => {
  return (
    <div className='
      grid grid-cols-3 place-items-center
      justify-center max-w-md max-h-96
    '>
      {board.map((value, idx) => {
        return (
          <Box 
            key={idx}
            value={value} 
            onClick={() => (value === null || gameOver === true) && onClick(idx)} 
            idx={idx}
            xTurn={xTurn}
          />
        )
      })}
    </div>
  )   
}