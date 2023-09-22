import React, { useState, useRef } from 'react'
import { Board } from '../components/Board'
import { Scoreboard } from '../components/Scoreboard';
import { NormalButton } from '../components/NormalButton';
import { AnnounceButton } from '../components/AnnounceButton';
import { Announcement } from '../components/Announcement';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket.js';
import axios from 'axios';

function Game() {
  const winConditions = [
    // Rows
    [0, 1, 2], // Top Row
    [3, 4, 5], // Middle Row
    [6, 7, 8], // Bottom Row
  
    // Columns
    [0, 3, 6], // Left Column
    [1, 4, 7], // Middle Column
    [2, 5, 8], // Right Column
  
    // Diagonals
    [0, 4, 8], // Top-left to Bottom-right Diagonal
    [2, 4, 6]  // Top-right to Bottom-left Diagonal
  ];  

  const [board, setBoard] = useState(Array(9).fill(null))
  const [xTurn, setXTurn] = useState(true)
  const [score, setScore] = useState({xScore: 0, oScore: 0})
  const [gameOver, setGameOver] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  React.useEffect(() => {
    localStorage.getItem('roomCode') ? null : navigate('/')

    // axios
    //   .post("/addSession", {
    //     user1_id: localStorage.getItem('user1Id'),
    //     user2_id: localStorage.getItem('user2Id'),
    //     session: localStorage.getItem('roomCode'),
    //     start_time: new Date()
    //   })
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((err) => alert(err));
  }, [])

  React.useEffect(() => {
    axios.post('/updateResult', {
      roomCode: localStorage.getItem('roomCode'),
      playerOne: localStorage.getItem('user1Id'),
      playerOneScore: score.xScore,
      playerTwo: localStorage.getItem('user2Id'),
      playerTwoScore: score.oScore
    })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }, [score.xScore, score.oScore])
  
  const isFirstRender = useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      setMessage(`${!xTurn ? 'X' : 'O'} won! The score is X - ${score.xScore} and O - ${score.oScore}`);
    }
  }, [score.xScore, score.oScore]);

  React.useEffect(() => {
    socket.emit('status', {
      board: board,
      xTurn: xTurn,
      score: score,
      gameOver: gameOver,
      roomCode: localStorage.getItem('roomCode')
    })

    socket.on('status', e => {
      setBoard(e.board)
      setXTurn(e.xTurn)
      setScore(e.score)
      setGameOver(e.gameOver)
    })
  }, [xTurn, gameOver])

  const handleBoxClick = (boxIdx) => {
    const updatedBoard = board.map((value, idx) => {
      if(idx === boxIdx){
        return xTurn ? 'X' : 'O';
      } else {
        return value;
      }
    })

    const winner = checkWinner(updatedBoard)
    if(winner){
      if(winner === 'O'){
        setScore((score) => {return {...score, oScore: score.oScore + 1}})
      }else{
        setScore((score) => {return {...score, xScore: score.xScore + 1}})
      }
    }
    setBoard(updatedBoard)
    setXTurn(!xTurn)
  }

  const checkWinner = (board) => {
    for(const winCondition of winConditions){
      const [x, y, z] = winCondition;
      if(board[x] && board[x] === board[y] && board[y] === board[z]){ // By interating through all possible combinations, if all rows is taken up by either X or O, they win
        setGameOver(true);
        updateResults()
        return board[x];
      }else if(board.every(element => element !== null)){
        setGameOver(true);
        setMessage(`Draw!`);
      }
    }
  }

  const resetBoard = () => {
    setGameOver(false)
    setBoard(Array(9).fill(null))
  }

  const updateResults = () => {
    // axios.get(`/getSessions/${localStorage.getItem('userId')}`)
    //   .then(res => {
    //     console.log(res.data.slice(-1)[0].session_id, xTurn ? localStorage.getItem('user1Id') : localStorage.getItem('user2Id'))
    //     axios
    //       .post("/addResults", {
    //         session_id: res.data.slice(-1)[0].session_id,
    //         winner_id: xTurn ? localStorage.getItem('user1Id') : localStorage.getItem('user2Id')
    //       })
    //       .then((res) => {
    //         console.log(res)
    //       })
    //       .catch((err) => alert(err));
    //   })
  }

  const exitGame = () => {
    socket.emit('exit', {roomCode: localStorage.getItem('roomCode')})
    socket.on('exit', e => {
      socket.emit('leaveRoom', {roomCode: localStorage.getItem('roomCode')})
      navigate('/room')
    })
  }

  return (
    <div
      id="announcer" role="region" aria-live="assertive"
      className='
        bg-accessible-foreground w-screen 
        h-screen absolute top-0 left-0 flex flex-col
        items-center pt-12'
    >
      <Scoreboard score={score} xTurn={xTurn}/>
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} gameOver={gameOver} xTurn={xTurn}/>
      <div className='flex gap-5'>
        <AnnounceButton board={board} score={score} setMessage={setMessage}/>
        <button 
          className='
          text-accessible-foreground text-2xl
          bg-accessible-background rounded-xl
          px-4 py-2 font-bold hover:scale-105 
          shadow-xl my-4'
          onClick={exitGame}
        >
          Exit
        </button>
      </div>
      {
        message ? 
        <Announcement message={message} setMessage={setMessage}/>
        :
        null
      }
    </div>
  )
}

export default Game
