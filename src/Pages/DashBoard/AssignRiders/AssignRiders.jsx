import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { format } from "date-fns";
import { MdOutlineCancel } from "react-icons/md";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const riderModalRef = useRef();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
    queryKey: ["parcels", "parcel-paid"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=parcel-paid"
      );
      return res.data.data;
    },
  });
// invalidate query after assigning a rider
  const { data: riders = [] ,refetch : riderRefetch } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      if (!selectedParcel) return [];
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel.senderDistrict}&workStatus=available`
      );
      return res.data.data;
    },
  });

 // console.log(selectedParcel);

  const openAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    riderModalRef.current.showModal();
  };

  const handleAssignRider = (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderEmail: rider.Email,
      riderName: rider.name,
      riderPhone: rider.phoneNumber,
      parcelId: selectedParcel._id,
      trackingId : selectedParcel.trackingId
    };
    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
      .then((res) => {
       // console.log(res.data);
        if (res.data.modifiedCount) {
          parcelsRefetch();
          riderRefetch();
          riderModalRef.current.close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Rider has been assigned",
            showCancelButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-secondary">
        Assign Riders
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#94C6CB]/20 text-gray-700">
            <tr>
              <th className="py-3 px-2 md:px-4 text-left">#</th>
              <th className="py-3 px-2 md:px-4 text-left">Name</th>
              <th className="py-3 px-2 md:px-4 text-left">Cost</th>
              <th className="py-3 px-2 md:px-4 text-left">Creation Time</th>
              <th className="py-3 px-2 md:px-4 text-left">Tracking Id</th>
              <th className="py-3 px-2 md:px-4 text-left">PickUp Location</th>
              <th className="py-3 px-2 md:px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr
                key={parcel._id}
                className="border-t border-gray-200 hover:bg-gray-50 transition-all duration-200"
              >
                <th className="py-2 px-2 md:px-4">{index + 1}</th>
                <td className="py-2 px-2 md:px-4 font-medium">
                  {parcel.parcelName}
                </td>
                <td className="py-2 px-2 md:px-4">{parcel.cost}</td>
                <td className="py-2 px-2 md:px-4 font-mono">
                  {format(new Date(parcel.createdAt), "PPpp")}
                </td>
                <td className="py-2 px-2 md:px-4 font-mono">
                  {parcel.trackingId}
                </td>
                <td className="py-2 px-2 md:px-4">
                  {parcel.senderAddress} , {parcel.senderDistrict}
                </td>
                <td className="py-2 px-2 md:px-4">
                  <button
                    onClick={() => openAssignRiderModal(parcel)}
                    className="bg-secondary text-white font-medium px-4 py-2 rounded-md hover:bg-secondary/90 transition-all duration-200"
                  >
                    Find Riders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog
        ref={riderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box rounded-lg shadow-lg border border-gray-200 bg-white">
          <h3 className="font-bold text-lg mb-3">Select a Rider</h3>

          <div className="overflow-x-auto">
            {riders.length === 0 ? (
              <div className="py-8 text-center text-gray-500 font-medium">
                No riders available in{" "}
                <span className="text-secondary font-semibold">
                  {selectedParcel?.senderDistrict}
                </span>
              </div>
            ) : (
              <table className="min-w-full bg-white">
                <thead className="bg-[#94C6CB]/20 text-gray-700">
                  <tr>
                    <th className="py-3 px-2 md:px-4 text-left"></th>
                    <th className="py-3 px-2 md:px-4 text-left">Name</th>
                    <th className="py-3 px-2 md:px-4 text-left">Email</th>
                    <th className="py-3 px-2 md:px-4 text-left">Phone</th>
                    <th className="py-3 px-2 md:px-4 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {riders.map((rider, i) => (
                    <tr
                      key={rider._id}
                      className="border-t border-gray-100 hover:bg-gray-50 transition-all duration-200"
                    >
                      <th className="py-2 px-2 md:px-4">{i + 1}</th>
                      <td className="py-2 px-2 md:px-4">{rider.name}</td>
                      <td className="py-2 px-2 md:px-4">{rider.Email}</td>
                      <td className="py-2 px-2 md:px-4">{rider.phoneNumber}</td>
                      <td className="py-2 px-2 md:px-4">
                        <button
                          onClick={() => handleAssignRider(rider)}
                          className="bg-secondary text-white font-medium px-3 py-1 rounded-md hover:bg-secondary/90 transition-all duration-200"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="modal-action absolute top-1 right-5">
            <form method="dialog">
              <button className="text-red-600">
                <MdOutlineCancel />
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
