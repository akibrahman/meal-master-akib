import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Loader from "../../Components/Shared/Loader";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const AdminProfile = () => {
  const { user: authUser } = useContext(AuthContext);
  const axiosInstanceS = useAxiosSecure();

  const {
    data: user,
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: ["admin-profile"],
    queryFn: async () => {
      const res = await axiosInstanceS.get(
        `/admin-profile?email=${authUser.email}`
      );
      return res.data;
    },
    enabled: authUser ? true : false,
  });
  const {
    data: adminData,
    isLoading: adminDataLoading,
    // refetch,
  } = useQuery({
    queryKey: ["admin-profile-data"],
    queryFn: async () => {
      const res = await axiosInstanceS.get(
        `/admin-profile-data?email=${authUser.email}`
      );
      return res.data;
    },
    enabled: authUser ? true : false,
  });

  if (isLoading || adminDataLoading || !user || !authUser) return <Loader />;

  return (
    <div className="w-[900px] my-20">
      <p className="font-semibold text-xl text-white bg-primary py-2 text-center w-full">
        Admin profile
      </p>
      <div className="relative flex items-center justify-center gap-10 my-16">
        <img
          src={authUser.photoURL}
          className="w-80 h-80 border-4 border-primary"
          alt=""
        />
        <div className="border-l-2 border-primary pl-3 font-semibold text-lg">
          <p>
            <span className="font-black mr-3">Name: </span>
            {user.name}
          </p>
          <p>
            <span className="font-black mr-3">E-mail:</span> {user.email}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 my-10 text-center">
        <div className="border-l-4 bg-stone-200 border-primary p-5">
          <p className="text-xl font-semibold">Meals you Added</p>
          <p className="text-3xl mt-2 font-semibold">
            {adminData.addedMealCount}
          </p>
        </div>

        <div className="border-l-4 bg-stone-200 border-primary p-5">
          <p className="text-xl font-semibold">Total Payment</p>
          <p className="text-3xl mt-2 font-semibold flex items-center justify-center gap-1">
            <FaBangladeshiTakaSign />
            {adminData.paymentAmount}
          </p>
        </div>

        <div className="border-l-4 bg-stone-200 border-primary p-5">
          <p className="text-xl font-semibold">Requested Meals</p>
          <p className="text-3xl mt-2 font-semibold">
            {adminData.requestedMealsCount}
          </p>
        </div>

        <div className="border-l-4 bg-stone-200 border-primary p-5">
          <p className="text-xl font-semibold">Served Meals</p>
          <p className="text-3xl mt-2 font-semibold">
            {adminData.servedMealCount}
          </p>
        </div>

        <div className="border-l-4 bg-stone-200 border-primary p-5">
          <p className="text-xl font-semibold">Pending Meals</p>
          <p className="text-3xl mt-2 font-semibold">
            {adminData.pendingMealCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
