import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Payment from "../Components/Home/Payment";
import AddMeal from "../Layouts/Admin/AddMeal";
import AdminProfile from "../Layouts/Admin/AdminProfile";
import AllMeals from "../Layouts/Admin/AllMeals";
import AllPayments from "../Layouts/Admin/AllPayments";
import AllReviews from "../Layouts/Admin/AllReviews";
import ManageUsers from "../Layouts/Admin/ManageUsers";
import ServeMeals from "../Layouts/Admin/ServeMeals";
import UpcomingMeals from "../Layouts/Admin/UpcomingMeals";
import Dashboard from "../Layouts/Dashboard";
import MyProfile from "../Layouts/User/MyProfile";
import MyReviews from "../Layouts/User/MyReviews";
import RequestedMeals from "../Layouts/User/RequestedMeals";
import DetailsPage from "../Pages/DetailsPage";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import MealsPage from "../Pages/MealsPage";
import RegistrationPage from "../Pages/RegistrationPage";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";

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
        element: (
          <UserRoute>
            <Payment />
          </UserRoute>
        ),
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
    element: (
      <UserRoute>
        <Dashboard />
      </UserRoute>
    ),
    children: [
      //! Admin

      {
        path: "admin-profile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "add-meal",
        element: (
          <AdminRoute>
            <AddMeal />
          </AdminRoute>
        ),
      },
      {
        path: "all-meals",
        element: (
          <AdminRoute>
            <AllMeals />
          </AdminRoute>
        ),
      },
      {
        path: "all-reviews",
        element: (
          <AdminRoute>
            <AllReviews />
          </AdminRoute>
        ),
      },
      {
        path: "serve-meals",
        element: (
          <AdminRoute>
            <ServeMeals />
          </AdminRoute>
        ),
      },
      {
        path: "upcoming-meals",
        element: (
          <AdminRoute>
            <UpcomingMeals />
          </AdminRoute>
        ),
      },
      {
        path: "all-payments",
        element: (
          <AdminRoute>
            <AllPayments />
          </AdminRoute>
        ),
      },

      //! Users

      {
        path: "my-profile",
        element: (
          <UserRoute>
            <MyProfile />
          </UserRoute>
        ),
      },
      {
        path: "requested-meals",
        element: (
          <UserRoute>
            <RequestedMeals />
          </UserRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <UserRoute>
            <MyReviews />
          </UserRoute>
        ),
      },
    ],
  },
]);
