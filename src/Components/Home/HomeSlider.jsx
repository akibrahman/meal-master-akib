import { Autoplay, EffectCreative, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HomeSlider = () => {
  return (
    <div className="">
      <Swiper
        grabCursor={true}
        slidesPerView={1}
        spaceBetween={0}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        modules={[EffectCreative, Autoplay, Navigation]}
        loop={true}
        navigation={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="bg-[url('/home-slider-1.jpg')] bg-center bg-cover h-[calc(100vh-56px)]">
            <div className="bg-[rgba(0,0,0,0.6)] h-full flex flex-col justify-center pl-40">
              <p className="text-white text-6xl font-semibold mb-8">
                Campus Bites: Elevate Your Dining!
              </p>
              <p className="w-[60%] text-white">
                Enjoy the ease of having wholesome and nutritious meals
                delivered straight to your university hostel room. Our online
                meal service ensures that you do not have to compromise on
                quality or flavor, providing a convenient solution for your busy
                student life.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-[url('/home-slider-2.jpg')] bg-center bg-cover h-[calc(100vh-56px)]">
            <div className="bg-[rgba(0,0,0,0.6)] h-full flex flex-col justify-center pl-40">
              <p className="text-white text-6xl font-semibold mb-8">
                Study Bites Express: Quick & Nutritious
              </p>
              <p className="w-[60%] text-white">
                Explore a diverse menu crafted to cater to various tastes and
                dietary preferences. From hearty breakfasts to satisfying
                dinners, our online meal service offers a range of options,
                ensuring there is something for everyone. Choose from a variety
                of cuisines and flavors without leaving the comfort of your
                dorm.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-[url('/home-slider-3.jpg')] bg-center bg-cover h-[calc(100vh-56px)]">
            <div className="bg-[rgba(0,0,0,0.6)] h-full flex flex-col justify-center pl-40">
              <p className="text-white text-6xl font-semibold mb-8">
                UniEats On-the-Go: Student Catering
              </p>
              <p className="w-[60%] text-white">
                Our online meal service understands the dynamic schedules of
                university students. Select from flexible meal plans that
                accommodate your study sessions, classes, and extracurricular
                activities. Whether you prefer a full meal or a quick snack, we
                have got you covered with options designed to fit your
                timetable.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-[url('/home-slider-4.jpg')] bg-center bg-cover h-[calc(100vh-56px)]">
            <div className="bg-[rgba(0,0,0,0.6)] h-full flex flex-col justify-center pl-40">
              <p className="text-white text-6xl font-semibold mb-8">
                HostelChef Online: Culinary Excellence
              </p>
              <p className="w-[60%] text-white">
                Prioritize your well-being with nutritionally balanced meals
                designed to fuel your academic journey. Our online meal service
                focuses on providing essential nutrients to support your overall
                health and academic performance. Enjoy the benefits of carefully
                curated menus that prioritize both taste and nutrition.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-[url('/home-slider-5.jpg')] bg-center bg-cover h-[calc(100vh-56px)]">
            <div className="bg-[rgba(0,0,0,0.6)] h-full flex flex-col justify-center pl-40">
              <p className="text-white text-6xl font-semibold mb-8">
                Virtual Feast for Hostel Living
              </p>
              <p className="w-[60%] text-white">
                Embrace a sense of community with our online meal service.
                Connect with fellow students over shared meals without leaving
                your residence. Whether you are studying together or enjoying a
                virtual dinner party, our service fosters a community-driven
                dining experience, bringing students together through the joy of
                good food.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeSlider;
