import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });
  return (
    <div>
      <h2 className="text-4xl">Manage Users:{users.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Actions</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="text-center">
                  {user.role === "admin" ? (
                    <button className="text-red-600">
                      <FiShieldOff size={24} />
                    </button>
                  ) : (
                    <button className="text-green-500">
                      <FaUserShield size={24} />
                    </button>
                  )}
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
