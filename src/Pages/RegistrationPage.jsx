import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AiFillGithub, AiOutlineGoogle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Providers/AuthProvider";
import { imageUploader } from "../Utils/imageUploder";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { registration, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleRegistration = async (data) => {
    try {
      await registration(data.email, data.password);
      const { display_url: imageURL } = await imageUploader(data.image[0]);
      await updateUserProfile(data.name, imageURL);
      toast.success("Registered Succesfully", { autoClose: 2000 });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = () => {
    // googleLogin()
    //   .then(() => {
    //     navigate(location?.state ? location.state : "/");
    //     toast.success("Successfully Logged In by Google.", { autoClose: 2000 });
    //   })
    //   .catch((e) => {
    //     console.log(e.code);
    //   });
  };

  const handleGithubLogin = () => {
    // githubLogin()
    //   .then(() => {
    //     navigate(location?.state ? location.state : "/");
    //     toast.success("Successfully Logged In by Github.", { autoClose: 2000 });
    //   })
    //   .catch((e) => console.log(e));
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse items-center w-[95%] lg:w-[70%] mx-auto shadow-xl my-10">
      <div className="lg:w-1/2 p-5 md:p-10">
        <form
          onSubmit={handleSubmit(handleRegistration)}
          className="flex flex-col gap-4 items-center"
        >
          <h1 className="font-bold text-3xl">Registration</h1>
          <div className="flex gap-4">
            <a
              href="#"
              onClick={handleGoogleLogin}
              className="border rounded-full p-2"
            >
              <AiOutlineGoogle className="text-xl"></AiOutlineGoogle>
            </a>
            <a
              href="#"
              onClick={handleGithubLogin}
              className="border rounded-full p-2"
            >
              <AiFillGithub className="text-xl"></AiFillGithub>
            </a>
          </div>
          <span>or use E-mail & Password to create</span>
          <div className="w-full">
            <input
              className="w-full bg-[#f3f3f3] px-4 py-3"
              type="text"
              placeholder="Name"
              name="name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500 font-medium">You Name is Required</p>
            )}
          </div>

          <div className="w-full">
            <input
              className="w-full bg-[#f3f3f3] px-4 py-3"
              type="text"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 font-medium">You E-mail is Required</p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="text-red-500 font-medium">
                Please Enter a Valid E-mail
              </p>
            )}
            <label className=""></label>
          </div>

          <div className="w-full">
            <input
              className="w-full bg-[#f3f3f3] px-4 py-3"
              type="file"
              name="image"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <p className="text-red-500 font-medium">You Image is Required</p>
            )}
          </div>
          <div className="w-full">
            <input
              className="w-full bg-[#f3f3f3] px-4 py-3"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-].*/,
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 font-medium">password is Required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 font-medium">
                password should be more that 6 Charecter
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 font-medium">
                password should contail atleast one Special Charecter
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-primary to-secondary text-white font-bold uppercase rounded-[20px] py-3 px-11 text-xs"
          >
            Register
          </button>
        </form>
      </div>

      <div className="bg-gradient-to-r from-primary to-secondary w-full lg:w-1/2 flex flex-col items-center  h-full py-10 text-white rounded-md">
        <h1
          className="text-3xl font-semibold mb-10
        "
        >
          Welcome Back!
        </h1>
        <p>Already have an Account?</p>
        <Link to="/login">
          <button className="border px-6 py-2 rounded-3xl mt-3">Log In</button>
        </Link>
      </div>
    </div>
  );
};

export default RegistrationPage;
