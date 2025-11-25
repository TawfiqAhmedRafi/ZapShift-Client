import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashCan, FaUserCheck } from "react-icons/fa6";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

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

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-secondary">
        Approve Riders
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#94C6CB]/20 text-gray-700">
            <tr>
              <th className="py-3 px-2 md:px-4 text-left">Name</th>
              <th className="py-3 px-2 md:px-4 text-left">Phone</th>
              <th className="py-3 px-2 md:px-4 text-left">Email</th>
              <th className="py-3 px-2 md:px-4 text-left">Region</th>
              <th className="py-3 px-2 md:px-4 text-left">Bike</th>
              
              <th className="py-3 px-2 md:px-4 text-left">Status</th>
              <th className="py-3 px-2 md:px-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {riders.map((rider) => (
              <tr
                key={rider._id}
                className="border-t border-gray-200 hover:bg-gray-50 transition-all duration-200"
              >
                <td className="py-2 px-2 md:px-4 font-medium">{rider.name}</td>
                <td className="py-2 px-2 md:px-4">{rider.phoneNumber}</td>
                <td className="py-2 px-2 md:px-4">{rider.Email}</td>
                <td className="py-2 px-2 md:px-4">
                  {rider.region}, {rider.district}
                </td>
                <td className="py-2 px-2 md:px-4">{rider.bikeModelYear}</td>
                
                <td className="py-2 px-2 md:px-4">
                  <span className={statusClass[rider.status]}>
                    {rider.status}
                  </span>
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
          <p className="text-center py-6 text-gray-500">
            No riders available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ApproveRiders;
