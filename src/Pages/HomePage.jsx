import CategoryWiseMeal from "../Components/Home/CategoryWiseMeal";
import HomeSlider from "../Components/Home/HomeSlider";
import PackagePlans from "../Components/Home/PackagePlans";

const HomePage = () => {
  return (
    <div>
      <HomeSlider />
      <CategoryWiseMeal />
      <PackagePlans />
    </div>
  );
};

export default HomePage;
