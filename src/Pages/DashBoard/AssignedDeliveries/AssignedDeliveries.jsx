import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrashCan } from "react-icons/fa6";
import LoadingPage from "../../LoadingPage";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch, isFetching } = useQuery({
    queryKey: ["parcels", user.email, "driver-assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver-assigned`
      );
      return res.data;
    },
  });

  const handleDeliveryStatusUpdate = (parcel, status) => {
    let workStatus = "";
    if (
      status === "driver-assigned" ||
      status === "rider-arriving" ||
      status === "parcel-picked-up"
    ) {
      workStatus = "in_delivery";
    } else if (status === "parcel-delivered" || status === "pending-pickup") {
      workStatus = "available";
    }

    const statusInfo = { deliveryStatus: status, workStatus };
    const message = `Parcel Status is updated to ${status.split("-").join(" ")}`;

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  if (isFetching) {
    return (
     <LoadingPage></LoadingPage>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-secondary">
        Assigned Deliveries
      </h1>
      <p className="mb-6 text-gray-600 font-medium">
        Total Parcels Pending Pickup: <span className="font-bold">{parcels.length}</span>
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#94C6CB]/20 text-gray-700">
            <tr>
              <th className="py-3 px-2 md:px-4 text-left">#</th>
              <th className="py-3 px-2 md:px-4 text-left">Parcel Name</th>
              <th className="py-3 px-2 md:px-4 text-left">Pick Up Location</th>
              <th className="py-3 px-2 md:px-4 text-center">Confirm Pickup</th>
              <th className="py-3 px-2 md:px-4 text-center">Delivery Status</th>
              <th className="py-3 px-2 md:px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr
                key={parcel._id}
                className="border-t border-gray-200 hover:bg-gray-50 transition-all duration-200"
              >
                <td className="py-2 px-2 md:px-4">{index + 1}</td>
                <td className="py-2 px-2 md:px-4 font-medium">{parcel.parcelName}</td>
                <td className="py-2 px-2 md:px-4">
                  {parcel.senderAddress}, {parcel.senderDistrict}
                </td>

                <td className="py-2 px-2 md:px-4 text-center">
                  {parcel.deliveryStatus === "driver-assigned" ? (
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "rider-arriving")
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition-all duration-200"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "pending-pickup")
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-all duration-200"
                      >
                        Reject
                      </button>
                    </div>
                  ) : parcel.deliveryStatus === "pending-pickup" ? (
                    <span className="text-red-700 font-semibold">Delivery Rejected</span>
                  ) : (
                    <span className="text-green-600 font-semibold">Delivery Accepted</span>
                  )}
                </td>

                <td className="py-2 px-2 md:px-4 text-center">
                  {parcel.deliveryStatus === "rider-arriving" ? (
                    <button
                      onClick={() =>
                        handleDeliveryStatusUpdate(parcel, "parcel-picked-up")
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-all duration-200"
                    >
                      Mark as Picked Up
                    </button>
                  ) : parcel.deliveryStatus === "driver-assigned" ? (
                    <span className="text-orange-600 font-medium">
                      Confirm to pick up
                    </span>
                  ) : parcel.deliveryStatus === "parcel-picked-up" ? (
                    <div className="flex gap-2 justify-center items-center">
                      <span className="text-blue-600 font-medium">Parcel Picked Up</span>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "parcel-delivered")
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition-all duration-200"
                      >
                        Mark as Delivered
                      </button>
                    </div>
                  ) : parcel.deliveryStatus === "parcel-delivered" ? (
                    <span className="text-green-600 font-medium">Parcel Delivered</span>
                  ) : null}
                </td>

                <td className="py-2 px-2 md:px-4 text-center">
                  <button
                    
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-all duration-200 flex items-center justify-center"
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {parcels.length === 0 && (
          <p className="text-center py-6 text-gray-500">No assigned parcels available.</p>
        )}
      </div>
    </div>
  );
};

export default AssignedDeliveries;
