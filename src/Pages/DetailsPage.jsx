import { useContext, useEffect, useState } from "react";
import { FaHeart, FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { useParams } from "react-router-dom";
import Container from "../Components/Shared/Container";
import Loader from "../Components/Shared/Loader";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AuthContext } from "../Providers/AuthProvider";
import { convertCamelCaseToCapitalized } from "../Utils/camelToCapitalize";

const DetailsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [meal, setMeal] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const axiosInstance = useAxiosPublic();

  const getMeal = async () => {
    const data = await axiosInstance.get(`/meal/${id}`);
    setMeal(data.data);
  };

  useEffect(() => {
    getMeal();
  }, []);

  const handleLikeInc = async () => {
    const data = await axiosInstance.put("/inc-like", {
      email: user.email,
      id: id,
    });
    console.log(data);
  };
  const handleLikeDec = async () => {
    const data = await axiosInstance.put("/dec-like", {
      email: user.email,
      id: id,
    });
    console.log(data);
  };

  const getLiked = async () => {
    if (user && id) {
      const data = await axiosInstance.get(
        `/is-liked?id=${id}&email=${user?.email}`
      );
      setIsLiked(data.data.liked);
    }
  };

  useEffect(() => {
    getLiked();
  }, [user]);

  if (!meal || !user) return <Loader />;
  // mealTitle
  // mealType
  // mealImage
  // ingredients
  // description
  // price
  // rating
  // postTime
  // likes
  // numReviews
  // distributorName
  // distributorEmail

  return (
    <Container>
      <div className="flex items-center gap-10 my-6">
        <div className="w-1/2">
          <img
            className="rounded-md w-full h-[400px]"
            src={meal.mealImage}
            alt=""
          />
        </div>
        <div
          className="w-1/2
         border-l-4 border-primary pl-5"
        >
          <p className="text-3xl font-medium mb-5">{meal.mealTitle}</p>
          <p className="border border-primary w-max px-3 rounded-full font-medium mb-3">
            {convertCamelCaseToCapitalized(meal.mealType)}
          </p>
          <p>
            <span className="font-bold text-primary">Post Time:</span>{" "}
            {new Date(meal.postTime).toLocaleString()}
          </p>
          <p>
            <span className="font-bold text-primary">Distributor:</span>{" "}
            {meal.distributorName}
          </p>
          <div className="flex flex-wrap gap-2 my-3">
            <span className="font-bold text-primary">Ingredients: </span>{" "}
            {meal.ingredients.map((inn, i) => (
              <p
                className="ml-2 border border-primary rounded-full px-[6px] w-max"
                key={i}
              >
                {inn}
              </p>
            ))}
          </div>
          <p>
            <span className="font-bold text-primary mr-2">Description: </span>{" "}
            {meal.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-10">
              <Rating
                readonly
                placeholderRating={meal.rating}
                emptySymbol={<FaRegStar className="text-primary text-2xl" />}
                placeholderSymbol={<FaStar className="text-primary text-2xl" />}
                fullSymbol={<FaStar className="text-primary text-2xl" />}
              />
              <div className="flex items-center gap-5 font-semibold">
                {isLiked ? (
                  <FaHeart
                    onClick={handleLikeDec}
                    className="text-3xl text-primary cursor-pointer"
                  />
                ) : (
                  <FaHeart
                    onClick={handleLikeInc}
                    className="text-3xl text-gray-300 cursor-pointer"
                  />
                )}
                <p>Likes: {meal.likes}</p>
              </div>
              {/*  */}
            </div>
            <button className="bg-secondary px-3 py-1 rounded-full font-semibold select-none text-white transition active:scale-90">
              Request Meal
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DetailsPage;
