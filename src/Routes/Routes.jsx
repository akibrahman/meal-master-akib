import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../Layouts/Dashboard";
import DetailsPage from "../Pages/DetailsPage";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import MealsPage from "../Pages/MealsPage";
import RegistrationPage from "../Pages/RegistrationPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/meal/:id",
        element: <DetailsPage />,
      },
      {
        path: "/all-meals",
        element: <MealsPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);
