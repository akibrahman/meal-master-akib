import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../Components/Shared/Loader";
import Pagination from "../../Components/Shared/Pagination";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";
import { convertCamelCaseToCapitalized } from "../../Utils/camelToCapitalize";

const RequestedMeals = () => {
  const axiosInstance = useAxiosPublic();
  const axiosInstanceS = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [sort, setSort] = useState("del");
  const [page, setPage] = useState(0);
  const [loader, setLoader] = useState(false);
  const [loaderData, setLoaderData] = useState("");

  const {
    data: requestedMealsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-requested-meals-user", sort, page],
    queryFn: async ({ queryKey }) => {
      const responce = await axiosInstanceS.get(
        `/my-requested-meals?email=${user.email}&sort=${queryKey[1]}&page=${queryKey[2]}`
      );
      return responce.data;
    },
    enabled: user ? true : false,
  });

  const totalPages = Math.ceil(requestedMealsData?.count / 10);
  const pages = [...new Array(totalPages ? totalPages : 0).fill(0)];

  const handleDelete = async (id, mealName) => {
    setLoader(true);
    setLoaderData(id);
    Swal.fire({
      title: "Are you sure?",
      text: `${mealName} will be Deleted`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await axiosInstance.delete(`/delete-requested-meal/${id}`);
        console.log(data.data);
        if (data.data.deletedCount > 0) {
          toast.success(`Your Request for --${mealName}-- has been Deleted`);
          setLoader(false);
          setLoaderData("");
          refetch();
          return;
        }
        toast.error("Something Went Wrong");
      } else {
        setLoader(false);
        setLoaderData("");
      }
    });
  };

  return (
    <div>
      <div className="p-12 bg-white w-[950px]">
        <div className="flex justify-between items-center font-cinzel mb-8">
          <p className="text-[#151515] text-2xl font-bold">
            Total Users: {requestedMealsData?.count}
          </p>
          <select
            className="font-semibold border border-[#141515] px-4 py-2 rounded-lg"
            onChange={(e) => setSort(e.target.value)}
          >
            <option className="bg-[#141515] text-white" value="del">
              Delivered First
            </option>
            <option className="bg-[#141515] text-white" value="pen">
              Pending First
            </option>
          </select>
        </div>
        {/* Table Start  */}
        {isLoading || !user || !requestedMealsData ? (
          <Loader color={"primary"} />
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-[#141515] uppercase text-white">
                <tr>
                  <th className="py-2">SL.</th>
                  <th className="text-center">Meal Title</th>
                  <th className="text-center">Likes</th>
                  <th className="text-center">Reviews</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Row */}
                {requestedMealsData.requestedMeals.map((meal, i) => (
                  <tr className="" key={meal._id}>
                    <th>
                      <p>{i + 1}</p>
                    </th>

                    <td className="text-center font-bold">
                      {meal.meal.mealTitle}
                    </td>
                    <td className="text-center font-bold">{meal.meal.likes}</td>
                    <td className="text-center font-bold">
                      {meal.meal.numReviews}
                    </td>
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
                        onClick={() =>
                          handleDelete(meal._id, meal.meal.mealTitle)
                        }
                        className="flex items-center m-auto gap-2 cursor-pointer bg-[#141515] w-max text-white p-1 rounded-full px-2 select-none transition-all active:scale-90 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:"
                        disabled={meal.status == "delivered" ? true : false}
                      >
                        Delete{" "}
                        {loader && loaderData == meal._id ? (
                          <ImSpinner9 className="animate-spin" />
                        ) : (
                          <MdDelete />
                        )}
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        pages={pages}
        totalPages={totalPages}
      />
    </div>
  );
};

export default RequestedMeals;
