import React, { useEffect } from 'react'
import axios from 'axios';
import Session from '../components/Session';
import { useNavigate } from 'react-router-dom';

export default function Dashboard(){
  const [sessions, setSessions] = React.useState([])
  const navigate = useNavigate();

  React.useEffect(() => {
    axios.get(`/getSessions/${localStorage.getItem('userId')}`)
      .then(res => {
        setSessions(res.data.reverse())
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='flex flex-col justify-center items-center my-16'>
      <h1 className='text-5xl font-extrabold text-accessible-foreground'>DASHBOARD</h1>
      <button 
        className='
        text-accessible-background text-2xl
        bg-accessible-foreground rounded-xl
        px-4 py-2 font-bold hover:scale-105 
        shadow-xl my-4'
        onClick={() => navigate('/room')}
      >
        Back
      </button>
      {sessions.map(session => {
        return <Session key={session.session_id} sessionData={session}/>
      })}
    </div>
  )
}