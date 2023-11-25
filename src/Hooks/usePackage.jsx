import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";

const usePackage = () => {
  const axiosInstance = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const {
    data: pack,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "package"],
    queryFn: async () => {
      const responce = await axiosInstance.get(
        `/get-package?email=${user.email}`
      );
      return responce.data;
    },
    enabled: user?.email ? true : false,
  });
  return { pack, isLoading, refetch };
};

export default usePackage;
