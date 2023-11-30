import Marquee from "react-fast-marquee";

const ShowCase = () => {
  return (
    <div>
      <Marquee
        speed={100}
        pauseOnHover={true}
        // gradient={true}
        className="my-10"
      >
        <img
          className="w-32 ml-10 rounded-md"
          src="/home-slider-1.jpg"
          alt=""
        />
        <img
          className="w-32 ml-10 rounded-md"
          src="/home-slider-2.jpg"
          alt=""
        />
        <img
          className="w-32 ml-10 rounded-md"
          src="/home-slider-3.jpg"
          alt=""
        />
        <img
          className="w-32 ml-10 rounded-md"
          src="/home-slider-4.jpg"
          alt=""
        />
        <img
          className="w-32 ml-10 rounded-md"
          src="/home-slider-5.jpg"
          alt=""
        />
        <img
          className="w-32 ml-10 rounded-md"
          src="/home-slider-1.jpg"
          alt=""
        />
        <img
          className="w-32 ml-10 rounded-md"
          src="/home-slider-2.jpg"
          alt=""
        />
        <img
          className="w-32 ml-10 rounded-md"
          src="/home-slider-3.jpg"
          alt=""
        />
        <img
          className="w-32 ml-10 rounded-md"
          src="/home-slider-4.jpg"
          alt=""
        />
        <img
          className="w-32 ml-10 rounded-md"
          src="/home-slider-5.jpg"
          alt=""
        />
      </Marquee>
    </div>
  );
};

export default ShowCase;
