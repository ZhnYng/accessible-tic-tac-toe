import React from 'react'

export const Scoreboard = ({score, xTurn}) => {
  const {xScore, oScore} = score;
  return (
    <div className='my-6'>
      <h4 className='
        text-2xl font-bold text-accessible-background
        my-2 underline text-center
      '>
        Score
      </h4>
      <div className='
        flex flex-row items-center
        justify-evenly w-80 text-2xl 
        bg-white shadow-xl
        rounded-xl font-bold py-4
      '>
        <span className='
          text-accessible-foreground
        '>
          X - {xScore}
        </span>
        <span className='
          text-accessible-foreground
        '>
          O - {oScore}
        </span>
      </div>
    </div>
  )
}