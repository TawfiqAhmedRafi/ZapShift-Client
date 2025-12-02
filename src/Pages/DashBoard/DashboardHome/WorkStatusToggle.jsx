import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";

const WorkStatusToggle = ({ currentStatus, inDelivery, email }) => {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // Sync local state when currentStatus changes
  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  const handleToggle = async () => {
    if (inDelivery) return;
    setLoading(true);

    const newWorkStatus = status === "available" ? "unavailable" : "available";

    try {
      await axiosSecure.patch("/riders/work-status", { email, newWorkStatus });
      setStatus(newWorkStatus);
      queryClient.invalidateQueries(["rider-dashboard-stats"]);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update work status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-4">
     

      {/* Toggle switch */}
      <button
        onClick={handleToggle}
        disabled={inDelivery || loading}
        className={`relative md:mr-10 w-20 h-10 rounded-full transition-colors duration-300 focus:outline-none
          ${inDelivery ? "bg-gray-400 cursor-not-allowed" : status === "available" ? "bg-green-500" : "bg-red-500"}
        `}
      >
        <span
          className={`absolute top-1 left-1 w-8 h-8 bg-white rounded-full shadow-md transform transition-transform duration-300
            ${status === "available" ? "translate-x-0" : "translate-x-10"}
          `}
        />
      </button>

      
    </div>
  );
};

export default WorkStatusToggle;
