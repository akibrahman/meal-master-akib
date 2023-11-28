import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaExclamationCircle,
  FaRegStar,
  FaStar,
  FaTimes,
} from "react-icons/fa";
import Rating from "react-rating";
import { toast } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { convertImageToBase64 } from "../../Utils/imageToBase64";
import { photoUpdateHandler } from "../../Utils/photoUpdateHandler";
import Loader from "../Shared/Loader";

const EditMeal = ({ closeFn, mealID, allMealsRefetch }) => {
  const [preview, setPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [rating, setRating] = useState(null);
  const ind = useRef();
  const axiosInstance = useAxiosPublic();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const {
    data: meal,
    refetch: mealRefetch,
    isLoading,
  } = useQuery({
    queryKey: ["sigleMeal", mealID],
    queryFn: async () => {
      const data = await axiosInstance.get(`/meal/${mealID}`);
      return data.data;
    },
  });

  const [newIngredients, setNewIngredients] = useState([]);
  useEffect(() => {
    setNewIngredients(meal ? [...meal.ingredients] : []);
  }, [meal]);

  const handleIngrediantAdd = () => {
    const temp = [...newIngredients];
    temp.push(ind.current.value);
    setNewIngredients(temp);
    ind.current.value = "";
  };

  const handleImgFile = async (e) => {
    setPhotoFile(e.target.files[0]);
    const base = await convertImageToBase64(e.target.files[0]);
    setPreview(base);
  };

  const handleUpdate = async (data) => {
    const imgUrl = await photoUpdateHandler(photoFile, meal.mealImage);
    const mealData = {
      mealTitle: data.mealTitle,
      mealType: data.mealType,
      price: parseInt(data.price),
      mealImage: imgUrl,
      ingredients: newIngredients,
      description: data.description,
      rating: rating ? parseInt(rating) : parseInt(meal.rating),
    };
    const res = await axiosInstance.patch(
      `/update-one-meal/${mealID}`,
      mealData
    );
    mealRefetch();
    allMealsRefetch();
    toast.success("Meal Updated");
    console.log(res);
  };
  if (!meal) return <Loader />;
  if (isLoading) return <Loader />;
  return (
    <form onSubmit={handleSubmit(handleUpdate)} className="">
      <div className="flex items-center justify-between my-5">
        <div className="flex items-center gap-2">
          {errors.mealTitle?.type === "required" && (
            <FaExclamationCircle className="text-red-700" />
          )}
          <label className="font-semibold" htmlFor="">
            Meal Title
          </label>
          <input
            {...register("mealTitle", { required: true })}
            defaultValue={meal.mealTitle}
            className="bg-[#141515] text-white w-[300px] px-4 py-2 rounded-md font-semibold"
            type="text"
          />
        </div>

        <div className="flex items-center gap-2">
          {(errors.price?.type === "required" ||
            errors.price?.type === "pattern") && (
            <FaExclamationCircle className="text-red-700" />
          )}
          <label className="font-semibold" htmlFor="">
            Price
          </label>
          <input
            {...register("price", { required: true, pattern: /^\d+(\.\d+)?$/ })}
            defaultValue={meal.price}
            className="bg-[#141515] text-white w-[200px] px-4 py-2 rounded-md font-semibold"
            // type="number"
          />
        </div>
        <div className="flex items-center gap-2">
          {errors.mealType?.type === "required" && (
            <FaExclamationCircle className="text-red-700" />
          )}
          <label className="font-semibold" htmlFor="">
            Meal Type
          </label>
          <select
            {...register("mealType", { required: true })}
            defaultValue={meal.mealType}
            className="bg-[#141515] text-white px-4 py-2 rounded-md font-semibold"
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between my-5">
        <div className="flex items-center gap-2">
          <label className="font-semibold" htmlFor="">
            Meal Image
          </label>
          <input
            className="bg-[#141515] text-white w-[285px] px-4 py-2 rounded-md font-semibold"
            type="file"
            onChange={handleImgFile}
          />
          <img
            src={preview ? preview : meal.mealImage}
            className="w-16 rounded-md"
            alt=""
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="font-semibold" htmlFor="">
            Rating
          </label>
          <Rating
            onChange={(e) => {
              setRating(e);
            }}
            placeholderRating={rating ? rating : meal.rating}
            emptySymbol={<FaRegStar className="text-3xl" />}
            placeholderSymbol={<FaStar className="text-3xl" />}
            fullSymbol={<FaStar className="text-3xl" />}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold" htmlFor="">
            Post Time
          </label>
          <input
            readOnly
            defaultValue={moment(meal.postTime).format("h:mm:ss A")}
            className="bg-[#141515] text-white px-4 py-2 rounded-md font-semibold w-[120px]"
            type="text"
          />
        </div>
      </div>
      <div className="my-10">
        <div className="flex items-center gap-2">
          <label className="font-semibold" htmlFor="">
            Ingredients
          </label>
          <input
            className="bg-[#141515] text-white w-[200px] px-4 py-2 rounded-md font-semibold"
            type="text"
            ref={ind}
            name="ind"
          />
          <p
            onClick={handleIngrediantAdd}
            className="bg-[#141515] text-white font-semibold px-3 py-2 transition-all active:scale-90 rounded-md cursor-pointer select-none"
          >
            Add
          </p>
          <div className="text-black flex flex-wrap items-center justify-center gap-3 ml-10 max-w-lg">
            <p className="font-bold">{newIngredients.length}</p>
            {newIngredients.map((ing, i) => (
              <p
                key={i}
                onClick={() => {
                  const temp = [...newIngredients];
                  temp.splice(i, 1);
                  setNewIngredients(temp);
                }}
                className="font-semibold border border-[#141515] px-3 rounded-full py-[2px] flex items-center gap-1 cursor-pointer"
              >
                {ing}
                <FaTimes />
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div className="col-span-2 flex items-center gap-2">
          {errors.description?.type === "required" && (
            <FaExclamationCircle className="text-red-700" />
          )}
          <label className="font-semibold" htmlFor="">
            Description
          </label>

          <textarea
            {...register("description", { required: true })}
            defaultValue={meal.description}
            className="bg-[#141515] text-white w-full h-[100px] px-3 py-1 rounded-md"
          ></textarea>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex">
            <label className="font-semibold mr-3 block w-[70px]">Likes</label>
            <input
              readOnly
              defaultValue={meal.likes}
              className="bg-[#141515] text-white py-1 px-4 rounded-md w-[80px]"
              type="number"
            />
          </div>
          <div className="flex">
            <label className="font-semibold mr-3 block w-[70px]">Reviews</label>
            <input
              readOnly
              defaultValue={meal.numReviews}
              className="bg-[#141515] text-white py-1 px-4 rounded-md w-[80px]"
              type="number"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between my-10">
        <div className="flex items-center gap-2">
          <label className="font-semibold" htmlFor="">
            Admin Name
          </label>
          <input
            readOnly
            defaultValue={meal.distributorName}
            className="bg-[#141515] text-white w-[300px] px-4 py-2 rounded-md font-semibold"
            type="text"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold" htmlFor="">
            Admin E-mail
          </label>
          <input
            readOnly
            defaultValue={meal.distributorEmail}
            className="bg-[#141515] text-white w-[300px] px-4 py-2 rounded-md font-semibold"
            type="text"
          />
        </div>
      </div>
      <button
        //   onClick={() => setSubmitType("meal")}
        className="bg-[#141515] text-white font-semibold px-3 py-2 transition-all active:scale-90 rounded-md cursor-pointer select-none mt-5"
        type="submit"
      >
        Update Meal
      </button>
      <span
        onClick={closeFn}
        className="bg-[#141515] text-white font-semibold px-3 py-2 transition-all active:scale-90 rounded-md cursor-pointer select-none mt-5 ml-10"
        type="submit"
      >
        Cancel
      </span>
    </form>
  );
};

export default EditMeal;
