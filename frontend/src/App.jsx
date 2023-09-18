import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Game from "./pages/Game";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Room from "./pages/Room";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <SignUp/>
  },
  {
    path: "/room",
    element: <Room/>
  },
  {
    path: "/game",
    element: <Game/>,
  },
  {
    path: '/dashboard',
    element: <Dashboard/>
  },
  {
    path: '/',
    element: <Home/>
  }
]);

export default function App(){
  return (
    <RouterProvider router={router} />
  )
}