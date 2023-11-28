import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loader from "../Shared/Loader";
import UpcomingMealCard from "./UpcomingMealCard";

const UpcomingMealsUser = () => {
  const axiosInstance = useAxiosPublic();
  //! All Upcoming Meals
  const {
    data: meals,
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: ["all-upcoming-meals-user"],
    queryFn: async () => {
      const responce = await axiosInstance.get(`/all-upcoming-meals-user`);
      return responce.data;
    },
  });

  if (isLoading || !meals) return <Loader />;
  return (
    <div className="z-50 p-20 pt-10">
      <p className="text-center text-2xl font-semibold mb-10">Upcoming Meals</p>
      <div className="grid grid-cols-3 gap-6">
        {meals.map((meal) => (
          <UpcomingMealCard key={meal._id} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingMealsUser;
