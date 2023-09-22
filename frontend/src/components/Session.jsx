import React from 'react';
import axios from 'axios';

const Session = ({ sessionData }) => {
  const [playerOneName, setPlayerOneName] = React.useState('');
  const [playerTwoName, setPlayerTwoName] = React.useState('');
  const [winner, setWinner] = React.useState('');
  
  React.useEffect(() => {
    axios.get(`/getUser/${sessionData.player_one}`)
      .then(res => {
        setPlayerOneName(res.data.username)
      })
      .catch(err => console.log(err))

    axios.get(`/getUser/${sessionData.player_two}`)
      .then(res => {
        setPlayerTwoName(res.data.username)
      })
      .catch(err => console.log(err))
    }, [])
    
  React.useEffect(() => {
    setWinner(getWinner(sessionData.player_one_score, sessionData.player_two_score, playerOneName, playerTwoName))
  }, [playerOneName, playerTwoName])

  function getWinner(p1_score, p2_score, p1_name, p2_name){
    if(p1_score > p2_score){
      return p1_name
    }else if(p1_score == p2_score){
      return
    }else{
      return p2_name
    }
  }

  return (
    <button className="
      bg-accessible-foreground border-2 rounded-lg 
      text-accessible-background shadow-lg p-4
      text-xl max-w-xl m-6 flex flex-col lg:w-2/3 xl:w-2/3 w-full"
    >
      {
        winner ?
        <h2 className='font-bold mb-4 mr-4'>{winner} won!</h2>
        :
        <h2 className='font-bold mb-4 mr-4'>Draw!</h2>
      }
      <div className='flex justify-evenly w-full'>
        <div className='flex flex-col justify-center'>
          <p className="mb-1">{playerOneName}</p>
          <p className="mb-1">{sessionData.player_one_score}</p>
        </div>
        <span>-</span>
        <div className='flex flex-col justify-center'>
          <p className="mb-1">{playerTwoName}</p>
          <p className="mb-1">{sessionData.player_two_score}</p>
        </div>
      </div>
      <h2 className="text-sm font-medium mt-8 self-end">{sessionData.room_code}</h2>
    </button>
  );
};

export default Session;