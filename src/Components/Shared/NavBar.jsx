import Container from "./Container";

const NavBar = () => {
  return (
    <Container>
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img className="w-10" src="/logo.png" alt="" />
          <p>MealMaster</p>
        </div>
        <div className="flex items-center gap-3">
          <p>Home</p>
          <p>Meals</p>
          <p>Upcoming Meals</p>
          <p>Join Us</p>
          <img className="w-10" src="/no-user.jpg" alt="" />
        </div>
      </nav>
    </Container>
  );
};

export default NavBar;
