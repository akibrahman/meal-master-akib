import CategoryWiseMeal from "../Components/Home/CategoryWiseMeal";
import ContactForm from "../Components/Home/ContactForm";
import HomeSlider from "../Components/Home/HomeSlider";
import PackagePlans from "../Components/Home/PackagePlans";

const HomePage = () => {
  return (
    <div>
      <HomeSlider />
      <CategoryWiseMeal />
      <ContactForm />
      <PackagePlans />
    </div>
  );
};

export default HomePage;
