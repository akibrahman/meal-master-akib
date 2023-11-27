import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import Loader from "../../Components/Shared/Loader";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Providers/AuthProvider";
import { convertCamelCaseToCapitalized } from "../../Utils/camelToCapitalize";

const MyProfile = () => {
  const { user: authUser } = useContext(AuthContext);
  const axiosInstance = useAxiosPublic();

  const { data: user, isLoading } = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/my-profile?email=${authUser.email}`
      );
      return res.data;
    },
    enabled: authUser ? true : false,
  });

  if (!user || isLoading || !authUser) return <Loader />;
  return (
    <div className="">
      <p className="font-semibold text-xl text-white bg-primary py-2 text-center w-[900px]">
        My profile
      </p>
      <div className="relative flex items-center justify-center gap-10 my-16">
        <div className="absolute -top-10 right-0 text-black flex flex-col items-center gap-2">
          <img
            className="w-16 h-16"
            src={
              user.badge == "bronze"
                ? "/bronze.png"
                : user.badge?.split("-")[1] == "silver"
                ? "/silver.png"
                : user.badge?.split("-")[1] == "gold"
                ? "/gold.png"
                : user.badge?.split("-")[1] == "platinum"
                ? "/platinum.png"
                : ""
            }
            alt=""
          />
          {user.badge == "bronze" ? (
            <p>
              <span className="font-semibold">Package Name:</span>
              <span className=" px-2 py-1 rounded-full font-semibold">
                No Package
              </span>
            </p>
          ) : (
            <p>
              <span className="font-semibold">Package Name:</span>{" "}
              <span
                className={`${
                  user.badge?.split("-")[1] == "gold" ? "bg-yellow-500" : ""
                } ${
                  user.badge?.split("-")[1] == "silver" ? "bg-slate-500" : ""
                } ${
                  user.badge?.split("-")[1] == "platinum" ? "bg-purple-500" : ""
                } text-white px-3 py-1 rounded-full font-semibold`}
              >
                {convertCamelCaseToCapitalized(user.badge?.split("-")[1])}
              </span>
            </p>
          )}
          {/* </p> */}
        </div>
        <img
          src={authUser.photoURL}
          className="w-80 h-80 rounded-full border-4 border-primary"
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
      <p className="font-semibold text-xl text-white bg-primary py-2 text-center w-[900px]">
        About Me
      </p>
    </div>
  );
};

export default MyProfile;
