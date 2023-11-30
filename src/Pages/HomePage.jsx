import CategoryWiseMeal from "../Components/Home/CategoryWiseMeal";
import ContactForm from "../Components/Home/ContactForm";
import HomeBanner from "../Components/Home/HomeBanner";
import PackagePlans from "../Components/Home/PackagePlans";
import ShowCase from "../Components/Home/ShowCase";

const HomePage = () => {
  return (
    <div>
      {/* <HomeSlider /> */}
      <HomeBanner />
      <CategoryWiseMeal />
      <ContactForm />
      <PackagePlans />
      <ShowCase />
    </div>
  );
};

export default HomePage;
