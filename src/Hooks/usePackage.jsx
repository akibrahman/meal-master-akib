import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const usePackage = () => {
  const axiosInstanceS = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const {
    data: pack,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "package"],
    queryFn: async () => {
      const responce = await axiosInstanceS.get(
        `/get-package?email=${user.email}`
      );
      return responce.data;
    },
    enabled: user?.email ? true : false,
  });
  return { pack, isLoading, refetch };
};

export default usePackage;
