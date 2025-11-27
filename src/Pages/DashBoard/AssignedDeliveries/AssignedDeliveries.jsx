import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "driver-assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver-assigned`
      );
      return res.data;
    },
  });
  const handleAcceptDelivery = (parcel) => {
    const statusInfo = {
      deliveryStatus: "rider-arriving",
    };
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Thank you for accepting  `,
            showCancelButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div>
      <h2 className="text-4xl">Parcels Pending Pickup:{parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Pick Up Location</th>
              <th>Delivery Status</th>
              <th>Confirm</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>
                  {parcel.senderAddress} , {parcel.senderDistrict}
                </td>
                <td>{parcel.deliveryStatus}</td>
                <td>
                  {parcel.deliveryStatus === "driver-assigned" ? (
                    <>
                      <button
                        onClick={() => handleAcceptDelivery(parcel)}
                        className="btn btn-primary text-black"
                      >
                        Accept
                      </button>
                      <button className="btn btn-error text-black ms-2">
                        Reject
                      </button>
                    </>
                  ) : <span>Delivery Accepted</span>
                
                }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
