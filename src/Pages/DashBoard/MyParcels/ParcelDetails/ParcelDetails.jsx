import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import LoadingPage from "../../../LoadingPage";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { format } from "date-fns";

const ParcelDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchParcel = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/parcels/${id}`);
        setParcel(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch parcel data");
      } finally {
        setLoading(false);
      }
    };

    fetchParcel();
  }, [id, axiosSecure]);

  if (loading) return <LoadingPage></LoadingPage>;
  if (error) return <div>{error}</div>;
  if (!parcel) return <div>No parcel found</div>;

  return (
    <div className="p-4 md:p-8 ">
      <h2 className="text-4xl text-secondary font-bold mb-4">Parcel Details</h2>
      <div className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          <div className="bg-base-300 shadow-lg p-6 rounded-xl">
            <h2 className="text-2xl mb-3 font-bold">Sender Info</h2>
            <p className="font-serif">
              <span className="text-gray-500 mr-3">Name :</span>
              {parcel.senderName}
            </p>
            <p className="font-serif">
              <span className="text-gray-500 mr-3">Email :</span>
              {parcel.senderEmail}
            </p>
            <p className="font-serif">
              <span className="text-gray-500 mr-3">Phone :</span>
              {parcel.senderPhoneNumber || "N/A"}
            </p>
            <p className="font-serif">
              <span className="text-gray-500 mr-3">Region :</span>
              {parcel.senderRegion || "N/A"}
            </p>
            <p className="font-serif">
              <span className="text-gray-500 mr-3">District :</span>
              {parcel.senderDistrict || "N/A"}
            </p>
            <p className="font-serif">
              <span className="text-gray-500 mr-3">Address :</span>
              {parcel.senderAddress || "N/A"}
            </p>
          </div>
          <div className="bg-base-300 shadow-lg p-6 rounded-xl">
            <h2 className="text-2xl mb-3 font-bold">Receiver Info</h2>
            <p className="font-serif">
              <span className="text-gray-500 mr-3">Name :</span>
              {parcel.receiverName}
            </p>
            <p className="font-serif">
              <span className="text-gray-500 mr-3">Email :</span>
              {parcel.receiverEmail}
            </p>
            <p className="font-serif">
              <span className="text-gray-500 mr-3">Phone :</span>
              {parcel.receiverPhoneNumber || "N/A"}
            </p>

            <p className="font-serif">
              <span className="text-gray-500 mr-3">Region :</span>
              {parcel.receiverRegion || "N/A"}
            </p>

            <p className="font-serif">
              <span className="text-gray-500 mr-3">District :</span>
              {parcel.receiverDistrict || "N/A"}
            </p>

            <p className="font-serif">
              <span className="text-gray-500 mr-3">Address :</span>
              {parcel.receiverAddress || "N/A"}
            </p>
          </div>
          <div className="bg-base-300 shadow-lg p-6 rounded-xl">
            <h2 className="text-2xl mb-3 font-bold">Parcel Details</h2>

            <p className="font-serif">
              <span className="text-gray-500 mr-3">Tile :</span>
              {parcel.parcelName}
            </p>
            <p className="font-serif">
              <span className="text-gray-500 mr-3">Type :</span>
              {parcel.parcelType
                ? parcel.parcelType
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")
                : ""}
            </p>
            <p className="font-serif">
              <span className="text-gray-500 mr-3">Weight :</span>{" "}
              {parcel.parcelWeight} Kg
            </p>
            <p className="font-serif">
              <span className="text-gray-500 mr-3">Charge :</span>${" "}
              {parcel.cost}
            </p>
            <p className="font-serif">
              <span className="text-gray-500 mr-3">Tracking Id :</span>{" "}
              <Link
                to={`/parcel-track/${parcel.trackingId}`}
                className="inline-block font-mono transform hover:translate-x-1 transition-transform duration-200"
              >
                {parcel.trackingId}
              </Link>
            </p>
            <p className="font-serif">
              <span className="text-gray-500 mr-3">Payment Status :</span>
              <span
                className={`font-semibold ${
                  parcel.paymentStatus?.toLowerCase() === "paid"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {parcel.paymentStatus
                  ? parcel.paymentStatus.charAt(0).toUpperCase() +
                    parcel.paymentStatus.slice(1)
                  : ""}
              </span>
            </p>
            <p
              className={`font-serif ${
                parcel.deliveryStatus === "driver-assigned"
                  ? "text-orange-400"
                  : parcel.deliveryStatus === "parcel-paid"
                  ? "text-red-600"
                  : parcel.deliveryStatus === "rider-arriving"
                  ? "text-yellow-500"
                  : parcel.deliveryStatus === "parcel-picked-up"
                  ? "text-lime-400"
                  : "text-green-600"
              }`}
            >
              <span className="text-gray-500 mr-3 ">Delivery Status :</span>
              <span className="font-semibold">
                {parcel.deliveryStatus
                  ? parcel.deliveryStatus
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")
                  : ""}
              </span>
            </p>

            <p className="font-mono text-gray-600">
              <span className="font-serif text-gray-500 mr-3">
                Created On :
              </span>
              {parcel.createdAt
                ? format(new Date(parcel.createdAt), "PPpp")
                : ""}
            </p>
            <p className="font-serif">
              <span className="text-gray-500 mr-3">Pick Up Instruction :</span>
              {parcel.pickupInstruction ? parcel.pickupInstruction : "N/A"}
            </p>

            <p className="font-serif">
              <span className="text-gray-500 mr-3">Delivery Instruction :</span>
              {parcel.deliveryInstruction ? parcel.deliveryInstruction : "N/A"}
            </p>
            {parcel.riderId && parcel.riderId !== "" && (
              <>
              
                <p className="font-serif">
                  <span className="text-gray-500 mr-3">Rider Name :</span>
                  {parcel.riderName}
                </p>
                <p className="font-serif">
                  <span className="text-gray-500 mr-3">Rider Email :</span>
                  {parcel.riderEmail}
                </p>
                <p className="font-serif">
                  <span className="text-gray-500 mr-3">Rider Contact :</span>
                  {parcel.riderPhone || "N/A"}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="mt-4 flex  justify-end">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 text-white font-semibold rounded-lg shadow-md transition-all duration-300 active:scale-95 hover:brightness-110"
            style={{
              background: "linear-gradient(90deg, #CAEB66 0%, #03373D 100%)",
            }}
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParcelDetails;
