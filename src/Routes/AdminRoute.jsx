import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Components/Shared/Loader";
import useRole from "../Hooks/useRole";
import { AuthContext } from "../Providers/AuthProvider";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const { role, isLoading } = useRole();
  if (loading || isLoading) return <Loader />;
  else if (user && role === "admin") {
    return children;
  } else {
    return <Navigate to="/" state={{ from: location }}></Navigate>;
  }
};

export default AdminRoute;
