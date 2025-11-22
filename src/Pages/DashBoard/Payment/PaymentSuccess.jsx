import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-[70vh] flex justify-center items-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full text-center border">
        
        <div className="flex justify-center mb-4">
          <svg
            className="w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75l2.25 2.25L15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-green-600 mb-3">
          Payment Successful!
        </h2>

        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your order has been successfully processed.
        </p>

        <div className="text-left bg-gray-50 p-5 rounded-xl border">
          <p className="font-semibold">
            Transaction ID:{" "}
            <span className="font-normal text-gray-700">
              {paymentInfo.transactionId || "Loading..."}
            </span>
          </p>
          <p className="font-semibold mt-2">
            Tracking ID:{" "}
            <span className="font-normal text-gray-700">
              {paymentInfo.trackingId || "Loading..."}
            </span>
          </p>
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
