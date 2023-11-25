import moment from "moment";
import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegStar, FaStar } from "react-icons/fa6";
import Rating from "react-rating";
import { AuthContext } from "../../Providers/AuthProvider";

const AddMeal = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { user } = useContext(AuthContext);
  const ind = useRef();
  //   console.log(moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a"));
  //   console.log(Date.now());
  const [ingredients, setIngredients] = useState([]);
  const handleInd = () => {
    const newIngredients = [...ingredients, ind.current.value];
    setIngredients(newIngredients);
    ind.current.value = "";
  };
  const handleAddMeal = async (data) => {
    console.log(data);
  };
  return (
    <div className="w-[900px]">
      <p className="bg-[#141515] text-white text-lg font-semibold py-3 text-center">
        Add Meal
      </p>
      <form onSubmit={handleSubmit(handleAddMeal)} className="">
        <div className="flex items-center justify-between my-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <label className="font-semibold" htmlFor="">
                Meal Title
              </label>
              <input
                {...register("mealTitle", { required: true })}
                className="bg-[#141515] text-white w-[300px] px-4 py-2 rounded-md font-semibold"
                type="text"
              />
            </div>
            {errors.mealTitle?.type === "required" && (
              <p
                className="text-red-600
              "
              >
                Meal Name is required
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold" htmlFor="">
              Price
            </label>
            <input
              className="bg-[#141515] text-white w-[200px] px-4 py-2 rounded-md font-semibold"
              type="number"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold" htmlFor="">
              Meal Type
            </label>
            <select
              name=""
              className="bg-[#141515] text-white px-4 py-2 rounded-md font-semibold"
            >
              <option value="">Breakfast</option>
              <option value="">Lunch</option>
              <option value="">Dinner</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between my-10">
          <div className="flex items-center gap-2">
            <label className="font-semibold" htmlFor="">
              Meal Image
            </label>
            <input
              className="bg-[#141515] text-white w-[285px] px-4 py-2 rounded-md font-semibold"
              type="file"
            />
            <img src="/home-slider-5.jpg" className="w-16 rounded-md" alt="" />
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold" htmlFor="">
              Rating
            </label>
            <Rating
              // onChange={(e) => setRating(e)}
              // placeholderRating={rating}
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
                  key={i}
                  className="font-semibold border border-[#141515] px-3 rounded-full py-[2px]"
                >
                  {ing}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3">
          <div className="col-span-2 flex items-center gap-2">
            <label className="font-semibold" htmlFor="">
              Description
            </label>
            <textarea
              name=""
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddMeal;
