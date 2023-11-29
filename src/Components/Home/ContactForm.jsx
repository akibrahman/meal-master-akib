import Container from "../Shared/Container";

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  return (
    <Container>
      <p className="text-center text-4xl font-bold py-10 text-white">
        Contact Us
      </p>
      <div className="my-8 flex flex-col md:flex-row text-white">
        <div className="md:w-1/2 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className=" mb-2">Uttara, Dhaka</p>
          <p className=" mb-2">Phone: (123) 456-7890</p>
          <p className="">Email: info@example.com</p>
        </div>
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>
          <form onSubmit={handleSubmit} className="max-w-md">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-600"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default ContactForm;
