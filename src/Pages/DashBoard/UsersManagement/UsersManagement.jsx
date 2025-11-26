import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";
import { FaTrashCan } from "react-icons/fa6";
import LoadingPage from "../../LoadingPage";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1); // remember page before search
  const [search, setSearch] = useState("");
  const limit = 10; // fixed limit

  const { refetch, data, isLoading, isFetching } = useQuery({
    queryKey: ["users", page, search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`, {
        params: { page, limit, search },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const users = data?.users || [];
  const totalPages = data?.totalPages || 1;

  // Temporary search handler
  const handleSearchChange = (e) => {
    const value = e.target.value;

    if (value && search === "") {
      // first time typing, save current page
      setPrevPage(page);
      setPage(1); // show filtered results from page 1
    }

    if (!value) {
      // search cleared, restore previous page
      setPage(prevPage);
    }

    setSearch(value);
  };

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to make ${user.displayName} an admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${user._id}/role`, { role: "admin" })
          .then((res) => {
            if (res.data.modifiedCount) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: `${user.displayName} is now an admin`,
                showConfirmButton: false,
                timer: 2000,
              });
              refetch();
            }
          });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to remove admin access from ${user.displayName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${user._id}/role`, { role: "user" })
          .then((res) => {
            if (res.data.modifiedCount) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: `${user.displayName} is now a normal user`,
                showConfirmButton: false,
                timer: 2000,
              });
              refetch();
            }
          });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this user?",
      icon: "warning",
      showCancelButton: true,
    }).then((r) => {
      if (r.isConfirmed) {
        axiosSecure.delete(`/users/${id}`).then(() => {
          Swal.fire("Deleted!", "User removed.", "success");
          refetch();
        });
      }
    });
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-secondary">
        Manage Users
      </h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full md:w-1/3"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Loading State */}
      {isLoading || isFetching ? (
        <LoadingPage></LoadingPage>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-[#94C6CB]/20 text-gray-700 font-semibold">
              <tr>
                <th className="py-3 px-2 md:px-4 text-left">#</th>
                <th className="py-3 px-2 md:px-4 text-left">Name</th>
                <th className="py-3 px-2 md:px-4 text-left">Email</th>
                <th className="py-3 px-2 md:px-4 text-left">Role</th>
                <th className="py-3 px-2 md:px-4 text-center">Admin Actions</th>
                <th className="py-3 px-2 md:px-4 text-center">Other Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="py-2 px-2 md:px-4">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="py-2 px-2 md:px-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={user.photoURL} alt={user.displayName} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.displayName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-2 md:px-4">{user.email}</td>
                  <td className="py-2 px-2 md:px-4 font-bold">
                    <span
                      className={`badge ${
                        user.role === "admin"
                          ? "badge-error text-red-800" 
                          : user.role === "user"
                          ? "badge-success text-green-700" 
                          : "badge-info text-blue-800" 
                      } capitalize`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-2 px-2 md:px-4 text-center">
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRemoveAdmin(user)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <FiShieldOff size={24} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="text-green-500 hover:text-green-700 transition-colors"
                      >
                        <FaUserShield size={24} />
                      </button>
                    )}
                  </td>
                  <td className="py-2 px-2 md:px-4 text-center">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <FaTrashCan size={22} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
    </div>
  );
};

export default UsersManagement;
