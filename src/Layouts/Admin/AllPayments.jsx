import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Loader from "../../Components/Shared/Loader";
import Pagination from "../../Components/Shared/Pagination";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllPayments = () => {
  const axiosInstanceS = useAxiosSecure();
  const [page, setPage] = useState(0);

  const {
    data: paymentsData,
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: ["all-payments-admin"],
    queryFn: async () => {
      const responce = await axiosInstanceS.get(`/all-payments`);
      return responce.data;
    },
  });

  const totalPages = Math.ceil(paymentsData?.count / 10);
  const pages = [...new Array(totalPages ? totalPages : 0).fill(0)];

  return (
    <div>
      <div className="p-12 bg-white w-[950px]">
        <div className="flex justify-between items-center font-cinzel mb-8">
          <p className="text-[#151515] text-2xl font-bold">
            Total Payments: {paymentsData?.count}
          </p>
        </div>

        {/* Table Start  */}
        {isLoading || !paymentsData ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-[#141515] uppercase text-white">
                <tr>
                  <th className="py-2">SL.</th>
                  <th className="text-center">Email</th>
                  <th className="text-center">Payment Date</th>
                  <th className="text-center">Amount</th>
                  <th className="text-center">Transac. ID</th>
                </tr>
              </thead>
              <tbody>
                {/* Row */}
                {paymentsData.payments.map((payment, i) => (
                  <tr className="" key={payment._id}>
                    <th>
                      <p>{i + 1}</p>
                    </th>

                    <td className="text-center font-bold">{payment.email}</td>
                    <td className="text-center font-bold">
                      {moment(payment.paymentDate).format("Do MMM YYYY")}
                    </td>
                    <td className="text-center font-bold flex items-center gap-1">
                      <FaBangladeshiTakaSign />
                      {payment.amount}
                    </td>
                    <th className="text-center font-bold">
                      {payment.transactionId}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        pages={pages}
        totalPages={totalPages}
      />
    </div>
  );
};

export default AllPayments;
