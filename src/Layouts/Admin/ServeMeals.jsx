import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../Components/Shared/Loader";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { convertCamelCaseToCapitalized } from "../../Utils/camelToCapitalize";

const ServeMeals = () => {
  const axiosInstanceS = useAxiosSecure();
  const [search, setSearch] = useState("");
  const {
    data: requestedMeals,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["serve-meals", search],
    queryFn: async ({ queryKey }) => {
      const responce = await axiosInstanceS.get(
        `/all-requested-meals?search=${queryKey[1]}`
      );
      return responce.data;
    },
  });

  const serveTheMeal = async (id) => {
    const data = await axiosInstanceS.patch(`/update-requested-meal/${id}`);
    if (data.data.delivered) {
      toast.info("This Meal is already delivered");
      return;
    } else if (data.data.modifiedCount) {
      toast.success("Meal has been Delivered");
      refetch();
      return;
    }
  };

  return (
    <div>
      <div className="p-12 bg-white w-[950px]">
        <div className="flex justify-between items-center font-cinzel mb-8">
          <p className="text-[#151515] text-2xl font-bold">
            Total Users: {requestedMeals?.length}
          </p>
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#141515] px-3 py-2 w-[300px] text-white font-semibold rounded-md"
            type="text"
            placeholder="Search by Name or Email"
          />
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
                  <th className="text-center">Email</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Row */}
                {requestedMeals.map((meal, i) => (
                  <tr className="" key={meal._id}>
                    <th>
                      <p>{i + 1}</p>
                    </th>

                    <td className="text-center font-bold">
                      {meal.meal.mealTitle}
                    </td>
                    <td className="text-center font-bold">{meal.email}</td>
                    <td className="text-center font-bold">{meal.name}</td>
                    <td
                      className={`text-center font-bold ${
                        meal.status == "delivered"
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                    >
                      {convertCamelCaseToCapitalized(meal.status)}
                    </td>
                    <th>
                      <button
                        onClick={() => serveTheMeal(meal._id)}
                        className="flex items-center m-auto gap-2 cursor-pointer bg-[#141515] w-max text-white p-1 rounded-full px-2 select-none transition-all active:scale-90"
                      >
                        Serve
                      </button>
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

export default ServeMeals;
