import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { FaHeart, FaRegStar, FaStar } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
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
  //   const [meal, setMeal] = useState();
  const [a, setA] = useState(false);
  const axiosInstance = useAxiosPublic();

  const {
    data: meal,
    refetch: mealRefetch,
    isLoading: isMealLoading,
  } = useQuery({
    queryKey: ["sigleMeal"],
    queryFn: async () => {
      const data = await axiosInstance.get(`/meal/${id}`);
      return data.data;
    },
  });

  const {
    data: isLiked,
    isLoading: isLikedLoad,
    refetch: isLikedRefetch,
  } = useQuery({
    queryKey: ["isLiked"],
    queryFn: async () => {
      const data = await axiosInstance.get(
        `/is-liked?id=${id}&email=${user.email}`
      );
      return data.data.liked;
    },
    enabled: user && id ? true : false,
  });

  const { data: reviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const data = await axios.get("/reviews.json");
      return data.data;
    },
  });

  const handleLikeInc = async () => {
    setA(true);
    await axiosInstance.put("/inc-like", {
      email: user.email,
      id: id,
    });
    await isLikedRefetch();
    await mealRefetch();
    setA(false);
  };
  const handleLikeDec = async () => {
    setA(true);
    await axiosInstance.put("/dec-like", {
      email: user.email,
      id: id,
    });
    await isLikedRefetch();
    await mealRefetch();
    setA(false);
  };

  if (!user || isLikedLoad || isMealLoading) return <Loader />;

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
                {a ? (
                  <ImSpinner9 className="animate-spin text-3xl text-primary" />
                ) : isLiked ? (
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
      {/* Reviews  */}
      <hr />
      <div className="my-8 border p-5 rounded-md border-primary">
        <p className="border-l-4 border-primary pl-2 text-xl mb-2">
          Total Reviews: {meal.numReviews}
        </p>
        <div className="">
          <textarea
            name=""
            cols="50"
            rows="4"
            className="border border-secondary rounded-md p-2 px-4 font-semibold text-primary"
          ></textarea>
          <br />
          <button className="bg-secondary px-3 py-1 rounded-full font-semibold select-none text-white transition active:scale-90">
            Post
          </button>
        </div>
        <div className="grid grid-cols-3 gap-5 my-10">
          {reviews?.map((review, i) => (
            <div
              key={i}
              className="border border-secondary rounded-md p-2 pb-0"
            >
              <div className="flex items-center gap-3">
                <img
                  src={review.image}
                  className="w-9 h-9 rounded-full"
                  alt=""
                />
                <div className="">
                  <p>{review.name}</p>
                  <Rating
                    placeholderRating={review.rating}
                    emptySymbol={<FaRegStar />}
                    placeholderSymbol={<FaStar />}
                    fullSymbol={<FaStar />}
                  />
                </div>
              </div>
              <p className="mt-3">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default DetailsPage;
