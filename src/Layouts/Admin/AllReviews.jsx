import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loader from "../../Components/Shared/Loader";
import Pagination from "../../Components/Shared/Pagination";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SingleReview from "./SingleReview";

const AllReviews = () => {
  const axiosInstanceS = useAxiosSecure();
  const [sort, setSort] = useState("");
  const [dir, setDir] = useState("htl");
  const [page, setPage] = useState(0);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all-reviews-aggegate-admin", sort, dir, page],
    queryFn: async ({ queryKey }) => {
      console.log(queryKey[1], queryKey[2]);
      const responce = await axiosInstanceS.get(
        `/all-reviews-aggrigate?sort=${queryKey[1]}&dir=${queryKey[2]}&page=${queryKey[3]}`
      );
      return responce.data;
    },
    enabled: dir ? true : false,
  });

  const totalPages = Math.ceil(data?.count / 10);
  const pages = [...new Array(totalPages ? totalPages : 0).fill(0)];

  return (
    <div>
      <div className="p-12 bg-white w-[900px]">
        <div className="flex justify-between items-center font-cinzel mb-8">
          <p className="text-[#151515] text-2xl font-bold">
            Total reviews: {data?.reviews?.length}
          </p>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort by:</label>
            <select
              className="font-semibold border border-[#141515] px-4 py-2 rounded-lg"
              onChange={(e) => setSort(e.target.value)}
            >
              <option className="bg-[#141515] text-white" value="">
                Default
              </option>
              <option className="bg-[#141515] text-white" value="sbl">
                Short by Likes
              </option>
              <option className="bg-[#141515] text-white" value="sbr">
                Short by Reviews
              </option>
            </select>
          </div>
          <select
            className="font-semibold border border-[#141515] px-4 py-2 rounded-lg"
            onChange={(e) => setDir(e.target.value)}
          >
            <option className="bg-[#141515] text-white" value="htl">
              High to Low
            </option>
            <option className="bg-[#141515] text-white" value="lth">
              Low to High
            </option>
          </select>
        </div>

        {/* Table Start  */}
        {isLoading || !data ? (
          <Loader />
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
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Row */}
                {data.reviews.map((review, i) => (
                  <SingleReview
                    reloader={refetch}
                    mealId={review.mealId}
                    reviewId={review._id}
                    index={i}
                    key={review._id}
                    data={review}
                  />
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

export default AllReviews;
