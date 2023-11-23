import { useState } from "react";
import Container from "./Container";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-gradient-to-r from-primary to-secondary">
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
            <p>Home</p>
            <p>Meals</p>
            <p>Upcoming Meals</p>
            <button className="bg-white font-bold text-secondary px-3 py-1 rounded-full">
              Join Us
            </button>
            <div className="relative">
              <img
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full cursor-pointer"
                src="/no-user.jpg"
                alt=""
              />
              <div
                className={`bg-white border border-secondary text-primary p-4 rounded-md absolute translate-y-12 ${
                  isOpen
                    ? "top-0 opacity-100"
                    : "top-[600%] opacity-0 pointer-events-none"
                } right-1/2 translate-x-1/2 text-center ease-in-out transition-all duration-300`}
              >
                <p className="pb-2 w-max select-none">Akib Rahman</p>
                <hr />
                <p className="pt-2 cursor-pointer">Dashboard</p>
                <button className="bg-secondary text-white px-3 rounded-full mt-4">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default NavBar;
