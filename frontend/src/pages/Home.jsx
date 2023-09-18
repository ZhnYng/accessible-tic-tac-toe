import React from "react";
import { NormalButton } from "../components/NormalButton";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="w-screen h-screen bg-accessible-foreground flex flex-col items-center justify-center">
      <h1 className="text-8xl font-extrabold text-accessible-background">
        Accessible
      </h1>
      <h1 className="text-8xl font-extrabold text-accessible-background">
        Tic-Tac-Toe
      </h1>
      <div className="flex gap-10 m-6">
        <NormalButton text={'Log in'} onClick={() => navigate('/login')}/>
        <NormalButton text={'Sign up'} onClick={() => navigate('/signup')}/>
      </div>
    </div>
  );
}
