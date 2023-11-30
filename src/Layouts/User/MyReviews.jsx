import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { TbMoodSad } from "react-icons/tb";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../Components/Shared/Loader";
import Pagination from "../../Components/Shared/Pagination";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";
import ReviewUpdator from "./ReviewUpdator";

const MyReviews = () => {
  const axiosInstance = useAxiosPublic();
  const axiosInstanceS = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [singleReviewId, setSingleReviewId] = useState("");
  const [page, setPage] = useState(0);

  const {
    data: reviewsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-reviews", page],
    queryFn: async ({ queryKey }) => {
      const responce = await axiosInstanceS.get(
        `/my-reviews-aggrigate?email=${user.email}&page=${queryKey[1]}`
      );
      return responce.data;
    },
    enabled: user ? true : false,
  });

  const totalPages = Math.ceil(reviewsData?.count / 10);
  const pages = [...new Array(totalPages ? totalPages : 0)];

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#151515",
      color: "#fff",
      borderRadius: "20px",
    },
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const closeLoadingModal = () => {
    setLoadingModalIsOpen(false);
  };

  const handleDelete = async (reviewId, mealId) => {
    Swal.fire({
      title: "Are you sure?",
      text: `This Review will be deleted Permanently`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoadingModalIsOpen(true);
        axiosInstance
          .patch(`/delete-a-my-review?reviewId=${reviewId}&mealId=${mealId}`)
          .then((data) => {
            console.log(data);
            if (data.data) {
              refetch();
              toast.success("Deleted Successfully");
              setLoadingModalIsOpen(false);
            } else {
              toast.error("Something Went Wrong");
            }
          })
          .catch((error) => toast.error(error.message));
      }
    });
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <ReviewUpdator reviewId={singleReviewId} modalCloser={closeModal} />
      </Modal>
      {/* Loading Modal */}
      <Modal
        isOpen={loadingModalIsOpen}
        onRequestClose={closeLoadingModal}
        style={customStyles}
      >
        <ImSpinner9 className="animate-spin" />
      </Modal>
      <div className="p-12 bg-white w-[950px]">
        <div className="flex justify-between items-center font-cinzel mb-8">
          <p className="text-[#151515] text-2xl font-bold">
            My Reviews: {reviewsData?.count}
          </p>
        </div>

        {/* Table Start  */}
        {isLoading || !user || !reviewsData ? (
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
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Row */}
                {reviewsData.reviews.length == 0 ? (
                  <p className="text-center font-semibold text-xl py-20 flex items-center justify-center gap-2">
                    You did not make any Reviews yet! <TbMoodSad />
                  </p>
                ) : (
                  reviewsData.reviews.map((review, i) => (
                    <tr className="" key={review._id}>
                      <th>
                        <p>{i + 1}</p>
                      </th>

                      <td className="text-center font-bold">
                        {review.meal.mealTitle}
                      </td>
                      <td className="text-center font-bold">
                        {review.meal.likes}
                      </td>
                      <td className="text-center font-bold">
                        {review.meal.numReviews}
                      </td>

                      <th className="flex items-center gap-2 justify-center">
                        <CiEdit
                          onClick={async () => {
                            setSingleReviewId(review._id);
                            setModalIsOpen(true);
                          }}
                          className="bg-[#141515] text-white w-8 h-8 p-2 rounded-full select-none cursor-pointer transition-all active:scale-75"
                        />
                        <MdDelete
                          onClick={() =>
                            handleDelete(review._id, review.mealId)
                          }
                          className="bg-[#141515] text-white w-8 h-8 p-2 rounded-full select-none cursor-pointer transition-all active:scale-75"
                        />
                        <Link to={`/meal/${review.meal._id}`}>
                          <FaArrowRight className="bg-[#141515] text-white w-8 h-8 p-2 rounded-full select-none cursor-pointer transition-all active:scale-75" />
                        </Link>
                      </th>
                    </tr>
                  ))
                )}
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

export default MyReviews;
