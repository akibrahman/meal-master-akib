import { Outlet } from "react-router-dom";
import Footer from "./Components/Shared/Footer";
import NavBar from "./Components/Shared/NavBar";

function App() {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
