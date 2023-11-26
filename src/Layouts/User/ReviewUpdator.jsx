import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";
import Rating from "react-rating";
import { toast } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const ReviewUpdator = ({ reviewId = "abc", modalCloser }) => {
  const axiosInstance = useAxiosPublic();
  const [rating, setRating] = useState(null);
  const [error, setError] = useState(false);
  const newReview = useRef();

  const {
    data: review,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-review", reviewId],
    queryFn: async ({ queryKey }) => {
      const responce = await axiosInstance.get(`/review/${queryKey[1]}`);
      return responce.data;
    },
    enabled: reviewId ? true : false,
  });

  const updateReview = async (id) => {
    if (newReview.current.value == review.review && !rating) {
      setError(true);
      return;
    }
    setError(false);
    const newRating = rating ? rating : review.rating;
    const newReviewText = newReview.current.value;
    const data = { newRating, newReviewText };

    const res = await axiosInstance.patch(`/review-update/${id}`, data);
    if (res.data.modifiedCount > 0) {
      toast.success("Your Review is Updated");
      refetch();
      modalCloser();
      return;
    }
    toast.error("Something went wrong");
  };

  if (isLoading || !reviewId) return <ImSpinner9 className="animate-spin" />;

  return (
    <div>
      <textarea
        ref={newReview}
        defaultValue={review.review}
        className="text-black rounded-md p-3"
        cols="40"
        rows="5"
      ></textarea>
      <br />
      <Rating
        onChange={(e) => setRating(e)}
        className="mt-4 text-2xl"
        placeholderRating={rating ? rating : review.rating}
        emptySymbol={<FaRegStar />}
        placeholderSymbol={<FaStar />}
        fullSymbol={<FaStar />}
      />
      <br />
      <button
        onClick={() => updateReview(reviewId)}
        className="text-black bg-white px-3 py-1 rounded-full font-semibold mt-5 transition-all active:scale-90"
      >
        Update
      </button>
      {error && (
        <p className="mt-3 font-semibold text-red-600">
          You did not change enything yet !
        </p>
      )}
    </div>
  );
};

export default ReviewUpdator;
