import CategoryWiseMeal from "../Components/Home/CategoryWiseMeal";
import ContactForm from "../Components/Home/ContactForm";
import HomeBanner from "../Components/Home/HomeBanner";
import PackagePlans from "../Components/Home/PackagePlans";

const HomePage = () => {
  return (
    <div>
      {/* <HomeSlider /> */}
      <HomeBanner />
      <CategoryWiseMeal />
      <ContactForm />
      <PackagePlans />
    </div>
  );
};

export default HomePage;
