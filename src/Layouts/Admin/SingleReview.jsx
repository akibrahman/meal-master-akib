import { FaArrowRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SingleReview = ({ mealId, reviewId, index, reloader, data, modal }) => {
  const axiosInstance = useAxiosPublic();

  const handleDelete = (reviewId, mealId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        modal(true);
        axiosInstance
          .patch(`/delete-one-review?reviewId=${reviewId}&mealId=${mealId}`)
          .then(() => {
            reloader();
            modal(false);
            Swal.fire({
              title: "Deleted!",
              text: "Review has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => toast.error(error.message));
      }
    });
  };

  return (
    <tr className="">
      <th>
        <p>{index + 1}</p>
      </th>

      <td className="text-center font-bold">{data.mealTitle}</td>
      <td className="text-center font-bold">{data.likes}</td>
      <td className="text-center font-bold">{data.reviews}</td>

      <th className="flex gap-2 justify-center">
        <MdDelete
          onClick={() => handleDelete(reviewId, mealId)}
          className="bg-[#141515] text-white w-8 h-8 p-2 rounded-full select-none cursor-pointer transition-all active:scale-75"
        />
        <Link to={`/meal/${mealId}`}>
          <FaArrowRight className="bg-[#141515] text-white w-8 h-8 p-2 rounded-full select-none cursor-pointer transition-all active:scale-75" />
        </Link>
      </th>
    </tr>
  );
};

export default SingleReview;
