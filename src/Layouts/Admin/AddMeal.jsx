import moment from "moment";
import { useContext, useRef, useState } from "react";
import { AwesomeButtonProgress } from "react-awesome-button";
import { useForm } from "react-hook-form";
import { FaExclamationCircle, FaTimes } from "react-icons/fa";
import { FaBangladeshiTakaSign, FaRegStar, FaStar } from "react-icons/fa6";
import Rating from "react-rating";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";
import { convertImageToBase64 } from "../../Utils/imageToBase64";
import { imageUploader } from "../../Utils/imageUploder";

const AddMeal = () => {
  const [rating, setRating] = useState();
  const [ratingError, setRatingError] = useState(false);
  const [indError, setIndError] = useState(false);
  const [preview, setPreview] = useState(null);
  // const [submitType, setSubmitType] = useState("");

  const axiosInstanceS = useAxiosSecure();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm();
  const { user } = useContext(AuthContext);
  const ind = useRef();
  const mealAdder = useRef();
  const [ingredients, setIngredients] = useState([]);
  const handleInd = () => {
    if (!ind.current.value) {
      if (ingredients.length == 0) {
        setIndError(true);
      }
      return;
    }
    setIndError(false);
    const newIngredients = [...ingredients, ind.current.value];
    setIngredients(newIngredients);
    ind.current.value = "";
  };

  const handleImage = async (e) => {
    const data = await convertImageToBase64(e.target.files[0]);
    setPreview(data);
  };

  const handleAddMeal = async (data) => {
    if (!rating) {
      setRatingError(true);
      setTimeout(() => {
        mealAdder.current.next(false, "Rating");
      }, 600);
      return;
    }
    if (ingredients.length == 0) {
      setIndError(true);
      setTimeout(() => {
        mealAdder.current.next(false, "Ingrediants");
      }, 600);
      return;
    }
    const imgUrl = await imageUploader(data.mealImage[0]);
    const { mealTitle, mealType, price, description } = data;
    const mealData = {
      mealTitle,
      mealType,
      price: parseFloat(price),
      mealImage: imgUrl.display_url,
      ingredients,
      description,
      rating,
      distributorName: user.displayName,
      distributorEmail: user.email,
      postTime: Date.now(),
      likes: 0,
      numReviews: 0,
    };
    if (mealAdder.current.destination == "meal") {
      try {
        await axiosInstanceS.post("add-meal", mealData);
        toast.success(`${mealTitle} is added to Meals`);
      } catch (error) {
        toast.error(error.meaasge);
      }
    } else if (mealAdder.current.destination == "upcoming") {
      try {
        await axiosInstanceS.post("add-meal-upcoming", mealData);
        toast.success(`${mealTitle} is added to Upcoming Meals`);
      } catch (error) {
        toast.error(error.meaasge);
      }
    } else {
      toast.error(`Something went Wrong! Try again!`);
      return;
    }
    reset();
    setIngredients([]);
    setPreview(null);
    mealAdder.current.next();
    mealAdder.current = {};
  };

  return (
    <div className="w-[950px] my-20">
      <p className="bg-[#141515] text-white text-lg font-semibold py-3 text-center">
        Add Meal
      </p>
      <form onSubmit={handleSubmit(handleAddMeal)}>
        <div className="flex items-center justify-between my-10">
          <div className="flex items-center gap-2">
            {errors.mealTitle?.type === "required" && (
              <FaExclamationCircle className="text-red-700" />
            )}
            <label className="font-semibold" htmlFor="">
              Meal Title
            </label>
            <input
              {...register("mealTitle", { required: true })}
              className="bg-[#141515] text-white w-[300px] px-4 py-2 rounded-md font-semibold"
              type="text"
            />
          </div>

          <div className="flex items-center gap-2">
            {errors.price?.type === "required" && (
              <FaExclamationCircle className="text-red-700" />
            )}
            <label className="font-semibold flex items-center gap-1" htmlFor="">
              Price <FaBangladeshiTakaSign />
            </label>
            <input
              {...register("price", { required: true })}
              className="bg-[#141515] text-white w-[200px] px-4 py-2 rounded-md font-semibold"
              type="number"
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
              name=""
              {...register("mealType", { required: true })}
              className="bg-[#141515] text-white px-4 py-2 rounded-md font-semibold"
            >
              <option value="">Select</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between my-10">
          <div className="flex items-center gap-2">
            {errors.mealImage && (
              <FaExclamationCircle className="text-red-700" />
            )}
            <label className="font-semibold" htmlFor="">
              Meal Image
            </label>
            <input
              {...register("mealImage", { required: true })}
              accept=".jpg, .jpeg, .png, .webp"
              className="bg-[#141515] text-white w-[285px] px-4 py-2 rounded-md font-semibold"
              type="file"
              onChange={handleImage}
            />
            <img src={preview} className="w-16 rounded-md" alt="" />
          </div>

          <div className="flex items-center gap-2">
            {ratingError && <FaExclamationCircle className="text-red-700" />}
            <label className="font-semibold" htmlFor="">
              Rating
            </label>
            <Rating
              onChange={(e) => {
                setRating(e);
                setRatingError(false);
              }}
              placeholderRating={rating}
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
              defaultValue={moment(Date.now()).format("h:mm:ss A")}
              className="bg-[#141515] text-white px-4 py-2 rounded-md font-semibold w-[120px]"
              type="text"
            />
          </div>
        </div>
        <div className="my-10">
          <div className="flex items-center gap-2">
            {indError && <FaExclamationCircle className="text-red-700" />}
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
              onClick={handleInd}
              className="bg-[#141515] text-white font-semibold px-3 py-2 transition-all active:scale-90 rounded-md cursor-pointer select-none"
            >
              Add
            </p>
            <div className="text-black flex flex-wrap items-center justify-center gap-3 ml-10">
              <p className="font-bold">{ingredients.length}</p>
              {ingredients.map((ing, i) => (
                <p
                  onClick={() => {
                    const temp = [...ingredients];
                    temp.splice(i, 1);
                    setIngredients(temp);
                  }}
                  key={i}
                  className="font-semibold border border-[#141515] px-3 rounded-full py-[2px] flex items-center gap-1 cursor-pointer select-none"
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
            {errors.description && (
              <FaExclamationCircle className="text-red-700" />
            )}
            <label className="font-semibold" htmlFor="">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              className="bg-[#141515] text-white w-full h-[100px] px-3 py-1 rounded-md"
            ></textarea>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex">
              <label className="font-semibold mr-3 block w-[70px]">Likes</label>
              <input
                readOnly
                defaultValue={"0"}
                className="bg-[#141515] text-white py-1 px-4 rounded-md w-[80px]"
                type="number"
              />
            </div>
            <div className="flex">
              <label className="font-semibold mr-3 block w-[70px]">
                Reviews
              </label>
              <input
                readOnly
                defaultValue={"0"}
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
              defaultValue={user?.displayName}
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
              defaultValue={user?.email}
              className="bg-[#141515] text-white w-[300px] px-4 py-2 rounded-md font-semibold"
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-10 mt-20">
          <AwesomeButtonProgress
            onPress={(e, next) => {
              if (!isValid) {
                next(false, "Error");
                return;
              }
              mealAdder.current = { next, destination: "meal" };
            }}
            type="primary"
          >
            Add Meal
          </AwesomeButtonProgress>
          <AwesomeButtonProgress
            onPress={(e, next) => {
              if (!isValid) {
                next(false, "Error");
                return;
              }
              mealAdder.current = { next, destination: "upcoming" };
            }}
            type="secondary"
          >
            Add to Upcoming
          </AwesomeButtonProgress>
        </div>
      </form>
    </div>
  );
};

export default AddMeal;
