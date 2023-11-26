import {
  FaCalendar,
  FaHouse,
  FaUserGroup,
  FaUtensils,
  FaWallet,
} from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../Hooks/useRole";

const Dashboard = () => {
  const { role } = useRole();
  return (
    <div className={`drawer lg:drawer-open`}>
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-64 bg-[#141515] text-white min-h-full font-cinzel">
          <p className="text-2xl font-black text-center">Meal Master</p>
          <p className="font-bold text-center">Hostel Management system</p>
          <div className="mt-10">
            {/* User Panel  */}
            {role === "general" && (
              <>
                <li className="text-[#fff] font-medium">
                  <NavLink to="/dashboard/user-home">
                    <FaHouse></FaHouse>My Profile
                  </NavLink>
                </li>
                <li className="text-[#fff] font-medium">
                  <NavLink to="/dashboard/requested-meals">
                    <FaCalendar></FaCalendar>Requested Meals
                  </NavLink>
                </li>
                <li className="text-[#fff] font-medium">
                  <NavLink to="/dashboard/payment-history">
                    <FaWallet></FaWallet>My Reviews
                  </NavLink>
                </li>
              </>
            )}
            {/* Admin Panel  */}
            {role === "admin" && (
              <>
                <li className="text-[#fff] font-medium">
                  <NavLink to="/dashboard/admin-profile">
                    <FaUserGroup />
                    Admin Profile
                  </NavLink>
                </li>
                <li className="text-[#fff] font-medium">
                  <NavLink to="/dashboard/manage-users">
                    <FaUtensils />
                    Manage Users
                  </NavLink>
                </li>
                <li className="text-[#fff] font-medium">
                  <NavLink to="/dashboard/add-meal">
                    <FaUtensils />
                    Add Meal
                  </NavLink>
                </li>
                <li className="text-[#fff] font-medium">
                  <NavLink to="/dashboard/all-meals">
                    <FaUserGroup />
                    All Meals
                  </NavLink>
                </li>
                <li className="text-[#fff] font-medium">
                  <NavLink to="/dashboard/all-reviews">
                    <FaUserGroup />
                    All Reviews
                  </NavLink>
                </li>
                <li className="text-[#fff] font-medium">
                  <NavLink to="/dashboard/serve-meals">
                    <FaUserGroup />
                    Serve Meals
                  </NavLink>
                </li>
                <li className="text-[#fff] font-medium">
                  <NavLink to="/dashboard/upcoming-meals">
                    <FaUserGroup />
                    Upcoming Meals
                  </NavLink>
                </li>
              </>
            )}

            <div className="divider divider-warning">Main</div>
            <li className="text-[#fff] font-medium">
              <NavLink to="/">
                <FaHouse></FaHouse>Home
              </NavLink>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
