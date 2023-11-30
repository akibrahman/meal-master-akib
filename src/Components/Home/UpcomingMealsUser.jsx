import { useQuery } from "@tanstack/react-query";
import { FaTimes } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Container from "../Shared/Container";
import Loader from "../Shared/Loader";
import UpcomingMealCard from "./UpcomingMealCard";

const UpcomingMealsUser = ({ closeFn }) => {
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
    <div className="z-50 pt10">
      <FaTimes
        onClick={closeFn}
        className="text-4xl bg-primary text-white p-2 rounded-full"
      />
      <p className="text-center text-2xl font-semibold mb-10">Upcoming Meals</p>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-scroll md:overflow-hidden">
          {meals.map((meal) => (
            <UpcomingMealCard key={meal._id} meal={meal} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default UpcomingMealsUser;
