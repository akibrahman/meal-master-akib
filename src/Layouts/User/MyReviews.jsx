import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { TbMoodSad } from "react-icons/tb";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../Components/Shared/Loader";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Providers/AuthProvider";
import ReviewUpdator from "./ReviewUpdator";

const MyReviews = () => {
  const axiosInstance = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [singleReviewId, setSingleReviewId] = useState("");

  const {
    data: reviews,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-reviews"],
    queryFn: async () => {
      const responce = await axiosInstance.get(
        `/my-reviews-aggrigate?email=${user.email}`
      );
      return responce.data;
    },
    enabled: user ? true : false,
  });

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

  function closeModal() {
    setModalIsOpen(false);
  }

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
        axiosInstance
          .patch(`/delete-a-my-review?reviewId=${reviewId}&mealId=${mealId}`)
          .then((data) => {
            console.log(data);
            if (data.data) {
              refetch();
              toast.success("Deleted Successfully");
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
      <div className="p-12 bg-white w-[950px]">
        <div className="flex justify-between items-center font-cinzel mb-8">
          <p className="text-[#151515] text-2xl font-bold">
            Total Reviews: {reviews?.length}
          </p>
        </div>

        {/* Table Start  */}
        {isLoading || !user || reviews == undefined ? (
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
                {reviews.length == 0 ? (
                  <p className="text-center font-semibold text-xl py-20 flex items-center justify-center gap-2">
                    You did not make any Reviews yet! <TbMoodSad />
                  </p>
                ) : (
                  reviews.map((review, i) => (
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
    </div>
  );
};

export default MyReviews;
