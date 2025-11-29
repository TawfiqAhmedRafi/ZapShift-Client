import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";

const ParcelTrack = () => {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();
  const {
    data: trackings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading tracking details...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">
          Failed to fetch tracking details.
        </p>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-secondary">
          Track Your Package
        </h1>
        <p className="text-gray-500 mb-8">
          Tracking ID:{" "}
          <span className="font-mono text-gray-700">{trackingId}</span>
        </p>

        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 font-medium">
            Updates: {trackings.length}
          </p>
          <p className="text-gray-400 text-sm">
            Last updated:{" "}
            {trackings.length
              ? new Date(
                  trackings[trackings.length - 1].createdAt
                ).toLocaleString()
              : "N/A"}
          </p>
        </div>

        {/* Timeline */}
        <ul className="relative border-l-2 border-gray-300">
          {trackings
            .slice()

            .map((log) => (
              <li key={log._id} className="mb-10 ml-6">
                {/* Dot */}
                <span className="absolute -left-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center ring-8 ring-gray-50">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </span>

                {/* Content */}
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
                  <time className="text-sm text-gray-400">
                    {new Date(log.createdAt).toLocaleString()}
                  </time>
                  <p className="mt-2 text-gray-700 font-medium">
                    {log.details
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </p>
                </div>
              </li>
            ))}
        </ul>

        {trackings.length === 0 && (
          <p className="text-gray-500 mt-4">
            No tracking updates available yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ParcelTrack;
