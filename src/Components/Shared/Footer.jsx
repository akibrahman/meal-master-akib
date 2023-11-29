import Container from "./Container";

const Footer = () => {
  return (
    <footer className="bg-[#141515] text-white p-5 md:p-8">
      <Container>
        <div className="container mx-auto flex flex-col md:flex-row justify-between">
          <div>
            <p className="text-lg font-semibold">Hostel Meal Management</p>
            <p className="mt-2">
              Manage your hostel meals efficiently with our platform.
            </p>
            <ul className="mt-4">
              <li>
                <a href="#" className="text-gray-400 hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:underline">
                  Meals
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="mt-4 flex items-center">
              <input
                type="text"
                placeholder="Subscribe to our newsletter"
                className="bg-[#282828] text-white px-4 py-2 rounded-l-md focus:outline-none"
              />
              <button className="bg-[#FF7E5F] text-white px-6 py-2 rounded-r-md hover:bg-[#E5664E] focus:outline-none">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-400 text-center pt-6 md:py-2">
          &copy; 2023 Hostel Meal Management. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
