import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { format } from "date-fns";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["payments", user.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments?email=${user.email}&page=${page}`
      );
      return res.data;
    },
    keepPreviousData: true, 
  });

  const payments = data?.data || [];
  const totalPages = data?.totalPages || 1;

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars text-primary loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-secondary">
        Payment History
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#94C6CB]/20 text-gray-700">
            <tr>
              <th className="py-3 px-2 md:px-4 text-left">#</th>
              <th className="py-3 px-2 md:px-4 text-left">Parcel Info</th>
              <th className="py-3 px-2 md:px-4 text-left">Recipient Info</th>
              <th className="py-3 px-2 md:px-4 text-left">Transaction ID</th>
              <th className="py-3 px-2 md:px-4 text-left">Payment Info</th>
              <th className="py-3 px-2 md:px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr
                key={payment._id}
                className="border-t border-gray-200 hover:bg-gray-50 transition-all duration-200"
              >
                <td className="py-2 px-2 md:px-4">{(page - 1) * 10 + index + 1}</td>
                <td className="py-2 px-2 md:px-4 font-medium">
                  {payment.parcelName}
                </td>
                <td className="py-2 px-2 md:px-4">
                  <div className="space-y-1 text-gray-700 text-sm md:text-base">
                    <p className="font-semibold">{payment.receiverName}</p>
                    <p>
                      {payment.receiverAddress}, {payment.receiverDistrict},{" "}
                      {payment.receiverRegion}
                    </p>
                    <p className="text-gray-500">{payment.receiverPhone}</p>
                  </div>
                </td>
                <td className="py-2 px-2 md:px-4 font-mono text-gray-600">
                  {payment.transactionId}
                </td>
                <td className="py-2 px-2 md:px-4 text-gray-800">
                  <span className="font-semibold">$</span> {payment.amount} (
                  <span className="capitalize">
                    {payment.paymentStatus} at{" "}
                    {format(new Date(payment.paidAt), "PPpp")}
                  </span>
                  )
                </td>
                <td className="py-2 px-2 md:px-4">
                  <button className="btn bg-[#94C6CB] hover:bg-[#7bb0b7] text-white font-medium px-4 py-2 rounded-md transition-all duration-200">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="btn btn-outline btn-primary px-4 py-2 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-mono">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="btn btn-outline btn-primary px-4 py-2 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaymentHistory;
