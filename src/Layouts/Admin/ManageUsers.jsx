import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaPen } from "react-icons/fa6";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../Components/Shared/Loader";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const ManageUsers = () => {
  const axiosInstance = useAxiosPublic();
  const [search, setSearch] = useState("");
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", search],
    queryFn: async ({ queryKey }) => {
      const responce = await axiosInstance.get(
        `/all-users?search=${queryKey[1]}`
      );
      return responce.data;
    },
  });
  const makeAdmin = async (email, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${name} will become the Admi of this System`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Make Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .put(`/make-admin/${email}`)
          .then(() => {
            refetch();
            toast.success(`${name} is made Admin`);
          })
          .catch((error) => console.log(error));
      }
    });
  };
  // if (isLoading) return <Loader />;
  return (
    <div>
      <div className="p-12 bg-white w-[900px]">
        <div className="flex justify-between items-center font-cinzel mb-8">
          <p className="text-[#151515] text-2xl font-bold">
            Total Users: {users?.length}
          </p>
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#141515] px-3 py-2 w-[300px] text-white font-semibold rounded-md"
            type="text"
            placeholder="Search by Name or Email"
          />
        </div>

        {/* Table Start  */}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-[#141515] uppercase text-white">
                <tr>
                  <th className="py-2">SL.</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Email</th>
                  <th className="text-center">Role</th>
                  <th className="text-center">Subscription</th>
                </tr>
              </thead>
              <tbody>
                {/* Row */}
                {users.map((user, i) => (
                  <tr className="" key={user._id}>
                    <th>
                      <p>{i + 1}</p>
                    </th>

                    <td className="text-center font-bold">{user.name}</td>
                    <td className="text-center font-bold">{user.email}</td>
                    <td>
                      {user.role === "admin" ? (
                        <p className="text-center font-bold ">Admin</p>
                      ) : (
                        <div
                          onClick={() => makeAdmin(user.email, user.name)}
                          className="flex items-center m-auto gap-2 cursor-pointer bg-[#141515] w-max text-white p-1 rounded-full px-2 select-none transition-all active:scale-90"
                        >
                          <span>Make Admin</span>
                          <FaPen className="text-[10px]"></FaPen>
                        </div>
                      )}
                    </td>
                    <th className="">
                      {user.badge === "bronze" ? (
                        <p className="text-center font-bold">Bronze</p>
                      ) : (
                        <p className="text-center font-bold">
                          {user.badge.split("-")[1]}
                        </p>
                      )}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
