import { useContext } from "react";
import { AiFillGithub, AiOutlineGoogle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Providers/AuthProvider";

const SocialLogin = () => {
  const { GoogleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleGithubLogin = () => {};
  const handleGoogleLogin = async () => {
    await GoogleLogin();
    toast.success("Logged In by Google");
    navigate("/");
  };
  return (
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
  );
};

export default SocialLogin;
