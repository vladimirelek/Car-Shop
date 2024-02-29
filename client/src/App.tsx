import { Outlet, createBrowserRouter } from "react-router-dom";
import NavBar from "./components/Navbar/navbar";
import Home from "./pages/Home/home-page";
import Login from "./features/Auth/login/login";
import Register from "./features/Auth/register/register";
import Shop from "./pages/Shop/shop";
import CarDeatils from "./pages/CarDetails/carDetails";
import path from "path";
import User from "./pages/UserProfile/user";
import UserDetails from "./pages/UserProfile/user";
import Inbox from "./pages/Inbox/inbox";
import NewCar from "./features/CarsAction/AddNewCar/addNewCar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/shop/:id",
        element: <CarDeatils />,
      },
      {
        path: "/user/:id",
        element: <UserDetails />,
      },
      {
        path: "/inbox",
        element: <Inbox />,
      },
      {
        path: "/addNewCar",
        element: <NewCar />,
      },
    ],
  },
]);
