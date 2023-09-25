import React, { useEffect } from 'react'
import axios from 'axios';
import Session from '../components/Session';
import { useNavigate } from 'react-router-dom';
import { NormalButton } from '../components/NormalButton';

export default function Dashboard(){
  const [sessions, setSessions] = React.useState([])
  const navigate = useNavigate();

  React.useEffect(() => {
    axios.get(`/getResult/${localStorage.getItem('userId')}`)
      .then(res => {
        function onlyUnique(value, index, array) {
          return array.indexOf(value) === index;
        }

        var unique = res.data.filter(onlyUnique);
        setSessions(unique.reverse())
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='flex flex-col justify-center items-center 
      py-16 bg-accessible-foreground'>
      <h1 className='text-5xl font-extrabold text-accessible-background'>DASHBOARD</h1>
      <NormalButton 
        text='Back to Game'
        onClick={() => navigate('/room')}
      />
      {sessions.map(session => {
        return <Session key={session.results_id} sessionData={session}/>
      })}
    </div>
  )
}