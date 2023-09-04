import React from 'react';
import axios from 'axios';

const Session = ({ sessionData }) => {
  const [usernames, setUsernames] = React.useState([])
  const [winner, setWinner] = React.useState('')

  React.useEffect(() => {
    let usernamesArray = []
    const userids = [sessionData.user1_id, sessionData.user2_id]
    for(const userId of userids){
      axios.get(`/getUser/${userId}`)
        .then(res => {
          usernamesArray.push(res.data.username)
          setUsernames(usernamesArray)
        })
        .catch(err => console.log(err))
    }

    axios.get(`/getResults/${sessionData.session_id}`)
      .then(res => {
        let winnerId = (res.data[0].winner_id)
        axios.get(`/getUser/${winnerId}`)
          .then(res => {
            setWinner(res.data.username)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }, [])
  
  return (
    <div className="
      bg-accessible-foreground border rounded-xl 
      text-accessible-background shadow-lg p-6
      text-xl max-w-xl m-6"
    >
      <h2 className="text-2xl font-bold mb-2">Session Information</h2>
      <div>
        <p className="mb-1">User 1 ID: {usernames[0]}</p>
        <p className="mb-1">User 2 ID: {usernames[1]}</p>
        <p className="mb-1">Winner: {winner}</p>
        <p className="mb-1">Start Time: {sessionData.start_time}</p>
        <p className="mb-1">End Time: {sessionData.end_time}</p>
        <p className="mb-1">Room code: {sessionData.session}</p>
      </div>
    </div>
  );
};

export default Session;