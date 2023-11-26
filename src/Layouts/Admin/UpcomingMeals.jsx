import { useQuery } from "@tanstack/react-query";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { toast } from "react-toastify";
import Loader from "../../Components/Shared/Loader";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const UpcomingMeals = () => {
  const axiosInstance = useAxiosPublic();
  const {
    data: upcomingMeals,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["upcoming-meals-admin"],
    queryFn: async () => {
      const responce = await axiosInstance.get(`/all-upcoming-meals`);
      return responce.data;
    },
  });

  const publish = async (id) => {
    const data = await axiosInstance.post(`/from-upcoming-to-meals/${id}`);
    if (data.data.success) {
      toast.success("This upcoming meal has been Published");
      refetch();
    } else {
      toast.error("Somthing went Wrong");
      console.log(data.data);
    }
  };

  return (
    <div>
      <div className="p-12 bg-white w-[950px]">
        <div className="flex justify-between items-center font-cinzel mb-8">
          <p className="text-[#151515] text-2xl font-bold">
            Total Upcoming Meals: {upcomingMeals?.length}
          </p>
          <p className="font-semibold text-red-500">
            * Likes should be atlest 10 to be published
          </p>
        </div>

        {/* Table Start  */}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-[#141515] uppercase text-white">
                <tr>
                  <th className="py-2">SL.</th>
                  <th className="text-center">Meal Title</th>
                  <th className="text-center">Meal Image</th>
                  <th className="text-center">Likes</th>
                  <th className="text-center">Distributor Name</th>
                  <th className="text-center">Distributor Email</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Row */}
                {upcomingMeals.map((meal, i) => (
                  <tr className="" key={meal._id}>
                    <th>
                      <p>{i + 1}</p>
                    </th>

                    <td className="text-center font-bold">
                      {meal.mainMealData.mealTitle}
                    </td>
                    <td className="text-center font-bold">
                      <img
                        className="w-12 mx-auto rounded-md"
                        src={meal.mainMealData.mealImage}
                        alt=""
                      />
                    </td>
                    <td className="text-center font-bold">{meal.likes}</td>
                    <td className="text-center font-bold">
                      {meal.mainMealData.distributorName}
                    </td>
                    <td className="text-center font-bold">
                      {meal.mainMealData.distributorEmail}
                    </td>
                    <th>
                      <p
                        onClick={() => publish(meal._id)}
                        className={`flex items-center gap-1 justify-center text-white px-3 py-1 rounded-full cursor-pointer select-none transition-all active:scale-90 ${
                          meal.likes < 10
                            ? "pointer-events-none bg-slate-400"
                            : "pointer-events-auto bg-primary"
                        }`}
                      >
                        Publish
                        <MdOutlinePublishedWithChanges />
                      </p>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingMeals;