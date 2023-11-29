import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { ImSpinner9 } from "react-icons/im";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Providers/AuthProvider";
import Loader from "../Shared/Loader";

const UpcomingMealCard = ({ meal }) => {
  const axiosInstance = useAxiosPublic();
  const { user, loading } = useContext(AuthContext);
  const [likeLoader, setLikeLoader] = useState(false);

  //! Is Liked or Not
  const {
    data: isLiked,
    isLoading: isLikedLoad,
    refetch: isLikedRefetch,
  } = useQuery({
    queryKey: ["isUpcomingLiked", meal._id],
    queryFn: async () => {
      const data = await axiosInstance.get(
        `/is-liked-upcoming?id=${meal._id}&email=${user.email}`
      );
      return data.data.liked;
    },
    enabled: !loading && meal._id ? true : false,
  });
  console.log(isLiked);
  //! handle Like Increase
  const handleLikeInc = async () => {
    console.log("Yap");
    setLikeLoader(true);
    await axiosInstance.put("/inc-like-upcoming", {
      email: user.email,
      id: meal._id,
    });
    await isLikedRefetch();
    setLikeLoader(false);
  };

  if (loading || isLikedLoad || !user || isLiked == undefined)
    return <Loader />;

  return (
    <div className="border-2 border-primary rounded-lg p-2 flex flex-col items-center justify-center">
      <img
        src={meal.mainMealData.mealImage}
        className="w-[200px] h-[150px] rounded-lg"
        alt=""
      />
      <p className="text-center font-semibold py-1 pt-2">
        {meal.mainMealData.mealTitle}
      </p>
      <p className="text-center font-bold py-1">
        Expected Price: {meal.mainMealData.price}Tk
      </p>
      <p className="text-center font-semibold py-1 flex items-center justify-center gap-3">
        Want It ?{" "}
        {likeLoader ? (
          <ImSpinner9 className="animate-spin text-3xl text-primary" />
        ) : isLiked ? (
          <BiSolidLike className="text-xl text-red-600" />
        ) : (
          <BiLike onClick={handleLikeInc} className="text-2xl cursor-pointer" />
        )}
      </p>
    </div>
  );
};

export default UpcomingMealCard;
