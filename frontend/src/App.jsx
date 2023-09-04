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
    path: "/",
    element: <Game/>,
  },
  {
    path: '/dashboard',
    element: <Dashboard/>
  }
]);

export default function App(){
  return (
    <RouterProvider router={router} />
  )
}