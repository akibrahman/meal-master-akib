import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import EditMeal from "../../Components/Dashboard/EditMeal";
import Loader from "../../Components/Shared/Loader";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllMeals = () => {
  const axiosInstanceS = useAxiosSecure();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mealID, setMealId] = useState();
  const {
    data: meals,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-meals-admin"],
    queryFn: async () => {
      const responce = await axiosInstanceS.get(`/all-meals-admin`);
      return responce.data;
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `This meal will be deleted Permanently`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstanceS
          .delete(`/delete-a-meal-admin/${id}`)
          .then((res) => {
            console.log(res.data);
            refetch();
            toast.success("Deleted Successfully");
          })
          .catch((error) => toast.error(error.message));
      }
    });
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setModalIsOpen(false);
  }
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <EditMeal
          closeFn={closeModal}
          mealID={mealID}
          allMealsRefetch={refetch}
        />
      </Modal>
      <div className="p-12 bg-white w-[950px]">
        <div className="flex justify-between items-center font-cinzel mb-8">
          <p className="text-[#151515] text-2xl font-bold">
            Total Meals: {meals?.length}
          </p>
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
                  <th className="text-center">Meal Title</th>
                  <th className="text-center">Likes</th>
                  <th className="text-center">Reviews</th>
                  <th className="text-center">Distributor Name</th>
                  <th className="text-center">Distributor Email</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Row */}
                {meals.map((meal, i) => (
                  <tr className="" key={meal._id}>
                    <th>
                      <p>{i + 1}</p>
                    </th>

                    <td className="text-center font-bold">{meal.mealTitle}</td>
                    <td className="text-center font-bold">{meal.likes}</td>
                    <td className="text-center font-bold">{meal.numReviews}</td>
                    <td className="text-center font-bold">
                      {meal.distributorName}
                    </td>
                    <td className="text-center font-bold">
                      {meal.distributorEmail}
                    </td>
                    <th className="flex items-center gap-2 justify-center">
                      <CiEdit
                        onClick={() => {
                          setModalIsOpen(true);
                          setMealId(meal._id);
                        }}
                        className="bg-[#141515] text-white w-8 h-8 p-2 rounded-full select-none cursor-pointer transition-all active:scale-75"
                      />
                      <MdDelete
                        onClick={() => handleDelete(meal._id)}
                        className="bg-[#141515] text-white w-8 h-8 p-2 rounded-full select-none cursor-pointer transition-all active:scale-75"
                      />
                      <Link to={`/meal/${meal._id}`}>
                        <FaArrowRight className="bg-[#141515] text-white w-8 h-8 p-2 rounded-full select-none cursor-pointer transition-all active:scale-75" />
                      </Link>
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

export default AllMeals;
