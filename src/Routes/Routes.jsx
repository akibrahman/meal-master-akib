import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Payment from "../Components/Home/Payment";
import AddMeal from "../Layouts/Admin/AddMeal";
import AdminProfile from "../Layouts/Admin/AdminProfile";
import AllMeals from "../Layouts/Admin/AllMeals";
import AllReviews from "../Layouts/Admin/AllReviews";
import ManageUsers from "../Layouts/Admin/ManageUsers";
import ServeMeals from "../Layouts/Admin/ServeMeals";
import UpcomingMeals from "../Layouts/Admin/UpcomingMeals";
import Dashboard from "../Layouts/Dashboard";
import MyReviews from "../Layouts/User/MyReviews";
import RequestedMeals from "../Layouts/User/RequestedMeals";
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
      {
        path: "/checkout/:package_name",
        element: <Payment />,
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
    children: [
      {
        path: "admin-profile",
        element: <AdminProfile />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "add-meal",
        element: <AddMeal />,
      },
      {
        path: "all-meals",
        element: <AllMeals />,
      },
      {
        path: "all-reviews",
        element: <AllReviews />,
      },
      {
        path: "serve-meals",
        element: <ServeMeals />,
      },
      {
        path: "upcoming-meals",
        element: <UpcomingMeals />,
      },

      //! Users

      {
        path: "requested-meals",
        element: <RequestedMeals />,
      },
      {
        path: "my-reviews",
        element: <MyReviews />,
      },
    ],
  },
]);
