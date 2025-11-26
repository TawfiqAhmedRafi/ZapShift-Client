import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashCan, FaUserCheck } from "react-icons/fa6";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import LoadingPage from "../../LoadingPage";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  // Filter, sorting, and pagination state
  const [statusFilter, setStatusFilter] = useState(""); // "" = all
  const [sortOrder, setSortOrder] = useState("desc"); // default desc
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    refetch,
    data: ridersData = {},
    isFetching,
  } = useQuery({
    queryKey: ["riders", statusFilter, sortOrder, page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders", {
        params: {
          status: statusFilter || undefined,
          sortOrder,
          page,
          limit,
        },
      });
      return res.data;
    },
    keepPreviousData: true, // avoid table flicker when changing page/filter
  });

  const riders = ridersData.data || [];
  const totalPages = ridersData.totalPages || 1;

  const statusClass = {
    pending:
      "px-3 py-1 rounded-full text-sm font-semibold bg-yellow-200 text-yellow-800",
    approved:
      "px-3 py-1 rounded-full text-sm font-semibold bg-green-200 text-green-800",
    rejected:
      "px-3 py-1 rounded-full text-sm font-semibold bg-red-200 text-red-800",
  };

  const updateRiderStatus = (rider, status) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `You want to mark as ${status}`,
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const updateInfo = { status, email: rider.Email };
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then(() => {
          Swal.fire("Updated!", "Status changed.", "success");
          refetch();
        });
      }
    });
  };

  const updateStatusModal = (rider, status) => {
    const updateInfo = { status, email: rider.Email };

    axiosSecure
      .patch(`/riders/${rider._id}`, updateInfo)
      .then(() => {
        refetch();

        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: `Rider status has been marked as ${status}`,
          timer: 1500,
          showConfirmButton: false,
        });

        // Close the modal
        const modal = document.getElementById("view_modal");
        if (modal) {
          modal.close();
        }

        // Clear selected rider
        setSelectedRider(null);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while updating status!",
        });
      });
  };

  const deleteRider = (id) => {
    Swal.fire({
      title: "Delete this rider?",
      icon: "warning",
      showCancelButton: true,
    }).then((r) => {
      if (r.isConfirmed) {
        axiosSecure.delete(`/riders/${id}`).then(() => {
          Swal.fire("Deleted!", "Rider removed.", "success");
          refetch();
        });
      }
    });
  };

  const handleView = async (id) => {
    const res = await axiosSecure.get(`/riders/${id}`);
    setSelectedRider(res.data);
    document.getElementById("view_modal").showModal();
  };
  if (isFetching) {
    return <LoadingPage />;
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-secondary">
        Approve Riders
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
          <label className="font-semibold text-gray-700">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#94C6CB] focus:border-[#94C6CB] transition-all"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
          <label className="font-semibold text-gray-700">Sort By:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#94C6CB] focus:border-[#94C6CB] transition-all"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Riders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#94C6CB]/20 text-gray-700">
            <tr>
              <th className="py-3 px-2 md:px-4 text-left">#</th>
              <th className="py-3 px-2 md:px-4 text-left">Name</th>
              <th className="py-3 px-2 md:px-4 text-left">Email</th>
              <th className="py-3 px-2 md:px-4 text-left">Region</th>
              <th className="py-3 px-2 md:px-4 text-center">
                Application Status
              </th>
              <th className="py-3 px-2 md:px-4 text-center">Work Status</th>
              <th className="py-3 px-2 md:px-4 text-left"> Details</th>
              <th className="py-3 px-2 md:px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr
                key={rider._id}
                className="border-t border-gray-200 hover:bg-gray-50 transition-all duration-200"
              >
                <td className="py-2 px-2 md:px-4">
                  {index + 1 + (page - 1) * limit}
                </td>
                <td className="py-2 px-2 md:px-4 font-medium">{rider.name}</td>
                <td className="py-2 px-2 md:px-4">{rider.Email}</td>
                <td className="py-2 px-2 md:px-4">
                  {rider.region}, {rider.district}
                </td>
                <td className="py-2 px-2 md:px-4 text-center">
                  <span className={statusClass[rider.status]}>
                    {rider.status}
                  </span>
                </td>
                <td
                  className={`py-2 px-2 md:px-4 text-center font-semibold ${
                    rider.workStatus === "available"
                      ? "text-green-600"
                      : rider.workStatus === "in_delivery"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {rider.workStatus
                    ?.split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ") || ""}
                </td>

                <td className="py-2 px-2 md:px-4">
                  <button
                    onClick={() => handleView(rider._id)}
                    className="btn bg-[#94C6CB] hover:bg-[#7bb0b7] text-white font-medium px-4 py-2 rounded-md transition-all duration-200"
                  >
                    <FaEye />
                  </button>
                </td>
                <td className="py-2 px-2 md:px-4 flex gap-2 md:gap-3">
                  <button
                    onClick={() => updateRiderStatus(rider, "approved")}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition-all duration-200 flex items-center justify-center"
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => updateRiderStatus(rider, "rejected")}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md transition-all duration-200 flex items-center justify-center"
                  >
                    <IoPersonRemoveSharp />
                  </button>
                  <button
                    onClick={() => deleteRider(rider._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-all duration-200 flex items-center justify-center"
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {riders.length === 0 && (
          <p className="text-center py-6 text-gray-500">No riders available.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="btn btn-sm"
        >
          Previous
        </button>
        <span className="font-mono">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="btn btn-sm"
        >
          Next
        </button>
      </div>

      <dialog
        id="view_modal"
        className="modal modal-bottom sm:modal-middle relative"
      >
        <div className="modal-box">
          <h3 className="font-bold text-xl mb-4">Rider Details</h3>

          {selectedRider && (
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {selectedRider.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {selectedRider.Email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {selectedRider.phoneNumber}
              </p>

              <p>
                <span className="font-semibold">License:</span>{" "}
                {selectedRider.license}
              </p>
              <p>
                <span className="font-semibold">NID:</span> {selectedRider.nid}
              </p>

              <p>
                <span className="font-semibold">Area :</span>{" "}
                {selectedRider.district} , {selectedRider.region}
              </p>

              <p>
                <span className="font-semibold">Bike Model/Year:</span>{" "}
                {selectedRider.bikeModelYear}
              </p>
              <p>
                <span className="font-semibold">Bike Registration:</span>{" "}
                {selectedRider.bikeReg}
              </p>

              <p>
                <span className="font-semibold">About Rider:</span>{" "}
                {selectedRider.aboutRider}
              </p>

              <p>
                <span className="font-semibold">Status:</span>
                <span className={statusClass[selectedRider.status]}>
                  {selectedRider.status}
                </span>
              </p>

              <p>
                <span className="font-semibold">Apply Time:</span>{" "}
                {format(new Date(selectedRider.createdAt), "PPpp")}
              </p>
              <div></div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => updateStatusModal(selectedRider, "approved")}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex flex-1 items-center gap-2"
                >
                  <FaUserCheck /> Approve
                </button>
                <button
                  onClick={() => updateStatusModal(selectedRider, "rejected")}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md flex flex-1 items-center gap-2"
                >
                  <IoPersonRemoveSharp /> Reject
                </button>
              </div>
            </div>
          )}

          <div className="modal-action absolute top-1 right-5">
            <form method="dialog">
              <button className=" text-red-600">
                <MdOutlineCancel />
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ApproveRiders;
