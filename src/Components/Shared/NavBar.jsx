import { useContext, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import Modal from "react-modal";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Providers/AuthProvider";
import UpcomingMealsUser from "../Home/UpcomingMealsUser";
import Container from "./Container";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success("Logout Succesfully", { autoClose: 2000 });
    } catch (error) {
      console.log(error);
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className="bg-gradient-to-r from-primary to-secondary z-50">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <UpcomingMealsUser />
      </Modal>
      <Container>
        <nav className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <img
              className="w-10 h-10 rounded-full bg-white"
              src="/logo.jpg"
              alt=""
            />
            <p className="text-white font-semibold text-lg">MealMaster</p>
          </div>
          <div className="flex items-center gap-5 text-white font-medium">
            <NavLink to="/">
              <p>Home</p>
            </NavLink>
            <NavLink to="/all-meals">
              <p>Meals</p>
            </NavLink>
            <IoMdNotificationsOutline
              onClick={() => setModalIsOpen(true)}
              className="text-2xl cursor-pointer"
            />

            {user ? (
              <div className="relative">
                <img
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  src={user.photoURL ? user.photoURL : "/no-user.jpg"}
                  alt=""
                />
                <div
                  className={`bg-white border border-secondary text-primary p-4 rounded-md absolute translate-y-12 ${
                    isOpen
                      ? "top-0 opacity-100"
                      : "top-[600%] opacity-0 pointer-events-none"
                  } right-1/2 translate-x-1/2 text-center ease-in-out transition-all duration-300 z-50`}
                >
                  <p className="pb-2 w-max select-none">Akib Rahman</p>
                  <hr />
                  <Link to="/dashboard/admin-profile">
                    <p className="pt-2 cursor-pointer">Dashboard</p>
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="bg-secondary text-white px-3 rounded-full mt-4"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-white font-bold text-secondary px-3 py-1 rounded-full duration-300 active:scale-75">
                  Join Us
                </button>
              </Link>
            )}
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default NavBar;
