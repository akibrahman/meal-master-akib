import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { MdBloodtype } from "react-icons/md";
import Modal from "react-modal";
import { toast } from "react-toastify";
import Loader from "../../Components/Shared/Loader";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Providers/AuthProvider";
import { convertCamelCaseToCapitalized } from "../../Utils/camelToCapitalize";

const MyProfile = () => {
  const { user: authUser } = useContext(AuthContext);
  const axiosInstance = useAxiosPublic();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState(false);

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/my-profile?email=${authUser.email}`
      );
      return res.data;
    },
    enabled: authUser ? true : false,
  });

  function isValidBloodGroup(input) {
    const bloodGroupPattern = /^(A|B|AB|O)[+-]$/;
    return bloodGroupPattern.test(input);
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#151515",
      color: "#fff",
      borderRadius: "20px",
    },
  };

  function closeModal() {
    setModalIsOpen(false);
  }

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    const form = event.target;
    if (!isValidBloodGroup(form.bloodGroup.value)) {
      setError("Enter Valid Blood Group Like 'A+','O-','AB-'");
      return;
    }
    const data = {
      area: form.area.value,
      city: form.city.value,
      division: form.division.value,
      zipCode: form.zipCode.value,
      phoneNo: form.phoneNo.value,
      facebook: form.facebook.value,
      bloodGroup: form.bloodGroup.value,
      myself: form.myself.value,
    };
    const res = await axiosInstance.patch(
      `/update-my-profile/${user.email}`,
      data
    );
    if (res.data.acknowledged) {
      await refetch();
      toast.success("Profile Updated");
      setModalIsOpen(false);
    } else {
      toast.error("Something went Wrong");
    }
  };

  if (!user || isLoading || !authUser) return <Loader />;
  return (
    <div className="w-[900px] my-20">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <form onSubmit={handleProfileUpdate}>
          <div className="flex gap-6">
            <div className="space-y-3">
              <div className="flex items-center">
                <label className="w-[100px] block">Area:</label>
                <input
                  defaultValue={user.about.area}
                  placeholder="Name of your Area"
                  className="rounded-md px-3 py-2 text-black font-semibold focus:outline-none"
                  type="text"
                  name="area"
                />
              </div>
              <div className="flex items-center">
                <label className="w-[100px] block">City:</label>
                <input
                  defaultValue={user.about.city}
                  placeholder="Name of your City"
                  className="rounded-md px-3 py-2 text-black font-semibold focus:outline-none"
                  type="text"
                  name="city"
                />
              </div>
              <div className="flex items-center">
                <label className="w-[100px] block">Division:</label>
                <input
                  defaultValue={user.about.division}
                  placeholder="Name of your Division"
                  className="rounded-md px-3 py-2 text-black font-semibold focus:outline-none"
                  type="text"
                  name="division"
                />
              </div>
              <div className="flex items-center">
                <label className="w-[100px] block">Zip Code:</label>
                <input
                  defaultValue={user.about.zipCode}
                  placeholder="Enter your Postal Code"
                  className="rounded-md px-3 py-2 text-black font-semibold focus:outline-none"
                  type="number"
                  name="zipCode"
                />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <label className="w-[100px] block">Phone No :</label>
                <input
                  defaultValue={user.about.phoneNo}
                  placeholder="Enter your Phone Number"
                  className="rounded-md px-3 py-2 text-black font-semibold focus:outline-none"
                  type="number"
                  name="phoneNo"
                />
              </div>
              <div className="flex items-center">
                <label className="w-[100px] block">FB Link:</label>
                <input
                  defaultValue={user.about.facebook}
                  placeholder="Enter your Facebook Link"
                  className="rounded-md px-3 py-2 text-black font-semibold focus:outline-none"
                  type="text"
                  name="facebook"
                />
              </div>
              <div className="flex items-center">
                <label className="w-[100px] block">Blood Group:</label>
                <input
                  onChange={(e) => {
                    if (isValidBloodGroup(e.target.value)) {
                      setError("");
                    } else {
                      setError("Enter Valid Blood Group Like 'A+','O-','AB-'");
                    }
                  }}
                  defaultValue={user.about.bloodGroup}
                  placeholder="Your Blood Group"
                  className="rounded-md px-3 py-2 text-black font-semibold focus:outline-none"
                  type="text"
                  name="bloodGroup"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-3">
            <label className="w-[100px] block">Myself:</label>
            <textarea
              defaultValue={user.about.myself}
              placeholder="Write something about yourself"
              className="rounded-md px-3 py-2 text-black font-semibold focus:outline-none"
              rows="5"
              name="myself"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white font-semibold px-3 py-2 transition-all active:scale-90 rounded-md cursor-pointer select-none mt-5"
          >
            Update
          </button>
          <button
            onClick={() => setModalIsOpen(false)}
            className="bg-red-500 text-white font-semibold px-3 py-2 transition-all active:scale-90 rounded-md cursor-pointer select-none mt-5 ml-5"
          >
            Cancle
          </button>
          {error && (
            <p className="text-red-600 font-semibold py-[2px]">{error}</p>
          )}
        </form>
      </Modal>
      <p className="font-semibold text-xl text-white bg-primary py-2 text-center w-full">
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

      <div className="mt-6 w-full">
        <div className="flex items-start gap-6 w-full">
          <div className="w-1/2">
            <p className="font-medium py-1 text-white bg-primary text-center mb-2">
              Address
            </p>
            <div className="flex items-center gap-2">
              <label className="font-bold" htmlFor="">
                Area:
              </label>
              <p>{user.about.area ? user.about.area : "Not Entered"}</p>
            </div>
            <div className="flex items-center gap-2">
              <label className="font-bold" htmlFor="">
                City:
              </label>
              <p>{user.about.city ? user.about.city : "Not Entered"}</p>
            </div>
            <div className="flex items-center gap-2">
              <label className="font-bold" htmlFor="">
                Division:
              </label>
              <p>{user.about.division ? user.about.division : "Not Entered"}</p>
            </div>
            <div className="flex items-center gap-2">
              <label className="font-bold" htmlFor="">
                Zip Code:
              </label>
              <p>{user.about.zipCode ? user.about.zipCode : "Not Entered"}</p>
            </div>
          </div>
          <div className="w-1/2">
            <p className="font-medium py-1 text-white bg-primary text-center mb-2">
              Contacts
            </p>
            <div className="flex items-center gap-2">
              <label className="font-bold" htmlFor="">
                Phone No.:
              </label>
              <p>{user.about.phoneNo ? user.about.phoneNo : "Not Entered"}</p>
            </div>
            <div className="flex items-center gap-2">
              <label className="font-bold" htmlFor="">
                Email:
              </label>
              <p>{user.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <label className="font-bold" htmlFor="">
                Facebook:
              </label>
              <p>{user.about.facebook ? user.about.facebook : "Not Entered"}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-6 w-full">
          <div className="w-1/2">
            <label className="font-medium py-1 text-white bg-primary text-center px-10">
              Blood Groop
            </label>
            <p className="mt-3 flex items-center gap-2 text-2xl font-semibold">
              <MdBloodtype className="text-red-600" />{" "}
              {user.about.bloodGroup ? user.about.bloodGroup : "Not Entered"}
            </p>
          </div>
          <div className="w-1/2">
            <label className="font-medium py-1 text-white bg-primary text-center px-10">
              About Myself
            </label>
            <p className="mt-3">
              {user.about.myself ? user.about.myself : "Not Entered"}
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          setModalIsOpen(true);
        }}
        className="bg-red-500 text-white font-semibold px-3 py-2 transition-all active:scale-90 rounded-md cursor-pointer select-none mt-10"
      >
        Edit
      </button>
    </div>
  );
};

export default MyProfile;
