import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["my-parcels", user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?email=${user.email}&page=${page}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const parcels = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };
    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );
    window.location.assign(res.data.url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars text-primary loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-4xl font-bold text-secondary mb-6">
        All my Parcels
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#94C6CB]/30 text-gray-700">
            <tr>
              <th className="py-3 px-2 md:px-4">#</th>
              <th className="py-3 px-2 md:px-4 text-left">Name</th>
              <th className="py-3 px-2 md:px-4 text-left">Cost</th>
              <th className="py-3 px-2 md:px-4 text-left">Payment</th>
              <th className="py-3 px-2 md:px-4 text-left">Delivery Status</th>
              <th className="py-3 px-2 md:px-4 text-left">Tracking Id</th>
              <th className="py-3 px-2 md:px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr
                key={parcel._id}
                className="border-t border-gray-200 hover:bg-gray-50 "
              >
                <th className="py-2 px-2 md:px-4">
                  {(page - 1) * 10 + index + 1}
                </th>
                <td className="py-2 px-2 md:px-4 font-medium">
                  {parcel.parcelName}
                </td>
                <td className="py-2 px-2 md:px-4">{parcel.cost}</td>

                <td className="py-2 px-2 md:px-4">
                  {parcel.paymentStatus === "paid" ? (
                    <div className="badge badge-success flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      Paid
                    </div>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="btn btn-primary btn-sm text-black"
                    >
                      Pay Now
                    </button>
                  )}
                </td>

                <td
                  className={`py-2 px-2 md:px-4 font-semibold ${
                    parcel.deliveryStatus === "driver-assigned"
                      ? "text-orange-400"
                      : parcel.deliveryStatus === "pending-pickup"
                      ? "text-red-600"
                      : parcel.deliveryStatus === 'rider-arriving' ? "text-yellow-500" : parcel.deliveryStatus === 'parcel-picked-up'? "text-lime-400" :"text-green-600"
                  }`}
                >
                  {parcel.deliveryStatus
                    ? parcel.deliveryStatus
                        .split("-")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")
                    : ""}
                </td>

                <td className="py-2 px-2 md:px-4 font-mono">
                  {parcel.trackingId}
                </td>

                <td className="py-2 px-2 md:px-4 flex flex-col md:flex-row gap-2 md:gap-2">
                  <button className="btn btn-square btn-primary hover:scale-105 hover:shadow-md transition-transform duration-200">
                    <FaMagnifyingGlass />
                  </button>
                  <button className="btn btn-square bg-[#94C6CB] hover:bg-[#7bb0b7] text-white transition-all duration-200">
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="btn btn-square bg-red-400 hover:bg-red-500 text-white transition-all duration-200"
                  >
                    <FaTrashCan />
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

export default MyParcels;
