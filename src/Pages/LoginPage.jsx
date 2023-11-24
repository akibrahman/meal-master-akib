// import { BiHappyBeaming } from "react-icons/bi";
// import logo from "/logo.png";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AiFillGithub, AiOutlineGoogle } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Providers/AuthProvider";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./Login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logIn } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const handleLogin = async (data) => {
    try {
      await logIn(data.email, data.password);
      toast.success("LogIn Succesfully", { autoClose: 2000 });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGithubLogin = () => {
    //     githubLogin()
    //       .then(() => {
    //         navigate(location?.state ? location.state : "/");
    //         toast.success("Successfully Logged In by Github", { autoClose: 2000 });
    //       })
    //       .catch((e) => console.log(e));
  };
  const handleGoogleLogin = () => {};

  return (
    <div
      data-aos="zoom-in-up"
      data-aos-duration="900"
      className="flex flex-col lg:flex-row items-center w-[95%] md:w-[70%] mx-auto shadow-xl my-10"
    >
      <div className="lg:w-1/2 p-5 md:p-10">
        <form
          className="flex flex-col gap-4 items-center"
          onSubmit={handleSubmit(handleLogin)}
        >
          <h1 className="font-bold text-3xl">Sign in</h1>
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
          <span>or use your account</span>
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
          </div>
          <div className="w-full">
            <input
              className="w-full bg-[#f3f3f3] px-4 py-3"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 font-medium">password is Required</p>
            )}
          </div>
          <a href="#" className="">
            Forgot your password?
          </a>
          <button
            type="submit"
            className="bg-gradient-to-r from-primary to-secondary text-white font-bold uppercase rounded-[20px] py-3 px-11 text-xs"
          >
            Log In
          </button>
        </form>
      </div>

      <div className="bg-gradient-to-r from-primary to-secondary w-full lg:w-1/2 flex flex-col items-center  h-full py-10 text-white rounded-md">
        <h1
          className="text-3xl font-semibold mb-10
        "
        >
          Hello, Friend!
        </h1>
        <p>Do not have an Account?</p>
        <Link to="/registration">
          <button className="border px-6 py-2 rounded-3xl mt-3">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
