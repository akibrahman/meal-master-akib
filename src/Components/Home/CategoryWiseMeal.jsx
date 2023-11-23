import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { convertCamelCaseToCapitalized } from "../../Utils/camelToCapitalize";
import Container from "../Shared/Container";

const CategoryWiseMeal = () => {
  const [meals, setMeals] = useState(null);
  const [category, setCategory] = useState("breakfast");
  const tabs = ["breakfast", "lunch", "dinner", "allMeals"];

  const getMeals = async () => {
    setMeals([]);
    const { data } = await axios.get("/meals.json");
    if (category == "allMeals") {
      setMeals(data.slice(0, 6));
      return;
    }
    const filtered = data.filter((meal) => meal.mealType == category);
    setMeals(filtered);
  };

  useEffect(() => {
    getMeals();
  }, [category]);

  return (
    <div className="my-10">
      <Container>
        <div className="flex items-center justify-center gap-14 bg-gradient-to-l rounded-md from-primary to-secondary py-2 text-white font-semibold">
          {tabs.map((tab, i) => (
            <p
              onClick={() => setCategory(tab)}
              className={`${tab == category && "border-b-2"} cursor-pointer`}
              key={i}
            >
              {convertCamelCaseToCapitalized(tab)}
            </p>
          ))}
        </div>
        <Container>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {meals?.map((meal, i) => (
              <div key={i} className="cursor-pointer overflow-hidden">
                <p className="text-center bg-secondary text-white font-medium py-2 rounded-t-md">
                  {meal.mealTitle}
                </p>
                <div className="w-full h-[150px] overflow-hidden">
                  <img
                    className="hover:scale-110 transition-all h-full w-full"
                    src={meal.mealImage}
                    alt=""
                  />
                </div>
                <div className="flex items-center justify-between px-3 border-b-2 border-secondary py-4 text-primary font-semibold">
                  <Rating
                    placeholderRating={meal.rating}
                    emptySymbol={<FaRegStar />}
                    placeholderSymbol={<FaStar />}
                    fullSymbol={<FaStar />}
                  />
                  <p>$ {meal.price}</p>
                  <button className="border border-primary px-2 rounded-full">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Container>
        <div className="flex items-center justify-center">
          <button className="border-2 border-secondary px-4 py-1 mt-5 rounded-full font-medium text-secondary">
            See All
          </button>
        </div>
      </Container>
    </div>
  );
};

export default CategoryWiseMeal;
