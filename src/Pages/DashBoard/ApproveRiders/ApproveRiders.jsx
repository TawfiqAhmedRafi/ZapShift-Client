import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashCan, FaUserCheck } from "react-icons/fa6";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";
const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const {refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });
  const statusClass = {
    pending: "badge-warning",
    approved: "badge-success",
  };

  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status , email : rider.Email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Rider's status is set to ${status}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleApproval = (rider) => {
    updateRiderStatus(rider, "approved");
  };

  const handleReject = (rider) => {
    updateRiderStatus(rider, "rejected");
  };
  const handleRiderDelete = (id) => {
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
          axiosSecure.delete(`/riders/${id}`).then((res) => {
            
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

  return (
    <div>
      <h2 className="text-5xl">riders : {riders.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Status</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {riders.map((rider, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.Email}</td>
                <td>
                  {rider.district},{rider.region}
                </td>
                <td>
                  <div
                    className={`badge ${
                      statusClass[rider.status] || "badge-error"
                    }`}
                  >
                    {rider.status}
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => handleApproval(rider)}
                    className="btn"
                  >
                    <FaUserCheck></FaUserCheck>
                  </button>
                  <button
                    onClick={() => handleReject(rider)}
                    className="btn ml-2"
                  >
                    <IoPersonRemoveSharp></IoPersonRemoveSharp>
                  </button>
                  <button onClick={()=>handleRiderDelete(rider._id)} className="btn ml-2">
                    <FaTrashCan></FaTrashCan>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
