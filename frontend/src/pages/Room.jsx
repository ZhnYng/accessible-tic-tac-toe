import React from "react";
import { socket } from "../socket.js";
import { v4 as uuidv4 } from "uuid";
import { Announcement } from "../components/Announcement.jsx";
import { useNavigate } from "react-router-dom";
import { NormalButton } from '../components/NormalButton.jsx';

export default function Room() {
  const userId = localStorage.getItem("userId");
  const [roomCode, setRoomCode] = React.useState("");
  const [waitingRoom, setWaitingRoom] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    if(!localStorage.getItem('userId')){
      navigate('/login')
    }
  }, [])

  function createRoom() {
    const roomCode = uuidv4();
    setRoomCode(roomCode);
  }

  function enterRoom() {
    if (roomCode) {
      socket.connect();
      socket.emit("roomRequest", { roomCode: roomCode, userId: userId });
      socket.on("roomCreation", (e) => {
        if (e.roomStatus === "room created") {
          setWaitingRoom(true);
          socket.on("roomFull", (e) => {
            if (e.roomFull) {
              localStorage.setItem("roomCode", roomCode);
              localStorage.setItem("user1Id", e.users[0]);
              localStorage.setItem("user2Id", e.users[1]);
              navigate("/game");
            }
          });
        }
      });
    } else {
      setMessage("Enter a room code or create a room first");
    }
  }

  function handleSignOut(){
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate('/login')
  }

  return (
    <div
      className="
      bg-accessible-foreground min-h-screen flex 
      items-center justify-center flex-col w-screen
    "
    >
      <h3 className="absolute right-4 top-0 scale-90">
        <NormalButton
          text={'Sign Out'}
          onClick={handleSignOut}
        />
      </h3>
      <h1
        className="
        text-5xl font-extrabold text-accessible-background
        my-5
      "
      >
        Start a Game!
      </h1>
      <div className="max-w-md w-full">
        <label className="font-medium text-accessible-background text-lg">
          Join Room
        </label>
        <input
          id="roomCode"
          name="roomCode"
          type="text"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          className="
            appearance-none relative block w-full px-3 py-2 
            border border-gray-300 placeholder-gray-500 
            text-gray-900 rounded-xl focus:z-10 sm:text-sm
            bg-accessible-background
          "
          placeholder="Code"
        />
        <div className="flex flex-row gap-3 justify-center">
          <button
            className="
              text-accessible-foreground text-xl
              bg-accessible-background rounded-xl
              px-3 py-2 font-bold hover:scale-105 
              shadow-xl my-4"
            onClick={createRoom}
          >
            Create Room
          </button>
          <button
            className="
              text-accessible-foreground text-xl
              bg-accessible-background rounded-xl
              px-4 py-2 font-bold hover:scale-105 
              shadow-xl my-4"
            onClick={enterRoom}
          >
            {waitingRoom ? "Waiting..." : "Join Room"}
          </button>
          <button
            className="
            text-accessible-foreground text-xl
            bg-accessible-background rounded-xl
            px-4 py-2 font-bold hover:scale-105 
            shadow-xl my-4"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        </div>
      </div>
      {message ? (
        <Announcement message={message} setMessage={setMessage} />
      ) : null}
    </div>
  );
}
