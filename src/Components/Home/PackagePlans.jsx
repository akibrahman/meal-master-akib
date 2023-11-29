import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";
import Container from "../Shared/Container";

const PackagePlans = () => {
  const navigate = useNavigate();
  const axiosInstanceS = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const handleClick = async (pack) => {
    if (!user) {
      Swal.fire({
        title: "You are not Logged In",
        text: "You have to login to Purchase a Package !",

        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Page",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    const badge = await axiosInstanceS.get(`/get-package?email=${user.email}`);
    const userPack = badge.data.split("-")[1];
    if (userPack == "silver" || userPack == "gold" || userPack == "platinum") {
      toast.info("You are already a subscribed member");
      return;
    }
    navigate(`/checkout/${pack}`);
  };
  return (
    <div className="py-20 bg-white">
      <p className="text-center  text-3xl font-bold mb-10">Packages</p>
      <Container>
        <div className="grid grid-cols-3 gap-5">
          <div className="bg-primary text-white text-center py-10">
            <p className="font-semibold text-xl mb-8 bg-slate-400 py-1">
              Silver
            </p>
            <p>
              <spna className="text-4xl">৳3000 </spna>/mounth
            </p>
            <ul className="mt-10 w-max mx-auto list-disc">
              <li className="text-left text-stone-100 font-semibold text-lg">
                Qualityful Meal
              </li>
              <li className="text-left text-stone-100 font-semibold text-lg">
                24/7 service
              </li>
              <li className="text-left text-stone-100 font-semibold text-lg">
                Cucumber Salad
              </li>
              <del>
                <li className="text-left text-stone-100 font-semibold text-lg">
                  Mounthly Special Meal
                </li>
                <li className="text-left text-stone-100 font-semibold text-lg">
                  One-time Package
                </li>
                <li className="text-left text-stone-100 font-semibold text-lg">
                  Minarel Water
                </li>
                <li className="text-left text-stone-100 font-semibold text-lg">
                  Free Delivery
                </li>
              </del>
            </ul>
            {/* <Link to={`/checkout/${"silver"}`}> */}
            <button
              onClick={() => handleClick("silver")}
              className="transition-all active:scale-90 mt-10 font-semibold bg-white text-primary px-4 py-2 rounded-md"
            >
              Subscribe
            </button>
            {/* </Link> */}
          </div>
          <div className="from-secondary to-primary bg-gradient-to-l text-white text-center py-10">
            <p className="font-semibold text-xl mb-8 bg-yellow-500 py-1">
              Gold
            </p>
            <p>
              <spna className="text-4xl">৳4000 </spna>/mounth
            </p>
            <ul className="mt-10 w-max mx-auto list-disc">
              <li className="text-left text-yellow-500 font-semibold text-lg">
                Qualityful Meal
              </li>
              <li className="text-left text-yellow-500 font-semibold text-lg">
                24/7 service
              </li>
              <li className="text-left text-yellow-500 font-semibold text-lg">
                Cucumber Salad
              </li>
              <li className="text-left text-yellow-500 font-semibold text-lg">
                Mounthly Special Meal
              </li>
              <li className="text-left text-yellow-500 font-semibold text-lg">
                One-time Package
              </li>
              <del>
                <li className="text-left text-yellow-500 font-semibold text-lg">
                  Minarel Water
                </li>
                <li className="text-left text-yellow-500 font-semibold text-lg">
                  Free Delivery
                </li>
              </del>
            </ul>
            {/* <Link to={`/checkout/${"gold"}`}> */}
            <button
              onClick={() => handleClick("gold")}
              className="transition-all active:scale-90 mt-10 font-semibold bg-white text-primary px-4 py-2 rounded-md border-2 border-yellow-500"
            >
              Subscribe
            </button>
            {/* </Link> */}
          </div>
          <div className="bg-secondary text-white text-center py-10">
            <p className="font-semibold text-xl mb-8 bg-purple-700 py-1">
              Platinum
            </p>
            <p>
              <spna className="text-4xl">৳5000 </spna>/mounth
            </p>
            <ul className="mt-10 w-max mx-auto list-disc">
              <li className="text-left text-purple-700 font-semibold text-lg">
                Qualityful Meal
              </li>
              <li className="text-left text-purple-700 font-semibold text-lg">
                24/7 service
              </li>
              <li className="text-left text-purple-700 font-semibold text-lg">
                Cucumber Salad
              </li>
              <li className="text-left text-purple-700 font-semibold text-lg">
                Mounthly Special Meal
              </li>
              <li className="text-left text-purple-700 font-semibold text-lg">
                One-time Package
              </li>
              <li className="text-left text-purple-700 font-semibold text-lg">
                Minarel Water
              </li>
              <li className="text-left text-purple-700 font-semibold text-lg">
                Free Delivery
              </li>
            </ul>
            {/* <Link to={`/checkout/${"platinum"}`}> */}
            <button
              onClick={() => handleClick("platinum")}
              className="transition-all active:scale-90 mt-10 font-semibold bg-white text-primary px-4 py-2 rounded-md border-2 border-purple-700"
            >
              Subscribe
            </button>
            {/* </Link> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PackagePlans;
